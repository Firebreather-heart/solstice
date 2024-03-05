export const addBudget = (
  totalAmount,
  setErrorMessage,
  setBudget,
  setBalanceValue
) => {
  if (totalAmount === "" || totalAmount < 0) {
    setErrorMessage("Error: Please enter a valid amount.");
  } else {
    setErrorMessage("");
    setBudget(totalAmount);
    setBalanceValue(totalAmount);
  }
};
export const disableButtons = (editButtons, bool) => {
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

export const modifyElement = (
  index,
  edit,
  expenseList,
  setProductTitle,
  setAmount,
  setDisableButtons,
  setBalanceValue,
  setExpenses,
  expenseTitle,
  expenseAmount

) => {
  const modifiedExpenseList = [...expenseList];
  const expense = modifiedExpenseList[index];
  const { title, amount } = expense;

  if (edit) {
    setProductTitle(title);
    setAmount(amount);
    setDisableButtons(true);
  }

  const newExpenses = parseInt(setExpenses) - parseInt(amount);
  setExpenses(newExpenses);
  setBalanceValue((prevBalance) => prevBalance + parseInt(amount));

  modifiedExpenseList.splice(index, 1);
  return modifiedExpenseList;
};

export const listCreator = (
  setExpenseList,
  expenseName,
  expenseValue,
  setProductTitle,
  setAmount,
  setDisableButtons,
  setBalanceValue,
  setExpenses,
  expenseList,
  balanceValue,
  expense
) => {
  const newExpense = {
    title: expenseName,
    amount: expenseValue,
  };
  const modifiedExpenseList = [...expenseList, { ...newExpense }];
  setExpenseList(modifiedExpenseList);

  setProductTitle("");
  setAmount("");
  setDisableButtons(false);

  const newExpenses = parseInt(expense) + parseInt(expenseValue);
  setExpenses(newExpenses);

  const newBalance = parseInt(balanceValue) - parseInt(expenseValue);
  setBalanceValue(newBalance);
};

export const addExpense = (
  userAmount,
  productTitle,
  setProductTitle,
  setAmount,
  setDisableButtons,
  productTitleError,
  expenditureValue,
  tempAmount,
  setBalanceValue,
  setExpenseList,
  setExpenses,
  expenseList
) => {
  if (!userAmount || !productTitle) {
    productTitleError("Title and amount are required.");
    return;
  }

  productTitleError("");

  const expenditure = expenseList.reduce((a, b) => {
    return a + b;
  }, 0);
  const updatedExpenditure = parseInt(expenditureValue)+ parseInt(expenditure);

  const totalBalance = tempAmount - updatedExpenditure;
  console.log(userAmount, expenditureValue, tempAmount);
  setBalanceValue(totalBalance);

  listCreator(
    setExpenseList,
    productTitle,
    userAmount,
    setProductTitle,
    setAmount,
    setDisableButtons,
    setBalanceValue,
    setExpenses,
    expenseList,
    totalBalance,
    updatedExpenditure
  );
};
