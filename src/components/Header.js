"use client";

import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="bg-blue-600 py-5 px-6">
      <div className="flex justify-between">
        <h1 className="text-xl">
          <Link href="/">Website Name</Link>
        </h1>

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
        <ul className="text-lg flex space-x-2 ">
          <li className="hover:text-blue-400">
            <Link href="/SignIn">Login</Link>
          </li>
          <li className="hover:text-blue-400">
            <Link href="/SignUp">SignUp</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
