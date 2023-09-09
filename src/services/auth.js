import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Loading, Notify } from "quasar";
import { auth } from "../firebase/index";

/**
 * Registers User
 * @param data
 * @returns {Promise<UserCredential>}
 */
export const register = async (data) => {
  Loading.show();
  return await createUserWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    Notify.create({
      type: "positive",
      message: "Account successfuly created!",
    });
    Loading.hide();
    return userCredential;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Loading.hide();
    Notify.create({
      type: "negative",
      message: error.message,
    });
  });
};

/**
 * Authenticates the user
 * @param data
 * @returns {Promise<UserCredential>}
 */
export const login = async (data) => {
  Loading.show();
  return await signInWithEmailAndPassword(auth, data.email, data.password)
  .then((userCredential) => {
    Loading.hide();
    return userCredential;
  })
  .catch((err) => {
    Loading.hide();
    Notify.create({
      type: "negative",
      message: err.message,
    });
  });
};

/**
 * Log out
 * @returns {Promise<void>}
 */
export const logout = async () => {
  Loading.show();
  await signOut(auth)
  .then(() => {
    Notify.create({
      type: "positive",
      message: "User successfuly signed out.",
    });
    Loading.hide();
    setTimeout(() => {
      window.location.reload();
    }, 800);
  })
  .catch((err) => {
    Loading.hide();
    Notify.create({
      type: "negative",
      message: err.message,
    });
  });
};
