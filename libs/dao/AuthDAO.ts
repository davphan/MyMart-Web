// export abstract class User {
//   uid: string | null = null;
//   username: string | null = null;

//   constructor({ uid, username } : { uid?: string | null, username?: string | null }) {
//     this.uid = uid ? uid : null;
//     this.username = username ? username : null;
//   }

//   abstract getSessionToken() : Promise<string>;
//   abstract verifyUser() : Promise<Boolean>;
// }

export interface ClientUser {
  uid: string | null,
  username: string | null,
}

export default abstract class AuthDAO {
  currentUser: ClientUser | null = null;
  abstract loginWithCredentials(email: string, password: string) : Promise<ClientUser>;
  abstract signupWithCredentials(username: string, email: string, password: string) : Promise<ClientUser>;
  abstract logOut() : Promise<void>;
}