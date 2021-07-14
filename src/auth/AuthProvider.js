import React, { useEffect, useState } from "react";
import { auth } from "../firebase";

// contextの作成
export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ユーザーをログインさせる関数
  const login = async (email, password, history) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  // 新しいユーザーを作成しログインさせる関数
  const signup = async (email, password, history) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  };

  const value = {
    currentUser,
    loading,
    login: login,
    signup: signup,
  };

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return () => {
      unsubscribed();
    };
  }, []);

  // auth.onAuthStateChanged(setCurrentUser);

  return (
    // Contextを使用して認証に必要な情報をコンポーネントツリーに流し込む。
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
