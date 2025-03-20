import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  Container,
  Button,
  Row,
  Col
} from "reactstrap";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Welcome");
  const [showEmployeeOptions, setShowEmployeeOptions] = useState(false);
  const [showManagerOptions, setShowManagerOptions] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);
  const navigate = useNavigate();

  const handleAddEmployeeClick = () => {
    navigate("/addemployee");
  };

  const handleAddManagerClick = () => {
    navigate("/addManager");
  };
  const handleAddProjectClick = () => {
    navigate("/addProject");
  };
  const handleGetAllProjectClick = () => {
    navigate("/getAllProject");
  };
  const handleGetAllEmployeeClick = () => {
    navigate("/getAllEmployee");
  };

  return (
    <div
      className="vh-100 d-flex"
      style={{
        backgroundColor: "rgb(2,69,127,0.9)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh"
      }}
    >
      {/* Sidebar */}
      <div className="d-flex flex-column p-4 bg-dark text-white shadow-lg align-items-center justify-content-center" style={{ width: "250px", minHeight: "100vh" }}>
        <h4 className="mb-4"></h4>
        {/* Left-Side Logo */}
        <NavbarBrand href="#" className="d-flex align-items-center" style={{ position: "absolute", top: "10px", left: "25px" }}>
          <img
            src="https://modussystems.com/images/modus-logo-white.png"
            alt="Logo"
            style={{ width: "100px", height: "30px", filter: "brightness(10)", color: "white" }}
          />
        </NavbarBrand>
        {/* Employee Button */}
        <Button
          color="primary"
          className="mb-3 d-flex justify-content-between align-items-center"
          onClick={() => setShowEmployeeOptions(!showEmployeeOptions)}
          style={{ fontSize: "1.25rem", width: "100%" }}
        >
          Employee {showEmployeeOptions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Button>

        {/* Sub-options for Employee */}
        {showEmployeeOptions && (
          <div className="ps-3">
            <Button color="light" className="mb-2 w-100 text-start" onClick={handleAddEmployeeClick}>
              ➕ Add Employee
            </Button>
            <Button color="info" className="w-100 text-start" onClick={handleGetAllEmployeeClick}>
              getAllempoyee
            </Button>
            {/* <Button color="danger" className="w-100 text-start" onClick={() => setSelectedRole("Delete Employee")}>
              ❌ Delete Employee
            </Button> */}
          </div>
        )}
        {/* Project Button */}
        <Button
          color="primary"
          className="mb-3 d-flex justify-content-between align-items-center"
          onClick={() => setShowProjectDetails(!showProjectDetails)}
          style={{ fontSize: "1.25rem", width: "100%" }}
        >
          Project {showProjectDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Button>
        {showProjectDetails && (
          <div className="ps-3">
            <Button color="light" className="mb-2 w-100 text-start" onClick={handleAddProjectClick}>
              ➕ Add Project
            </Button>
            <Button color="info" className="w-100 text-start" onClick={handleGetAllProjectClick}>
              getAllProject
            </Button>
       
          </div>
        )}
        {/* Manager Button */}
        <Button
          color="primary"
          className="mb-3 d-flex justify-content-between align-items-center"
          onClick={() => setShowManagerOptions(!showManagerOptions)}
          style={{ fontSize: "1.25rem", width: "100%" }}
        >
          Manager {showManagerOptions ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </Button>

        {/* Sub-options for Manager */}
        {showManagerOptions && (
          <div className="ps-3">
            <Button color="light" className="mb-2 w-100 text-start" onClick={handleAddManagerClick}>
              ➕ Add Manager
            </Button>
            <Button color="danger" className="w-100 text-start" onClick={() => setSelectedRole("Delete Manager")}>
              ❌ Delete Manager
            </Button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center">
        {/* Navbar */}
        <Navbar expand="md" className="bg- bg-opacity-500 fixed-top shadow-sm">
          <Container className="d-flex justify-content-between">
            {/* Menu Toggler */}
            <NavbarToggler onClick={() => setMenuOpen(!menuOpen)} className="ms-auto">
              {menuOpen ? <X size={30} className="text-white" /> : <Menu size={30} className="text-white" />}
            </NavbarToggler>

            <Collapse isOpen={menuOpen} navbar>
              <Nav className="ms-auto">
                <NavItem><NavLink href="#" className="text-white">Home</NavLink></NavItem>
                <NavItem><NavLink href="#" className="text-white">About</NavLink></NavItem>
                <NavItem><NavLink href="#" className="text-white">Services</NavLink></NavItem>
                <NavItem><NavLink href="#" className="text-white">Contact</NavLink></NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>

        {/* Centered Text */}
        <Container className="d-flex flex-column align-items-center text-center" style={{ height: "100vh", margin: "80px" }}>
          <Row className="justify-content-center">
            <Col xs={12} md={8}>
              <img
                src="https://modussupport.com:8443/resources/e1msu/login/Login/img/modus-logo-white.png"
                alt="New Logo"
                style={{ width: "200px", height: "60px", marginBottom: "20px" }}
              />
              <h1 className="text-center" style={{ color: "rgb(199, 209, 224)", fontSize: "4rem", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", padding: "80px", margin: "100px" }}>
                Employee Project Management System
              </h1>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;