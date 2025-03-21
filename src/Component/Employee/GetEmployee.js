import { useState, useEffect } from "react";
import { Table, Button, Container, Row, Col } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams, useLocation } from "react-router-dom";

function GetEmployee() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({});
    const { employeeId } = useParams();
    const location = useLocation();
    const page = location.state?.page || 0; // Retrieve the page state or default will be 0
    async function handleSearch() {

        try {
            const response = await fetch(`http://localhost:8080/getEmployee/${employeeId}`);
            if (!response.ok) {
                throw new Error();
            }
            const employeeResponse = await response.json();
            setEmployee(employeeResponse);

        } catch (error) {
            alert("Failed to connect with server");
        }
    }

    useEffect(() => {
        handleSearch();
    }, []);

    function handleEdit(){
        navigate(`/updateEmployee/${employeeId}`);
    }

    return (
        <div className="Project_getEmp" style={{ padding: "20px", backgroundColor: "rgb(2,69,127,0.9)", color: "blue", minHeight: "100vh" }}>
            <h2 style={{ color: "white" }}>Employee Details</h2>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>Employee Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Designation</th>
                        <th>Salary</th>
                        <th>Location</th>
                        <th>Joining Date</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={employee.empId} className={"table-success"}>
                        <td>{employee.empId}</td>
                        <td>{employee.empName}</td>
                        <td>{employee.phone}</td>
                        <td>{employee.email}</td>
                        <td>{employee.designation}</td>
                        <td>{employee.salary}</td>
                        <td>{employee.location}</td>
                        <td>{employee.joiningDate}</td>
                    </tr>
                </tbody>
            </Table>
            <div className="d-flex justify-content-between mt-3">
            <Container fluid>
                <Row>
                    <Col xs={-12} md={6}>
                        <Button
                            color="secondary"
                            onClick={() => { navigate(`/getAllEmployee`, { state: { page } }); }}
                        >
                            Back
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                        <Button color="warning" style={{ color: "black", right: "10px" }} onClick={handleEdit}>
                            Edit
                        </Button>
                    </Col>
                </Row>
            </Container>
            </div>
        </div>
    );
}

export default GetEmployee;