import { BrowserRouter, Link,Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddProject from './Component/Project/AddProject';
import ADDEmploye from './Component/Employee/ADDEmployee';
import GetEmployee from './Component/Employee/GetEmployee';
import GetAllProject from './Component/Project/GetAllProject';
import AddManager from './Component/Manager/AddManager';
import Home from './Component/Home/Home';
import LoginPage from './Component/Login/LoginPage';
import RegisterPage from './Component/Login/RegisterPage';
import GetProjectById from './Component/Project/GetProjectById';
import UpdateProject from './Component/Project/UpdateProject';
import GetAllEmployee from './Component/Employee/GetAllEmployee';
function App() {
  return (
    <BrowserRouter>
      {/* <Link to="/form">form</Link><br/>
      <Link to="/addemployee">addEmployee</Link>
      <Link to="/getEmployee">getEmployee</Link>
      <Link to="/getAllproject">GetAllProject</Link>
      <Link to="/addManager">AddManager</Link>
<Link to="/">Home</Link> */}

      <Routes>

        <Route path='/addProject' element={<AddProject />} />
        <Route path="/addemployee" element={<ADDEmploye/>} />
        <Route path="/getEmployee/:employeeId" element={<GetEmployee/>} />
        <Route path="/getAllEmployee" element={<GetAllEmployee/>} />
        <Route path="/getAllProject" element={<GetAllProject/>}/>
        <Route path="/addManager" element={<AddManager/>}/>
        <Route path='/'element={<Home/>}/>
        <Route path="/getProjectById/:projectId/modify" element={<UpdateProject/>} />

        <Route path="/getProjectById/:projectId" element={<GetProjectById/>} />
        <Route path='/login' element={<LoginPage/>}/>
<Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;