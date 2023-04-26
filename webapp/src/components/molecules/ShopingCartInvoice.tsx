import { useSelector } from "react-redux/es/hooks/useSelector";
import { productState } from "../../store/products/productsSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

function ShopingCartInvoice() {
  const { cartItems }: any = useSelector(productState);
  const browserNavigation = useNavigate();

  const itemTemplate = () => {};

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

      <DataTable value={cartItems}>
        <Column field="name" header="Producto"></Column>
        <Column field="description" header="Descripcion"></Column>
        <Column field="price" className="text-right" header="Precio"></Column>
      </DataTable>
    </>
  );
}

export default ShopingCartInvoice;
