/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Rating } from "@mui/material";
import GetToken from "../services/GetToken";
import URL from "../services/URL";

export default function ProductReview() {
  const username = useSelector((state) => state.auth.username);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  const { productId } = useParams();
  let navigate = useNavigate();

  const [product, setProduct] = useState({
    productName: "",
    releaseYear: "",
    productPhoto: "",
    rating: "",
    reviewComments: [],
    totalRatingValue: 0,
    numberOfUsersGivenRating: 0,
    _id: "",
  });

  const [comment, setComment] = useState("");
  const [userRating, setUserRating] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [message, setMessage] = useState("");

  const findProductUrl = URL.findProductUrl();
  const updateProductUrl = URL.updateProductUrl();
  const deleteProductUrl = URL.deleteProductUrl();
  const findProductWithId = `${findProductUrl}/${productId}`;
  const updateProductWithId = `${updateProductUrl}/${productId}`;
  const deleteProductWithId = `${deleteProductUrl}/${productId}`;
  const token = GetToken.returnToken();
  const config = { headers: { Authorization: `${token}` } };

  const getProductData = async () => {
    try {
      const response = await axios.get(findProductWithId, config);
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleRatingChange = (event, newValue) => {
    if (newValue > 0) {
      setUserRating(newValue.toString());

      setProduct((prevProduct) => ({
        ...prevProduct,
        rating: (
          (prevProduct.totalRatingValue + newValue) /
          (prevProduct.numberOfUsersGivenRating + 1)
        ).toString(),
      }));
    }
  };

  useEffect(() => {
    
  }, [product]);

  const handleAddComment = async () => {
    try {
      if (!userRating) {
        setMessage("Rating is required value!");
        return;
      }

      const updatedProduct = { ...product };

      let isUpdating = false;

      const newReviewData = {
        user: username || Date.now().toString(),
        comment: comment,
        rating: userRating,
        timestamp: new Date().toLocaleString(),
      };
      console.log(updatedProduct);
      const existingUserReviewIndex = updatedProduct.reviewComments.findIndex(
        (existingReview) => existingReview.user === newReviewData.user
      );

      const existingUserReview = updatedProduct.reviewComments.find(
        (existingReview) => existingReview.user === newReviewData.user
      );

      if (existingUserReview) {
        isUpdating = true;

        const existingUserReview =
          updatedProduct.reviewComments[existingUserReviewIndex];
        const previousRating = parseFloat(existingUserReview.rating);

        existingUserReview.comment = newReviewData.comment;
        existingUserReview.rating = newReviewData.rating;
        existingUserReview.timestamp = newReviewData.timestamp;

        updatedProduct.totalRatingValue -= previousRating;
        updatedProduct.totalRatingValue += parseFloat(newReviewData.rating);
        updatedProduct.rating =
          updatedProduct.totalRatingValue /
          updatedProduct.numberOfUsersGivenRating;
      } else {
        updatedProduct.reviewComments.push(newReviewData);
        updatedProduct.numberOfUsersGivenRating += 1;
        updatedProduct.totalRatingValue += parseFloat(newReviewData.rating);
        updatedProduct.rating =
          updatedProduct.totalRatingValue /
          updatedProduct.numberOfUsersGivenRating;
      }

      const response = await axios.put(
        updateProductWithId,
        updatedProduct,
        config
      );
      if (response.status === 200) {
        if (isUpdating) {
          setMessage("Your Review updated successfully");
        } else {
          setMessage("Your Review added successfully");
        }
      }
      setComment("");
      setUserRating("");
      await getProductData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (index) => {
    try {
      const updatedProduct = { ...product };

      const existingUserReviewIndex = updatedProduct.reviewComments.findIndex(
        (existingReview) => existingReview.user === username
      );

      const existingUserReview =
        updatedProduct.reviewComments[existingUserReviewIndex];

      if (existingUserReviewIndex !== -1) {
        const previousRating = parseFloat(existingUserReview.rating);

        updatedProduct.numberOfUsersGivenRating -= 1;
        updatedProduct.totalRatingValue -= previousRating;
        updatedProduct.rating =
          updatedProduct.numberOfUsersGivenRating > 0
            ? updatedProduct.totalRatingValue /
              updatedProduct.numberOfUsersGivenRating
            : 0;

        updatedProduct.reviewComments.splice(index, 1);

        const response = await axios.put(
          updateProductWithId,
          updatedProduct,
          config
        );
        if (response.status === 200) {
          setMessage("Your Review deleted successfully");
        }
        await getProductData();
      } else if (isAdmin) {
        if (updatedProduct.reviewComments[index]) {
          updatedProduct.numberOfUsersGivenRating -= 1;
          updatedProduct.totalRatingValue -= parseFloat(
            updatedProduct.reviewComments[index].rating
          ); 
          updatedProduct.rating =
            updatedProduct.numberOfUsersGivenRating > 0
              ? updatedProduct.totalRatingValue /
                updatedProduct.numberOfUsersGivenRating
              : 0;

          updatedProduct.reviewComments.splice(index, 1);
          const response = await axios.put(
            updateProductWithId,
            updatedProduct,
            config
          );
          if (response.status === 200) {
            setMessage("Your Review deleted successfully");
          }
          await getProductData();
        } else {
          console.log("Review not found for deletion"); 
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateComment = async (index) => {
    try {
      setComment(product.reviewComments[index].comment); 

      await new Promise((resolve) => setTimeout(resolve, 0));

      const updatedProduct = { ...product };
      updatedProduct.reviewComments[index].comment = comment; 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  }, [comment]);

  const handleDeleteProduct = async () => {
    try {
      await axios.delete(deleteProductWithId, config);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditProduct = async () => {
    navigate(`/update-product-data/${productId}`);
  };

  function handleCommentChange(e) {
    setComment(e.target.value);
  }

  return (
    <div className="product-review-container">
      {" "}
      {product ? (
        <>
          <div className="back-delete-button">
            {" "}
            <div className="back-button">
              {" "}
              <button onClick={() => navigate("/")}> &larr; Go back </button>
            </div>
            <div className="delete-product-button">
              {" "}
              {isAdmin && (
                <button onClick={handleEditProduct}>Edit Product</button>
              )}{" "}
              {isAdmin && (
                <button onClick={handleDeleteProduct}>Delete Product</button>
              )}
            </div>
          </div>
          <h2 className="product-name">{product.productName}</h2>
          <div className="product-details">
            {" "}
            <div className="product-info">
              {" "}
              <div>
                <label className="product-release">Description: </label>
                {product.description}
              </div>
              <div>
                <label className="product-avg-rating">Avg Rating: </label>
                {isNaN(parseFloat(product.rating))
                  ? 0
                  : parseFloat(product.rating).toFixed(1)}{" "}
              </div>
            </div>
            <img
              className="product-image"
              src={product.productPhoto}
              alt={product.productName}
            />
          </div>
          <div className="add-review">
            {" "}
            <h3>Add Your Review</h3>
            <strong>{message}</strong>
            <div className="add-review-title">
              {" "}
              <label>Comment:</label>
              <input
                type="text"
                value={comment}
                onChange={handleCommentChange}
              />
            </div>
            <div>
              <label className="add-review-reviewtitle">Review:</label>
              <Rating
                name="half-rating"
                defaultValue={0.0}
                precision={0.5}
                onChange={handleRatingChange}
              />
            </div>
            <button onClick={handleAddComment}>Add Your Review</button>
          </div>
          <h3
            className="comments-toggle"
            onClick={() => setShowComments(!showComments)}
          >
            {showComments ? "Hide Comments" : "Show Comments"}
          </h3>
          {showComments && (
            <ul
              className={
                showComments ? "comments-list" : "comments-list hidden"
              }
            >
              {product.reviewComments.map(
                (review, index) =>
                  review.comment.trim() !== "" && (
                    <li key={index}>
                      <strong>User:</strong> {review.user},
                      <strong>Rated:</strong> {review.rating}
                      <strong>Comment:</strong> {review.comment}
                      <strong>Posted On:</strong> {review.timestamp}
                      {username && username === review.user && (
                        <span
                          className="delete-action"
                          onClick={() => handleUpdateComment(index)}
                        >
                          Edit
                        </span>
                      )}
                      {((username && username === review.user) || isAdmin) && (
                        <span
                          className="delete-action"
                          onClick={() => handleDeleteComment(index)}
                        >
                          Delete
                        </span>
                      )}
                    </li>
                  )
              )}
            </ul>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
