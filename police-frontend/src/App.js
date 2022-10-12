import { useState } from "react";
import { Routes, Route } from "react-router-dom"
// import Metrics from "./Pages/Metrics.component"
// import Registration from "./Pages/Registration.component";
// import Login from "./Pages/Login.component";
// import About from "./About"
// import Contact from "./Contact"

import PrivateRoutes from "./Routes/PrivateRoutes";
import PublicRoutes from "./Routes/PublicRoutes";
import { getCookie } from "./Services/CookieFuncs";



function App() {
  let token = getCookie('token')
  const [isPublic, setIsPublic] = useState(true)
  
  if(!token){
    return <PublicRoutes/>
  }else{
    return <PrivateRoutes/>
  }
  
  
}

export default App;
