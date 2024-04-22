/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import URL from "../services/URL";
import GetToken from "../services/GetToken";

export default function UpdateProductData() {
  const { productId } = useParams();
  let navigate = useNavigate();

  const findProductUrl = URL.findProductUrl();
  const findProductWithId = `${findProductUrl}/${productId}`;
  const updateProductUrl = URL.updateProductUrl();
  const updateProductWithId = `${updateProductUrl}/${productId}`;
  const token = GetToken.returnToken();
  const config = { headers: { Authorization: `${token}` } };

  const [product, setProduct] = useState({
    name: "",
    yearOfRelease: "",
    photo: "",
    rating: "",
    reviewComments: [],
    totalRatingValue: 0,
    numberOfUsersGivenRating: 0,
    _id: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleInputChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setProduct({
        ...product,
        productPhoto: reader.result,
      });
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleBackButton = () => {
    navigate(`/product/${productId}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Updating product data: ", product);
    try {
      var response = await axios.put(updateProductWithId, product, config);
      console.log(response);
      if (response.data.status === "success") {
        setErrorMessage("Product updated successfully!");
        setProduct({
          name: "",
          yearOfRelease: "",
          photo: null,
        });
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div className="product-data-container">
      <h2 className="container-title">Update Product Data</h2>
      <h3 className="error-message">{errorMessage}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            required
            type="text"
            name="productName"
            value={product.productName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description :
          <input
            required
            type="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Upload Product Photo:
          <input type="file" onChange={handleImageChange} />
        </label>
        <br />
        <div>
          {product.productPhoto === "" || product.productPhoto === null ? (
            ""
          ) : (
            <img
              alt={product.name}
              width={100}
              height={100}
              src={product.productPhoto}
            />
          )}
        </div>
        <button onClick={handleBackButton}>Cancel</button>{" "}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
