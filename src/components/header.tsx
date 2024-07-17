import { useNavigate } from "react-router-dom"

export const Header = () => {
  const navigate = useNavigate();

  const navigateToThePaymentMethodPage = () => {
    navigate('/woovi')
  };

  return (
    <button className="py-7" onClick={navigateToThePaymentMethodPage}>
      <img src="./logo.svg" alt="logo" />
    </button>
  )
}
