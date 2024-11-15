"use client";

import { UserContext } from "@/helper/UserContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

const Header = () => {
  const data = useContext(UserContext);
  const { userData } = data || {};
  //console.log(data);
  const { username, photoUrl } = userData?.user || userData || "default";
  return (
    <div className="bg-blue-600 py-5 px-6">
      <div className="flex justify-between">
        <h1 className="text-xl">
          <Link href="/">Website Name</Link>
        </h1>
        <nav>
          <ul className="flex space-x-3">
            <li className="text-lg hover:text-blue-400">
              <Link href="/">Home</Link>
            </li>
            <li className="text-lg hover:text-blue-400">
              <Link href="/showTask">ShowTask</Link>
            </li>
            <li className="text-lg hover:text-blue-400">
              <Link href="/add-task">AddTasks</Link>
            </li>
          </ul>
        </nav>
        {userData || userData?.user ? (
          <ul className="text-lg flex space-x-2 ">
            <li className="hover:text-blue-400 flex">
              <Link href="/userProfile" className="flex mr-4">
                <img src={photoUrl} alt="profile url" width={30} height={10} />
                {username}
              </Link>
            </li>
            <li className="hover:text-blue-400">
              <Link href="/logout">Logout</Link>
            </li>
          </ul>
        ) : (
          <ul className="text-lg flex space-x-2 ">
            <li className="hover:text-blue-400">
              <Link href="/loginForm">Login</Link>
            </li>
            <li className="hover:text-blue-400">
              <Link href="/signupForm">SignUp</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;
