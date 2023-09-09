import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/index.js";
import { Loading, Notify } from "quasar";

/**
 * Adds note
 * @param note
 * @param userId
 * @returns {Promise<void>}
 */
export const addNote = async ({ note, userId }) => {
  Loading.show();
  try {
    await addDoc(collection(db, userId), { ...note, created_at: Date.now() });
    Notify.create({
      type: "positive",
      message: "Added",
    });
    Loading.hide();
  } catch (e) {
    Notify.create({
      type: "negative",
      message: e.message,
    });
    Loading.hide();
  }
};

/**
 * getNotes
 * @param userId
 * @returns {Promise<(*&{id: *})[]>}
 */
export const getNotes = async (userId) => {
  const querySnapshot = await getDocs(
    query(collection(db, userId), orderBy("created_at", "desc"))
  );
  return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

/**
 * get note
 * @param note
 * @param userId
 * @returns {Promise<DocumentReference<DocumentData, DocumentData>>}
 */
export const getNote = async (note, userId) => {
  const itemRef = doc(db, userId, note.id);
  return itemRef;
};


/**
 * update Note
 * @param userId
 * @returns {Promise<(*&{id: *})[]>}
 */
export const updateNote = async ({ note, userId }) => {
  try {
    const itemRef = doc(db, userId, note.id);
    await updateDoc(itemRef, { ...note, updated_at: Date.now() });
    Notify.create({
      type: "positive",
      message: "Updated",
    });
    Loading.hide();
  } catch (e) {
    Notify.create({
      type: "negative",
      message: e.message,
    });
    Loading.hide();
  }
};

/**
 * Delete Note
 * @param note
 * @param userId
 * @returns {Promise<void>}
 */
export const deleteNote = async ({ note, userId }) => {
  try {
    const itemRef = doc(db, userId, note.id);
    await deleteDoc(itemRef);
    Notify.create({
      type: "positive",
      message: "Deleted",
    });
    Loading.hide();
  } catch (e) {
    Notify.create({
      type: "negative",
      message: e.message,
    });
    Loading.hide();
  }
};
