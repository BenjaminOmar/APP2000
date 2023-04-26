import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';

import HeaderUser from '../../components/UserDashboard/HeaderUser';

const UserJournal = () => {
  const [journals, setJournals] = useState([]);
  const userId = parseInt(Cookies.get('userId'), 10);

  useEffect(() => {
    axios.get('https://localhost:7209/api/journal/getAll')
      .then(response => {
        const filteredJournals = response.data.filter(journal => journal.patient === userId);
        setJournals(filteredJournals);
      })
      .catch(error => {
        console.error(error);
      });
  }, [userId]);
  return (
    <>
    <HeaderUser/>
    <Container className="my-3" style={{ minHeight:'50vh' }}>
      {journals.length === 0 && <p>No journals to show.</p>}
      <Row>
        {journals.map(journal => (
          <Col md="6" className="my-3" key={journal.journalnoteId}>
            <Card>
              <CardBody>
                <CardTitle>{journal.heading}</CardTitle>
                <CardText>{journal.journalnote}</CardText>
                <CardText><small className="text-muted">{new Date(journal.created).toLocaleString()}</small></CardText>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default UserJournal;
