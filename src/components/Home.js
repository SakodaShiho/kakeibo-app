import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { auth, db } from '../firebase';
import { Month } from './Month';
import { PriceField } from './PriceField';
import { Balance } from './Balance';
import { AuthContext } from '../auth/AuthProvider';
import { totalCalc } from './TotalIncome';
import { ItemList } from './ItemList';
import Box from '@material-ui/core/Box';
import Copyright from './Copyright';
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';
import 'firebase/firestore';

import '../css/Home.css';
import '../css/LoginSignup.css';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: '200px',
    backgroundColor: '#aecbcd',
    height: '50px',
    borderRadius: '30px',
    boxShadow: 'none',
    transition: 'all 0.8s',
    '&:hover': {
      backgroundColor: '#71a4a8',
      boxShadow: 'none',
    },
  },
}));

function Home() {
  const classes = useStyles();

  const [inputText, setInputText] = useState('');
  const [inputAmount, setInputAmount] = useState(0);
  const [incomeItems, setIncomeItems] = useState([]);
  const [expenseItems, setExpenseItems] = useState([]);
  const [type, setType] = useState('inc');
  const [date, setDate] = useState(new Date());

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    getIncomeData();
    getExpenseData();
  }, []);

  useEffect(() => {
    getIncomeData();
    getExpenseData();
  }, [date]);

  //for Header
  const setPrevMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth() - 1;
    const day = date.getDate();
    setDate(new Date(year, month, day));
  };

  const setNextMonth = () => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    setDate(new Date(year, month, day));
  };

  //get first date of the month
  const startOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  //get last date of this month
  const endOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  //operate add form and income/expense list
  const selectedMonth = date.getMonth() + 1;
  const today = new Date();
  const thisMonth = today.getMonth() + 1;

  //firebase IncomeData
  const getIncomeData = () => {
    const incomeData = db.collection('incomeItems');
    incomeData
      .where('uid', '==', currentUser.uid)
      // .orderBy('date')
      // .startAt(startOfMonth(date))
      // .endAt(endOfMonth(date))
      .onSnapshot((query) => {
        const incomeItems = [];
        query.forEach((doc) =>
          incomeItems.push({ ...doc.data(), docId: doc.id })
        );
        setIncomeItems(incomeItems);
      });
  };

  const addIncome = (text, amount) => {
    const docId = Math.random().toString(32).substring(2);
    const date = firebase.firestore.Timestamp.now();
    db.collection('incomeItems')
      .doc(docId)
      .set({
        uid: currentUser.uid,
        text,
        amount,
        date,
      })
      .then((response) => {
        setIncomeItems([
          ...incomeItems,
          { text: inputText, amount: inputAmount, docId: docId, date: date },
        ]);
      });
  };

  const deleteIncome = (docId) => {
    db.collection('incomeItem').doc(docId).delete();
  };

  //firebase Expense data
  const getExpenseData = () => {
    const expenseData = db.collection('expenseItems');
    expenseData
      .where('uid', '==', currentUser.uid)
      // .orderBy('date')
      // .startAt(startOfMonth(date))
      // .endAt(endOfMonth(date))
      .onSnapshot((query) => {
        const expenseItems = [];

        query.forEach((doc) => {
          expenseItems.push({ ...doc.data(), docId: doc.id });
        });
        setExpenseItems(expenseItems);
      });
  };

  const addExpense = (text, amount) => {
    const docId = Math.random().toString(32).substring(2);
    const date = firebase.firestore.Timestamp.now();
    db.collection('expenseItems')
      .doc(docId)
      .set({
        uid: currentUser.uid,
        text,
        amount,
        date,
      })
      .then((response) => {
        setExpenseItems([
          ...expenseItems,
          { text: inputText, amount: inputAmount, docId: docId, date: date },
        ]);
      });
  };

  const deleteExpense = (docId) => {
    db.collection('expenseItems').doc(docId).delete();
  };

  // calculate % and show total
  const incomeTotal = totalCalc(incomeItems);

  return (
    <div>
      <div className='header'>
        <Month
          date={date}
          setPrevMonth={setPrevMonth}
          setNextMonth={setNextMonth}
        />
        <Balance incomeTotal={incomeTotal} expenseItems={expenseItems} />
        <PriceField
          addIncome={addIncome}
          addExpense={addExpense}
          inputText={inputText}
          setInputText={setInputText}
          inputAmount={inputAmount}
          setInputAmount={setInputAmount}
          type={type}
          setType={setType}
          selectedMonth={selectedMonth}
          thisMonth={thisMonth}
        />
      </div>
      <div className='item_field'>
        <ItemList
          deleteIncome={deleteIncome}
          deleteExpense={deleteExpense}
          incomeTotal={incomeTotal}
          incomeItems={incomeItems}
          expenseItems={expenseItems}
          selectedMonth={selectedMonth}
          thisMonth={thisMonth}
        />
      </div>

      <div className='btn_field'>
        <Button className={classes.submit} onClick={() => auth.signOut()}>
          Sign out
        </Button>
      </div>
      <div className='copyright'>
        <Box mt={8}>
          <Copyright />
        </Box>
      </div>
    </div>
  );
}

export default Home;
