import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/AdminBookManagement.css";

const AdminBookManagement = () => {
    const [books, setBooks] = useState([]);
    const [editBook, setEditBook] = useState(null);
    const [updatedBook, setUpdatedBook] = useState({ title: "", description: "", author_id: "", category_ids: [] });
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const token = localStorage.getItem("adminToken");

    useEffect(() => {
        fetchBooks();
        fetchAuthorsAndCategories();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/books/");
            setBooks(res.data);
        } catch (err) {
            console.error("Error fetching books", err);
        }
    };

    const fetchAuthorsAndCategories = async () => {
        try {
            const [authorsRes, categoriesRes] = await Promise.all([
                axios.get("http://127.0.0.1:8000/api/authors/"),
                axios.get("http://127.0.0.1:8000/api/categories/"),
            ]);
            setAuthors(authorsRes.data);
            setCategories(categoriesRes.data);
        } catch (err) {
            console.error("Error fetching authors or categories", err);
        }
    };

    const handleEdit = (book) => {
        setEditBook(book.id);
        setUpdatedBook({
            title: book.title,
            description: book.description,
            author_id: book.author.id,
            category_ids: book.category.map((c) => c.id),
        });
    };

    const handleChange = (e) => setUpdatedBook({ ...updatedBook, [e.target.name]: e.target.value });

    const handleCategoryChange = (e) => {
        const { value, checked } = e.target;
        setUpdatedBook((prev) => ({
            ...prev,
            category_ids: checked
                ? [...prev.category_ids, parseInt(value)]
                : prev.category_ids.filter((id) => id !== parseInt(value)),
        }));
    };

    const handleUpdate = async (bookId) => {
        try {
            await axios.put(`http://127.0.0.1:8000/api/books/${bookId}/`, updatedBook, {
                headers: { Authorization: `Token ${token}` },
            });
            alert("Book updated successfully!");
            setEditBook(null);
            fetchBooks();
        } catch (err) {
            alert(`Failed to update book: ${err.response?.data?.detail || "Unknown error"}`);
        }
    };

    const handleDelete = async (bookId) => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;
        try {
            await axios.delete(`http://127.0.0.1:8000/api/books/${bookId}/`, {
                headers: { Authorization: `Token ${token}` },
            });
            alert("Book deleted successfully!");
            fetchBooks();
        } catch (err) {
            alert("Failed to delete book");
        }
    };

    return (
        <div className="admin-book-management">
            <h2>Manage Books</h2>
            <ul className="book-list">
                {books.map((book) => (
                    <li key={book.id} className="book-item">
                        {editBook === book.id ? (
                            <>
                                <input
                                    name="title"
                                    value={updatedBook.title}
                                    onChange={handleChange}
                                    placeholder="Title"
                                />
                                <textarea
                                    name="description"
                                    value={updatedBook.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                />
                                <select name="author_id" value={updatedBook.author_id} onChange={handleChange}>
                                    <option value="">Select Author</option>
                                    {authors.map((author) => (
                                        <option key={author.id} value={author.id}>{author.name}</option>
                                    ))}
                                </select>
                                {categories.map((category) => (
                                    <label key={category.id}>
                                        <input
                                            type="checkbox"
                                            value={category.id}
                                            checked={updatedBook.category_ids.includes(category.id)}
                                            onChange={handleCategoryChange}
                                        />
                                        {category.name}
                                    </label>
                                ))}
                                <button onClick={() => handleUpdate(book.id)}>Save</button>
                                <button onClick={() => setEditBook(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <h3>{book.title}</h3>
                                <p>{book.description}</p>
                                <button onClick={() => handleEdit(book)}>Edit</button>
                                <button onClick={() => handleDelete(book.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminBookManagement;
