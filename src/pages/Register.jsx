import React,{useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useFirebase} from '../context/firebase';
 const RegisterPage =()=>{
  const navigate = useNavigate();

    const firebase = useFirebase();
    // console.log(firebase);
    const [email, setEmail] = useState('');
    const [password, setpasword]= useState('');
    useEffect(()=>{
      if(firebase.isLoggedIn){
          //navitage to home
navigate("/register");
      }
  },[firebase,navigate]);
     const handleSubmit = async(e)=>{
e.preventDefault();
console.log("Signing in user")
  const result = await firebase.signupUserWithEmailAndPassword
  (email,
    password); 
    console.log("Successfully", result);

};
    return(
        <div className="container mt-5"> 
<Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        type="email" 
        placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        onChange={(e)=>setpasword(e.target.value)}
        value={password}
        type="password" 
        placeholder="Password" />
         <Form.Text className="text-muted">
          We'll never share your Password with anyone else.
        </Form.Text>
      </Form.Group>
     
      <Button variant="primary" type="submit">
        Create Account
      </Button>
    </Form>
        </div>
    );
 };
  export default RegisterPage;