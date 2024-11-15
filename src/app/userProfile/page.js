"use client";

import { UserContext } from "@/helper/UserContext";
import { useContext } from "react";

const page = () => {
  const data = useContext(UserContext);
  console.log(data);
  const { loading, userData } = data || {};
  //console.log(loading);
  if (loading) {
    return <h1 className="text-white font-bold text-3xl">loading....</h1>;
  }
  //if the data is from login and also from the context check
  console.log("data from user profile", data);
  const { username, photoUrl, about, email } = userData?.user || userData;
  //console.log(username, email, about, photoUrl);

  return (
    <div>
      <div className="mt-5 p-4">
        <img src={photoUrl} width={80} height={80} alt="userProfile" />
      </div>
    </div>
  );
};

export default page;
