import React from "react";
import {Button, Card} from "react-bootstrap";
import {Form} from "react-bootstrap";
import { Link } from "react-router-dom";
import HeaderNormal from "./HeaderNormal";



const ForgotPwrdUser = () => {

      return(
        <>
        <HeaderNormal/>
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "calc(100vh - 200px - 200px)",
            }}
        >
             <Card  style={{ width: '400px', margin: "20px" }} >
            <Card.Header> Glemt passord eller brukernavn?</Card.Header>
                <Card.Body>
                    Skriv inn din epost her, så sender vi deg instruksjoner!             
                    <Form.Control style={{marginTop: "15px"}} type = "email" placeholder="epost@eksempel.no"/>
                    <Button	variant="primary" type="submit"						
                        style={{
								paddingLeft: "150px",
								paddingRight: "150px",
								marginTop: "30px",
								marginLeft: "10px",
                                marginBottom: "20px",
								backgroundColor: "#0050B1",								
							}}>   
                        <Link to='/login' style={{color: '#fff', textDecoration: 'none'}}>
                            Send
                        </Link>   
                        
				    </Button>                
                </Card.Body>
            </Card>
        </div>
       
         </>
    )
        
    
};

export default ForgotPwrdUser;