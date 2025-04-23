import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { store } from "../store/store";
import { nanoid } from 'nanoid';

function PopAddEvent() {
  const toggleAddEventPop = store((state) => state.toggleAddEventPop);
  const setNewEvent = store((state) => state.setNewEvent);
  const startDate = store((state) => state.startDate);
  const popUpRef = useRef(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const watchStart = watch("start");

  useEffect(() => {
    if (watchStart) {
      setValue("end", watchStart);
    }
  }, [watchStart]);

  function createNewEvent(formData) {
    setNewEvent({id: nanoid(), ...formData});
    toggleAddEventPop(false);
  }

  useEffect(()=>{
    const handleMouseClick = (e)=> {
        if(popUpRef.current && !popUpRef.current.contains(e.target)){
            reset({
                title: null,
                start: null,
                end: null
            })
            toggleAddEventPop(false)
        }
        if(e.key === "Escape"){
            reset({
                title: null,
                start: null,
                end: null
            })
            toggleAddEventPop(false)
        }
    }
    if(toggleAddEventPop){
        document.addEventListener("mousedown", handleMouseClick)
        document.addEventListener("keydown", handleMouseClick)
    }
    return()=>{
        document.removeEventListener("mousedown", handleMouseClick)
        document.removeEventListener("keydown", handleMouseClick)
    }
  })

  return (
    <form
    ref={popUpRef}
      onSubmit={handleSubmit(createNewEvent)}
      className=" bg-gray-100 w-fit h-fit flex flex-col items-start py-5 px-10 gap-5 mt-30 rounded-xl"
    >
      <div className="flex gap-2">
        <label htmlFor="eventName" className="text-black">
          Event Name:{" "}
        </label>
        <div className="flex flex-col items-start">
          <input
            type="text"
            id="eventName"
            className={`bg-gray-200 rounded-md w-50 px-2 text-black focus:outline-none ${
              errors.title ? "border border-red-500" : ""
            }`}
            {...register("title", {
              required: "Name is required",
            })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm mt-1">
              {errors.title.message}
            </span>
          )}
        </div>
      </div>
      <div className="w-full flex justify-between">
        <label htmlFor="startDate" className="text-black">
          Start:{" "}
        </label>
        <div className="flex flex-col items-start">
          <input
            type="date"
            id="startDate"
            className={`bg-gray-200 rounded-md w-50 px-2 focus:outline-none text-black ${
              errors.start ? "border border-red-500" : ""
            }`}
            defaultValue={startDate}
            {...register("start", {
              required: "Start Date is required",
            })}
          />
          {errors.startDate && (
            <span className="text-red-500 text-sm mt-1">
              {errors.start.message}
            </span>
          )}
        </div>
      </div>
      <div className="w-full flex justify-between">
        <label htmlFor="endDate" className="text-black">
          End:{" "}
        </label>
        <input
          type="date"
          id="endDate"
          className="bg-gray-200 rounded-md w-50 px-2 focus:outline-none text-black"
          {...register("end")}
        />
      </div>
      <button
        type="submit"
        className="m-auto px-4 py-2 rounded-md text-white hover:cursor-pointer hover:bg-blue-500 transition mt-3 bg-blue-400"
      >
        Add Event
      </button>
    </form>
  );
}

export default PopAddEvent;
