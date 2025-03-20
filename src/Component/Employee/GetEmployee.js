import { useState, useEffect } from "react";
import { Table ,Button} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from "react-router-dom";

function GetEmployee() {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({});
    const { employeeId } = useParams();
    console.log(employeeId);
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

    return (
        <div className="Project_getEmp" style={{ padding: "20px", backgroundColor: "rgb(2,69,127,0.9)", color: "blue", minHeight: "100vh" }}>
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
            <Button
                color="secondary"
                onClick={() => { navigate(-1) }}
                style={{ marginLeft: "2%", marginRight: "2%" }}
            >
                Back
            </Button>
        </div>
    );
}

export default GetEmployee;