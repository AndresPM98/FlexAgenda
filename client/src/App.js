import "./App.css";
import { Route } from "react-router-dom";
import EditProfileProf from "../src/Pages/EditProfileProf/EditProfileProf.jsx";
import {
  Form,
  Home,
  LandingPage,
  ProfessionalPage,
  QueryPage,
  FormClient,
  Login
} from "./Pages";
import CalendarxD from "./Pages/Calendar/CalendarxD";

import ProfessionalTakeTurn from "./Pages/ProfessionalTakeTurn/ProfessionalTakeTurn"
import axios from "axios";
import Footer from "./Components/Footer/Footer";
axios.defaults.baseURL = "https://backend-pf-production-1672.up.railway.app/";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/form" component={Form} />
      <Route exact path="/formClient" component={FormClient} />
      <Route exact path="/Calendarpage" component={CalendarxD} />

      <Route
        exact
        path="/professionalDetail/:id"
        component={ProfessionalPage}
      />
      <Route
        exact
        path="/profTT/:id"
        component={ProfessionalTakeTurn}
      />
      <Route exact path="/professional/edit/:id" component={EditProfileProf} />

      <Route exact path="/queryDetail/:id" component={QueryPage} />
      <Route path="/login" component={Login} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default App;
