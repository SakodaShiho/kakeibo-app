import React from "react";

export const IncomeItem = ({
  deleteIncome,
  incomeItems,
  incomeText,
  incomeAmount,
  thisMonth,
  selectedMonth,
}) => {
  const deleteHandler = () => {
    deleteIncome(incomeItems.docId);
  };

  const showThisMonth = () => {
    return (
      <li className="thisMonthList">
        <div class="text">{incomeText}</div>
        <div className="money-plus">
          +{Number(incomeAmount).toLocaleString()}円
        </div>
        <button className="delete-btn" onClick={deleteHandler}>
          ×
        </button>
      </li>
    );
  };

  const showPastMonth = () => {
    return (
      <li>
        <div>{incomeText}</div>
        <div className="money-plus">
          +{Number(incomeAmount).toLocaleString()}円
        </div>
      </li>
    );
  };

  return <>{thisMonth === selectedMonth ? showThisMonth() : showPastMonth()}</>;
};
