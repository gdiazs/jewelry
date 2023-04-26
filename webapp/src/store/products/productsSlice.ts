import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import Product from "./Product";
import productsApi from "./productsApi";
import { RootState } from "..";

export interface ProductState {
  products: Array<Product>;
  cartItems: Array<Product>;
}

const initialState: ProductState = {
  products: [],
  cartItems: [],
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

      return state;
    },
  },

  extraReducers(builder) {
    builder.addCase(
      fetchProductsThunk.fulfilled,
      (state: ProductState, action) => {
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

export const productState = (state: RootState) => state.productReducer;
export const { removeItem, addItemToCart } = productsSlice.actions;
export default productsSlice.reducer;
