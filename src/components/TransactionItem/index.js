/* eslint-disable react/no-unknown-property */
const TransactionItem = props => {
  const {title, amount, type, deleteTransaction, id} = props

  const triggerDelete = () => {
    deleteTransaction(id)
  }

  return (
    <li>
      <p>{title}</p>
      <p>{amount}</p>
      <p>{type}</p>
      <button type="button" onClick={triggerDelete} testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
