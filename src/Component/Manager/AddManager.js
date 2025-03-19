import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

function AddManager() {
  const [managerform, setManagerform] = useState({
    managerId: "",
    managerName: "",
    projects: [{ projectId: "", projectName: "" }]
  });
  const [manager, setManager] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/createManager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(managerform)
      });
      if (!response.ok) {
        throw new Error("Internal error");
      }
      const manager = await response.json();
      setManager(manager);
      setManagerform({
        managerId: "",
        managerName: "",
        projects: [{ projectId: "", projectName: "" }]
      });
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Error occurred");
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setManagerform({
      ...managerform,
      [name]: value
    });
  };

  const handleProjectChange = (index, e) => {
    const { name, value } = e.target;
    const newProjects = managerform.projects.map((project, i) => {
      if (i === index) {
        return { ...project, [name]: value };
      }
      return project;
    });
    setManagerform({
      ...managerform,
      projects: newProjects
    });
  };

  const addProject = () => {
    setManagerform({
      ...managerform,
      projects: [...managerform.projects, { projectId: "", projectName: "" }]
    });
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Add Manager</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="managerId">Manager ID</Label>
              <Input
                type="number"
                name="managerId"
                id="managerId"
                value={managerform.managerId}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="managerName">Manager Name</Label>
              <Input
                type="text"
                name="managerName"
                id="managerName"
                value={managerform.managerName}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Projects</Label>
              {managerform.projects.map((project, index) => (
                <div key={index} className="mb-2">
                  <Input
                    type="text"
                    name="projectId"
                    placeholder="Project ID"
                    value={project.projectId}
                    onChange={(e) => handleProjectChange(index, e)}
                    className="mb-1"
                  />
                  <Input
                    type="text"
                    name="projectName"
                    placeholder="Project Name"
                    value={project.projectName}
                    onChange={(e) => handleProjectChange(index, e)}
                  />
                </div>
              ))}
              <Button color="secondary" type="button" onClick={addProject}>
                Add Project
              </Button>
            </FormGroup>
            <Button color="primary" type="submit" block>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddManager;