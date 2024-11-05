// now use that insatnce for http request

import { httpInstance } from "@/helper/httpAxios";

export async function AddTasks(task) {
  const result = await httpInstance
    .post("/api/tasks", task)
    .then((response) => response.data);
  return result;
}
