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

![Γ.3.1](https://photos-2.dropbox.com/t/2/AABXE7h_niDGM0OCOixh37PK3NimABEN-sRfv0-wURg64A/12/1147451/jpeg/32x32/1/_/1/2/%CE%93.3.1.jpg/EOiVgAEYrcv7SiACKAI/CJO8xfC2qgtJSXy-psadfdCrJ3EcQRqS1uOvI84aPYE?size=1600x1200&size_mode=3)

*Εικόνα Γ.3.1: Αρχική οθόνη της εφαρμογής*


![Γ.3.2](https://photos-3.dropbox.com/t/2/AABJxqQFtTotNtPCOGwbo3HJHmTNrHz71N9OnVXIuQWHzQ/12/1147451/jpeg/32x32/1/_/1/2/%CE%93.3.2.jpg/EOiVgAEYrsv7SiACKAI/Hjl1Pj1Mgqzy2drgZCzy5YVLZs-QFCFKXyXZyPd7ZRg?size=1600x1200&size_mode=3)

*Εικόνα Γ.3.2: Σχεδιασμός διαδρομής στον χάρτη*


![Γ.3.3](https://photos-3.dropbox.com/t/2/AAAdH3pkJj7jab9HeOySbTqB-y8ANCCvZln_6-ki2AZo5g/12/1147451/jpeg/32x32/1/_/1/2/%CE%93.3.3.jpg/EOiVgAEYr8v7SiACKAI/0gf3P3EZ1oVdqof__iHfCriuM-WltmJvKbVax2ZzuqM?size=1600x1200&size_mode=3)
*Εικόνα Γ.3.3: Επιτυχής αποθήκευση διαδρομής*


![Γ.3.4](https://photos-3.dropbox.com/t/2/AAAEb00bXjpk3yhbC2VDmQA2SqQ8CSib_kcn0uiDRMXHzQ/12/1147451/jpeg/32x32/1/_/1/2/%CE%93.3.4..jpg/EOiVgAEYscv7SiACKAI/rEInPs87yMUavDZngGGVuYrPWtqMW2KZEVE5Tsmc9B0?size=1600x1200&size_mode=3)
*Εικόνα Γ.3.4: Επιτυχής εκκαθάριση των σημείων του χάρτη*


![Γ.3.5](https://photos-6.dropbox.com/t/2/AAB0M59a7li7Oc5mSS5tk_0FSIthQQNgBIqhqZbnOEs6Aw/12/1147451/jpeg/32x32/1/_/1/2/%CE%93.3.5.jpg/EOiVgAEYscv7SiACKAI/KrVD1F_Q8XyzAmyLlKjHr33sTilR90CdZEX6nQKsM8Y?size=1600x1200&size_mode=3)

*Εικόνα Γ.3.5: Μενού επιλογής αποθηκευμένων διαδρομών 


![Γ.3.6](https://photos-6.dropbox.com/t/2/AADOmCiQ8BR3S271-Yv5kigk62Ru6ImORQC1lQHGMcqOGQ/12/1147451/jpeg/32x32/1/_/1/2/%CE%93.3.6.jpg/EOiVgAEYssv7SiACKAI/6CHnpUId9thMBVLTCref7zz4uy5tCkEe73yDHt7ZHW8?size=1600x1200&size_mode=3)

*Εικόνα Γ.3.6: Προβολή αποθηκευμένης διαδρομής*


![Γ.3.7](https://photos-5.dropbox.com/t/2/AAALUnpkf-NbVOdr4YwbE-hTnD1B6EiS5-OFRZMJuSu-Xw/12/1147451/jpeg/32x32/1/_/1/2/%CE%93.3.7.jpg/EOiVgAEYs8v7SiACKAI/pMkEPtto0OVhuQOvsbqTrCvJmjvorykdKnrqTZvyLEY?size=1600x1200&size_mode=3)

*Εικόνα Γ.3.7: Διαγραφή αποθηκευμένης διαδρομής*


![Γ.3.8](https://photos-5.dropbox.com/t/2/AADlbHUTcAEsBojVZEemGcxh8NAOvUdc-f2C_G6NDqq0rg/12/1147451/jpeg/32x32/1/_/1/2/%CE%93.3.9.jpg/EOiVgAEYt8v7SiACKAI/Hg2Ge_saRntpl-TFK3JDk0zk50sPeoUyqwtvReB4av4?size=1600x1200&size_mode=3)

*Εικόνα Γ.3.8: Εντολές για build run και deploy στο node.js command prompt*


![Γ.3.9](https://photos-5.dropbox.com/t/2/AACclU01lbvtOkdj9L84UdwGby8Bmh5Uep_qXpLYgMxsnw/12/1147451/jpeg/32x32/1/_/1/2/%CE%93.3.10.jpg/EOiVgAEYt8v7SiACKAI/6giUu3SHVf412mtOG_anOEqMyjheeZu4fppkUUFk6Go?size=1600x1200&size_mode=3)

*Εικόνα Γ.3.9: Στιγμιότυπο του Android Build*


![Γ.3.10](https://photos-5.dropbox.com/t/2/AACLHcRKR8rPvJJqCu3QRq9Ktkcu058b1gr_W2fx6bajcQ/12/1147451/jpeg/32x32/1/_/1/2/%CE%93.3.11.jpg/EOiVgAEYuMv7SiACKAI/0lI1Ii9Y0rMHL51D9PFo_w1fI2hVhxybNr0n_oTQLgs?size=1600x1200&size_mode=3)

*Εικόνα Γ.3.10: Στιγμιότυπο επιτυχούς run*

![Γ.3.11](https://photos-6.dropbox.com/t/2/AAAhz0wIXxYvIWmXwVqXONp2KrozJu0sDlAYVRzkhnfydQ/12/1147451/jpeg/32x32/1/_/1/2/%CE%93.3.12.jpg/EOiVgAEYucv7SiACKAI/7AZHDkmf2mRILA2TkPrUJ3BhqaoegGWXnMWvw6ku0ew?size=1600x1200&size_mode=3)

*Εικόνα Γ.3.11: Επιτυχές build ενός release version*

Για να τρέξουμε την εφαρμογή, κάνουμε clone το repository τοπικά, και ***πρωτίστως*** χρησιμοποιούμε τα ανάλογα API keys για την ομαλή λειτουργία της εφαρμογής. Στο αρχείο app.module.ts προσθέτουμε τις αντίστοιχες τιμές του firebase project μας στο object “firebaseConfig”. Όσον αφορά το api key για τα google maps, το θέτουμε στα εξής σημεία:

1.  **android.json**, path: platforms/android/android.json (σε 2 σημεία, γραμμή 108 και γραμμή 170).
 ![](https://photos-6.dropbox.com/t/2/AABsOw8LgUBcABYTRJJbuPvavokVY8df6O55-hMoWyRyIQ/12/1147451/jpeg/32x32/1/_/1/2/Untitled%201.jpg/EOiVgAEYusv7SiACKAI/vxLJIyEmH3vrRG-5_EZ68s18H-vLm0wRen03hHP7-6Y?size=1600x1200&size_mode=3)

2.  **android.json**, path: plugin/android.json (γραμμή 29).
 ![](https://photos-2.dropbox.com/t/2/AABx28yWfpPf2PMfDDOGQlm912AZ0NdQhoarVlCoQgQiCA/12/1147451/jpeg/32x32/1/_/1/2/Untitled%202.jpg/EOiVgAEYu8v7SiACKAI/vDB4ctjsjGOZ-Ez8-I0Wm_UYKkkdMTbB3ksw9j4ZW-o?size=1600x1200&size_mode=3)

3.  **fetch.json**, path: plugin/fetch.json (γραμμή 57).
 ![](https://photos-2.dropbox.com/t/2/AAA-5chovHMPAW2FzxQT9O1csQJbbk9Cr1WOkJREJiKjdw/12/1147451/jpeg/32x32/1/_/1/2/Untitled%203.jpg/EOiVgAEYvMv7SiACKAI/dh3My5w7MFhc0risJIQtfwdKSTiaYY-XiQY4kUAn46o?size=1600x1200&size_mode=3)

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

