import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/BooksList.css"; // Import the CSS file

const BooksList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/books/")
            .then((res) => setBooks(res.data))
            .catch((err) => console.error("Error fetching books", err));
    }, []);

    return (
        <div className="books-list">
            <h2>Keywordio Library Books</h2>
            <div className="book-container">
                {books.map((book) => (
                    <div key={book.id} className="book-card">
                        <div className="book-cover">{book.title[0]}</div>
                        <h3>{book.title}</h3>
                        <p><strong>Author:</strong> {book.author.name}</p>
                        <p><strong>Categories:</strong> {book.category.map(c => c.name).join(", ")}</p>
                        <p>{book.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BooksList;
