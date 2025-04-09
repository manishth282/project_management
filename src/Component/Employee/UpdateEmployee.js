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

    const handleChange = (a) => {
        setEmployee({ ...employee, [a.target.name]: a.target.value });
      };

    const handleSave = (event) => {
        event.preventDefault();

        fetch("http://localhost:8080/updateEmployee", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status !== "200") {
              if (data.message === "Validation failed") {
                //All field's validation alert
                let messages = Object.values(data.errors).join("\n");
                alert(messages);
                return false;
                // throw new Error(messages);
              } else {
                //EmpId and phone no. validation failed alert
                alert(data.message);
                return false;
              }
            }
            alert("Employee details edited successfully!");
            // Clear form after submission
           
          })
          .catch((errors) => {
            alert('Failed to connect with server');
          });
      };

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
                        <td >
                            <input type="text" id='empId' name= 'empId' style={{width: '100%'}} value={employee.empId} onChange={handleChange}></input>
                        </td>
                        <td>
                            <input type="text" id='empName' name= 'empName' style={{width: '100%'}} value={employee.empName} onChange={handleChange}></input>
                        </td>
                        <td>
                            <input type="text" id= 'phone' name= 'phone' style={{width: '100%'}} value={employee.phone} onChange={handleChange}></input>
                        </td>

                        <td>
                            <input type="email" id= 'email' name= 'email' style={{width: '100%'}} value={employee.email} onChange={handleChange}></input>
                        </td>
                        <td>
                            <input type="text" id= 'designation' name= 'designation' style={{width: '100%'}} value={employee.designation} onChange={handleChange}></input>
                        </td>
                        <td>
                            <input type="text" id= 'salary' name= 'salary' style={{width: '100%'}} value={employee.salary} onChange={handleChange}></input>
                        </td>
                        <td>
                            <input type="text" id= 'location' name= 'location' style={{width: '100%'}} value={employee.location} onChange={handleChange}></input>
                        </td>
                        <td>
                            <input type="date" id= 'joiningDate' name= 'joiningDate' style={{width: '100%'}} value={employee.joiningDate} onChange={handleChange}></input>
                        </td>
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
                        <Button color="success" style={{ color: "black", right: "10px" }} onClick={handleSave} >
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

