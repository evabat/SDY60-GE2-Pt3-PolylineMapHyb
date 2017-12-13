import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  LatLng,
  CameraPosition
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // Variables
  map: GoogleMap;
  points: any[] = [];
  pathsRef: AngularFireList<any>;
  paths: Observable<any[]>;
  path: Observable<any>;
  pathsArr: any[];
  selectedPath: string;
  deleteDisabled: boolean = true;
  saveDisabled: boolean = true;
  eraseDisabled: boolean = true;

  constructor(
    // Constructor variables
    public navCtrl: NavController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private db: AngularFireDatabase,
    private toastCtrl: ToastController,
    private detRef:ChangeDetectorRef) {
      // Variables that concern the database
    this.pathsRef = db.list('/paths');
    this.paths = this.pathsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });

  }

  // Load the map and the saved paths to the selectable menu
  ionViewDidLoad() {
    this.loadMap();
    this.populateSelectable();
  }

  // Get the location of the user!
  getUserLocation() {
    this.getLocation().then(res => {
      return new LatLng(res.coords.latitude, res.coords.longitude);
    }).catch(err => {
      console.log(err);
    });
  }

  // The whole thing that initiates the map
  loadMap() {
    let starterCoords;
    // Define the starting coords
    if (this.getUserLocation()) {
      starterCoords = this.getUserLocation();
    } else {
      starterCoords = new LatLng(35.363933, 24.482068);
    }
    // Set the map options
    let mapOptions: GoogleMapOptions = {
      // Zoom area of the map
      camera: {
        target: {
          lat: starterCoords.lat,
          lng: starterCoords.lng
        },
        zoom: 16,
        tilt: 30
      },
      // Make the "myLocation" button visible
      controls: {
        myLocationButton: true
      }
    };
    // Create the map!
    this.map = GoogleMaps.create('map_canvas', mapOptions);
    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      // Event for clicking the map
      this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe(data => {
        // Current click point
        let point = JSON.parse(data);
        // Store the point in global temporary memory
        this.points.push(point);
        // Show the marker
        this.addMarker(point);
        // Add the polyline to the map
        this.map.addPolyline({
          points: this.points,
          'color': '#16dddd',
          'width': 3,
        });
        // Arrange the appearance of control buttons accordingly...
        this.arrangeButtons(((this.selectedPath) && (this.selectedPath == "000")) ? true : false, false, false);
      });
    });
  }

  // Fill the top dropdown menu with data from the database
  populateSelectable() {
    this.paths.subscribe(res => {
      this.pathsArr = res;
    });
  }

  // The function that runs when the "save" button is clicked
  savePath() {
    if (this.points) {
      // Get information about the first location in order to have a name for the entry
      this.nativeGeocoder.reverseGeocode(this.points[0].lat, this.points[0].lng)
        .then((result: NativeGeocoderReverseResult) => {
          // Save the entry with a name and the points array
          this.addPath(result.thoroughfare + ", " + result.locality, this.points);
          // Clear the map after the save
          this.clearMap();
        })
        .catch((err) => {
          console.log("error: ", err.message);
        });
        // If no data, inform the user accordinglt
        // In the highly unlikely case where the button would be enabled with an empty map :)
    } else {
      alert("Δεν υπάρχουν δεδομένα προς αποθήκευση");
    }
  }

  // Show the selected path (from the dropdown) to the map
  // It takes as a parameter the KEY of the entry
  changeSelectedPath(key) {
    // Declare an empty arr
    let coordsArr = [];
    // If the selection is NOT the default one
    if (key !== "000") {
      // Clear the map!
      this.map.clear();
      // Clear the points arr
      this.points = [];
      // Get the data (by using the key and the db reference)
      this.db.object('paths/' + key).valueChanges().subscribe(data => {
        // If there exist data...
        if (data) {
          // Get the coords
          coordsArr = data["coords"];
          // Iterate the coords array on order to add all the points
          // as markers to the map
          for (let i = 0; i < coordsArr.length; i++) {
            this.addMarker(coordsArr[i]);
          }
          // Draw also the polyline
          this.map.addPolyline({
            points: coordsArr,
            'color': '#16dddd',
            'width': 3,
          });
          // Make the map focus on the middle point of the array
          this.moveCamera(coordsArr[Math.ceil(coordsArr.length / 2)])
          // Assign our current choice to the global points array (temporary)
          this.points = coordsArr;
        }
      });
      // Handle the appearance of the buttons!
      this.arrangeButtons(false, true, false);
    } else {
      // If the selection is the default one (no selection) just clear the map
      this.clearMap();
    }
  }

  // Function that is called when we want to add a marker
  addMarker(coords) {
    // Add the marker with some properties
    this.map.addMarker({
      icon: 'cyan',
      animation: 'DROP',
      position: {
        lat: coords.lat,
        lng: coords.lng
      }
    });
  }

  // Function that clears the map
  erasePath() {
    this.clearMap();
    // Inform the user that tha map is CLEAR
    this.presentToast("Πραγματοποιήθηκε εκκαθάριση των σημείων του χάρτη!");
  }

// Function that actually saves a given path object to the database
  addPath(address: string, coords: any[]) {
    this.pathsRef.push({ address: address, coords: coords });
    this.presentToast("Η διαδρομή αποθηκεύτηκε επιτυχώς!");
  }

  // Function that is called when the user deletes a path
  deletePath() {
    // Check the selected path (on the dropdown) that she wants to erase
    // It  must not be the default one, because it has no data!
    // so, if not the default...
    if (this.selectedPath !== "000") {
      // Remove the selected path
      this.pathsRef.remove(this.selectedPath);
      // Clear the map
      this.clearMap();
      // Inform the user
      this.presentToast("Η διαδρομή διεγράφη επιτυχώς!");
    }
  }

  // The REAL function that clears the map
  clearMap() {
    // WIPE IT ALL
    // map
    this.map.clear();
    // points array
    this.points = [];
    // reset selection
    this.selectedPath = "000";
    // disable all control buttons
    this.arrangeButtons(true, true, true);
  }

  // Get the current position
  getLocation() {
    return this.geolocation.getCurrentPosition();
  }

  // Function that executes the camera movement (focus of the map)
  moveCamera(loc: LatLng) {
    let options: CameraPosition<any> = {
      target: loc,
      zoom: 16,
      tilt: 10
    }
    this.map.moveCamera(options);
  }

// The toast that informs the user, it appears at the top
  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });

    // For whatever reason a toast must be dismissed
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  // The frequent function that handles buttons ability!
  // A boolean value for each button
  arrangeButtons(deleteBool, saveBool, eraseBool) {
    this.deleteDisabled = deleteBool;
    this.saveDisabled = saveBool;
    this.eraseDisabled = eraseBool;
    // Force the dom to detect the changes (for better responsiveness)
    this.detRef.detectChanges();
  }
}
