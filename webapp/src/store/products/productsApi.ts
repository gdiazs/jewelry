import axios from "axios";

export default {
  fetchProducts: async () => {
    return await axios.get("/api/products/v1");
  },

  removeItem: async (id: string) => {
    return await axios.put(`/api/products/v1/remove-item/${id}`);
  },
};
