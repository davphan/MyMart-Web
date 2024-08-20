// please note that firebase auth adds about 30kb to your bundle size on Web
import { initializeApp } from 'firebase/app'
import {
  initializeAuth,
  browserPopupRedirectResolver,
  browserLocalPersistence,
  signInAnonymously as signInAnonymouslyFirebase,
  onAuthStateChanged as onAuthStateChangedFirebase,
} from 'firebase/auth'
import { Firebase } from './types'

let auth: ReturnType<typeof initializeAuth>

if (typeof window !== 'undefined') {
  const firebaseApp = initializeApp({
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  })

  auth = initializeAuth(firebaseApp, {
    persistence: browserLocalPersistence,
  })
}

// const createUserWithEmailAndPassword: Firebase[]

const getIsSignedIn: Firebase['getIsSignedIn'] = () =>
  Boolean(auth?.currentUser)

// const signIn

const signOut: Firebase['signOut'] = () => auth.signOut()

const signInAnonymously: Firebase['signInAnonymously'] = async () => {
  return (await signInAnonymouslyFirebase(auth)).user
}

const onAuthStateChanged: Firebase['onAuthStateChanged'] = (callback) => {
  return onAuthStateChangedFirebase(auth, callback)
}

const getCurrentUser: Firebase['getCurrentUser'] = () => auth.currentUser

export {
  getIsSignedIn,
  signInAnonymously,
  signOut,
  onAuthStateChanged,
  getCurrentUser,
}
