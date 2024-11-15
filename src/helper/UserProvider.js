"use client";

import { currentUserData } from "@/services/taskService";
import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";

export function UserProvider({ children }) {
  const [userData, setUserData] = useState(null);
  //pass a loading state so that it loads data in the mean time
  const [loading, setloading] = useState(true);
  const fetchData = async () => {
    try {
      const data = await currentUserData();
      setUserData(data);
    } catch (err) {
      console.error("userprovider err ", err);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchData();
    } else {
      setloading(false);
    }
  }, []);
  //console.log(userData);
  return (
    <UserContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
}
