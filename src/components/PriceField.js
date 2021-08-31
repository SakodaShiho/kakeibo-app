import React, { useEffect } from 'react';
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
  const typeHandler = (e) => {
    setType(e.target.value);
  };

  const menuExp = [
    { value: '1', name: '食費' },
    { value: '2', name: '日用品' },
  ];
  const menuInc = [
    { value: '1', name: '給与' },
    { value: '2', name: 'お小遣い' },
  ];

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
    console.log(inputText);
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
      addIncome(inputText, inputAmount, content);
      reset();
    } else if (type === 'exp') {
      addExpense(inputText, inputAmount, content);
      reset();
    }
  };

  const classes = useStyles();

  const thisMonthForm = () => {
    return (
      <div className='input_field'>
        <div className='input_field_inner'>
          <FormControl className={classes.formControl}>
            <Select onChange={typeHandler} defaultValue='' required>
              <MenuItem value='exp' default>
                支出
              </MenuItem>
              <MenuItem value='inc'>収入</MenuItem>
            </Select>
            <FormHelperText>支出どちらかを選択</FormHelperText>
          </FormControl>
          <FormControl className={classes.formControl}>
            <Select defaultValue='' required>
              {(() => {
                if (type === 'exp') {
                  return menuExp.map((e, key) => {
                    return (
                      <MenuItem
                        onClick={(e) => {
                          setContent(e.target.textContent);
                        }}
                        value={e.value}
                        key={key}
                        name={e.name}
                      >
                        {e.name}
                      </MenuItem>
                    );
                  });
                } else if (type === 'inc') {
                  return menuInc.map((e, key) => {
                    return (
                      <MenuItem
                        onClick={(e) => {
                          setContent(e.target.textContent);
                        }}
                        value={e.value}
                        key={key}
                        name={e.name}
                      >
                        {e.name}
                      </MenuItem>
                    );
                  });
                }
              })()}
            </Select>
            <FormHelperText>内容を選択</FormHelperText>
          </FormControl>
          <form className={classes.root} noValidate autoComplete='off'>
            <TextField
              placeholder='メモ'
              label='メモ'
              type='text'
              value={inputText}
              onChange={inputTextHandler}
            />
            <TextField
              type='number'
              placeholder='金額'
              label='金額'
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
