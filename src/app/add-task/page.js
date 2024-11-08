"use client";
import React, { useState } from "react";
import loginSvg from "../../assets/addTask.svg";
import Image from "next/image";
import { AddTasks } from "@/services/taskService";
import { toast } from "react-toastify";
const page = () => {
  const [task, setTask] = useState({
    title: "",
    content: "",
    userId: "6721dba56e5c2d5806861fdb",
    status: "none",
  });
  const handleSubmit = async () => {
    if (!task.title) {
      toast.error("Title is Required!!", { position: "bottom-right" });
      return;
    }
    if (!task.content) {
      toast.error("Content is required!!", { position: "bottom-right" });
      return;
    }
    // add side check-cases for data genunity
    try {
      const result = await AddTasks(task);
      //console.log(result);
      toast.success("Task added sucessfully", {
        position: "bottom-right",
      });
      setTask({
        title: "",
        content: "",
        status: "none",
      });
    } catch (err) {
      //console.log("error occured", err);
      toast.error("Error adding Task", {
        position: "bottom-right",
      });
    }
  };
  const clearData = () => {
    setTask({
      title: "",
      content: "",
      status: "none",
    });
  };
  // pass data to the service for passing it into db
  return (
    <div className="w-[50%] mx-auto my-6 px-[2rem]">
      <div className="flex items-center">
        <Image
          className="h-44 ml-10 w-40"
          alt="headImage"
          priority
          src={loginSvg}
        />
        <h1 className="text-2xl items-center">Add your task here..</h1>
      </div>
      <form className="mx-20 my-6" onSubmit={(e) => e.preventDefault()}>
        <div className="my-2">
          <label className="text-lg font-semibold">Task Title﹡</label>
          <input
            type="text"
            placeholder="Title..."
            value={task.title}
            className="my-1 block rounded-lg p-1.5 bg-gray-900 border border-gray-200 w-[90%] text-lg"
            onChange={(e) => {
              setTask({
                ...task,
                title: e.target.value,
              });
            }}
          ></input>
        </div>
        <div className="my-2">
          <label className="text-lg font-semibold">Content﹡</label>
          <textarea
            type="text"
            placeholder="Enter content here..."
            style={{ height: "160px" }}
            className="my-1 block rounded-lg p-1.5 bg-gray-900 border border-gray-200 w-[90%] text-lg"
            onChange={(e) => {
              setTask({
                ...task,
                content: e.target.value,
              });
            }}
            value={task.content}
          ></textarea>
        </div>
        <div className="my-2">
          <label className="text-lg font-semibold">Status</label>
          <select
            className="my-1 block rounded-lg p-1.5 bg-gray-900 border border-gray-200 w-[90%] text-sm"
            onChange={(e) => {
              setTask({
                ...task,
                status: e.target.value,
              });
            }}
            value={task.status}
          >
            <option value="none" disabled>
              --Select Status--
            </option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </form>
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 px-2 py-1 rounded-lg hover:bg-blue-800"
        >
          Add Task
        </button>
        <button
          onClick={clearData}
          className="bg-red-600 px-2 mx-2 py-1 rounded-lg hover:bg-red-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
export default page;

// now we have to pass data to db
// 1- create an axios instance for----DRY
// 2- use this instance and provide data to the db
// 3- add end cases for better err handling and reliability
