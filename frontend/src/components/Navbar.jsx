import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";  // Import the CSS file

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        setIsLoggedIn(false);
        navigate("/admin/login");
    };

    return (
        <nav className="navbar">
            <div className="nav-title">
                <h1> KeywordioLibrary Management</h1>
            </div>

            <div className="nav-links">
                <Link to="/books">View Books</Link>
                {!isLoggedIn ? (
                    <>
                        <Link to="/admin/login">Admin Login</Link>
                        <Link to="/admin/signup">Admin Signup</Link>
                    </>
                ) : (
                    <>
                        <Link to="/admin/create-book">Add Books</Link>
                        <Link to="/admin/manage-books">Manage Books</Link>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
