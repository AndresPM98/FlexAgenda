import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useSelector, useDispatch } from "react-redux";
import { getClients } from "../../Redux/Actions";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getTurns } from "../../Redux/Actions";

const locales = {
  "es": require("date-fns/locale/es"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Big Meeting",
    allDay: true,
    start: new Date(2023, 6, 0),
    end: new Date(2023, 6, 0),
  },
  {
    title: "Vacation",
    start: new Date(2023, 6, 7),
    end: new Date(2023, 6, 10),
  },
  {
    title: "Conference",
    start: new Date(2023, 6, 20),
    end: new Date(2023, 6, 23),
  },
];
/* Array de eventos para mostrar en el calendario */

function CalendarxD() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState(events);

  

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getTurns());
  }, [dispatch]);

  const profClientsTurns = useSelector((state) => state.turns);

  function handleAddEvent() {
    for (let i = 0; i < allEvents.length; i++) {
      const d1 = new Date(allEvents[i].start);
      const d2 = new Date(newEvent.start);
      const d3 = new Date(allEvents[i].end);
      const d4 = new Date(newEvent.end);
      
          /* console.log(d1 <= d2);
          console.log(d2 <= d3);
          console.log(d1 <= d4); */
          
            

      if ((d1 <= d2 && d2 <= d3) || (d1 <= d4 && d4 <= d3)) {
        alert("CLASH");
        break;
      }
    
    }
   
    const newEvents = profClientsTurns.map((turn) => {
      const title = turn.client.name;
      const start = turn.date + "T" + turn.hour;
      const end = turn.date + "T" + turn.hour;
      return { ...newEvent, title, start, end };
    });
  
    setNewEvent({ title: '', start: '', end: '' });
    setAllEvents([...allEvents, ...newEvents]);
  }

  console.log(profClientsTurns);
  console.log(allEvents);

  return (
    <div>
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        
        

        <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
          Add Event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
      />
    </div>
  );
}

export default CalendarxD;
