/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import HelperService from "../services/HelperService";
import AddNewProduct from "./AddNewProduct"; 
import DisplayProducts from "./DisplayProducts"; 

export default function Body({ searchTerm }) {
  const user = HelperService.getCurrentUserData();

  const [username, setUsername] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <div>
      {isAdmin && <AddNewProduct />}
      <DisplayProducts searchTerm={searchTerm} />
    </div>
  );
}
