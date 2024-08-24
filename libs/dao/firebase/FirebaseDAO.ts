import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  onAuthStateChanged as _onAuthStateChanged,
  type User as _FirebaseUser,
  UserCredential,
  updateProfile,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "@/libs/auth/firebase/config";

import AuthDAO, { ClientUser } from "../AuthDAO"
import { decrypt } from "@/libs/auth/firebase/session";

// export class FirebaseUser implements ClientUser {
//   uid: string;
//   username: string | null;
//   userInfo: _FirebaseUser;

//   constructor(user: _FirebaseUser) {
//     this.uid = user.uid;
//     this.username = user.displayName;
//     this.userInfo = user;
//   }

//   async getSessionToken(): Promise<string> {
//     return await this.userInfo.getIdToken();
//   }

//   async verifyUser(): Promise<Boolean> {
//     return (await decrypt(await this.getSessionToken())).sub === this.uid;
//   }
// }
export default class FirebaseDAOimpl implements AuthDAO {
  currentUser: ClientUser | null = null;

  async loginWithCredentials(email: string, password: string) : Promise<ClientUser> {
    await signInWithEmailAndPassword(auth, email, password);
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("LOGGED IN")
          unsubscribe();
          this.currentUser = {
            uid: user.uid,
            username: user.displayName,
          }
          resolve(this.currentUser);
        }
      }, reject);
    });
  }

  async signupWithCredentials(username: string, email: string, password: string) : Promise<ClientUser> {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: username });
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("LOGGED IN")
          unsubscribe();
          this.currentUser = {
            uid: user.uid,
            username: user.displayName,
          }
          resolve(this.currentUser);
        }
      }, reject);
    });
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
