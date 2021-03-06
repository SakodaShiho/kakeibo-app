import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { auth, db } from '../firebase';
import { Month } from './Month';
import { PriceField } from './PriceField';
import { Balance } from './Balance';
import { AuthContext } from '../auth/AuthProvider';
import { totalCalc } from './TotalIncome';
import { ItemList } from './ItemList';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import Copyright from './Copyright';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
    color: '#fff',
    fontWeight: '600',
    '&:hover': {
      backgroundColor: '#71a4a8',
      boxShadow: 'none',
    },
  },
  paper: {
    position: 'absolute',
    width: '35%',
    borderRadius: '5px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    [theme.breakpoints.down('xs', 'sm')]: {
      width: '80%',
      padding: theme.spacing(3),
    },
  },
  root: {
    '& > *': {
      width: '100%',
    },
  },
}));

function Home() {
  const classes = useStyles();

  const [inputText, setInputText] = useState('');
  const [inputAmount, setInputAmount] = useState('');
  const [incomeItems, setIncomeItems] = useState([]);
  const [expenseItems, setExpenseItems] = useState([]);
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const {
    currentUser,
    setDisplayName,
    displayName,
    updatePassword,
    updateEmail,
    setEmailText,
    emailText,
    passwordText,
    setPasswordText,
  } = useContext(AuthContext);

  useEffect(() => {
    getIncomeData();
    getExpenseData();
  }, []);

  useEffect(() => {
    getIncomeData();
    getExpenseData();
    getDisplayName();
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
        content,
      })
      .then((response) => {
        setIncomeItems([
          ...incomeItems,
          {
            text: inputText,
            amount: inputAmount,
            docId: docId,
            date: date,
            content: content,
          },
        ]);
      });
  };

  const getIncomeData = () => {
    const incomeData = db.collection('incomeItems');
    incomeData
      .where('uid', '==', currentUser.uid)
      .orderBy('date')
      .startAt(startOfMonth(date))
      .endAt(endOfMonth(date))
      .onSnapshot((query) => {
        const incomeItems = [];
        query.forEach((doc) =>
          incomeItems.push({ ...doc.data(), docId: doc.id })
        );
        setIncomeItems(incomeItems);
      });
  };

  const deleteIncome = (docId) => {
    db.collection('incomeItems').doc(docId).delete();
  };

  //firebase Expense data
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
        content,
      })
      .then((response) => {
        setExpenseItems([
          ...expenseItems,
          {
            text: inputText,
            amount: inputAmount,
            docId: docId,
            date: date,
            content: content,
          },
        ]);
      });
  };

  const getExpenseData = () => {
    const expenseData = db.collection('expenseItems');
    expenseData
      .where('uid', '==', currentUser.uid)
      .orderBy('date')
      .startAt(startOfMonth(date))
      .endAt(endOfMonth(date))
      .onSnapshot((query) => {
        const expenseItems = [];
        query.forEach((doc) =>
          expenseItems.push({ ...doc.data(), docId: doc.id })
        );
        setExpenseItems(expenseItems);
      });
  };

  const deleteExpense = (docId) => {
    db.collection('expenseItems').doc(docId).delete();
  };

  // calculate % and show total
  const incomeTotal = totalCalc(incomeItems);

  const getDisplayName = () => {
    const nameData = db.collection('displayName');
    nameData
      .where('uid', '==', currentUser.uid)
      .get()
      .then((docs) => {
        docs.forEach((doc) => {
          setDisplayName(doc.data().name);
        });
      });
  };

  // profile edit modal

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const emailHandleChange = (e) => {
    setEmailText(() => e.target.value);
  };

  function changeEmail() {
    if (emailText === '') {
      //???????????????????????????(????????????????????????????????????)
      alert('?????????????????????????????????????????????????????????'); //?????????????????????????????????
      return false;
    } else {
      //??????????????????????????????(???????????????????????????????????????????????????)
      updateEmail(emailText)
        .then(() => {
          alert('??????????????????????????????????????????');
        })
        .catch((error) => {
          console.log(error);
          alert('????????????????????????????????????????????????');
        });
    }
  }

  const [values, setValues] = useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPasswordText(() => event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function changePassword() {
    if (passwordText === '') {
      //???????????????????????????(??????????????????????????????)
      alert('???????????????????????????????????????????????????'); //?????????????????????????????????
      return false;
    } else {
      //??????????????????????????????(?????????????????????????????????????????????)
      updatePassword(passwordText)
        .then(() => {
          alert('????????????????????????????????????');
        })
        .catch((error) => {
          console.log(error);
          alert('??????????????????????????????????????????');
        });
    }
  }

  const body = (
    <div className={classes.paper}>
      <div className='modal_item'>
        <h2>??????????????????????????????</h2>
        <p className='modal_title'>????????????????????????????????????</p>
        <p>{currentUser.email}</p>
        <p className='modal_title'>?????????????????????????????????</p>
        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          name='email_form'
        >
          <OutlinedInput
            id='outlined-adornment-amount'
            variant='outlined'
            name='email'
            type='text'
            onChange={emailHandleChange}
          />
          <Button
            className={classes.submit}
            type='button'
            onClick={changeEmail}
          >
            ??????????????????????????????
          </Button>
        </form>
      </div>
      <div className='modal_item'>
        <h2>????????????????????????</h2>
        <p>????????????????????????????????????</p>
        <form
          className={classes.root}
          noValidate
          autoComplete='off'
          name='password_form'
        >
          <OutlinedInput
            id='outlined-adornment-amount'
            variant='outlined'
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button
            className={classes.submit}
            type='button'
            onClick={changePassword}
          >
            ????????????????????????
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <div>
      <div className='header'>
        <div className='name_display'>
          <p>??????????????????{displayName}??????</p>
        </div>
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
          content={content}
          setContent={setContent}
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
      <div className='profile_edit'>
        <p onClick={handleOpen}>?????????????????????????????????</p>
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>{body}</Fade>
        </Modal>
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
