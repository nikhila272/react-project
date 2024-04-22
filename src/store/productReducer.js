import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct(state, action) {
      const product = action.payload;
      state.products.push({
        productName: product.productName,
        yearOfRelease: product.yearOfRelease,
        productPhoto: product.productPhoto,
        rating: product.rating,
        reviewComments: product.reviewComments,
        totalRatingValue: product.totalRatingValue,
        numberOfUsersGivenRating: product.numberOfUsersGivenRating,
        productId: product.productId,
      });
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice.reducer;
