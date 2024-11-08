"use client";
import { validateEmail } from "@/helper/validation";
import { LoginUser } from "@/services/taskService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import loginSvg from "../../assets/login.svg";
import Image from "next/image";
const page = () => {
  const router = useRouter();
  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async () => {
    //console.log(loginData);
    const validemail = validateEmail(loginData.email);
    if (!validemail) {
      toast.error("Invalid email-Id", { position: "bottom-right" });
      return;
    }
    if (!loginData.email || !loginData.password) {
      toast.info("Email or Password is required", { position: "bottom-right" });
      return;
    } //check user email from backend
    // check user password from backend
    try {
      const result = await LoginUser(loginData);
      //add success case for user name
      if (result.message === "login successful") {
        toast.success(result.message, { position: "bottom-right" });
        router.replace("/userProfile");
      } else return toast.error(result.message, { position: "bottom-right" });
    } catch (err) {
      toast.error("Invalid Credentials!!", { position: "bottom-right" });
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
    <div className="w-[60%] mx-auto m-4 pb-16">
      <div className="flex items-center">
        <Image
          src={loginSvg}
          className="h-56 w-[35%]"
          alt="signInImage"
          priority
        />
        <h1 className="font-bold text-3xl mx-6">
          Welcome
          <p className="text-sm font-thin">login here!!</p>
        </h1>
      </div>
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
