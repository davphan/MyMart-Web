export abstract class User {
  uid: string | null = null;
  username: string | null = null;

  constructor({ uid, username } : { uid?: string | null, username?: string | null }) {
    this.uid = uid ? uid : null;
    this.username = username ? username : null;
  }

  abstract getSessionToken() : Promise<string>;
}

export default abstract class AuthDAO {
  abstract loginWithCredentials(email: string, password: string) : Promise<User>;
  abstract signupWithCredentials(username: string, email: string, password: string) : Promise<User>;
  abstract logOut() : Promise<void>;
}