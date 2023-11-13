import {React,useState}  from "react";
import "../style/FichePatientDoc.css";
import Logo from "../Assets/logo.png";
import userData from "../patient.json";
import {Button, Form} from 'react-bootstrap';
import BootstrapTable from "react-bootstrap-table-next";
import { Col,Row } from "react-bootstrap";

import paginationFactory from "react-bootstrap-table2-paginator";
import cellEditFactory from "react-bootstrap-table2-editor";

function FichePatientDoc(props) {
    const [newMaladie, setNewMaladie] = useState("");
    const [newMedicament, setNewMedicament] = useState("");
    const [newFrequence, setNewFrequence] = useState("");
    const [newDuree, setNewDuree] = useState("");
    const [error, setError] = useState(""); const [error1, setError1] = useState("");
    const [numligne,setNumligne] = useState("");

    const columns = [
        {
            dataField: "nom",
            text: "Maladie",
        },
        {
            dataField: "medicament",
            text: "Médicament",
            formatter: (cell) => {
                if (Array.isArray(cell)) {
                    return cell.map((med) => Object.entries(med).map(([name, freq]) => `${name}: ${freq}`)).join(", ");
                } else {
                    return Object.entries(cell).map(([name, freq]) => `${name}: ${freq}`).join(", ");
                }
            },
        },
        {
            dataField: "medecin",
            text: "Médecin",
        },
        {
            dataField: "date",
            text: "Date de Prescription",
        },
        {
            dataField: "duree",
            text: "Durée"+"(jours)",
        },
        {
            dataField: "disponibilite",
            text: "Disponibilité",
            formatter: (cell) => (cell ? "Oui" : "Non"),
        },
    ];
    function areSyntromAndAspirineTakenTogether(patient) {
        let testSyntrom= false;
        let testAspirine= false;
        // Iterate through the maladies of the patient
        for (const maladie of patient.maladies) {
            // Check if both "Syntrom" and "Aspirine" are present in the same maladie
            if (maladie.medicament) {
                if (Array.isArray(maladie.medicament)) {
                    const hasSyntrom = maladie.medicament.some((med) => isMedicamentPresent(med, 'Syntrom'));
                    const hasAspirine = maladie.medicament.some((med) => isMedicamentPresent(med, 'Aspirine'));

                    if (hasSyntrom ) {
                        testSyntrom=true
                    }
                    if (hasAspirine ) {
                        testAspirine=true
                    }
                } else if (typeof maladie.medicament === 'object') {
                    const hasSyntrom = isMedicamentPresent(maladie.medicament, 'Syntrom');
                    const hasAspirine = isMedicamentPresent(maladie.medicament, 'Aspirine');

                    if (hasSyntrom ) {
                        testSyntrom=true
                    }
                    if (hasAspirine ) {
                        testAspirine=true
                    }

                }
            }
        }

        if (testSyntrom && testAspirine) {
            return true;}
        else {return false;}

        function isMedicamentPresent(medicament, name) {
            return Object.keys(medicament).some((medName) => medName === name);
        }
    }
    function areLoprilAndInflamylTakenTogether(patient) {
        let testLopril = false;
        let testInflamyl = false;

        // Iterate through the maladies of the patient
        for (const maladie of patient.maladies) {
            // Check if both "Lopril" and "Inflamyl" are present in the same maladie
            if (maladie.medicament) {
                if (Array.isArray(maladie.medicament)) {
                    const hasLopril = maladie.medicament.some((med) => isMedicamentPresent(med, 'Lopril'));
                    const hasInflamyl = maladie.medicament.some((med) => isMedicamentPresent(med, 'Inflamyl'));

                    if (hasLopril) {
                        testLopril = true;
                    }
                    if (hasInflamyl) {
                        testInflamyl = true;
                    }
                } else if (typeof maladie.medicament === 'object') {
                    const hasLopril = isMedicamentPresent(maladie.medicament, 'Lopril');
                    const hasInflamyl = isMedicamentPresent(maladie.medicament, 'Inflamyl');

                    if (hasLopril) {
                        testLopril = true;
                    }
                    if (hasInflamyl) {
                        testInflamyl = true;
                    }
                }
            }
        }

        return testLopril && testInflamyl;

        function isMedicamentPresent(medicament, name) {
            return Object.keys(medicament).some((medName) => medName === name);
        }
    }

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const patient= userData.patients.find(
        (user) => user.nom === props.patienName && user.code === props.patientPassword
    );
    const addRow = () => {
        const newRow = {
            nom: newMaladie,
            medicament: [{ [newMedicament]: newFrequence }],
            medecin: "Dr." + props.doctorName,
            date: formattedDate,
            duree: newDuree || "N/A",
            disponibilite: true,
        };

        // Update data in memory
        patient.maladies.push(newRow);

        const takenTogether = areSyntromAndAspirineTakenTogether(patient);
        const takenTogether2 = areLoprilAndInflamylTakenTogether(patient);


        if (takenTogether) {
            setError("Contre indication : anticoagulant + antiagrégant plaquettaire=risque d'hémoragie grave");
        }
        if(takenTogether2){
            setError1("Précaution d'emploi : anti-inflammatoire non stéroïdien + IEC=risque d'insuffisance rénale aiguë")
        }
        console.log(error1);



        // Clear input fields after adding a row
        setNewMaladie("");
        setNewMedicament("");
        setNewFrequence("");
        setNewDuree("");
    };

    const deleteRow = (e) => {
        e.preventDefault();
        const lineNum = parseInt(numligne, 10);

        if (isNaN(lineNum) || lineNum <= 0 || lineNum > patient.maladies.length) {
            // Display an error message if the line number is invalid

            return;
        }

        // Remove the specified line from the maladies array
        patient.maladies.splice(lineNum - 1, 1);
        if(areSyntromAndAspirineTakenTogether(patient)===false){    setError("");}
        if(areLoprilAndInflamylTakenTogether(patient)===false){    setError1("");}

        // Clear input fields and reset error state
        setNumligne("");

    };



    return(
    <>
    <div className="grandContainer">
        <div className="navbar">
        <div>  < img src={Logo} alt="Logo" className="logofiche" style={{width:"22vh"}} /></div>
            <div className="patientName">Mr, {props.patienName}</div>
            <div className={"coordonées"}>Poids: {patient.poids}</div>
            <div className={"coordonées"}>Taille: {patient.taille}</div>
            <div className={"coordonées"}>Allergie(s): {patient.allergies}</div>
            <div className={"coordonées"}>Antécédants: {patient.antécédants}</div>
            <Button variant="primary" className={"otherPatientBtn"} onClick={(e)=>{e.preventDefault();
                     props.setPatientDoctor(false)   }} >
               Autre Patient
            </Button>

        </div>
        <div>
            <div className="salutation"> Salut Docteur {props.doctorName}</div>
            <div className={"tableau"}>
            <BootstrapTable
                keyField="nom"
                data={patient.maladies}
                columns={columns}
                headerClasses="title-row"

            />
            </div>
            {error === "" && error1 === "" ? (
                <p style={{ color: 'green', marginLeft: '3vw', fontSize: '1.5vw' }}>Aucune contre indication</p>
            ) : null}

            {error === "Contre indication : anticoagulant + antiagrégant plaquettaire=risque d'hémoragie grave" ? (
                <p style={{ color: 'red', marginLeft: '3vw', fontSize: '1.5vw' }}>{error}</p>
            ) : null}

            {error1 === "Précaution d'emploi : anti-inflammatoire non stéroïdien + IEC=risque d'insuffisance rénale aiguë" ? (
                <p style={{ color: 'orange', marginLeft: '3vw', fontSize: '1.5vw' }}>{error1}</p>
            ) : null}

            <div className="salutation" style={{marginTop:"2vh"}}> Ajouter un traitement</div>


            <Form className="form-horizontal" style={{marginLeft:"1vw",marginTop:"1vw"}}>
                <Row>
                    <Col md={3}>
                        <Form.Group controlId="formBasicMaladie">
                            <Form.Label>Maladie</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nom de la maladie"
                                value={newMaladie}
                                onChange={(e) => setNewMaladie(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group controlId="formBasicMedicament">
                            <Form.Label>Médicament</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nom du médicament"
                                value={newMedicament}
                                onChange={(e) => setNewMedicament(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="formBasicFrequence">
                            <Form.Label>Fréquence</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Fréquence du médicament"
                                value={newFrequence}
                                onChange={(e) => setNewFrequence(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2}>
                        <Form.Group controlId="formBasicDuree">
                            <Form.Label>Durée</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Durée du médicament"
                                value={newDuree}
                                onChange={(e) => setNewDuree(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2} style={{marginTop:"1vh"}} >
                        <br/>
                    <Button variant="primary" onClick={(e)=>{addRow()}}>
                        Ajouter une Ligne
                    </Button>
                    </Col>
                </Row>

            </Form>
            <div className="salutation" style={{marginTop:"2vh"}}> Effacer une ligne</div>
            <Form className="form-horizontal" style={{marginLeft:"1vw",marginTop:"1vw"}}>
                <Row>
                    <Col md={3}>
                        <Form.Group controlId="formBasicMaladie">
                            <Form.Label>Effacer une ligne</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="N° de la ligne"
                                value={numligne}
                                onChange={(e) => setNumligne(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={2} style={{marginTop:"1vh"}} >
                        <br/>
                        <Button variant="primary" onClick={(e)=>{deleteRow(e)}}>
                            Effacer une Ligne
                        </Button>

                    </Col>
                   </Row>
            </Form>





        </div>
    </div>

    </>

);
}
export default FichePatientDoc;