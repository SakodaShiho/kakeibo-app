import React from 'react';

export const ExpenseItem = ({
  deleteExpense,
  expenseItems,
  setExpenseItems,
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
      <li className='thisMonthList'>
        <div className='text'>{expenseText}</div>
        <div className='money-minus'>
          -{Number(expenseAmount).toLocaleString()}円
        </div>
        <button className='delete-btn' onClick={deleteHandler}>
          ×
        </button>
      </li>
    );
  };

  const showPastMonth = () => {
    return (
      <li className='pastMonthList'>
        <div className='text'>{expenseText}</div>
        <div className='money-minus'>
          -{Number(expenseAmount).toLocaleString()}円
        </div>
        <button className='delete-btn' onClick={deleteHandler}>
          ×
        </button>
      </li>
    );
  };

  return <>{thisMonth === selectedMonth ? showThisMonth() : showPastMonth()}</>;
};
