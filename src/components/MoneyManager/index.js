import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails/index'
import TransactionItem from '../TransactionItem/index'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    income: 0,
    expenses: 0,
    transactionsList: [],
    title: '',
    amount: '',
    type: 'Income',
  }

  updateTitle = event => {
    this.setState({title: event.target.value})
  }

  updateAmount = event => {
    this.setState({amount: event.target.value})
  }

  updateType = event => {
    const type = event.target.value
    this.setState({type: type[0] + type.slice(1).toLowerCase()})
  }

  addTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    const newTransaction = {
      title,
      amount,
      type,
      id: uuidv4(),
    }
    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
    }))

    if (type === 'Income') {
      this.setState(prevState => ({
        income: prevState.income + parseInt(amount),
        title: '',
        amount: '',
      }))
    } else {
      this.setState(prevState => ({
        expenses: prevState.expenses + parseInt(amount),
        title: '',
        amount: '',
      }))
    }
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const deletedTransaction = transactionsList.filter(x => x.id === id)[0]
    const {amount, type} = deletedTransaction
    const temp = transactionsList.filter(x => x.id !== id)
    this.setState({transactionsList: [...temp]})
    if (type === 'Income') {
      this.setState(prevState => ({income: prevState.income - amount}))
    } else {
      this.setState(prevState => ({expenses: prevState.expenses - amount}))
    }
  }

  render() {
    const {income, expenses, transactionsList, title, amount} = this.state
    const balance = income - expenses
    const moneyDetails = [
      {
        id: 1,
        amountType: 'Balance',
        amount: balance,
        imgUrl:
          'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
        altText: 'balance',
      },
      {
        id: 2,
        amountType: 'Income',
        amount: income,
        imgUrl:
          'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
        altText: 'income',
      },
      {
        id: 3,
        amountType: 'Expenses',
        amount: expenses,
        imgUrl:
          'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
        altText: 'expenses',
      },
    ]
    return (
      <div>
        <div>
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>
        <ul>
          {moneyDetails.map(x => (
            <MoneyDetails {...x} key={x.id} />
          ))}
        </ul>
        <div>
          <form>
            <h1>Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input
              value={title}
              type="text"
              placeholder="TITLE"
              id="title"
              onChange={this.updateTitle}
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              value={amount}
              type="text"
              placeholder="AMOUNT"
              id="amount"
              onChange={this.updateAmount}
            />
            <label htmlFor="type">TYPE</label>
            <select onChange={this.updateType}>
              <option
                value={transactionTypeOptions[0].optionId}
                id={transactionTypeOptions[0].optionId}
                defaultValue
              >
                {transactionTypeOptions[0].displayText}
              </option>
              <option
                value={transactionTypeOptions[1].optionId}
                id={transactionTypeOptions[1].optionId}
              >
                {transactionTypeOptions[1].displayText}
              </option>
            </select>
            <button type="submit" onClick={this.addTransaction}>
              Add
            </button>
          </form>
          <div>
            <h1>History</h1>
            <div>
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </div>
            <ul>
              {transactionsList.map(x => (
                <TransactionItem
                  {...x}
                  key={x.id}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
