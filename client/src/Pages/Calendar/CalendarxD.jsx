import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import { getTurns, getProfessionals, setCurrentDateAction } from "../../Redux/Actions"; //importa la acción setCurrentDate
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Loading from "../Loading/Loading";
import Error404 from "../../Components/Error404/Error404";


const locales = {
  es: require("date-fns/locale/es"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarxD() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "", key: "" });
  const [loading, setLoading] = useState(true);

  const { id } = useParams(); 
  const dispatch = useDispatch();

  const profClientsTurns = useSelector((state) => state.turns);
  const allProfessionals = useSelector((state) => state.allProfessionals);
  const findProfessional = allProfessionals.find((prof) => id === prof.id);
  
  const nameProfessional = findProfessional
    ? findProfessional.name
    : <Error404 />;

  useEffect(() => {
    dispatch(getTurns());
    dispatch(getProfessionals()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const memoizedEvents = useMemo(() => {
    const filteredTurns = profClientsTurns.filter((turn) => turn.professionalID === id);
    return filteredTurns.map((turn) => {
      const title = turn.client.name;
      const start = new Date(turn.date + "T" + turn.hour);
      const end = new Date(new Date(turn.date + "T" + turn.hour).getTime() + 30 * 60000); // Agrega 30 minutos a la hora de finalización
      const key = turn.id;
      return { ...newEvent, title, start, end, key };
    });
  }, [profClientsTurns, newEvent, id]);

  const history = useHistory();

  function handleSelectEvent(event) {
    history.push(`/queryDetail/${event.key}`); //despues va a ser por ID
  }

  function handleSelectSlot(slotInfo) {
    const selectedDay = slotInfo.start.getDay();
    if (selectedDay === 0 || selectedDay === 6) {
      alert("Día deshabilitado.");
    } else {
      dispatch(setCurrentDateAction(slotInfo.start)); // actualiza el estado del reducer con la nueva fecha seleccionada
      history.push(`/home/${findProfessional.id}`);
    }
  }

  if (loading) {
    return <Loading />;
  }


  return (
    nameProfessional ? 
    <div>
      <NavbarTwo/>

<h1>Hola {nameProfessional}  !</h1>
<p>
  {profClientsTurns.length
    ? `Tienes ${memoizedEvents.length} turnos`
    : "No hay turnos"}
</p>
      <Calendar
        localizer={localizer}
        events={memoizedEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        views={["month", "agenda"]}
        defaultView="month"
        onSelectEvent={handleSelectEvent}
        selectable={true} // Habilitar la selección de espacios en blanco
        onSelectSlot={handleSelectSlot} // Agregar este método para manejar la selección de espacios en blanco
      />
    </div> :
    <Error404 />
  );
}

export default CalendarxD;
