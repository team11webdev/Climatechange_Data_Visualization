import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Constants from "../Constants.json";

export default function AUTH(props) {
  const [signupProcessState, setSignupProcessState] = useState("default");
  const [errorMessage, setErrorMessage] = useState("")

  let [authMode, setAuthMode] = useState("login");
  const changeAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    navigate("/", { replace: true });
  };
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  // handle signup process
  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setSignupProcessState("processing");
    try {
        const result = await axios.post(Constants.API_ADDRESS + "/signup", {
          email: event.target.email.value,
          username: event.target.username.value,
          password: event.target.password.value,
        });
        setSignupProcessState("signupSuccess");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
    } catch (error) {
      setSignupProcessState("signupFailure");
      setErrorMessage(error.response.data.message);
    }
  };

  //handle login process
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        Constants.API_ADDRESS + "/jwtLogin",
        null,
        {
          auth: {
            username: event.target.username.value,
            password: event.target.password.value,
          },
        }
      );
      //do something with the result
      const receivedJWT = result.data.jwt;
      sessionStorage.setItem("jwt", receivedJWT);
      const token = sessionStorage.getItem("jwt");
      props.login(token);
      navigate("/user_specific", { replace: true });
    } catch (error) {
      if(error.response.data === 'Unauthorized') {
        //console.log(error.response.data)
        alert("Wrong username or password!");
      } else {
        alert("Something went wrong.. Try again!");
        //console.error(error);
      }
    }
  };

  let signupUIControls = null;
  switch (signupProcessState) {
    case "default":
      signupUIControls = (
        <Button variant="primary" type="submit">
          Submit
        </Button>
      );
      break;
    case "processing":
      signupUIControls = <span>Signing up...</span>;
      break;
    case "signupSuccess":
      signupUIControls = <span>User succesfully created</span>;
      break;
    case "signupFailure":
      signupUIControls = (
        <>
          <span>Something went wrong: </span>
          <br/>
          <span>{errorMessage}</span>
          <br/>
          <Button variant="primary" type="submit"> Submit </Button>
        </>
      );
      break;
  }

  if (authMode === "signup") {
    return (
      <>
        <Modal show={handleShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Signup</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSignupSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="username"
                  placeholder="Username"
                  name="username"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Text>
                  Already have an account?
                  <Button variant="light" onClick={changeAuthMode}>
                    Login
                  </Button>
                </Form.Text>
              </Form.Group>
              <div>{signupUIControls}</div>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  return (
    <>
      <Modal show={handleShow} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Username"
                name="username"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Text>
                Don't have an account?
                <Button variant="light" onClick={changeAuthMode}>
                  Signup
                </Button>
              </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
