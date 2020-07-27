import * as firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyB3cvKVACIAJS5y9fAnLXGuGCVXUkhUZmE',
    databaseURL: 'https://teul-marketplace.firebaseio.com',
    projectId: 'teul-marketplace',
    storageBucket: 'teul-marketplace.appspot.com',
    appId: '1:766805297371:web:bdeca37abfb85a9b1de4fe',
  };

firebase.initializeApp(config);

export const storage = firebase.storage();
export const database = firebase.database();