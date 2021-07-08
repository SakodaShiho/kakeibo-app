import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "../css/Home.css";
import "../css/LoginSignup.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginRight: "1rem",
      width: "25ch",
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: "200px",
    backgroundColor: "#aecbcd",
    height: "50px",
    borderRadius: "30px",
    boxShadow: "none",
    transition: "all 0.8s",
    "&:hover": {
      backgroundColor: "#71a4a8",
      boxShadow: "none",
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
  selectedMonth,
  thisMonth,
}) => {
  const typeHandler = (e) => {
    setType(e.target.value);
  };

  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const inputAmountHandler = (e) => {
    setInputAmount(parseInt(e.target.value));
  };

  const reset = () => {
    setInputText("");
    setInputAmount("");
  };

  const submitItemHandler = (e) => {
    e.preventDefault();
    if (
      inputText == "" ||
      inputAmount == "0" ||
      !(inputAmount > 0 && inputAmount <= 10000000)
    ) {
      alert("正しい内容を入力してください");
    } else if (type === "inc") {
      addIncome(inputText, inputAmount);
      reset();
    } else if (type === "exp") {
      addExpense(inputText, inputAmount);
      reset();
    }
  };

  const classes = useStyles();

  const thisMonthForm = () => {
    return (
      <div className="input_field">
        <FormControl className={classes.formControl}>
          <Select onChange={typeHandler}>
            <MenuItem value="exp" default>
              支出
            </MenuItem>
            <MenuItem value="inc">収入</MenuItem>
          </Select>
        </FormControl>
        <div className="input_field_inner">
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              placeholder="内容"
              type="text"
              value={inputText}
              onChange={inputTextHandler}
            />
            <TextField
              type="number"
              placeholder="金額"
              value={inputAmount}
              onChange={inputAmountHandler}
            />
          </form>
          <p>円</p>
        </div>
        <div className="btn_field">
          <Button
            className={classes.submit}
            disabled={inputText === ""}
            type="submit"
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
