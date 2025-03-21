import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Input, Row, Table } from "reactstrap";

function UpdateEmployee() {
    const { employeeId } = useParams();
    const [employee, setEmployee] = useState({});
    const navigate = useNavigate();
    async function handleSearch() {
        try {
            const response = await fetch(`http://localhost:8080/getEmployee/${employeeId}`);
            const data = await response.json();
            setEmployee(data);
        } catch (err) {
            alert("Failed to connect with server");
        }
    }
    useEffect(() => {
        handleSearch();
    }, []);
    function handleChange(e) {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    }
    function handleSubmit(){
        // Check if all fields are filled with proper validation
        for (let key in employee) {
            if (!employee[key]) {
            alert("Please fill all fields");
            return;
            }
        }
        // Email validation
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(employee.email)) {
            alert("Please enter a valid email address");
            return;
        }
    
        // Phone number validation
        const phonePattern = /^[6-9]\d{9}$/;
        if (!phonePattern.test(employee.phone)) {
            alert("Please enter a valid 10-digit phone number");
            return;
        }
        // Submit form 
        fetch("http://localhost:8080/updateEmployee",{
            method: "PUT",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(employee)
        }).then(response => response.json())
        .then(data => {
            if(data.status !== 200){
                if(data.message === "Validation failed"){
                    //All field's validation alert
                    alert(Object.values(data.errors).join("\n"));
                    return false;
                }else{
                    //EmpId and phone no. validation failed alert
                    alert(data.message);
                    return false;
                }
            }
            alert("Employee Edited successfully.")
        })
        .catch(errors => {alert("Faild to connect with server")})
    }
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
                        <td> <Input type="text" name="empId" value={employee.empId} disabled={true} /></td>
                        <td> <Input type="text" name="empName" value={employee.empName} onChange={handleChange} /></td>
                        <td> <Input type="text" name="phone" value={employee.phone} onChange={handleChange} /></td>
                        <td> <Input type="email" name="email" value={employee.email} onChange={handleChange} /></td>
                        <td> <Input type="text" name="designation" value={employee.designation} onChange={handleChange} /></td>
                        <td> <Input type="text" name="salary" value={employee.salary} onChange={handleChange} /></td>
                        <td> <Input type="text" name="location" value={employee.location} onChange={handleChange} /></td>
                        <td> <Input type="date" name="joiningDate" value={employee.joiningDate} onChange={handleChange} /></td>
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
                            <Button color="success" style={{ color: "black", right: "10px" }} onClick={handleSubmit}>
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default UpdateEmployee;

