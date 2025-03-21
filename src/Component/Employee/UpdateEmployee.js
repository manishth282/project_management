import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import { Button, Col, Container, Input, Row, Table } from "reactstrap";
import { Button, Container, Form, FormGroup, Label, Input } from "reactstrap";

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
            alert("Employee Edited successfully.");
            navigate(-1);
        })
        .catch(errors => {alert("Faild to connect with server")})
    }
    return (
        // <div className="Project_getEmp" style={{ padding: "20px", backgroundColor: "rgb(2,69,127,0.9)", color: "blue", minHeight: "100vh" }}>
        //     <h2 style={{ color: "white" }}>Update Employee</h2>
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
        //                 <td> <Input type="text" name="empId" value={employee.empId} disabled={true} /></td>
        //                 <td> <Input type="text" name="empName" value={employee.empName} onChange={handleChange} /></td>
        //                 <td> <Input type="text" name="phone" value={employee.phone} onChange={handleChange} /></td>
        //                 <td> <Input type="email" name="email" value={employee.email} onChange={handleChange} /></td>
        //                 <td> <Input type="text" name="designation" value={employee.designation} onChange={handleChange} /></td>
        //                 <td> <Input type="text" name="salary" value={employee.salary} onChange={handleChange} /></td>
        //                 <td> <Input type="text" name="location" value={employee.location} onChange={handleChange} /></td>
        //                 <td> <Input type="date" name="joiningDate" value={employee.joiningDate} onChange={handleChange} /></td>
        //             </tr>
        //         </tbody>
        //     </Table>
        //     <div className="d-flex justify-content-between mt-3">
        //         <Container fluid>
        //             <Row>
        //                 <Col xs={-12} md={6}>
        //                     <Button
        //                         color="secondary"
        //                         onClick={() => { navigate(-1) }}
        //                     >
        //                         Back
        //                     </Button>
        //                 </Col>
        //                 <Col className="d-flex justify-content-end align-items-center">
        //                     <Button color="success" style={{ color: "black", right: "10px" }} onClick={handleSubmit}>
        //                         Save
        //                     </Button>
        //                 </Col>
        //             </Row>
        //         </Container>
        //     </div>
        // </div>

        <div style={{ backgroundColor: "rgb(2,69,127,0.9)", color: "white", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Container className="mt-5" style={{ padding: "20px", borderRadius: "20px", color: "white", maxWidth: "600px", backgroundColor: "rgb(30 41 59 / var(--tw-bg-opacity, 1))" }}>
                <h2 className="text-center mb-4">Update Employee</h2>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="empId">Employee ID</Label>
                        <Input type="text" name="empId" id="empId" value={employee.empId || ''} disabled />
                    </FormGroup>
                    <FormGroup>
                        <Label for="empName">Employee Name</Label>
                        <Input type="text" name="empName" id="empName" value={employee.empName || ''} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">Phone</Label>
                        <Input type="text" name="phone" id="phone" value={employee.phone || ''} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" value={employee.email || ''} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="designation">Designation</Label>
                        <Input type="text" name="designation" id="designation" value={employee.designation || ''} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="salary">Salary</Label>
                        <Input type="text" name="salary" id="salary" value={employee.salary || ''} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="location">Location</Label>
                        <Input type="text" name="location" id="location" value={employee.location || ''} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="joiningDate">Joining Date</Label>
                        <Input type="date" name="joiningDate" id="joiningDate" value={employee.joiningDate || ''} onChange={handleChange} />
                    </FormGroup>
                    <div className="d-flex justify-content-between mt-3">
                        <Button onClick={() => { navigate(-1); }} style={{ marginRight: "5px" }}>Back</Button>
                        <Button color="success" type="submit">Save</Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
}

export default UpdateEmployee;

