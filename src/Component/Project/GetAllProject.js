// import { useState,useEffect } from "react";
// import { Table } from "reactstrap";

// function GetAllProject(){
//     const[project,setProject]=useState([]);
//  async function handleSearch() {
//     try{
//     const response=await fetch("http://localhost:8080/api/getAllProject");
//     if(!response.ok){
//         return new Error("Internal error we cant do anything");
//     }
//     const project=await response.json();
//     setProject(project);
//  }catch(error){
//     throw new Error("internal errorlo");
    
//  }
// }
//    useEffect(() => {
//         handleSearch();
//     }, []); 

// return (
//     <div className="project-get">
//         <Table striped bordered>
//             <thead>
//                 <tr>
//                     <th>Index</th>
//                     <th>ProjectID</th>
//                     <th>ProjectName</th>
//                     <th>StartDate</th>
//                     <th>EndDate</th>
//                     <th>cost</th>
//                     <th>projectType</th>
//                     <th>manager</th>
//                 </tr>
//             </thead>
//             <tbody>
//         {project.map((proj, index) => (
//                             <tr key={proj.empId} className={
//                                 //  index % 3 === 1 ? "table-success" :
//                                 index % 2 === 0 ? "table-success" :
//                                 "table-info"
//                             }>
//                                 <td>{index + 1}</td>
//                                 <td>{proj.projectID}</td>
//                                 <td>{proj.projectName}</td>
//                                 <td>{proj.startDate}</td>
//                                 <td>{proj.endDate}</td>
//                                 <td>{proj.cost}</td>
//                                 <td>{proj.projectType}</td>
//                                 <td>{proj.manager}</td>
                            
//                             </tr>
//                         ))}
//                         </tbody>

//             </Table> 
//         </div>
// );
// }
// export default GetAllProject;
// ============================================
// import { useState, useEffect } from "react";
// import { Table, Button } from "reactstrap";
 
// function GetAllProject() {
//   const [projects, setProjects] = useState([]);
//   const [page, setPage] = useState(0); // 0-based index for backend
//   const limit = 20;
//   const [hasMore, setHasMore] = useState(true);
 
//   const fetchProjects = async (currentPage) => {
//     try {
// const response = await fetch(`http://localhost:8080/api/getAllProject?page=${currentPage}&limit=${limit}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch projects");
//       }
 
//       const data = await response.json();
//       const newProjects = data.content || data;
 
//       setProjects(newProjects);
//       setHasMore(newProjects.length === limit); // If we got less than 20, no next page
//     } catch (error) {
//       console.error("Fetch error:", error);
//     }
//   };
 
//   useEffect(() => {
//     fetchProjects(page);
//   }, [page]);
 
//   const handleNext = () => {
//     setPage((prevPage) => prevPage + 1);
//   };
 
//   const handlePrev = () => {
//     if (page > 0) {
//       setPage((prevPage) => prevPage - 1);
//     }
//   };
 
//   return (
//     <div style={{ backgroundColor: "rgb(2,69,127,0.9)", color: "blue", minHeight: "100vh" }}>
           
//     <div className="project-get" style={{ display: "flex", justifyContent: "center", paddingTop: "20px" ,paddingLeft:"40px"}}>
// <Table striped bordered>
//         <thead>
//           <tr>
//             <th>Index</th>
//             <th>ProjectID</th>
//             <th>ProjectName</th>
//             <th>StartDate</th>
//             <th>EndDate</th>
//             <th>Cost</th>
//             <th>ProjectType</th>
//             <th>Manager</th>
//           </tr>
//         </thead>
//         <tbody>
//           {projects.map((proj, index) => (
//             <tr key={proj.projectID}>
//               <td>{page * limit + index + 1}</td>
//               <td>{proj.projectID}</td>
//               <td>{proj.projectName}</td>
//               <td>{proj.startDate}</td>
//               <td>{proj.endDate}</td>
//               <td>{proj.cost}</td>
//               <td>{proj.projectType}</td>
//               <td>{proj.managerId}</td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       </div>

//       <div className="d-flex justify-content-between mt-3">
//         <Button color="secondary" onClick={handlePrev} disabled={page === 0}>
//           Previous
//         </Button>
//         <Button color="primary" onClick={handleNext} disabled={!hasMore}>
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }
 
// export default GetAllProject;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "reactstrap";

function GetAllProject() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(0); // 0-based index for backend
  const limit = 20;
  const navigate = useNavigate(); // Correctly call useNavigate
  const [hasMore, setHasMore] = useState(true);
  const [selectedProjects, setSelectedProjects] = useState([]);

  // Handle checkbox selection
  const handleCheckboxChange = (projectID) => {
    setSelectedProjects(prevSelected =>
      prevSelected.includes(projectID)
        ? prevSelected.filter(id => id !== projectID)
        : [...prevSelected, projectID]
    );
  };

  const fetchProjects = async (currentPage) => {
    try {
      const response = await fetch(`http://localhost:8080/api/getAllProject?page=${currentPage}&limit=${limit}`);
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      const newProjects = data.content || data;

      setProjects(newProjects);
      setHasMore(newProjects.length === limit); // If we got less than 20, no next page
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  async function handleDelete() {
    try {
      const response = await fetch('http://localhost:8080/api/deleteProject', {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedProjects),
      });

      if (response.status === 204) {
        setSelectedProjects([]); // Clear selected projects
        fetchProjects(page); // Re-fetch projects to update the list
        }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects(page);
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
    <div style={{ backgroundColor: "rgb(2,69,127,0.9)", color: "blue", minHeight: "100vh" }}>
      <div className="project-get" style={{ display: "flex", justifyContent: "center", paddingTop: "20px", paddingLeft: "40px" }}>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Select</th>
              <th>Index</th>
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
            {projects.map((proj, index) => (
              <tr key={proj.projectID}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProjects.includes(proj.projectID)}
                    onChange={() => handleCheckboxChange(proj.projectID)}
                  />
                </td>
                <td>{page * limit + index + 1}</td>
                <td 
  onClick={() => navigate('/getProjectById/' + proj.projectID)} 
  style={{ cursor: "pointer" }}
>
  {proj.projectID}
</td>
                <td>{proj.projectName}</td>
                <td>{proj.startDate}</td>
                <td>{proj.endDate}</td>
                <td>{proj.cost}</td>
                <td>{proj.projectType}</td>
                <td>{proj.managerId}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between mt-3">
        <Button color="secondary" onClick={handlePrev} disabled={page === 0}>
          Previous
        </Button>

        <Button
          color="danger"
          onClick={handleDelete}
          disabled={selectedProjects.length === 0}
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

export default GetAllProject;

