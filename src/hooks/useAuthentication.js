import { db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const checkIfIsCancelled = () => {
    if (cancelled) return;
  };

  const auth = getAuth();

  const createUser = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError("");

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(user, { displayName: data.displayName });

      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.message);

      let systemErrorMessage;

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres";
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "Email já cadastrado";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
      }

      setError(systemErrorMessage);
    }
    setLoading(false);
  };

  const logOut = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);
    } catch (error) {
  
      let systemErrorMessage;
      console.log(error);
      if (error.message.includes("invalid-credential")) {
        systemErrorMessage = "E-mail ou senha incorreta";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde";
      }

      setError(systemErrorMessage);
    }
    setLoading(false);
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { auth, createUser, error, loading, logOut, login };
};
