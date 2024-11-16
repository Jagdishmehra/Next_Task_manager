"use client";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "@/helper/UserContext";
import { logout } from "@/services/taskService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import SkeletonLoader from "./SkeletonLoader";

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const data = useContext(UserContext);
  const { userData } = data || {};
  //console.log(data);
  const { username, photoUrl } = userData?.user || userData || "default";
  //shimmer effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000); // Simulate a 3s load
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    try {
      const result = await logout();
      console.log("Logout success");
      toast.info(result.message);
      data.setUserData("undefined");
      localStorage.clear();
      router.replace("/loginForm");
    } catch (err) {
      toast.error(err.response.data.message);
      console.log("Error logging out ", err.response.data.message);
    }
  };
  return isLoading ? (
    <SkeletonLoader />
  ) : (
    <div className="bg-blue-600 py-5 px-6">
      <div className="flex justify-between">
        <h1 className="text-xl">
          <Link href="/">Website Name</Link>
        </h1>

        {/* {check for the header files} */}
        {userData || userData?.user ? (
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
        ) : (
          <div></div>
        )}

        {userData || userData?.user ? (
          <ul className="text-lg flex space-x-2 ">
            <li className="hover:text-blue-400 flex">
              <Link href="/userProfile" className="flex mr-4">
                <img src={photoUrl} alt="profile url" width={30} height={10} />
                {username}
              </Link>
            </li>
            <li className="hover:text-blue-400">
              <button onClick={handleSubmit}>Logout</button>
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
