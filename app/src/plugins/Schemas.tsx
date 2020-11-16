import firebase from "./firebase";

export type UserRole = "admin" | "write" | "read";

export type FsDate = firebase.firestore.Timestamp;

export interface User {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  photo_url: string;
  created_at: FsDate;
  updated_at: FsDate;
}
