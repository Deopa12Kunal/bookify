import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";

const LoginPage = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/login");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in user...");
    try {
      await firebase.signInUserWithEmailAndPass(email, password);
      console.log("Successfully logged in");
      navigate("/"); // Redirect to home page on successful login
    } catch (error) {
      console.error("Error logging in:", error.message);
      // You can handle the error here, such as displaying a message to the user
    }
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div>
          <Button variant="primary" type="submit" style={{ marginRight: "10px" }}>
            Login
          </Button>
          <Button
            onClick={firebase.signInWithGoogle}
            variant="danger"
            style={{ display: "block", marginTop: "10px" }}
          >
            Sign in With Google
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;
