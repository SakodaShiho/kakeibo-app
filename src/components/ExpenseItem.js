import React from "react";

export const ExpenseItem = ({
  deleteExpense,
  expenseItems,
  expenseText,
  expenseAmount,
  thisMonth,
  selectedMonth,
}) => {
  const deleteHandler = () => {
    deleteExpense(expenseItems.docId);
  };

  const showThisMonth = () => {
    return (
      <li className="thisMonthList">
        <div className="text">{expenseText}</div>
        <div className="money-minus">
          -{Number(expenseAmount).toLocaleString()}円
          <button className="delete-btn" onClick={deleteHandler}>
            ×
          </button>
        </div>
      </li>
    );
  };

  const showPastMonth = () => {
    return (
      <li>
        <div className="text">{expenseText}</div>
        <div className="money-minus">
          -{Number(expenseAmount).toLocaleString()}円
        </div>
      </li>
    );
  };

  return <>{thisMonth === selectedMonth ? showThisMonth() : showPastMonth()}</>;
};
