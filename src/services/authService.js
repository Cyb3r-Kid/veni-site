import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, hasFirebaseConfig } from "../firebase/firebaseApp";

export const ADMIN_EMAIL = "prasanna2009126@gmail.com";

export const isAdmin = (user) => {
  if (!user?.email) return false;
  return user.email.toLowerCase() === ADMIN_EMAIL;
};

function assertAuth() {
  if (!hasFirebaseConfig || !auth) {
    throw new Error("Firebase Authentication is not configured. Add REACT_APP_FIREBASE_* variables and restart the app.");
  }
  return auth;
}

export async function loginWithEmailPassword(email, password) {
  const authInstance = assertAuth();
  const credentials = await signInWithEmailAndPassword(authInstance, email, password);

  if (!isAdmin(credentials.user)) {
    await signOut(authInstance);
    throw new Error("This account is not authorized to access the admin dashboard.");
  }

  return credentials.user;
}

export async function logoutUser() {
  const authInstance = assertAuth();
  return signOut(authInstance);
}

export function subscribeToAuth(listener) {
  const authInstance = assertAuth();
  return onAuthStateChanged(authInstance, listener);
}
