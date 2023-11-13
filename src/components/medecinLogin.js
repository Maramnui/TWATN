import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/login.css';
import Logo from "../Assets/logo.png"
import Doctor from "../Assets/doctor.png"
import patientData from '../patient.json';
import FaceRecog from "../Assets/facereco.png";


function MedecinLogin(props) {
    const {userName,patientName,setPatientName,setPatientDoctor,password,setPassword} = props;
    const [error, setError] = useState('');
    const handleLogin = () => {
        const patient = patientData.patients.find(
            (user) => user.nom === patientName && user.code === password
        );

        if (patient) {
            setPatientDoctor(true);
            setError('');


        } else {
            setError('Invalid username or code');
        }
    };


    return (
        <>
            <div className="bigContainer">
                <img src={Logo} alt="Logo" className="logo" />
                <img src={Doctor} alt="Doctor" className="doctor" />

                <div className="LoginContainer">


                    <div className="containerLogin">
                        <div className={"greetings"}>Hello,Dr {props.username}</div>
                        <Form>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Your Patient Name</Form.Label>
                                <Form.Control
                                    className={"inputLogin"}
                                    type="text"
                                    placeholder="Enter Your Patient Name"
                                    value={patientName}
                                    onChange={(e) => setPatientName(e.target.value)}

                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Verify Patient Coordinates by Face Recongition or Patient Code</Form.Label>
                                <div style={{display:"flex" ,flexDirection:"row",marginTop:"3vh"}}>
                                <img src={FaceRecog} style={{width:"3vw",height:"3vw",marginRight:"5vw"}}/>
                                <Form.Control
                                    className={"inputLogin"}
                                    type="password"
                                    placeholder="Enter Your Patient Code"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}

                                    style={{ width: "27vw", marginBottom: error ? "3vh" : null }}


                                />
                                </div>
                                {error && <p style={{ color: 'red' ,marginBottom:'5vh' }}>{error}</p>}
                            </Form.Group>

                            <Button variant="primary" className={"loginBtn"} onClick={handleLogin}  >
                                Confirm
                            </Button>

                        </Form>


                    </div>
                </div>
                <div className="decoContainer"></div>
            </div>
        </>
    );
}
export default MedecinLogin;
