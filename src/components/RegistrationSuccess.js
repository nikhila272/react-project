import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegistrationSuccess() {
  let navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div>
      <h1>Registration Successful!</h1>
      <p>You will be redirected to the login page shortly.</p>
    </div>
  );
}
