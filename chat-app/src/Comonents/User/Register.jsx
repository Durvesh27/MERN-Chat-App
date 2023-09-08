import React, {useEffect } from "react";
import { useState } from "react";
import "./Form.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    pic:"",
    password: ""
  });

  const router = useNavigate();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    if (
      userData.name &&
      userData.email &&
      userData.pic &&
      userData.password 
    ) {
      console.log("work")
        const response = await axios.post("http://localhost:5000/register", { userData });
        if (response.data.success) {
          setUserData({
            name: "",
            email: "",
            pic:"",
            password: ""
          });
          toast.success(response.data.message);
          router("/login");
        } else {
          toast.error(response.data.message);
        }
    } else {
      toast.error("Please fill all the Fields");
    }
  };

  return (
    <div>
       
      <form onSubmit={handleSubmit} className="form">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>
        <>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
          value={userData.name}
          className="input"
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter Email Id"
          onChange={handleChange}
          value={userData.email}
          className="input"
        />
        <br />
        <label >Upload Profile pic</label>
        <input
          type="file"
          name="pic"
          onChange={handleChange}
          // p={1.5}
          // accept="image/*"
          // onChange={(e)=>postDetails(e.target.files[0])}
          className="input"
          value={userData.pic}
          
        />
        <input
          type="password"
          name="password"
          placeholder="Create new password"
          onChange={handleChange}
          className="input"
          value={userData.password}
        />
        <br />
        <input type="submit" value="Register" />
        </>
        <p>
          Already have an account?{" "}
          <b style={{ color: "green" }} onClick={() => router("/login")}>
            Login
          </b>
        </p>
      </form>
    </div>
  );
};

export default Register;
