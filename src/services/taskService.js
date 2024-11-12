// now use that insatnce for http request

import { httpInstance } from "@/helper/httpAxios";
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
//logging in existing user
export async function LoginUser(loginData) {
  const result = await httpInstance
    .post("/api/SignIn", loginData)
    .then((response) => response.data);
  return result;
}
// current user information

export async function currentUserData() {
  try {
    console.log("making get request");
    const result = await httpInstance.get("/api/currentUser");
    console.log("not getting here");
    console.log(result);
    const info = result.then((response) => response.data);
    console.log("this is get user result " + info);
    return info;
  } catch (err) {
    console.log("this is get user req " + err.message);
  }
}
