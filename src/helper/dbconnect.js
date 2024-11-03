import mongoose from "mongoose";

export const dbconnect = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return console.log("db already connected");
    }
    await mongoose.connect(process.env.MONGOOSE_CONNECT, {
      dbName: "Work_Manager",
    });
    console.log("db connected succesfully");
    //console.log(connections);
  } catch (err) {
    console.error(err.message);
  }
};
