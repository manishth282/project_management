import { useState, useEffect } from "react";
// import { Table, Button, Container, Row, Col } from "reactstrap";
import { Button, Container, Form, FormGroup, Label, Input } from "reactstrap";
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
        // <div className="Project_getEmp" style={{ padding: "20px", backgroundColor: "rgb(2,69,127,0.9)", color: "blue", minHeight: "100vh" }}>
        //     <h2 style={{ color: "white" }}>Employee Details</h2>
        //     <Table striped bordered>
        //         <thead>
        //             <tr>
        //                 <th>Employee ID</th>
        //                 <th>Employee Name</th>
        //                 <th>Phone</th>
        //                 <th>Email</th>
        //                 <th>Designation</th>
        //                 <th>Salary</th>
        //                 <th>Location</th>
        //                 <th>Joining Date</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             <tr key={employee.empId} className={"table-success"}>
        //                 <td>{employee.empId}</td>
        //                 <td>{employee.empName}</td>
        //                 <td>{employee.phone}</td>
        //                 <td>{employee.email}</td>
        //                 <td>{employee.designation}</td>
        //                 <td>{employee.salary}</td>
        //                 <td>{employee.location}</td>
        //                 <td>{employee.joiningDate}</td>
        //             </tr>
        //         </tbody>
        //     </Table>
        //     <div className="d-flex justify-content-between mt-3">
        //     <Container fluid>
        //         <Row>
        //             <Col xs={-12} md={6}>
        //                 <Button
        //                     color="secondary"
        //                     onClick={() => { navigate(`/getAllEmployee`, { state: { page } }); }}
        //                 >
        //                     Back
        //                 </Button>
        //             </Col>
        //             <Col className="d-flex justify-content-end align-items-center">
        //                 <Button color="warning" style={{ color: "black", right: "10px" }} onClick={handleEdit}>
        //                     Edit
        //                 </Button>
        //             </Col>
        //         </Row>
        //     </Container>
        //     </div>
        // </div>
        <div style={{ backgroundColor: "rgb(2,69,127,0.9)", color: "white", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Container className="mt-5" style={{ padding: "20px", borderRadius: "20px", color: "white", maxWidth: "600px", backgroundColor: "rgb(30 41 59 / var(--tw-bg-opacity, 1))" }}>
                <h2 className="text-center mb-4">Employee Details</h2>
                <Form>
                    <FormGroup>
                        <Label for="empId">Employee ID</Label>
                        <Input type="text" name="empId" id="empId" value={employee.empId || ''} disabled />
                    </FormGroup>
                    <FormGroup>
                        <Label for="empName">Employee Name</Label>
                        <Input type="text" name="empName" id="empName" value={employee.empName || ''} disabled />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">Phone</Label>
                        <Input type="text" name="phone" id="phone" value={employee.phone || ''} disabled />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" value={employee.email || ''} disabled />
                    </FormGroup>
                    <FormGroup>
                        <Label for="designation">Designation</Label>
                        <Input type="text" name="designation" id="designation" value={employee.designation || ''} disabled />
                    </FormGroup>
                    <FormGroup>
                        <Label for="salary">Salary</Label>
                        <Input type="text" name="salary" id="salary" value={employee.salary || ''} disabled />
                    </FormGroup>
                    <FormGroup>
                        <Label for="location">Location</Label>
                        <Input type="text" name="location" id="location" value={employee.location || ''} disabled />
                    </FormGroup>
                    <FormGroup>
                        <Label for="joiningDate">Joining Date</Label>
                        <Input type="date" name="joiningDate" id="joiningDate" value={employee.joiningDate || ''} disabled />
                    </FormGroup>
                    <div className="d-flex justify-content-between mt-3">
                        <Button onClick={() => { navigate(`/getAllEmployee`, { state: { page } }); }} style={{ marginRight: "5px" }}>Back</Button>
                        <Button color="warning" onClick={handleEdit}>Edit</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default GetEmployee;