import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import TransactionItem from '../TransactionItem'

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

const moneyDetailsList = [
  {
    text: 'Your Balance',
    count: 0,
  },
  {
    text: 'Your Income',
    count: 0,
  },
  {
    text: 'Your Expenses',
    count: 0,
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    transactionList: [],
    optionId: transactionTypeOptions[0].optionId,
    titleInput: '',
    amountInput: '',
  }

  onTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onTypeSelect = event => {
    this.setState({optionId: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()

    const {optionId, titleInput, amountInput} = this.state

    const newTransactionList = {
      id: uuidv4(),
      title: titleInput,
      amount: amountInput,
      type: optionId,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransactionList],
      titleInput: '',
      amountInput: '',
    }))
  }

  onDelete = id => {
    const {transactionList} = this.state
    const filteredList = transactionList.filter(each => each.id !== id)

    this.setState({transactionList: filteredList})
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let expenseAmount = 0

    transactionList.forEach(each => {
      if (each.type === 'EXPENSES') {
        expenseAmount += each.amount
      }
    })

    return expenseAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0

    transactionList.forEach(each => {
      if (each.type === 'INCOME') {
        incomeAmount += each.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    let expenseAmount = 0
    let balanceAmount = 0

    transactionList.forEach(each => {
      if (each.type === 'INCOME') {
        incomeAmount += each.amount
      } else {
        expenseAmount += each.amount
      }
    })

    balanceAmount = incomeAmount - expenseAmount

    return balanceAmount
  }

  render() {
    const {transactionList, optionId, titleInput, amountInput} = this.state

    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expenseAmount = this.getExpense()

    return (
      <div>
        <div className="bg-container">
          <h1>Hi, Richard</h1>
          <p>Welcome back to your Money Manager</p>
        </div>

        <ul className="ul-item">
          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              data-testid="balanceAmount"
              alt="balance amount"
            />
            <div>
              <h1>{moneyDetailsList[0].text}</h1>
              <p>Rs {balanceAmount}</p>
            </div>
          </li>

          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              data-testid="incomeAmount"
              alt="income amount"
            />
            <div>
              <h1>{moneyDetailsList[1].text}</h1>
              <p>Rs {incomeAmount}</p>
            </div>
          </li>

          <li>
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              data-testid="expensesAmount"
              alt="expense amount"
            />
            <div>
              <h1>{moneyDetailsList[2].text}</h1>
              <p>Rs {expenseAmount}</p>
            </div>
          </li>
        </ul>
        <div className="transaction-container">
          <form onSubmit={this.onAddTransaction}>
            <h1>Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input
              id="title"
              type="text"
              value={titleInput}
              placeholder="TITLE"
              onChange={this.onTitleInput}
            />
            <br />
            <label htmlFor="amount">AMOUNT</label>
            <input
              id="amount"
              type="text"
              value={amountInput}
              placeholder="AMOUNT"
              onChange={this.onAmountInput}
            />
            <br />
            <label htmlFor="select">TYPE</label>
            <select id="select" value={optionId} onChange={this.onTypeSelect}>
              <option value="INCOME">Income</option>
              <option value="EXPENSES">Expenses</option>
            </select>
            <br />
            <button type="submit">Add</button>
          </form>
          <ul className="ul-item1">
            <h1>History</h1>
            <div className="ul-items">
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </div>
            {transactionList.map(each => (
              <TransactionItem
                key={each.id}
                details={each}
                onDelete={this.onDelete}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager
