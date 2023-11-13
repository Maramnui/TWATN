// App.js
import React, { useState } from "react";
import Login from "./components/Login";
import MedecinLogin from "./components/medecinLogin";
import FichePatientDoc from "./components/FichePatientDoc";
import PharmacienLogin from "./components/PharmacienLogin";
import FichePatientPharmacie from "./components/FichePatientPharmacie";
import Patient from "./components/Patient";

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [patientName, setPatientName] = useState('');
    const [PatientDoctor, setPatientDoctor] = useState(false);
    const [Patientpassword, setPatientPassword] = useState('');


    return (
        <div>
            {role==="" && PatientDoctor === false ?<Login
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                role={role}
                setRole={setRole}
            />: role==="medecin" && PatientDoctor === false ? <MedecinLogin username={username} patientName={patientName} setPatientName={setPatientName} setPatientDoctor={setPatientDoctor} password={Patientpassword} setPassword={setPatientPassword}/>:role==="medecin" && PatientDoctor === true ?<
                FichePatientDoc patienName={patientName} patientPassword={Patientpassword} setPatientDoctor={setPatientDoctor} doctorName={username}></FichePatientDoc> : role==="Pharmacie" && PatientDoctor === false ?
                <PharmacienLogin username={username} patientName={patientName} setPatientName={setPatientName} setPatientDoctor={setPatientDoctor} password={Patientpassword} setPassword={setPatientPassword}></PharmacienLogin> : role==="Pharmacie" && PatientDoctor === true ? <FichePatientPharmacie patienName={patientName} patientPassword={Patientpassword} setPatientDoctor={setPatientDoctor} doctorName={username}></FichePatientPharmacie> :
                    role==="patient" ? <Patient setRole={setRole} username={username}   password={password}></Patient> :null}


        </div>
    );
}

export default App;
