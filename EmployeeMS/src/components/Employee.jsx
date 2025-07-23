import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Employee = () => {
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("http://localhost:3000/auth/employee")
            .then((result) => {
                if (result.data.Status) {
                    setEmployee(result.data.Result);
                } else {
                    console.error("Backend error:", result.data.Error);
                }
            })
            .catch((err) => {
                console.error("Axios GET error:", err);
            });
    }, [navigate]); // ⬅️ important to trigger on route change


    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3000/auth/delete_employee/${id}`)
            .then((result) => {
                if (result.data.Status) {
                    window.location.reload(); // Reload to reflect changes
                } else {
                    alert(result.data.Error);
                    console.error("Delete error from backend:", result.data.Error);
                }
            })
            .catch((err) => {
                console.error("Axios DELETE error:", err);
                alert("Error deleting employee. Check console.");
            });
    };


    return (
        <div className="px-5 mt-3">
            <div className="d-flex justify-content-center">
                <h3>Employee List</h3>
            </div>
            <Link to="/dashboard/add_employee" className="btn btn-success">
                Add Employee
            </Link>
            <div className="mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map((e) => (
                            <tr key={e.id}>
                                <td>{e.name}</td>
                                <td>
                                    <img
                                        src={`http://localhost:3000/Images/` + e.image}
                                        className="employee_image"
                                        alt={e.name}
                                    />
                                </td>
                                <td>{e.email}</td>
                                <td>{e.address}</td>
                                <td>{e.salary}</td>
                                <td>
                                    <Link to={'/dashboard/edit_employee/' + e.id} className="btn btn-info btn-sm me-2">Edit</Link>
                                    <button className="btn btn-warning btn-sm" onClick={() => handleDelete(e.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Employee;
