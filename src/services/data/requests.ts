import { firebaseApp } from '../firebase';

const requestsCollection = firebaseApp.firestore().collection('requests');

export async function createAccessRequest(email: string) {
  const documentRef = await requestsCollection.add({ email });

  return true;
}
