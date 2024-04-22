const getCurrentUserData = () => {
    return JSON.parse(localStorage.getItem("userData"));
  };
  
  const HelperService = {
    getCurrentUserData,
  };
  
  export default HelperService;