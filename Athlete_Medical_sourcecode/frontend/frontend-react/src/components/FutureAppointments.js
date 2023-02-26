import React, {useState, useEffect} from "react";
import { Container, Row, Col, Alert, ListGroup } from "react-bootstrap";

const FutureAppointments = () => {
    //Declare state variables to hold appointment data and loading status
    const [appointments, settAppointments] = useState([]);
    const [loading, setLoading] = useState(true);


    //Use useEffect to fetch appointment from the API when the component mounts 
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch('/api/appointments');
                const data = await response.json();
                settAppointments(data);
                setLoading(false);
            }catch (error){
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return(
        //Use Boostrap Container, Row and Col components to structure the layout of the component
        <Container>
            <Row>
                <Col>
                    {/*Component header */}
                    <h3>Dine avtaler</h3>
                    {/*A ternary operator to conditionally render the appropriate content  */}
                    {/*If the data is still loading, display a loading message */}
                    {/*If there is noe appointments for the logged-in user, display an Alert with a message*/}
                    {/*If there is appointments, display them in a list*/}
                    {loading ? (
                        <p>Loading...</p>
                    ) : appointments.length === 0 ? (
                        <Alert variant="primary">
                            Du har ingen fremtidige avtaler hos Athlete Medical.
                        </Alert>
                    ) : (
                        <ListGroup>
                            {appointments.map((appointment) => (
                                <ListGroup.Item key={appointment.id}>
                                 {appointment.title}
                                </ListGroup.Item> 
                            ))}
                        </ListGroup>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default FutureAppointments;