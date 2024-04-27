import React, { useEffect, useState } from "react";
import BookCard from "../components/Card";
import { useFirebase } from "../context/firebase";
import CardGroup from 'react-bootstrap/CardGroup';

const HomePage = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        firebase.listAllBooks().then((books) => setBooks(books));
    }, []);

    return (  
        <div className="container mt-3 p-3">
            <CardGroup>
                {books.map((book) => (
                    <BookCard key={book.id} id ={book.userID} {...book} />
                ))}
            </CardGroup>
        </div>
    );
};

export default HomePage;
