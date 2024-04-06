import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useFirebase} from '../context/firebase';
 const LoginPage =()=>{
    const firebase = useFirebase();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setpasword]= useState('');
        // console.log(firebase);
        useEffect(()=>{
            if(firebase.isLoggedIn){
                //navitage to home
navigate("/");
            }
        },[firebase,navigate]);

     const handleSubmit = async(e)=>{
e.preventDefault();
console.log("Login user")
  const result = await firebase.signinUserWithEmailAndPass

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
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        onChange={(e)=>setpasword(e.target.value)}
        value={password}
        type="password" 
        placeholder="Password" />
      </Form.Group>
      <div>
  <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
    Login
  </Button>
  <Button 
  onClick={firebase.siginWithGoogle}
  className="" variant="danger" type="submit" style={{ display: 'block', marginTop: '10px' }}>
    Sign in With Google
  </Button>
</div>

    </Form>
        </div>
    );
 };
  export default LoginPage;