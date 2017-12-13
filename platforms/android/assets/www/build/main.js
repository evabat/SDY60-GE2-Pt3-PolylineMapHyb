webpackJsonp([0],{

/***/ 144:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 144;

/***/ }),

/***/ 186:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 186;

/***/ }),

/***/ 232:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__ = __webpack_require__(234);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_geocoder__ = __webpack_require__(231);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = (function () {
    function HomePage(
        // Constructor variables
        navCtrl, geolocation, nativeGeocoder, db, toastCtrl, detRef) {
        this.navCtrl = navCtrl;
        this.geolocation = geolocation;
        this.nativeGeocoder = nativeGeocoder;
        this.db = db;
        this.toastCtrl = toastCtrl;
        this.detRef = detRef;
        this.points = [];
        this.deleteDisabled = true;
        this.saveDisabled = true;
        this.eraseDisabled = true;
        // Variables that concern the database
        this.pathsRef = db.list('/paths');
        this.paths = this.pathsRef.snapshotChanges().map(function (changes) {
            return changes.map(function (c) { return (__assign({ key: c.payload.key }, c.payload.val())); });
        });
    }
    // Load the map and the saved paths to the selectable menu
    HomePage.prototype.ionViewDidLoad = function () {
        this.loadMap();
        this.populateSelectable();
    };
    // Get the location of the user!
    HomePage.prototype.getUserLocation = function () {
        this.getLocation().then(function (res) {
            return new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](res.coords.latitude, res.coords.longitude);
        }).catch(function (err) {
            console.log(err);
        });
    };
    // The whole thing that initiates the map
    HomePage.prototype.loadMap = function () {
        var _this = this;
        var starterCoords;
        // Define the starting coords
        if (this.getUserLocation()) {
            starterCoords = this.getUserLocation();
        }
        else {
            starterCoords = new __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["c" /* LatLng */](35.363933, 24.482068);
        }
        // Set the map options
        var mapOptions = {
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
        this.map = __WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["a" /* GoogleMaps */].create('map_canvas', mapOptions);
        // Wait the MAP_READY before using any methods.
        this.map.one(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MAP_READY).then(function () {
            // Event for clicking the map
            _this.map.on(__WEBPACK_IMPORTED_MODULE_2__ionic_native_google_maps__["b" /* GoogleMapsEvent */].MAP_CLICK).subscribe(function (data) {
                // Current click point
                var point = JSON.parse(data);
                // Store the point in global temporary memory
                _this.points.push(point);
                // Show the marker
                _this.addMarker(point);
                // Add the polyline to the map
                _this.map.addPolyline({
                    points: _this.points,
                    'color': '#16dddd',
                    'width': 3,
                });
                // Arrange the appearance of control buttons accordingly...
                _this.arrangeButtons(((_this.selectedPath) && (_this.selectedPath == "000")) ? true : false, false, false);
            });
        });
    };
    // Fill the top dropdown menu with data from the database
    HomePage.prototype.populateSelectable = function () {
        var _this = this;
        this.paths.subscribe(function (res) {
            _this.pathsArr = res;
        });
    };
    // The function that runs when the "save" button is clicked
    HomePage.prototype.savePath = function () {
        var _this = this;
        if (this.points) {
            // Get information about the first location in order to have a name for the entry
            this.nativeGeocoder.reverseGeocode(this.points[0].lat, this.points[0].lng)
                .then(function (result) {
                // Save the entry with a name and the points array
                _this.addPath(result.thoroughfare + ", " + result.locality, _this.points);
                // Clear the map after the save
                _this.clearMap();
            })
                .catch(function (err) {
                console.log("error: ", err.message);
            });
            // If no data, inform the user accordinglt
            // In the highly unlikely case where the button would be enabled with an empty map :)
        }
        else {
            alert("Δεν υπάρχουν δεδομένα προς αποθήκευση");
        }
    };
    // Show the selected path (from the dropdown) to the map
    // It takes as a parameter the KEY of the entry
    HomePage.prototype.changeSelectedPath = function (key) {
        var _this = this;
        // Declare an empty arr
        var coordsArr = [];
        // If the selection is NOT the default one
        if (key !== "000") {
            // Clear the map!
            this.map.clear();
            // Clear the points arr
            this.points = [];
            // Get the data (by using the key and the db reference)
            this.db.object('paths/' + key).valueChanges().subscribe(function (data) {
                // If there exist data...
                if (data) {
                    // Get the coords
                    coordsArr = data["coords"];
                    // Iterate the coords array on order to add all the points
                    // as markers to the map
                    for (var i = 0; i < coordsArr.length; i++) {
                        _this.addMarker(coordsArr[i]);
                    }
                    // Draw also the polyline
                    _this.map.addPolyline({
                        points: coordsArr,
                        'color': '#16dddd',
                        'width': 3,
                    });
                    // Make the map focus on the middle point of the array
                    _this.moveCamera(coordsArr[Math.ceil(coordsArr.length / 2)]);
                    // Assign our current choice to the global points array (temporary)
                    _this.points = coordsArr;
                }
            });
            // Handle the appearance of the buttons!
            this.arrangeButtons(false, true, false);
        }
        else {
            // If the selection is the default one (no selection) just clear the map
            this.clearMap();
        }
    };
    // Function that is called when we want to add a marker
    HomePage.prototype.addMarker = function (coords) {
        // Add the marker with some properties
        this.map.addMarker({
            icon: 'cyan',
            animation: 'DROP',
            position: {
                lat: coords.lat,
                lng: coords.lng
            }
        });
    };
    // Function that clears the map
    HomePage.prototype.erasePath = function () {
        this.clearMap();
        // Inform the user that tha map is CLEAR
        this.presentToast("Πραγματοποιήθηκε εκκαθάριση των σημείων του χάρτη!");
    };
    // Function that actually saves a given path object to the database
    HomePage.prototype.addPath = function (address, coords) {
        this.pathsRef.push({ address: address, coords: coords });
        this.presentToast("Η διαδρομή αποθηκεύτηκε επιτυχώς!");
    };
    // Function that is called when the user deletes a path
    HomePage.prototype.deletePath = function () {
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
    };
    // The REAL function that clears the map
    HomePage.prototype.clearMap = function () {
        // WIPE IT ALL
        // map
        this.map.clear();
        // points array
        this.points = [];
        // reset selection
        this.selectedPath = "000";
        // disable all control buttons
        this.arrangeButtons(true, true, true);
    };
    // Get the current position
    HomePage.prototype.getLocation = function () {
        return this.geolocation.getCurrentPosition();
    };
    // Function that executes the camera movement (focus of the map)
    HomePage.prototype.moveCamera = function (loc) {
        var options = {
            target: loc,
            zoom: 16,
            tilt: 10
        };
        this.map.moveCamera(options);
    };
    // The toast that informs the user, it appears at the top
    HomePage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top'
        });
        // For whatever reason a toast must be dismissed
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    // The frequent function that handles buttons ability!
    // A boolean value for each button
    HomePage.prototype.arrangeButtons = function (deleteBool, saveBool, eraseBool) {
        this.deleteDisabled = deleteBool;
        this.saveDisabled = saveBool;
        this.eraseDisabled = eraseBool;
        // Force the dom to detect the changes (for better responsiveness)
        this.detRef.detectChanges();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\projects\PolylineMapHyb\src\pages\home\home.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>\n            Polyline Map\n        </ion-title>\n    </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-item>\n        <ion-label>Επιλογή διαδρομής</ion-label>\n        <ion-select [(ngModel)]="selectedPath" (ionChange)="changeSelectedPath(selectedPath)">\n            <ion-option [selected]=true value="000">Χωρίς επιλογή</ion-option>\n            <ion-option *ngFor="let path of pathsArr" [value]="path.key">{{path.address}}</ion-option>\n        </ion-select>\n    </ion-item>\n    <div data-tap-disabled="true">\n        <div id="map_canvas">\n            <span class="smallPanel">\n                <button id="myLocbtn"></button>\n                </span>\n        </div>\n    </div>\n\n    <div class="btns-group">\n\n        <button id="delete-btn" ion-button color="danger" (click)="deletePath()" [attr.disabled]="deleteDisabled ? \'\' : null">\n            <i class="icon ion-android-delete"></i>\n            </button>\n\n        <button id="save-btn" ion-button color="secondary" (click)="savePath()" [attr.disabled]="saveDisabled ? \'\' : null">\n            <span class=" btn-lbl ">ΑΠΟΘΗΚΕΥΣΗ</span>  \n            <i class="icon ion-android-checkbox-outline "></i>\n        </button>\n\n        <button id="erase-btn" ion-button (click)="erasePath()" [attr.disabled]="eraseDisabled ? \'\' : null">\n            <i class="icon ion-close-circled"></i>\n        </button>\n    </div>\n\n\n</ion-content>'/*ion-inline-end:"C:\projects\PolylineMapHyb\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 280:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(301);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_geocoder__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_component__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_home_home__ = __webpack_require__(232);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_maps__ = __webpack_require__(233);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__ = __webpack_require__(234);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










// AngularFire2 Modules


// AngularFire2 Settings
var firebaseConfig = {
    apiKey: "AIzaSyD_K1uk9h_tEXg9s2U3R96l9gJ8j2eb5fw",
    authDomain: "polylinemaphyb-1512604430698.firebaseapp.com",
    databaseURL: "https://polylinemaphyb-1512604430698.firebaseio.com",
    projectId: "polylinemaphyb-1512604430698",
    storageBucket: "polylinemaphyb-1512604430698.appspot.com",
    messagingSenderId: "453969756088"
};
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_10_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_7__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_8__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(229);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(226);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(232);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\projects\PolylineMapHyb\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>'/*ion-inline-end:"C:\projects\PolylineMapHyb\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[280]);
//# sourceMappingURL=main.js.map