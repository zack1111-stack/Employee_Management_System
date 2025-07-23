import React, { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Sending login data:", values);
        axios.post('http://localhost:3000/auth/adminlogin', values)
            .then(result => {
                if (result.data && result.data.loginStatus) {
                    localStorage.setItem("valid", true);
                    navigate('/dashboard');
                } else {
                    setError(result.data?.Error || "Invalid email or password");
                    console.error("Login failed response:", result.data);
                }
            })
            .catch(err => {
                console.error("Axios Error:", err);
                if (err.response && err.response.data) {
                    setError("Server error: " + err.response.data.Error);
                } else if (err.request) {
                    setError("No response from server. Check if backend is running.");
                } else {
                    setError("Error: " + err.message);
                }
            });
    };

    return (
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm'>
                {error && <div className='text-danger mb-2'>{error}</div>}
                <h2>Login Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email:</strong></label>
                        <input
                            type="email"
                            name='email'
                            value={values.email}
                            autoComplete='off'
                            placeholder='Enter Email'
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                            className='form-control rounded-0'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password:</strong></label>
                        <input
                            type="password"
                            name='password'
                            value={values.password}
                            placeholder='Enter Password'
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                            className='form-control rounded-0'
                            required
                        />
                    </div>
                    <button type="submit" className='btn btn-success w-100 rounded-0 mb-2'>Log in</button>
                    <div className='mb-1'>
                        <input type="checkbox" name='tick' id='tick' className='me-2' />
                        <label htmlFor="tick"> You agree with terms and conditions</label>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
