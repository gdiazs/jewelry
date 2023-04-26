import { Button } from "primereact/button";
import Logo from "../../layouts/default/logo.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { productState } from "../../store/products/productsSlice";
import { useLocation, useNavigate } from "react-router-dom";

function Nav() {
  const { cartItems }: any = useSelector(productState);
  const browserLocation = useLocation();
  const navigation = useNavigate();

  const onShopingButtonClick = () => {
    navigation("/cart");
  };

  let shopingButton = <></>;
  if (browserLocation.pathname !== "/cart") {
    shopingButton = (
      <Button
        onClick={onShopingButtonClick}
        label={`${cartItems.length}`}
        icon="pi pi-shopping-cart"
        size="large"
      />
    );
  }

  return (
    <div className="row h-4rem bg-white shadow-3 flex aling-items-center justify-content-between">
      <div className="mt-3 ml-3 text-center">
        <img src={Logo} alt="Joyería" className="h-2rem" />
      </div>
      <div className="mt-3">
        <div className="mr-3">{shopingButton}</div>
      </div>
    </div>
  );
}

export default Nav;
