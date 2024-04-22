import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddNewProduct() {
  let navigate = useNavigate();
  
  function addNewProduct(){
    navigate("/add-product-data"); 
  }

  return (
    <div className='add-product-button'>
      <button onClick={addNewProduct}>Add New Product</button>
    </div>
  );
}