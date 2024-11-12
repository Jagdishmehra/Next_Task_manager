//import { httpInstance } from "@/helper/httpAxios";
import { currentUserData } from "@/services/taskService";

const page = async () => {
  try {
    console.log("this is user profile data");
    const userData = await currentUserData();
    console.log(userData);
    console.log("not logging inside user data");
  } catch (err) {
    console.log(err.message);
  }

  return (
    <div>
      this is user userProfile
      <button className="bg-red-600 p-1">signOut</button>
    </div>
  );
};

export default page;
