import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { AppDispatch, AppThunkDispatch } from "../store";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useEffect } from "react";
import {
  fetchProductsThunk,
  addItemToCart,
  productState,
} from "../store/products/productsSlice";
import Product from "../store/products/Product";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Home() {
  const thunkDispatch = useDispatch<AppThunkDispatch>();

  const { products }: any = useSelector(productState);

  useEffect(() => {
    thunkDispatch(fetchProductsThunk());
  }, []);

  const objectTemplate = useItemTemplate();

  return (
    <div>
      <h3 className="text-center">Todas las joyas</h3>
      <DataView value={products} itemTemplate={objectTemplate} layout="list" />
    </div>
  );
}

function useItemTemplate() {
  const dispatch = useDispatch<AppDispatch>();

  const onAddtoCartButtonClick = (productId: string) => {
    return () => {
      dispatch(addItemToCart(productId));
    };
  };

  return (product: Product) => {
    let colonScale = Intl.NumberFormat("cr-CR");

    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 mb-2">
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={`/images/${product.imageName}`}
            alt={product.name}
          />
          <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
              <div className="text-2xl font-bold text-900">{product.name}</div>
              <div className="flex align-items-center gap-3">
                <span className="flex align-items-center gap-2">
                  <i className="pi pi-tag"></i>
                  <span className="font-semibold">{product.category}</span>
                </span>
                <Tag
                  value={product.quantity}
                  severity={product.quantity > 0 ? "success" : "danger"}
                ></Tag>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">
                ₡{colonScale.format(product.price)}
              </span>
              <Button
                icon="pi pi-shopping-cart"
                className="p-button-rounded"
                label="Agregar"
                disabled={product.quantity === 0}
                onClick={onAddtoCartButtonClick(product.id)}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Home;
