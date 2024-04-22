/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { productActions } from "../store/productReducer"; 
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

export default function DisplayProduct({
  productName,
  description,
  productPhoto,
  rating,
  reviewComments,
  totalRatingValue,
  numberOfUsersGivenRating,
  productId,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      productActions.addProduct({
        productName,
        description,
        productPhoto,
        rating,
        reviewComments,
        totalRatingValue,
        numberOfUsersGivenRating,
        productId,
      })
    );
  }, []);

  return (
    <div className="product-component">
      {" "}
      <Link to={`/product/${productId}`}>
        <h3>{productName}</h3>
      </Link>
      <div className="product-details">
        <p>Description: {description}</p>{" "}
      </div>
      <Rating
        name="half-rating-read"
        value={parseFloat(rating)}
        precision={0.5}
        readOnly
      />
      <br />
      {productPhoto && (
        <img
          style={{
            width: "300px",
            height: "300px",
            objectFit: "cover",
          }}
          src={productPhoto}
          alt={productName}
        />
      )}{" "}
    </div>
  );
}
