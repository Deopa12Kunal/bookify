import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/firebase";

const BookDetailPage = () => {
  const params = useParams();
  const firebase = useFirebase();

  const [qty, setQty] = useState(1);
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const bookData = await firebase.getBookById(params.bookId);
        setData(bookData.data());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book:", error);
        setLoading(false);
      }
    };
    fetchBookData();
  }, [firebase, params.bookId]);


 
  useEffect(() => {
    firebase.getImageURL(data.imageURL).then((url) => setURL(url));
  }, [data.imageURL, firebase]); 

  if (loading) return <h1>Loading...</h1>;
  if (!data) return <h1>No data found.</h1>;

  return (
    <div className="container mt-5">
      <h1>{data.name}</h1>
      <img src={url} width="50%" style={{ borderRadius: "10px" }} />
      <h1>Details</h1>
      <p>Price: Rs. {data.price}</p>
      <p>ISBN Number: {data.isbn}</p>
      <h1>Owner Details</h1>
      <p>Name: {data.displayName}</p>
      <p>Email: {data.userEmail}</p>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Qty</Form.Label>
        <Form.Control
          onChange={(e) => setQty(e.target.value)}
          value={qty}
          type="number"
          placeholder="Enter Qty"
        />
      </Form.Group>
    </div>
  );
};

export default BookDetailPage;
