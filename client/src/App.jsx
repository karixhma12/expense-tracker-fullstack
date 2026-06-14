import {BrowserRouter,Routes,Route} from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import {Navigate} from "react-router-dom";

function App(){
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login"/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
