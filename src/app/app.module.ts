import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GoogleMaps } from '@ionic-native/google-maps';

// AngularFire2 Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// AngularFire2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyD_K1uk9h_tEXg9s2U3R96l9gJ8j2eb5fw",
  authDomain: "polylinemaphyb-1512604430698.firebaseapp.com",
  databaseURL: "https://polylinemaphyb-1512604430698.firebaseio.com",
  projectId: "polylinemaphyb-1512604430698",
  storageBucket: "polylinemaphyb-1512604430698.appspot.com",
  messagingSenderId: "453969756088"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    NativeGeocoder,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
