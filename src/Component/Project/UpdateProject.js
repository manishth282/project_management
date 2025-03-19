import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Table, Input } from "reactstrap";
 
function UpdateProject() {
    // const location = useLocation();
    const navigate = useNavigate();
    // const project = location.state?.project; // Get project data from state
    const location = useLocation();
    const project = location.state;
  
    const [isEditing, setIsEditing] = useState(false);
    const [editedProject, setEditedProject] = useState(project);
 
    if (!project) {
        return <h2>No project details found!</h2>;
    }
 
    // Enable edit mode
    const handleEditClick = () => {
        setIsEditing(true);
    };
 
    // Handle input change
    const handleChange = (e) => {
setEditedProject({ ...editedProject, [e.target.name]: e.target.value });
    };
 
    // Save changes
    async function handleSave(){
        try{
            const response=await fetch('http://localhost:8080/api/changeProject',
            {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(editedProject),
      
        });
        setIsEditing(false);
        alert("Succesfully saved");
        console.log("Updated Project:", editedProject); // You can send this data to an API
     } catch(error){
console.error();

        }
    }
    return (
        <div>
            <h2>Project Details</h2>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Project ID</th>
                        <th>Project Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Project Type</th>
                        <th>Manager</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ cursor: "pointer", color: "blue" }} onClick={handleEditClick}>
                            {editedProject.projectID}
                        </td>
                        <td>
                            {isEditing ? (
                                <Input type="text" name="projectName" value={editedProject.projectName} onChange={handleChange} />
                            ) : (
                                editedProject.projectName
                            )}
                        </td>
                        <td>
                            {isEditing ? (
                                <Input type="date" name="startDate" value={editedProject.startDate} onChange={handleChange} />
                            ) : (
                                editedProject.startDate
                            )}
                        </td>
                        <td>
                            {isEditing ? (
                                <Input type="date" name="endDate" value={editedProject.endDate} onChange={handleChange} />
                            ) : (
                                editedProject.endDate
                            )}
                        </td>
                        <td>
                            {isEditing ? (
                                <Input type="text" name="projectType" value={editedProject.projectType} onChange={handleChange} />
                            ) : (
                                editedProject.projectType
                            )}
                        </td>
                        <td>
                            {isEditing ? (
                                <Input type="text" name="manager" value={editedProject.manager} onChange={handleChange} />
                            ) : (
                                editedProject.manager
                            )}
                        </td>
                        <td>
                            {isEditing ? (
                                <Button color="success" onClick={handleSave}>Save</Button>
                            ) : (
                                <Button color="warning" onClick={handleEditClick}>Edit</Button>
                            )}
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Button color="primary" onClick={() => navigate(-1)}>Back</Button>
        </div>
    );
}
 
export default UpdateProject;