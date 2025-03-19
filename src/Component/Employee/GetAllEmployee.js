import { useState, useEffect } from "react";
import { Table, Button } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";

function GetAllEmployee() {
    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(0); // 0-based index for backend
    const limit = 20;
    const [hasMore, setHasMore] = useState(true);
    const [selectedEmployees, setSelectedEmployees] = useState([]);

    // Handle checkbox selection
    const handleCheckboxChange = (empId) => {
        setSelectedEmployees(prevSelected =>
            prevSelected.includes(empId)
                ? prevSelected.filter(id => id !== empId)
                : [...prevSelected, empId]
        );
    };

    const fetchEmployees = async (currentPage) => {
        try {
            const response = await fetch(`http://localhost:8080/getAllEmployee?page=${currentPage}&limit=${limit}`);
            if (!response.ok) {
                throw new Error("Failed to fetch employees");
            }

            const data = await response.json();
            const newEmployees = data.content || data;

            setEmployees(newEmployees);
            setHasMore(newEmployees.length === limit); // If we got less than 20, no next page
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    async function handleDelete() {
        try {
            const response = await fetch('http://localhost:8080/deleteEmployees', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(selectedEmployees),
            });

            if (response.status === 204) {
                setSelectedEmployees([]); // Clear selected employees
                fetchEmployees(page); // Re-fetch employees to update the list
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEmployees(page);
    }, [page]);

    const handleNext = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePrev = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className="Project_getEmp">
            {employees.length > 0 && (
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Select</th>
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
                        {employees.map((emp, index) => (
                            <tr key={emp.empId}>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selectedEmployees.includes(emp.empId)}
                                        onChange={() => handleCheckboxChange(emp.empId)}
                                    />
                                </td>
                                <td>{page * limit + index + 1}</td>
                                <td><Link to={`/updateEmployee/${emp.empId}`} key={emp.empId}>{emp.empId}</Link></td>
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

            <div className="d-flex justify-content-between mt-3">
                <Button color="secondary" onClick={handlePrev} disabled={page === 0}>
                    Previous
                </Button>

                <Button
                    color="danger"
                    onClick={handleDelete}
                    disabled={selectedEmployees.length === 0}
                >
                    Delete
                </Button>

                <Button color="primary" onClick={handleNext} disabled={!hasMore}>
                    Next
                </Button>
            </div>
        </div>
    );
}

export default GetAllEmployee;
