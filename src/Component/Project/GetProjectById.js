import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

function GetProjectById() {
  const [project, setProject] = useState([]);
  const { projectId } = useParams(); 
const navigate=useNavigate();

  const handleClick = () => {
    navigate('/getProjectById/' + project.projectID + '/modify', { state : project});
  };

    const getData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/getProjectById/${projectId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const newProject = data.content || data;
      setProject(newProject);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getData();
  }, [projectId]);

  const modify = () => {
    // Add your modify logic here
  };

  return (
    <div style={{ backgroundColor: "rgba(2,69,127,0.9)", color: "blue", minHeight: "100vh" }}>
      <div className="project-get" style={{ display: "flex", justifyContent: "center", paddingTop: "20px", paddingLeft: "40px" }}>
        <Table striped bordered>
          <thead>
            <tr>
              <th>ProjectID</th>
              <th>ProjectName</th>
              <th>StartDate</th>
              <th>EndDate</th>
              <th>Cost</th>
              <th>ProjectType</th>
              <th>Manager</th>
            </tr>
          </thead>
          <tbody>
          <tr>
                <td>{project.projectID}</td>
                <td>{project.projectName}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate}</td>
                <td>{project.cost}</td>
                <td>{project.projectType}</td>
                <td>{project.managerId}</td>
              </tr>
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between mt-3">
      <Button color="secondary" onClick={handleClick}>
  Modify
</Button>
      </div>
    </div>
  );
};

export default GetProjectById;