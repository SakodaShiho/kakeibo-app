import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import '../css/Home.css';
import '../css/LoginSignup.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > div': {
      marginRight: theme.spacing(1),
      width: '25vw',
      [theme.breakpoints.down('xs', 'sm')]: {
        marginRight: theme.spacing(2),
        width: '80%',
      },
    },
  },
  formControl: {
    marginRight: theme.spacing(2),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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

export const PriceField = ({
  addIncome,
  addExpense,
  inputText,
  setInputText,
  inputAmount,
  setInputAmount,
  type,
  setType,
  content,
  setContent,
  selectedMonth,
  thisMonth,
}) => {
  const menuExp = [
    { value: 'exp', name: '食費' },
    { value: 'exp', name: '日用品' },
  ];
  const menuInc = [
    { value: 'inc', name: '給与' },
    { value: 'inc', name: 'お小遣い' },
  ];

  const typeHandler = (e) => {
    setType(e.target.value);
  };

  const options = (e) => {
    if (type === 'exp') {
      menuExp.map((e, key) => {
        return (
          <MenuItem value={e.value} key={key}>
            {e.name}
          </MenuItem>
        );
      });
    } else if (type === 'inc') {
      menuInc.map((e, key) => {
        return <MenuItem key={key}>{e.name}</MenuItem>;
      });
    }
  };

  const contentHandler = (e) => {
    setContent(e.target.value);
  };

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const inputAmountHandler = (e) => {
    setInputAmount(parseInt(e.target.value));
  };

  const reset = () => {
    setInputText('');
    setInputAmount('');
  };

  const submitItemHandler = (e) => {
    e.preventDefault();
    if (
      inputText === '' ||
      inputAmount === '0' ||
      !(inputAmount > 0 && inputAmount <= 10000000)
    ) {
      alert('正しい内容を入力してください');
    } else if (type === 'inc') {
      addIncome(inputText, inputAmount);
      reset();
    } else if (type === 'exp') {
      addExpense(inputText, inputAmount);
      reset();
    }
  };

  const classes = useStyles();

  const thisMonthForm = () => {
    return (
      <div className='input_field'>
        <div className='input_field_inner'>
          <FormControl className={classes.formControl}>
            <Select onChange={typeHandler} defaultValue=''>
              <MenuItem value='exp' default>
                支出
              </MenuItem>
              <MenuItem value='inc'>収入</MenuItem>
            </Select>
            <FormHelperText>支出どちらかを選択</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Select onChange={contentHandler} defaultValue=''>
              {options}
            </Select>
            <FormHelperText>内容を選択</FormHelperText>
          </FormControl>
          <form className={classes.root} noValidate autoComplete='off'>
            <TextField
              placeholder='内容'
              type='text'
              value={inputText}
              onChange={inputTextHandler}
            />
            <TextField
              type='number'
              placeholder='金額'
              value={inputAmount}
              onChange={inputAmountHandler}
            />
            <p>円</p>
          </form>
        </div>
        <div className='btn_field'>
          <Button
            className={classes.submit}
            disabled={inputText === ''}
            type='submit'
            onClick={submitItemHandler}
          >
            保 存
          </Button>
        </div>
      </div>
    );
  };

  const otherMonthForm = () => {
    return <form></form>;
  };

  return (
    <>{thisMonth === selectedMonth ? thisMonthForm() : otherMonthForm()}</>
  );
};
