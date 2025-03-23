import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles/AdminSignup.css";

const AdminSignup = () => {
    const [admin, setAdmin] = useState({
        email: "",
        username: "",
        password: "",
    });

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/admin/signup/", admin);
            
            if (response.status === 201) {
                alert("Admin created successfully!");
                navigate("/admin/login");
            } else {
                alert("Unexpected response from server");
            }
        } catch (error) {
            console.error("Signup failed", error);
            alert("Error signing up: " + (error.response?.data?.detail || "Unknown error"));
        }
    };

    return (
        <div className="admin-signup-container">
            <div className="admin-signup-box">
                <h2>Admin Signup</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                    
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? "👁️‍🗨️" : "👁"}
                        </span>
                    </div>
    
                    <button type="submit">Signup</button>
                </form>
            </div>
        </div>
    );
    
};

export default AdminSignup;
