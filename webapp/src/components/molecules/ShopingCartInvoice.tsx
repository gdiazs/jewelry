import { useSelector } from "react-redux/es/hooks/useSelector";
import { cleanInvoice, productState } from "../../store/products/productsSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import Product from "../../store/products/Product";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";

type ProductCounter = {
  product: Product;
  priceFormatted: string;
  count: number;
  subtotal: number;
  subtotalFormatted: string;
};

function ShopingCartInvoice() {
  const [visible, setVisible] = useState(false);
  const { cartItems }: any = useSelector(productState);
  const dispatch = useDispatch<AppDispatch>();

  const browserNavigation = useNavigate();

  const colonScale = Intl.NumberFormat("cr-CR");
  let invoiceTotals = 0;
  const cartItemsMapped = new Map<string, ProductCounter>();

  cartItems.forEach((product: Product) => {
    const itemFound = cartItemsMapped.get(product.id);

    if (itemFound) {
      itemFound.count++;
      itemFound.subtotal += product.price;
      itemFound.subtotalFormatted = colonScale.format(itemFound.subtotal);
    } else {
      cartItemsMapped.set(product.id, {
        product,
        priceFormatted: colonScale.format(product.price),
        count: 1,
        subtotal: product.price,
        subtotalFormatted: colonScale.format(product.price),
      });
    }
  });

  const productsInCart: Array<ProductCounter> = Array.from(
    cartItemsMapped.values()
  );

  productsInCart.forEach((productInCart) => {
    console.log(productInCart);
    invoiceTotals += productInCart.subtotal;
  });

  return (
    <>
      <Button
        onClick={() => {
          browserNavigation("/");
        }}
        label="regresar"
        icon="pi pi-angle-left"
        size="large"
        className="mb-2"
      />

      <DataTable value={productsInCart}>
        <Column
          className="py-4"
          field="product.name"
          header="Producto"
        ></Column>
        <Column field="product.description" header="Descripcion"></Column>
        <Column field="count" header="Cantidad"></Column>
        <Column
          field="priceFormatted"
          className="text-right"
          header="Precio"
        ></Column>
        <Column
          field="subtotalFormatted"
          className="text-right"
          header="Sub Total"
        ></Column>
      </DataTable>
      <div className="text-right mt-2 mr-3 text-xl">
        Total: ₡{colonScale.format(invoiceTotals)}
      </div>

      <div className="mt-6 text-right">
        <Button
          label="Realizar Pago"
          size="large"
          onClick={() => {
            setVisible(true);
            dispatch(cleanInvoice());
          }}
        />
        <Dialog
          header="Resultado"
          visible={visible}
          style={{ width: "10vw" }}
          onHide={() => setVisible(false)}
        >
          <p className="m-0">Pago satisfactorio</p>
        </Dialog>
      </div>
    </>
  );
}

export default ShopingCartInvoice;
