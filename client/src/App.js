import "./App.css";
import { Switch, Route } from "react-router-dom";
import EditProfileProf from "../src/Pages/EditProfileProf/EditProfileProf.jsx";
import {
  Form,
  Home,
  LandingPage,
  ProfessionalPage,
  QueryPage,
  FormClient,
  Login,
  AllProfessionals,
  PaymentApproved,
  SignUp,
  LoginFirebase,
  PaymentFailure,
  LoginClient,
} from "./Pages";

import CalendarxD from "./Pages/Calendar/CalendarxD";
import Borrador from "./Pages/BorradorLogico/Borrador";
import AllProfessionalPageById from "./Pages/allProfessionalPageById/allProfessionalPageById";
import Error404 from "./Components/Error404/Error404";
import ProfessionalTakeTurn from "./Pages/ProfessionalTakeTurn/ProfessionalTakeTurn";
import FormService from "./Pages/FormService/FormService";
import axios from "axios";
import Footer from "./Components/Footer/Footer";

axios.defaults.baseURL = "https://backend-pf-production-1672.up.railway.app/";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/form/:id" component={Form} />
        <Route exact path="/formClient/:id" component={FormClient} />
        <Route exact path="/loginClient/:id" component={LoginClient} />
        <Route exact path="/Calendarpage/:id" component={CalendarxD} />
        <Route
          exact
          path="/professionalDetail/:id"
          component={ProfessionalPage}
        />
        <Route exact path="/profTT/:id" component={ProfessionalTakeTurn} />
        <Route
          exact
          path="/professional/edit/:id"
          component={EditProfileProf}
        />
        <Route
          exact
          path="/professional/edit/:id/services"
          component={FormService}
        />
        <Route exact path="/queryDetail/:id" component={QueryPage} />
        <Route exact path="/paymentApproved" component={PaymentApproved} />

        <Route path="/SignUp" component={SignUp} />
        <Route path="/Login" component={LoginFirebase} />

        <Route exact path="/paymentFailure" component={PaymentFailure} />
        <Route path="/login" component={Login} />
        <Route path="/allProfessionals" component={AllProfessionals} />
        <Route path="/home/:id" component={AllProfessionalPageById} />
        <Route path="/turnCanceled/:id" component={Borrador} />
        <Route path="/*" component={Error404} />
        <Route path="/:any+" component={Error404} />

        <Footer />
      </Switch>
    </div>
  );
}

export default App;
