import axios from "axios";
import React, { useState } from "react";
import GetToken from "../services/GetToken";
import URL from "../services/URL";

const AddProductData = () => {
  const token = GetToken.returnToken();
  const addProductUrl = URL.addProductUrl();
  const config = { headers: { Authorization: `${token}` } };

  const [errorMessage, setErrorMessage] = useState("");

  const [productData, setProductData] = useState({
    productName: "",
    description: "",
    productPhoto: null,
    rating: "",
    reviewComments: [],
    totalRatingValue: 0,
    numberOfUsersGivenRating: 0,
  });

  const handleInputChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setProductData({
        ...productData,
        productPhoto: reader.result,
      });
    };

    reader.onerror = (error) => {
      console.log("Error: ", error);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting product data: ", productData);
    try {
      var response = await axios.post(addProductUrl, productData, config);
      console.log(response);
      if (response.data.status === "success") {
        setErrorMessage("Product added successfully!");
        setProductData({
          productName: "",
          description: "",
          productPhoto: null,
        });
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div className="product-data-container">
      <h2 className="container-title">Add Product Data</h2>
      <h3 className="error-message">{errorMessage}</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input
            required
            type="text"
            name="productName"
            value={productData.productName}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            required
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Upload Product Photo:
          <input required type="file" onChange={handleImageChange} />
        </label>
        <br />
        <div>
          {productData.productPhoto === "" ||
          productData.productPhoto === null ? (
            ""
          ) : (
            <img
              alt={productData.productName}
              width={100}
              height={100}
              src={productData.productPhoto}
            />
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProductData;
