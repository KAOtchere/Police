import { Routes, Route } from "react-router-dom"
import Metrics from "../Pages/Metrics.component"
// import Registration from "./Pages/Registration.component";
// import Login from "./Pages/Login.component";
// import About from "./About"
// import Contact from "./Contact"


function PrivateRoutes() {


  return (
    
    

    <div className="PublicRoutes">
      <Routes>
        <Route path="/" element={ <Metrics/> } />
        {/* <Route path="/Register" element={ <Registration/> } /> */}
        {/* <Route path="/Metrics" element={ <Metrics/> } /> */}
        {/* <Route path="contact" element={ <Contact/> } /> */}
      </Routes>
    </div>
  );
  
}

export default PrivateRoutes;
