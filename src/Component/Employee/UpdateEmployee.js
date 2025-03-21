import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "reactstrap";

function UpdateEmployee(){
    const {employeeId} = useParams();
    const [employee, setEmployee] = useState({});
    const navigate = useNavigate();
    async function handleSearch(){
        try{
            const response = await fetch(`http://localhost:8080/getEmployee/${employeeId}`);
            const data = await response.json();
            setEmployee(data);
        }catch(err){
            alert("Failed to connect with server");
        }
    }
    useEffect(() => {
        handleSearch();
    }, []);
    return (
        <div className="Project_getEmp" style={{ padding: "20px", backgroundColor: "rgb(2,69,127,0.9)", color: "blue", minHeight: "100vh" }}>
            <h2 style={{ color: "white" }}>Update Employee</h2>
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
                            onClick={() => { navigate(-1) }}
                        >
                            Back
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-end align-items-center">
                        <Button color="warning" style={{ color: "black", right: "10px" }} >
                            Edit
                        </Button>
                    </Col>
                </Row>
            </Container>
            </div>
        </div>
);
}

export default UpdateEmployee;

