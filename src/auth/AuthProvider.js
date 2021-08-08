import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState(null);
  const [emailText, setEmailText] = useState('');

  const login = async (email, password, history) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  const signup = async (email, password, name, history) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      const docId = Math.random().toString(32).substring(2);
      db.collection('displayName').doc(docId).set({
        uid: user.uid,
        name,
      });
      history.push('/');
    } catch (error) {
      alert(error);
    }
  };

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }
  function updateEmail(email) {
    debugger;
    return currentUser.updateEmail(email);
  }

  const addDisplayName = (name, uid) => {
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
    updatePassword,
    updateEmail,
    emailText,
    setEmailText,
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
