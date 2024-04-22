const addProductUrl = () => {
  return "https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/products";
};

const getAllProductsUrl = () => {
  return "https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/products";
};

const findProductUrl = () => {
  return `https://smooth-comfort-405104.uc.r.appspot.com/document/findOne/products`;
};

const updateProductUrl = () => {
  return `https://smooth-comfort-405104.uc.r.appspot.com/document/updateOne/products`;
};

const deleteProductUrl = () => {
  return `https://smooth-comfort-405104.uc.r.appspot.com/document/deleteOne/products`;
};

const findAllUsersUrl = () => {
  return "https://smooth-comfort-405104.uc.r.appspot.com/document/findAll/users";
};

const createUserUrl = () => {
  return "https://smooth-comfort-405104.uc.r.appspot.com/document/createorupdate/users";
};

const URL = {
  addProductUrl,
  getAllProductsUrl,
  findAllUsersUrl,
  createUserUrl,
  findProductUrl,
  updateProductUrl,
  deleteProductUrl,
};

export default URL;
