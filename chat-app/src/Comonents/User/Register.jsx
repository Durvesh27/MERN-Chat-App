import React, { useEffect } from "react";
import { useState } from "react";
import "./Form.css";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "./../ApiConfig/index.js";
const Register = () => {
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useNavigate();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPicLoading(true);
    if (userData.name && userData.email && userData.password) {
      try {
        const response = await api.post("/user/register", { userData, pic });
        if (response.data.success) {
          setUserData({
            name: "",
            email: "",
            password: "",
          });
          toast.success(response.data.message);
          router("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error, "Axxios");
        setPicLoading(false);
      }
    } else {
      toast.error("Please fill all the Fields");
      setPicLoading(false);
    }
  };
  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast.error("Please select an Image 111");
      return;
    }
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/png" ||
      pics.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dyieq51qn");
      fetch("https://api.cloudinary.com/v1_1/dyieq51qn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setPicLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setPicLoading(false);
        });
    } else {
      toast.error("Please select an Image");
    }
  };
  return (
    <div>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU0UhELJroPOnXD07iIuaVAP4c_LUokUbklw&usqp=CAU"
        alt=""
        className="form-img"
      />
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
          <label>Upload Profile pic</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
            className="input"
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
          {picLoading ? (
            <input
              type="submit"
              value="Register"
              style={{ backgroundColor: "grey" }}
            />
          ) : (
            <input type="submit" value="Register" />
          )}
        </>
        <p>
          Already have an account?{" "}
          <b style={{ color: "green" }} onClick={() => router("/")}>
            Login
          </b>
        </p>
      </form>
    </div>
  );
};

export default Register;
