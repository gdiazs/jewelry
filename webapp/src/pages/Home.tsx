import { DataView, DataViewLayoutOptions } from "primereact/dataview";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";

function Home() {
  const products: any = [
    {
      name: "Marciano",
      category: "Relojería",
      inventoryStatus: "Stock",
      price: "30.36",
      image: "reloj1.png"
    },
    {
      name: "Marciano",
      category: "Relojería",
      inventoryStatus: "Stock",
      price: "30.36",
      image: "anillo1.png"
    },
    {
      name: "Marciano",
      category: "Relojería",
      inventoryStatus: "Stock",
      price: "30.36",
      image: "brazalete.jpg"
    },
    {
      name: "Marciano",
      category: "Relojería",
      inventoryStatus: "Stock",
      price: "30.36",
      image: "reloj1.png"
    },
    {
      name: "Marciano",
      category: "Relojería",
      inventoryStatus: "Stock",
      price: "30.36",
      image: "reloj1.png"
    }    
  ];

  const objectTemplate = useItemTemplate();

  return (
    <div>
      <h3 className="text-center">Todas las joyas</h3>
      <DataView
        value={products}
        itemTemplate={objectTemplate}
        layout="list"
      />
    </div>
  );
}

function useItemTemplate() {
  return (product: any) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 mb-2">
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={`/images/${product.image}`}
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
                <Tag value={product.inventoryStatus} severity={"success"}></Tag>
              </div>
            </div>
            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <span className="text-2xl font-semibold">${product.price}</span>
              <Button
                icon="pi pi-shopping-cart"
                className="p-button-rounded"
                label="Agregar"
                disabled={product.inventoryStatus === "OUTOFSTOCK"}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default Home;
