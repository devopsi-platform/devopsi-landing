import * as firebase from 'firebase/app';
import 'firebase/firestore';

export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCZwaV6xDaW_coeVsGFefiUcE_Yk2XC71g',
  authDomain: 'devopsi.firebaseapp.com',
  databaseURL: 'https://devopsi.firebaseio.com',
  projectId: 'devopsi',
  storageBucket: 'devopsi.appspot.com',
  messagingSenderId: '237691260185',
  appId: '1:237691260185:web:1d435a4dd73708df804988',
  measurementId: 'G-L89B76L8JL',
});
