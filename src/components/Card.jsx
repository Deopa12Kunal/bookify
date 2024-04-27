import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "../context/firebase";
// import Accordion from "react-bootstrap/Accordion";
// import CardGroup from 'react-bootstrap/CardGroup';
// import ListGroup from "react-bootstrap/ListGroup";



const BookCard = (props) => {
  console.log(props);
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [url, setURL] = useState(null);

  useEffect(() => {
    firebase.getImageURL(props.imageURL).then((url) => setURL(url));
  }, [props.imageURL, firebase]); 
// console.log(props);
// const {  } = props;
  return (
    <Card style={{ width: '15rem' ,margin: '10px'}}>
    <Card.Img variant="top" src={url} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
    <Card.Body>
      <Card.Title>{props.name}</Card.Title>
      <Card.Text>
          This book has a title {props.name} and this book is sold by{" "}
          {props.displayName} and this book costs Rs.{props.price}
        </Card.Text>
      {/* <Button onClick={e=>(navigate(`/book/views/${props.uid}`))} variant="primary">Go somewhere</Button> */}
      <Button onClick={() => navigate(`/book/views/${props.id}`)} variant="primary">Go somewhere</Button>
    </Card.Body>
  </Card>
  
 
  );
};

export default BookCard;
