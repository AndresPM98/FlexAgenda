import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  getTurns,
  getProfessionals,
  setCurrentDateAction,
} from "../../Redux/Actions"; //importa la acción setCurrentDate
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import Loading from "../Loading/Loading";
import Error404 from "../../Components/Error404/Error404";
import "./Calendar.css";
import Swal from "sweetalert2";

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
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    key: "",
  });
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const dispatch = useDispatch();
  console.log("IDCALENDAR", id);

  const profClientsTurns = useSelector((state) => state.turns);
  const allProfessionals = useSelector((state) => state.allProfessionals);
  const findProfessional = allProfessionals.find((prof) => id === prof.id);

  const nameProfessional = findProfessional ? (
    findProfessional.name
  ) : (
    <Error404 />
  );

  useEffect(() => {
    dispatch(getTurns());
    dispatch(getProfessionals()).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  const memoizedEvents = useMemo(() => {
    const filteredTurns = profClientsTurns.filter(
      (turn) => turn.professionalID === id
    );
    return filteredTurns.map((turn) => {
      const title = turn.client.name;
      const start = new Date(turn.date + "T" + turn.hour);
      const end = new Date(
        new Date(turn.date + "T" + turn.hour).getTime() + 30 * 60000
      ); // Agrega 30 minutos a la hora de finalización
      const key = turn.id;
      return { ...newEvent, title, start, end, key };
    });
  }, [profClientsTurns, newEvent, id]);

  const history = useHistory();

  function handleSelectEvent(event) {
    history.push(`/queryDetail/${event.key}`); //despues va a ser por ID
  }

  if (id === "16aa4db8-b8cf-43bf-989a-5c7945212080") {
    history.push(`/admin/${id}`);
  }

  const profesional = allProfessionals.find((prof) => prof.id === id);

  if (profesional && profesional.disponibility === false) {
    history.push(`/blockedPage`);
  }

  function handleSelectSlot(slotInfo) {
    const selectedDay = slotInfo.start.getDay();
    if (selectedDay === 0 || selectedDay === 6) {
      Swal.fire({
        title: "Dia deshabilitado",
        icon: "warning",
        text: "No se puede seleccionar los fines de semana.",
        confirmButtonText: "Aceptar",
      });
    } else {
      const reconfiguredDate = slotInfo.start.toISOString().split('T')[0]; 
      // console.log(reconfiguredDate);
      dispatch(setCurrentDateAction(reconfiguredDate)); 
      
      history.push(`/home/${findProfessional.id}`);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return nameProfessional ? (
    <div className="containerCalendar">
      <NavbarTwo />

      <h1 className="saludoCalendar">Hola {nameProfessional} </h1>
      <br />
      <h3 className="turnosCount">
        {profClientsTurns.length
          ? `Tienes ${memoizedEvents.length} turnos`
          : "No hay turnos"}
      </h3>
      <Calendar
        className="calendar"
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
    </div>
  ) : (
    <Error404 />
  );
}

export default CalendarxD;
