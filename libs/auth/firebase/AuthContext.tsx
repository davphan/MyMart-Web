// import { useState, useEffect, createContext, useContext } from 'react';
// import { onAuthStateChanged, User as FirebaseUser} from 'firebase/auth';
// import { auth } from './config';
// import { User } from '@/libs/dao/AuthDAO';

// export const AuthContext = createContext({});
// export const useAuthContext = () => useContext(AuthContext);

// export function AuthContextProvider({ children } : { children : React.ReactNode}) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       if (firebaseUser) {
//           setUser(new User(
//             firebaseUser.uid,
//             firebaseUser.displayName,
//             firebaseUser.email
//           ));
//       } else {
//           setUser(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user }}>
//       {loading ? <div>Loading...</div> : children}
//     </AuthContext.Provider>
//   );
// };