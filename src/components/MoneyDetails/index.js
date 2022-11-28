/* eslint-disable react/no-unknown-property */
const MoneyDetails = props => {
  const {amountType, amount, imgUrl, altText} = props
  const testIdValue = `${altText}Amount`
  return (
    <li>
      <img src={imgUrl} alt={altText} />
      <p>Your {amountType}</p>
      <p testid={testIdValue}>Rs {amount}</p>
    </li>
  )
}

export default MoneyDetails
