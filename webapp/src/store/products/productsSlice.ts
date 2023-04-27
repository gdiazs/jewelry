import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import Product from "./Product";
import productsApi from "./productsApi";
import { RootState } from "..";

export interface ProductState {
  products: Array<Product>;
  cartItems: Array<Product>;
}

const PRODUCTS_LOCAL_STORAGE = "jewlery:products";
const CART_ITEMS_LOCAL_STORAGE = "jewlery:cartItems";

const productsFromStrore: Array<Product> = JSON.parse(
  localStorage.getItem(PRODUCTS_LOCAL_STORAGE) || "[]"
);

const cartItemsFromStore: Array<Product> = JSON.parse(
  localStorage.getItem(CART_ITEMS_LOCAL_STORAGE) || "[]"
);

const initialState: ProductState = {
  products: productsFromStrore,
  cartItems: cartItemsFromStore,
};

export const fetchProductsThunk = createAsyncThunk(
  "products/fetchProductsThunk",
  async () => {
    let response = await productsApi.fetchProducts();
    return response.data;
  }
);

export const removeItemThunk = createAsyncThunk(
  "products/removeItemThunk",
  async (id: string) => {
    let response = await productsApi.removeItem(id);
    return response.data;
  }
);

const productsSlice: any = createSlice({
  name: "products",
  initialState,

  reducers: {
    addItemToCart(state: ProductState, action: PayloadAction<string>) {
      state.products.forEach((product: Product, index: number) => {
        if (product.id === action.payload) {
          state.cartItems.push(product);
          product.quantity--;
        }
      });

      localStorage.setItem(
        PRODUCTS_LOCAL_STORAGE,
        JSON.stringify(state.products)
      );
      localStorage.setItem(
        CART_ITEMS_LOCAL_STORAGE,
        JSON.stringify(state.cartItems)
      );

      return state;
    },

    cleanInvoice(state: ProductState){
      console.log(state)
      localStorage.removeItem(CART_ITEMS_LOCAL_STORAGE);
      localStorage.removeItem(PRODUCTS_LOCAL_STORAGE);

      state.cartItems = [];
      state.products = [];

      fetchProductsThunk();
    }
  },

  extraReducers(builder) {
    builder.addCase(
      fetchProductsThunk.fulfilled,
      (state: ProductState, action) => {
        const cartItemMap: Map<string, Product> = new Map(
          state.cartItems.map((product: Product) => [product.id, product])
        );

        action.payload.forEach((product: Product) => {
          const foundProduct = cartItemMap.get(product.id);
          if (foundProduct) {
            product.quantity = foundProduct.quantity;
          }
        });

        state.products = action.payload;
      }
    );

    builder.addCase(
      removeItemThunk.fulfilled,
      (state: ProductState, action: PayloadAction<Product>) => {
        let productFound: Product = state.products.filter(
          (product: Product) => product.id === action.payload.id
        )[0];

        productFound.quantity = action.payload.quantity;
      }
    );
  },
});

export function cartiItemsToMap(products: any): Map<string, Product> {
  return new Map( products.map((product: Product) => [product.id, product]))
};
export const productState = (state: RootState) => state.productReducer;
export const { removeItem, addItemToCart, cleanInvoice } = productsSlice.actions;
export default productsSlice.reducer;
