// Write your code here

const TransactionItem = props => {
  const {details, onDelete} = props
  const {title, amount, type, id} = details

  const onDeleteItem = () => {
    onDelete(id)
  }

  return (
    <li>
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <button type="button" onClick={onDeleteItem}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          data-testid="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
