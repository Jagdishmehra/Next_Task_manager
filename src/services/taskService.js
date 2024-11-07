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
