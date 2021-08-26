import React from 'react';
import { IncomeItem } from './IncomeItem';
import { ExpenseItem } from './ExpenseItem';

export const ItemList = ({
  deleteIncome,
  deleteExpense,
  incomeTotal,
  incomeItems,
  expenseItems,
  selectedMonth,
  thisMonth,
}) => {
  return (
    <div className='item_list-container'>
      <div className='income-list'>
        <h3>収入一覧</h3>
        <ul className='list'>
          {incomeItems.map((incomeItems) => (
            <IncomeItem
              deleteIncome={deleteIncome}
              incomeText={incomeItems.text}
              incomeAmount={incomeItems.amount}
              incomeItems={incomeItems}
              key={incomeItems.docId}
              selectedMonth={selectedMonth}
              thisMonth={thisMonth}
              contentText={incomeItems.content}
            />
          ))}
        </ul>
      </div>
      <div className='expense-list'>
        <h3>支出一覧</h3>
        <ul className='list'>
          {expenseItems.map((expenseItems) => (
            <ExpenseItem
              deleteExpense={deleteExpense}
              expenseText={expenseItems.text}
              expenseAmount={expenseItems.amount}
              expenseItems={expenseItems}
              key={expenseItems.docId}
              incomeTotal={incomeTotal}
              selectedMonth={selectedMonth}
              thisMonth={thisMonth}
              contentText={expenseItems.content}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
