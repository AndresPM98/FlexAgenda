import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import DatePicker from "react-datepicker";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { getClients } from "../../Redux/Actions";
import { getTurns } from "../../Redux/Actions";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";

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

function CalendarxD() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState([]);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTurns());
  }, [dispatch]);

  const profClientsTurns = useSelector((state) => state.turns);

  useEffect(() => {
    const newEvents = profClientsTurns.map((turn) => {
      const title = turn.client.name;
      const start = new Date(turn.date + "T" + turn.hour);
      const end = new Date(turn.date + "T" + turn.hour);
      const key = turn.id;
      return { ...newEvent, title, start, end };
    });

    setAllEvents([...allEvents, ...newEvents]);
  }, [profClientsTurns]);

  const history = useHistory();

  function handleSelectEvent(event, id) {
    history.push("/queryDetail/4ba9feaa-0946-4533-8171-7db59d62d842"); //despues va a ser por ID
  }

  function handleSelectSlot(slotInfo) {
    history.push("/home");
  }

  return (
    <div>
      <h1>Calendar</h1>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        views={['month','agenda']}
        defaultView="month"
        onSelectEvent={handleSelectEvent}
        selectable={true} // Habilitar la selección de espacios en blanco
        onSelectSlot={handleSelectSlot} // Agregar este método para manejar la selección de espacios en blanco
      />
    </div>
  );
}

export default CalendarxD;
