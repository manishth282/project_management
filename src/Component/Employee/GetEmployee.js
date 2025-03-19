import { useState, useEffect } from "react";
import { Table } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
 
function GetEmployee() {
    const [employee, setEmployee] = useState([]);
 
    async function handleSearch() {
 
        try {
            const response = await fetch("http://localhost:8088/getAllEmployee");
            if (!response.ok) {
                throw new Error();
            }
            const employee = await response.json();
            setEmployee(employee);
        } catch (error) {
            alert("Failed to connect with server");
        }
    }
 
    useEffect(() => {
        handleSearch();
    }, []);
 
    return (
        <div className="Project_getEmp">
            {employee.length > 0 && (
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Index</th>
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
                        {employee.map((emp, index) => (
                            <tr key={emp.empId} className={
                                index % 3 === 1 ? "table-success" :
                                index % 2 === 0 ? "table-primary" :
                                "table-info"
                            }>
                                <td>{index + 1}</td>
                                <td>{emp.empId}</td>
                                <td>{emp.empName}</td>
                                <td>{emp.phone}</td>
                                <td>{emp.email}</td>
                                <td>{emp.designation}</td>
                                <td>{emp.salary}</td>
                                <td>{emp.location}</td>
                                <td>{emp.joiningDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}
 
export default GetEmployee;