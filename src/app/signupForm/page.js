"use client";
import React, { useState } from "react";
import signupImg from "../../assets/signup.svg";
import Image from "next/image";
import { SignupUser } from "@/services/taskService";
import { toast } from "react-toastify";
const page = () => {
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    email: "",
    about: "",
  });
  const clearData = () => {
    setSignupData({
      username: "",
      password: "",
      email: "",
      about: "",
    });
  };
  const handleSubmit = async () => {
    // console.log(signupData);
    if (!signupData.username) {
      toast.error("UserName is required!!", { position: "bottom-right" });
      return;
    }
    if (!signupData.email) {
      toast.error("Email is required!!", { position: "bottom-right" });
      return;
    }
    if (!signupData.password) {
      toast.error("Password is required!!", { position: "bottom-right" });
      return;
    }
    try {
      const result = await SignupUser(signupData);
      toast.success("User signedUp sucessfully", { position: "bottom-right" });
      setSignupData({
        username: "",
        password: "",
        email: "",
        about: "",
      });
      console.log(result);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        toast.error("Error Signing User", {
          position: "bottom-right",
        });
      }
    }
  };
  return (
    <div className="w-[60%] m-4 mx-auto">
      <div className="flex items-center">
        <Image
          className="h-56  w-[28%]"
          alt="signUpImage"
          priority
          src={signupImg}
        />
        <div className="flex flex-col">
          <h1 className="text-2xl items-center">
            Create an Account to get started
          </h1>
          <h1 className="text-md items-center">
            Just a single step and you're done!
          </h1>
        </div>
      </div>
      <form className="p-4 mx-[25%]" onSubmit={(e) => e.preventDefault()}>
        <label className="text-lg">UserName﹡</label>
        <input
          type="text"
          placeholder="Enter UserName"
          className="block w-[90%] mb-1 p-2 bg-gray-900 rounded-lg border border-gray-200"
          onChange={(e) => {
            setSignupData({
              ...signupData,
              username: e.target.value,
            });
          }}
          value={signupData.username}
        ></input>
        <label className="text-lg">Email﹡</label>
        <input
          type="text"
          placeholder="Enter Email"
          className="block w-[90%] mb-1 p-2 bg-gray-900 rounded-lg border border-gray-200"
          onChange={(e) => {
            setSignupData({
              ...signupData,
              email: e.target.value,
            });
          }}
          value={signupData.email}
        ></input>
        <label className="text-lg">Password﹡</label>
        <input
          type="password"
          placeholder="Enter Password"
          className="block w-[90%] mb-1 p-2 bg-gray-900 rounded-lg border border-gray-200"
          onChange={(e) => {
            setSignupData({
              ...signupData,
              password: e.target.value,
            });
          }}
          value={signupData.password}
        ></input>
        <label className="text-lg">About</label>
        <textarea
          placeholder="Optional..."
          className="block w-[90%] mb-1 p-2 bg-gray-900 rounded-lg border border-gray-200"
          onChange={(e) => {
            setSignupData({
              ...signupData,
              about: e.target.value,
            });
          }}
          value={signupData.about}
        ></textarea>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 px-2 mr-1 py-1 rounded-lg hover:bg-blue-800"
          >
            SignUp
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
