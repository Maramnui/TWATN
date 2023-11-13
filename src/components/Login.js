// Login.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import userData from '../users.json';
import '../style/login.css';
import Logo from "../Assets/logo.png"
import Doctor from "../Assets/doctor.png"

function Login(props) {
    const { username, setUsername, password, setPassword, role, setRole } = props;
    const [error, setError] = useState('');

    const handleLogin = () => {
        const user = userData.users.find(
            (user) => user.username === username && user.password === password
        );

        if (user) {
            setRole(user.role);
            setError('');


        } else {
            setError('Invalid username or password');
        }
    };

    let style = { marginBottom:"5vh"};
    return (
        <>
            <div className="bigContainer">
                <img src={Logo} alt="Logo" className="logo" />
                <img src={Doctor} alt="Doctor" className="doctor" />

                <div className="LoginContainer">


                    <div className="containerLogin">
                        <div className={"greetings"}>Hello, Please Enter Your Identifiers</div>

                        <Form>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Your Name</Form.Label>
                                <Form.Control
                                    className={"inputLogin"}
                                    type="text"
                                    placeholder="Enter Your Name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}

                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Your Password</Form.Label>
                                <Form.Control
                                    className={"inputLogin"}
                                    type="password"
                                    placeholder="Enter Your Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={error ? { marginBottom: "3vh" } : null}


                                />
                                {error && <p style={{ color: 'red' ,marginBottom:'5vh' }}>{error}</p>}
                            </Form.Group>

                            <Button variant="primary" className={"loginBtn"} onClick={handleLogin} >
                                Log in
                            </Button>

                        </Form>
                    </div>
                </div>
                <div className="decoContainer"></div>
            </div>
        </>
    );
}

export default Login;
