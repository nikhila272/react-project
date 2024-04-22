/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import DisplayProduct from "./DisplayProduct";
import ReactPaginate from "react-paginate";
import GetToken from "../services/GetToken";
import URL from "../services/URL";

export default function DisplayProducts({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 4;
  const pagesVisited = pageNumber * productsPerPage;

  const getAllProductsUrl = URL.getAllProductsUrl();
  const token = GetToken.returnToken();
  const config = { headers: { Authorization: `${token}` } };

  const getAllProducts = async () => {
    try {
      const response = await axios.get(getAllProductsUrl, config);
      let filteredProducts = response.data.data;

      if (searchTerm) {
        filteredProducts = filteredProducts.filter((product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setProducts(filteredProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, [searchTerm]);

  const displayProducts = products
    .slice(pagesVisited, pagesVisited + productsPerPage)
    .map((product) => (
      <DisplayProduct
        key={product._id} 
        productName={product.productName}
        description={product.description}
        productPhoto={product.productPhoto}
        rating={product.rating}
        reviewComments={product.reviewComments}
        totalRatingValue={product.totalRatingValue}
        numberOfUsersGivenRating={product.numberOfUsersGivenRating}
        productId={product._id} 
      />
    ));

  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div>
      {displayProducts.length > 0 ? (
        <div>
          {displayProducts}
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
            pageLinkClassName={"pagination__number"}
          />
        </div>
      ) : (
        <p>No Products Available</p>
      )}
    </div>
  );
}
