import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged as _onAuthStateChanged,
  type User as _FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  updateProfile
} from "firebase/auth";
import { auth } from "@/libs/auth/firebase/config";

import AuthDAO, { User } from "../AuthDAO"

export class FirebaseUser implements User {
  uid: string;
  username: string | null;
  userInfo: _FirebaseUser;

  constructor(user: _FirebaseUser) {
    this.uid = user.uid;
    this.username = user.displayName;
    this.userInfo = user;
  }

  async getSessionToken(): Promise<string> {
    return await this.userInfo.getIdToken();
  }
}

export default class FirebaseDAOimpl implements AuthDAO {
  async loginWithCredentials(email: string, password: string) : Promise<User> {
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    return new FirebaseUser(userCredential.user);
  }

  async signupWithCredentials(username: string, email: string, password: string) : Promise<User> {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: username });
    return new FirebaseUser(userCredential.user);
  }

  async logOut() : Promise<void> {
    await auth.signOut();
  }
}

// export function onAuthStateChanged(callback: (authUser: _FirebaseUser | null) => void) {
//   return _onAuthStateChanged(auth, callback);
// }

// export async function signInWithGoogle() {
//   const provider = new GoogleAuthProvider();

//   try {
//     const result = await signInWithPopup(auth, provider);

//     if (!result || !result.user) {
//       throw new Error('Google sign in failed');
//     }
//     return result.user.uid;
//   } catch (error) {
//     console.error('Error signing in with Google', error);
//   }
// }

// export async function signOutWithGoogle() {
//   try {
//     await auth.signOut();
//   } catch (error) {
//     console.error('Error signing out with Google', error);
//   }
// }
