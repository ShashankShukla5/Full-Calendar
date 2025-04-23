import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { store } from "../store/store";
import { RxCross2 } from "react-icons/rx";

function Calendar() {
  const toggleAddEventPop = store((state) => state.toggleAddEventPop);
  const events = store((state) => state.events);
  const setStartDate = store((state) => state.setStartDate);
  const deleteEvent = store((state) => state.deleteEvent);

  const clickTimeOut = useRef(null);

  function handleDateClick(e) {
    if (clickTimeOut.current) {
      clearTimeout(clickTimeOut.current);
      clickTimeOut.current = null;
      setStartDate(e.dateStr);
      toggleAddEventPop(true);
      console.log("Yep, it's working!");
    } else {
      clickTimeOut.current = setTimeout(() => {
        clickTimeOut.current = null;
      }, 300);
    }
  }

  function deleteEventById(id) {
    if(window.confirm(`Do you want delete?`)){
      deleteEvent(id)
    }
  }

  function renderEventContent(eventInfo) {
    return (
      <div className="group flex items-center justify-between">
        <span className="overflow-hidden">{eventInfo.event.title}</span>
        <RxCross2
          className="hidden ml-2 cursor-pointer group-hover:inline"
          onClick={(e) => {
            e.stopPropagation();
            deleteEventById(eventInfo.event.id);
          }}
        />
      </div>
    );
  }

  // [&_.fc-col-header-cell-cushion]:text-xs
  return (
    <div className="w-full h-full flex flex-col items-center gap-5">
      <h1 className="text-black">Full Calendar</h1>
      <div className="w-[70%] bg-[#f3f3f3] p-7 rounded-2xl ">  
        <FullCalendar
          height="auto"
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay"
          }}
          editable={true}
          selectable={true}
          events={events}
          showNonCurrentDates={false}
          dateClick={handleDateClick}
          eventContent={renderEventContent}
          dayMaxEventRows={2}
        />
      </div>
    </div>
  );
}

export default Calendar;
