"use client";

import { validateEmail } from "@/helper/validation";
import { LoginUser } from "@/services/taskService";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async () => {
    //console.log(loginData);
    const validemail = validateEmail(loginData.email);
    if (!validemail) {
      toast.info("Invalid email-Id");
      return;
    }
    if (!loginData.email || !loginData.password) {
      toast.info("Email or Password is required");
      return;
    } //check user email from backend
    // check user password from backend
    try {
      const result = await LoginUser(loginData);
      //console.log(result.message);
    } catch (err) {
      toast.error("Invalid Credentials");
      return;
    }
  };
  const clearData = () => {
    setloginData({
      email: "",
      password: "",
    });
  };
  return (
    <div className="w-[60%] mx-auto m-4">
      <form className="p-4 mx-[25%]" onSubmit={(e) => e.preventDefault()}>
        <label className="text-lg">Email﹡</label>
        <input
          type="text"
          placeholder="Enter Email"
          className="block w-[90%] mb-1 p-2 bg-gray-900 rounded-lg border border-gray-200"
          onChange={(e) => {
            setloginData({
              ...loginData,
              email: e.target.value,
            });
          }}
          value={loginData.email}
        ></input>
        <label className="text-lg">Password﹡</label>
        <input
          type="password"
          placeholder="Enter Password"
          className="block w-[90%] mb-1 p-2 bg-gray-900 rounded-lg border border-gray-200"
          onChange={(e) => {
            setloginData({
              ...loginData,
              password: e.target.value,
            });
          }}
          value={loginData.password}
        ></input>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 px-2 mr-1 py-1 rounded-lg hover:bg-blue-800"
          >
            Login
          </button>
          <button
            onClick={clearData}
            className="bg-red-600 px-2 mx-1 py-1 rounded-lg hover:bg-red-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
