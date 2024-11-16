import { httpInstance } from "@/helper/httpAxios";
import { toast } from "react-toastify";
// adding task to db from particular user-id
export async function AddTasks(task) {
  const result = await httpInstance
    .post("/api/tasks", task)
    .then((response) => response.data);
  return result;
}
// signing up new user
export async function SignupUser(signUpdata) {
  const result = await httpInstance
    .post("/api/SignUp", signUpdata)
    .then((response) => response.data);
  return result;
}
export async function logout() {
  const result = await httpInstance
    .post("/api/logOut")
    .then((response) => response.data);
  return result;
}
//logging in existing user
export async function LoginUser(loginData) {
  try {
    const response = await httpInstance.post("/api/SignIn", loginData);
    //console.log("login response", response);
    const result = await response.data;
    //console.log("login result", result);
    // Assuming the token is in result.token
    const token = result.token;
    if (token) {
      localStorage.setItem("token", token); // Store the token in localStorage
    } else {
      toast.error("Token not found in response.");
      console.error("Token not found in response.");
    }

    return result;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

// current user information

export async function currentUserData() {
  try {
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
    const response = await fetch("http://localhost:3000/api/currentUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    //console.log("User Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching current user data:", error);
    throw error;
  }
}
