import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

export const Month = ({ date, setPrevMonth, setNextMonth }) => {
  const { currentUser } = useContext(AuthContext);

  const today = date;
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  return (
    <div className="head">
      <div className="showMonth">
        <button onClick={() => setPrevMonth()}>←前月 </button>
        <h1>
          {year}年{month}月
        </h1>
        <button onClick={() => setNextMonth()}> 次月→</button>
      </div>
    </div>
  );
};
