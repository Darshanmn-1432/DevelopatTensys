import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import UserContext from './context/UserContext';
import { toast } from 'sonner';

function Login() {
    const [password, setPassword] = useState(false);
    const [email, setEmail] = useState(false);
    const {setUsersData} = useContext(UserContext)
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3001/login', { email, password })
            .then(res => {
                console.log(res)
                if (res.data != "No Record Existed") {
                    localStorage.setItem("userEmail", res.data)
                    setUsersData(res.data)
                    toast.success('Login Successfully')
                    navigate('/')
                }
            })
            .catch(err => toast.error('Invalid Credential'));
            
    }


    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100"> <div className="bg-white p-3 rounded w-25">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email</strong>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-0"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Password</strong>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        className="form-control rounded-0"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Login
                </button>
            </form>
            <p>Already Have an Account</p>
            <Link to="/signup" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                Register
            </Link>
        </div>
        </div>
    )
}

export default Login;