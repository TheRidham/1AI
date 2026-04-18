import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider, githubProvider } from "./firebase";

export async function signUp(email: string, password: string, name: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  await setDoc(doc(db, "users", cred.user.uid), {
    uid: cred.user.uid,
    name,
    email,
    createdAt: serverTimestamp(),
    role: "user",
  });
  return cred.user;
}

export async function signIn(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
}

export async function signInWithGoogle() {
  const cred = await signInWithPopup(auth, googleProvider);
  await setDoc(
    doc(db, "users", cred.user.uid),
    {
      uid: cred.user.uid,
      name: cred.user.displayName,
      email: cred.user.email,
      role: "user",
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
  return cred.user;
}

export async function signInWithGithub() {
  const cred = await signInWithPopup(auth, githubProvider);
  await setDoc(
    doc(db, "users", cred.user.uid),
    {
      uid: cred.user.uid,
      name: cred.user.displayName,
      email: cred.user.email,
      role: "user",
      createdAt: serverTimestamp(),
    },
    { merge: true }
  );
  return cred.user;
}

export async function logOut() {
  await signOut(auth);
}