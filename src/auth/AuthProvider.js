import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState(null);

  const login = async (email, password, history) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  const signup = async (email, password, history) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  const addDisplayName = (name, uid) => {
    const docId = Math.random().toString(32).substring(2);
    db.collection('displayName').doc(docId).set({
      uid,
      name,
    });
    // .then((response) => {
    //   setDisplayName(name);
    // });
  };

  const value = {
    currentUser,
    loading,
    displayName,
    setDisplayName,
    login: login,
    signup: signup,
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      if (user) {
        addDisplayName(displayName, user.uid);
      }
    });
    return () => {
      unsubscribed();
    };
  }, [displayName, currentUser]);

  auth.onAuthStateChanged(setCurrentUser);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
