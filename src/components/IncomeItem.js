import React from 'react';

export const IncomeItem = ({
  deleteIncome,
  incomeItems,
  incomeText,
  incomeAmount,
  thisMonth,
  selectedMonth,
  contentText,
}) => {
  const deleteHandler = () => {
    deleteIncome(incomeItems.docId);
  };

  const showThisMonth = () => {
    return (
      <li className='thisMonthList'>
        <div className='text'>{incomeText}</div>
        <div className='content_text'>{contentText}</div>
        <div className='money-plus'>
          +{Number(incomeAmount).toLocaleString()}円
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
        <div className='text'>{incomeText}</div>
        <div className='content_text'>{contentText}</div>
        <div className='money-plus'>
          +{Number(incomeAmount).toLocaleString()}円
        </div>
        <button className='delete-btn' onClick={deleteHandler}>
          ×
        </button>
      </li>
    );
  };

  return <>{thisMonth === selectedMonth ? showThisMonth() : showPastMonth()}</>;
};
