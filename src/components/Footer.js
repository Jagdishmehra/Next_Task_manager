"use client";

import React from "react";

const Footer = () => {
  return (
    <div className="bg-blue-600 h-[10rem] px-8">
      <div className="flex justify-between">
        <div>
          <h1 className="text-lg pl-[10rem] pt-[1rem]">Work Manager</h1>
          <p className="pl-4 py-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>
        </div>
        <div>
          <ul className="pt-4">
            <li className="">Important Links-</li>
            <li className="hover:text-blue-400 cursor-pointer">Instagram</li>
            <li className="hover:text-blue-400 cursor-pointer">Facebook</li>
            <li className="hover:text-blue-400 cursor-pointer">Github</li>
            <li className="hover:text-blue-400 cursor-pointer">Linkdin</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        Copyright © 2024 Work Manager. Trademark Policy
      </div>
    </div>
  );
};

export default Footer;
