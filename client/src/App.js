import './App.css';
import { Route } from "react-router-dom";
import { Form, Home, LandingPage, ProfessionalPage, QueryPage, FormClient } from "./Pages"

import axios from 'axios';
axios.defaults.baseURL='http://localhost:3001/'


function App() {
  return (
    <div className="App">
     
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/form" component={Form} />
      <Route exact path="/formClient" component={FormClient} />
      <Route exact path="/professionalDetail" component={ProfessionalPage} />
      <Route exact path="/queryDetail/:id" component={QueryPage} />
      
    </div>
  );
}

export default App;
