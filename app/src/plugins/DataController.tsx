import { firestore } from "firebase";
import firebase from "./firebase";
import { User } from "./Schemas";
import { chunk } from "./Utils";

class DataController {
  private _db: firebase.firestore.Firestore;

  constructor() {
    this._db = firebase.firestore();
  }

  // NOTE: --- POST ---

  postUser = async (user: firebase.User): Promise<void> => {
    const userRef = this._db.collection("users").doc(user.uid);
    const dbUser: User = {
      id: user.uid,
      email: user.email,
      photo_url: user.photoURL,
      name: user.displayName,
      roles: [],
      created_at: firestore.Timestamp.now(),
      updated_at: firestore.Timestamp.now(),
    };
    await userRef.set(dbUser);
    console.log("postUser:", dbUser);
  };

  postUserIfNeed = async (user: firebase.User): Promise<User> => {
    // ユーザが登録済みでなければ登録
    // const userRef = this._db.collection("users").doc(user.uid);
    const dbUser = await this.getUserById(user.uid);
    if (dbUser) {
      console.log("user exists", dbUser);
      return dbUser;
    } else {
      await this.postUser(user);
      return this.getUserById(user.uid);
    }
  };

  // NOTE: --- Data Transform ---

  docToData = (doc: any) => {
    return { id: doc.id, ...doc.data() };
  };

  refToDataList = async (
    ref: firebase.firestore.CollectionReference | firebase.firestore.Query
  ): Promise<any[]> => {
    return (await ref.get()).docs.map((doc) => {
      return this.docToData(doc);
    });
  };

  // NOTE: -- get all docs

  getDocsDataAll = async <T extends {}>(
    collectionPath: string
  ): Promise<T[]> => {
    return this.refToDataList(this._db.collection(collectionPath));
  };

  getUsersAll = async (): Promise<User[]> => {
    return this.getDocsDataAll<User>("users");
  };

  // NOTE: -- get single doc by id ---

  getDocDataById = async <T extends {}>(
    collectionPath: string,
    docId: string
  ): Promise<T> => {
    const _ref = await this._db.collection(collectionPath).doc(docId).get();
    return _ref.exists ? (this.docToData(_ref) as T) : null;
  };

  getUserById = async (docId: string): Promise<User> => {
    return this.getDocDataById<User>("users", docId);
  };
}

const dataController = new DataController();
export default dataController;
