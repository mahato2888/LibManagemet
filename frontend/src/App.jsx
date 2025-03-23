import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import AdminSignup from "./pages/AdminSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminBookCreation from "./pages/AdminBookCreation";
import AdminBookManagement from "./pages/AdminBookManagement";
import BooksList from "./pages/BooksList";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/create-book" element={<AdminBookCreation />} />
        <Route path="/admin/manage-books" element={<AdminBookManagement />} />

        {/* Public Routes */}
        <Route path="/books" element={<BooksList />} />
      </Routes>
    </>
  );
}

export default App;
