# SDY60-GE2-Pt3-PolylineMapHyb
Ένα Ionic project που υλοποιήθηκε από την Ευαγγελία Μπατόγλου, στα πλαίσια της Γενικής Εργασίας 2 (μέρος Γ, ερώτημα 3), για την ενότητα ΣΔΥ60 - "Σχεδίαση και Ανάλυση Συστημάτων Υλικο-Λογισμικού", του Τμήματος Συστήματα Κινητού και Διάχυτου Υπολογισμού (Ελληνικό Ανοικτό Πανεπιστήμιο, Ακαδημαϊκό Έτος 2017  - 2018).

Υβριδική εφαρμογή χάρτη για την αποθήκευση, ανάκτηση και διαγραφή στοιχείων polyline στα Google Maps.
Επιβλέπων Καθηγητής: Κωνσταντίνος Χωριανόπουλος (@epidrome).

Ακολουθεί η γραπτή τεκμηρίωση:

Υλοποιήθηκε η εφαρμογή PolylineMapHyb η οποία διαμορφώθηκε για Android (για πρακτικούς λόγους debugging). Χρησιμοποιήθηκαν τα εξής εργαλεία:

-   [Ionic framework] v2: Framework για την ανάπτυξη εφαρμογών σε HTML5 που στοχεύει στην κατασκευή υβριδικών κινητών εφαρμογών.

-   [Apache Cordova]: Είναι η εξέλιξη του PhoneGap και είναι framework ανάπτυξης κινητών εφαρμογών. Είναι απαραίτητo για την ανάπτυξη σε Ionic.

-   [Angular2]: Πλατφόρμα ανάπτυξης web εφαρμογών, η οποία περιλαμβανόταν στο Ionic.

-   [Typescript]: Μια «υπερ-δομή» javascript κώδικα που παρέχει τη δυνατότητα ανάπτυξης εφαρμογών σε κλάσεις και διεπαφές. Μιμείται (εώς έναν βαθμό) τη δομή της java παρ’ όλο που αποτελεί συνήθως client-side γλώσσα (μπορεί να γίνει και server-side αλλά δεν είναι επί του παρόντος). Η typescript είναι η βασική γλώσσα της angular2 επομένως και του Ionic.

-   [SASS] Preprocessor για τη γλώσσα CSS, προσφέρει μια πιο οργανωμένη δομή και σύνταξη των CSS styles. Περιλαμβανόταν στο Ionic Project.

-   [Node.js] για τα commands κατά την ανάπτυξη και την εγκατάσταση των node modules.

-   [Visual Studio Code] για την ανάπτυξη της εφαρμογής.

Επιπλέον εγκαταστάθηκαν τα εξής node modules:

-   [Cordova Plugin for GoogleMaps]

-   [Ionic Native GoogleMaps]

-   [Ionic Native Geolocation]

-   [Ionic Native Geocoder]

-   [Angularfire2] (για τη σύνδεση με το firebase)

Ακολουθούν ορισμένα από τα npm commands που χρησιμοποιήθηκαν για τη δημιουργία και την παραμετροποίηση της εφαρμογής.

`npm install -g cordova ionic`

`ionic start PolylineMapHyb blank`

`cd c:\\projects\\PolylineMapHyb`

`ionic cordova platform add android`

`ionic cordova plugin add cordova-plugin-googlemaps –-variable API\_KEY\_FOR\_ANDROID=”&lt;my\_api\_key&gt;”`

`npm install @ionic-native/google-maps`

`npm install @ionic-native/geolocation`

`ionic cordova plugin add cordova-plugin-nativegeocoder`

`npm install @ionic-native/native-geocoder`

`npm install angularfire2 firebase`

Το platform στο οποίο στηρίχθηκε η ανάπτυξη είναι το Android.

Η κυρίως υλοποίηση περιλαμβάνεται στο home component, και συγκεκριμένα στο αρχείο home.ts. (PolylineMapHyb/src/pages/home). Σε αυτόν τον φάκελο περιλαμβάνεται και το template (home.html) καθώς και τα styles (home.scss). Επιπλέον στο αρχείο app module (PolylineMapHyb/ src/app/app.module.ts) όπου δηλώθηκαν και χρησιμοποιούνται τα επιπλέον modules που εγκαταστάθηκαν για την ανάπτυξη της εφαρμογής ως providers ή imports. Στο ίδιο αρχείο γίνεται και το configuration του firebase. Ακολουθούν ορισμένα στιγμιότυπα οθόνης από την εφαρμογή και το περιβάλλον ανάπτυξης:

![Γ.3.1](https://github.com/evabat/SDY60-GE2-Pt3-PolylineMapHyb/blob/master/Screenshots/%CE%93.3.1.jpg?raw=true)

*Εικόνα Γ.3.1: Αρχική οθόνη της εφαρμογής*


![Γ.3.2](https://github.com/evabat/SDY60-GE2-Pt3-PolylineMapHyb/blob/master/Screenshots/%CE%93.3.2.jpg?raw=true)

*Εικόνα Γ.3.2: Σχεδιασμός διαδρομής στον χάρτη*


![Γ.3.3](https://github.com/evabat/SDY60-GE2-Pt3-PolylineMapHyb/blob/master/Screenshots/%CE%93.3.3.jpg?raw=true)

*Εικόνα Γ.3.3: Επιτυχής αποθήκευση διαδρομής*


![Γ.3.4](https://github.com/evabat/SDY60-GE2-Pt3-PolylineMapHyb/blob/master/Screenshots/%CE%93.3.4..jpg?raw=true)

*Εικόνα Γ.3.4: Επιτυχής εκκαθάριση των σημείων του χάρτη*


![Γ.3.5](https://github.com/evabat/SDY60-GE2-Pt3-PolylineMapHyb/blob/master/Screenshots/%CE%93.3.5.jpg?raw=true)

*Εικόνα Γ.3.5: Μενού επιλογής αποθηκευμένων διαδρομών*


![Γ.3.6](https://github.com/evabat/SDY60-GE2-Pt3-PolylineMapHyb/blob/master/Screenshots/%CE%93.3.6.jpg?raw=true)

*Εικόνα Γ.3.6: Προβολή αποθηκευμένης διαδρομής*


![Γ.3.7](https://github.com/evabat/SDY60-GE2-Pt3-PolylineMapHyb/blob/master/Screenshots/%CE%93.3.7.jpg?raw=true)

*Εικόνα Γ.3.7: Διαγραφή αποθηκευμένης διαδρομής*


![Γ.3.8](https://github.com/evabat/SDY60-GE2-Pt3-PolylineMapHyb/blob/master/Screenshots/%CE%93.3.9.jpg?raw=true)

*Εικόνα Γ.3.8: Εντολές για build run και deploy στο node.js command prompt*


![Γ.3.9](https://github.com/evabat/SDY60-GE2-Pt3-PolylineMapHyb/blob/master/Screenshots/%CE%93.3.10.jpg?raw=true)

*Εικόνα Γ.3.9: Στιγμιότυπο του Android Build*


![Γ.3.10](https://github.com/evabat/SDY60-GE2-Pt3-PolylineMapHyb/blob/master/Screenshots/%CE%93.3.11.jpg?raw=true)
*Εικόνα Γ.3.10: Στιγμιότυπο επιτυχούς run*


![Γ.3.11](https://github.com/evabat/SDY60-GE2-Pt3-PolylineMapHyb/blob/master/Screenshots/%CE%93.3.12.jpg?raw=true)

*Εικόνα Γ.3.11: Επιτυχές build ενός release version*

Για να τρέξουμε την εφαρμογή, κάνουμε clone το repository τοπικά, και ***πρωτίστως*** χρησιμοποιούμε τα ανάλογα API keys για την ομαλή λειτουργία της εφαρμογής. Στο αρχείο app.module.ts προσθέτουμε τις αντίστοιχες τιμές του firebase project μας στο object “firebaseConfig”. Όσον αφορά το api key για τα google maps, το θέτουμε στα εξής σημεία:

1.  **android.json**, path: platforms/android/android.json (σε 2 σημεία, γραμμή 108 και γραμμή 170).
 ![](https://github.com/evabat/SDY60-GE2-Pt3-PolylineMapHyb/blob/master/Screenshots/Untitled%201.jpg?raw=true)

2.  **android.json**, path: plugin/android.json (γραμμή 29).
 ![](https://github.com/evabat/SDY60-GE2-Pt3-PolylineMapHyb/blob/master/Screenshots/Untitled%202.jpg?raw=true)

3.  **fetch.json**, path: plugin/fetch.json (γραμμή 57).
 ![](https://github.com/evabat/SDY60-GE2-Pt3-PolylineMapHyb/blob/master/Screenshots/Untitled%203.jpg?raw=true)

Έπειτα, αφού ανοίξουμε το directory του project σε command prompt (εφόσον είναι διαθέσιμο το node.js) πληκτρολογούμε:

"npm install" για να εγκατασταθούν τα dependencies. Έπειτα (αν επιθυμούμε να το τρέξουμε τοπικά σε συσκευή) συνδέουμε μια android συσκευή που έχει enabled το USB debugging mode και τρέχουμε τα προαναφερόμενα build και run commands. Επιπλέον είναι διαθέσιμα και τα εκτελέσιμα αρχεία apk στον αντίστοιχο φάκελο στο εξής path: platforms/android/build/outputs/apk

  [Ionic framework]: https://ionicframework.com/
  [Apache Cordova]: https://cordova.apache.org/
  [Angular2]: https://angular.io/
  [Typescript]: https://www.typescriptlang.org/
  [SASS]: http://sass-lang.com/
  [Node.js]: https://nodejs.org/en/
  [Visual Studio Code]: https://code.visualstudio.com/
  [Cordova Plugin for GoogleMaps]: https://github.com/mapsplugin/cordova-plugin-googlemaps
  [Ionic Native GoogleMaps]: https://ionicframework.com/docs/native/google-maps/
  [Ionic Native Geolocation]: https://ionicframework.com/docs/native/geolocation/
  [Ionic Native Geocoder]: https://ionicframework.com/docs/native/native-geocoder/
  [Angularfire2]: https://github.com/angular/angularfire2

