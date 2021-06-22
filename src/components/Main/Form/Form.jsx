import React, { useState, useContext } from "react";
import { ExpenseTrackerContext } from "../../../context/context";
import { v4 as uuidv4 } from "uuid";
import {
  incomeCategories,
  expenseCategories,
} from "../../../constants/categories";
import {
  TextField,
  Grid,
  Typography,
  Select,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import useStyles from "../../../styles/formStyles";
import { useSpeechContext } from "@speechly/react-client";
import Snackbars from "../../../snackbar/Snackbar";
const Form = () => {
  const initialState = {
    amount: "",
    category: "",
    type: "",
    date: new Date(),
  };
  const classes = useStyles();
  const [formData, setformData] = useState(initialState);
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const { segment } = useSpeechContext();
  const createTransaction = () => {
    const transaction = {
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    };

    addTransaction(transaction);
    setformData(initialState);
    setOpen(true);
  };
  const [open, setOpen] = useState(false);

  const selectedCategory =
    formData.type === "Income" ? incomeCategories : expenseCategories;
  return (
    <Grid container spacing={2}>
      <Snackbars open={open} setOpen={setOpen} />
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segment && <>{segment.words.map((w) => w.value.join(" "))}</>}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => {
              setformData({ ...formData, type: e.target.value });
            }}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) => {
              setformData({ ...formData, category: e.target.value });
            }}
          >
            {selectedCategory.map((c) => (
              <MenuItem value={c.type} key={c.type}>
                {c.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={formData.amount}
          onChange={(e) => {
            setformData({ ...formData, amount: e.target.value });
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          label="Date"
          fullWidth
          value={formData.date}
          onChange={(e) => {
            setformData({ ...formData, date: e.target.value });
          }}
        />
      </Grid>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        fullWidth
        onClick={() => {
          createTransaction();
        }}
      >
        Create
      </Button>
    </Grid>
  );
};

export default Form;
