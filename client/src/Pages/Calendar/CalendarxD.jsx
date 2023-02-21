import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
/* format: Una función de date-fns que se utiliza para formatear una fecha según un patrón especificado. En este caso, la función format se importa desde date-fns/format.

parse: Una función de date-fns que se utiliza para analizar una cadena de fecha y devolver un objeto de fecha. En este caso, la función parse se importa desde date-fns/parse.

startOfWeek: Una función de date-fns que devuelve el primer día de la semana para una fecha dada. En este caso, la función startOfWeek se importa desde date-fns/startOfWeek.

getDay: Una función de date-fns que devuelve el número del día de la semana para una fecha dada. En este caso, la función getDay se importa desde date-fns/getDay.

locales: Un objeto que contiene localizaciones de fecha para diferentes idiomas. En este caso, se especifica una localización para el idioma español utilizando es como clave y la localización require("date-fns/locale/es") como valor. */

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
      /*  es un controlador de eventos que se ejecuta cuando se hace clic en un botón o se envía un formulario. Primero, se itera sobre todos los eventos en la lista allEvents y se comparan las fechas de inicio y finalización de los eventos con las fechas de inicio y finalización del nuevo evento que se va a agregar. Si las fechas del nuevo evento se superponen con las fechas de cualquier evento existente, se muestra una alerta y se detiene la iteración. Si no hay superposiciones, el nuevo evento se agrega a la lista de eventos existentes mediante la función setAllEvents. */
    }

    setAllEvents([...allEvents, newEvent]);
  }

  return (
    <div>
      <h1>Calendar</h1>
      <h2>Add New Event</h2>
      <div>
        <input
          type="text"
          placeholder="Add Title"
          style={{ width: "20%", marginRight: "10px" }}
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          style={{ marginRight: "10px" }}
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
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
