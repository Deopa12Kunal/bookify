import React,{useState} from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
 import {useFirebase} from '../context/firebase';
const ListingPage =()=>{
  const firebase = useFirebase();
     const [name, setName]= useState("");
     const [isbnNumber, setisbnNumber] = useState("");
     const [price,setPrice] = useState("");
     const [coverPic, setCoverPic] = useState(null);
     const handleSubmit = async(e) =>{
e.preventDefault();
 await firebase.handleCreateNewListing(name, isbnNumber,price,coverPic)
     };
      const handleFileChange =(e)=>{
        const file = e.target.files[0];
        setCoverPic(file);
      }
     return(
        <div className="container mt-5"> 
        <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Book Name</Form.Label>
                <Form.Control 
                onChange={(e)=>setName(e.target.value)}
                value={name}
                type="text" 
                placeholder="Book Name" />
               
              </Form.Group>
        
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>ISBN</Form.Label>
                <Form.Control 
                onChange={(e)=>setisbnNumber(e.target.value)}
                value={isbnNumber}
                type="text" 
                placeholder="ISBN Number" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control 
                onChange={(e)=>setPrice(e.target.value)}
                value={price}
                type="number" 
                placeholder="Enter Price" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Cover Pic</Form.Label>
                <Form.Control 
                onChange={handleFileChange}
                // onChange={(e)=>setCoverPic(e.target.value)}
                // value={coverPic}
                type="file" 
                accept="image/*" 
                />
              </Form.Group>
              <div>
          <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
            Create
          </Button>
        
        </div>
        
            </Form>
                </div>
     );
};
 export default ListingPage;