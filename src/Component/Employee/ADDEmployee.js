import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Container } from "reactstrap";
 
const ADDEmployee = () => {
  const [formData, setFormData] = useState({
    empId: "",
    empName: "",
    phone: "",
    email: "",
    designation: "",
    salary: "",
    location: "",
    joiningDate: "",
  });
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = (event) => {
    event.preventDefault();
 
    // Check if all fields are filled with proper validation
    for (let key in formData) {
      if (!formData[key]) {
        alert("Please fill all fields");
        return;
      }
    }
    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
 
    // Phone number validation
    const phonePattern = /^[6-9]\d{9}$/;
    if (!phonePattern.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }
 
    fetch("http://localhost:8082/createEmployee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
        alert("Employee added successfully!");
        // Clear form after submission
        setFormData({
          empId: "",
          empName: "",
          phone: "",
          email: "",
          designation: "",
          salary: "",
          location: "",
          joiningDate: "",
        });
      })
      .catch((errors) => {
        alert('Failed to connect with server');
      });
  };
 
  return (
    <Container className="mt-5">
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="empId">Employee ID</Label>
                <Input type="text" name="empId" id="empId" value={formData.empId} onChange={handleChange}
                            placeholder="Enter the employee ID" />
            </FormGroup>
           
            <FormGroup>
                <Label for="empName">Employee Name</Label>
                <Input type="text" name="empName" id="empName" value={formData.empName} onChange={handleChange}
                            placeholder="Enter the employee name" />
            </FormGroup>
           
            <FormGroup>
                <Label for="phone">Phone</Label>
                <Input type="text" name="phone" id="phone" value={formData.phone} onChange={handleChange}
                            placeholder="Enter the phone" />
            </FormGroup>
           
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" value={formData.email} onChange={handleChange}
                            placeholder="Enter the email" />
            </FormGroup>
           
            <FormGroup>
                <Label for="designation">Designation</Label>
                <Input type="text" name="designation" id="designation" value={formData.designation} onChange={handleChange}
                            placeholder="Enter the designation" />
            </FormGroup>
           
            <FormGroup>
                <Label for="salary">Salary</Label>
                <Input type="text" name="salary" id="salary" value={formData.salary} onChange={handleChange}
                            placeholder="Enter the salary" />
            </FormGroup>
           
            <FormGroup>
                <Label for="location">Location</Label>
                <Input type="text" name="location" id="location" value={formData.location} onChange={handleChange}
                            placeholder="Enter the location" />
            </FormGroup>
           
            <FormGroup>
                <Label for="joiningDate">Joining Date</Label>
                <Input type="date" name="joiningDate" id="joiningDate" value={formData.joiningDate} onChange={handleChange}
                            placeholder="Enter the joining date" />
            </FormGroup>
            <FormGroup>
               
            </FormGroup>
                <Button color="primary">Submit</Button>
        </Form>
    </Container>
  );
};
 
export default ADDEmployee;