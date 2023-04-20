/*The code imports the React library and the react-bootstrap library, and then defines the TermsPrivacyForm function. 
This function returns a React component that contains a form of terms and privacy for the website. 
The component uses react-bootstrap to style the content and contains a series of headings and paragraphs with text about 
the site's responsibility, user conduct, disclaimer, content and moderation, complaints and disputes, privacy, cookies and users' rights.
*/

//import necessary libraries
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//define the TermsPrivacyForm function as a React component
const TermsPrivacyForm = () => {
  //the component contains a series of headings and paragraphs with text about terms and privacy
  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h1 className="text-center mb-5">Vilkår og Personvern</h1>
          <h3 className="mb-3">Beskrivelse av nettstedet:</h3>
          <p>
            Dette nettstedet er ment for å gi brukere av Athlete Medical en enkel og effektiv måte å booke
            avtaler med behandlere, se sine fremtidige avtaler og lese sin legejournal fra tidligere avtaler.
            Nettstedet kan brukes av alle som har behov for informasjon om Athlete Medical og som ønsker konsultasjon og behandling fra klinikkens ansatte.
          </p>
          <h3 className="mt-5 mb-3">Ansvar og brukeradferd:</h3>
          <p>
            Ved bruk av nettstedet er det viktig at brukeren ikke krenker andres rettigheter eller bruker
            nettstedet til ulovlige formål. Videre må brukeren ikke kopiere eller bruke innhold fra
            nettstedet på en måte som bryter med opphavsretten eller andre immaterielle rettigheter til innholdet.
          </p>
          <h3 className="mt-5 mb-3">Ansvarsfraskrivelse:</h3>
          <p>
            Dette nettstedet tar alle nødvendige forholdsregler for å sikre at informasjonen er korrekt og oppdatert.
            Men, det kan ikke garanteres at informasjonen på nettstedet alltid er feilfri eller oppdatert.
            Nettstedet er ikke ansvarlig for eventuelle skader eller tap som brukeren kan lide som følge av bruken av nettstedet.
          </p>
          <h3 className="mt-5 mb-3">Innhold og moderering:</h3>
          <p>
            Nettstedet inneholder informasjon om legekontoret, behandlinger og ansatte.
            Når en person registrerer ved å opprette bruker, vil klinikken lagre informason om brukeren. Når en bruker booker en avtale,
            vil personopplysninger som er lagret på klinikken deles med den aktuelle behandler.
            Det vil eksempelvis være navn, adresse, fødselsnummer og andre registrerte opplysninger i tilleg til notater fra
            eventuelle tidligere besøk pasienten har hatt på klinikken. Videre er alt brukerinnhold på nettstedet underlagt moderering.
          </p>
          <h3 className="mt-5 mb-3">Klager og tvister:</h3>
          <p>
            Dersom brukeren ønsker å klage på noe, kan de kontakte klinikken på telefon eller e-post for å få hjelp med saken.
            Ved eventuelle tvister vil saken bli løst ved forhandling eller ved å ta saken til retten.
          </p>
          <h3 className="mt-5 mb-3">Personvern:</h3>
          <p>
            Nettstedet inneholder personlig og sensitiv informasjon om brukere som benytter seg av Athlete Medicals tjenester,
            denne informasjonen er forbeholdt aktuell bruker og behandlere. Denne informasjonen blir brukt for å gi brukere en helhetlig behandling
            ved klinikken og en brukervennlig mulighet til å elektronisk booke avtaler, se sine fremtidige avtaler og sine journaler fra tidligere konsultasjoner og behandlinger.
            All informasjon som samles inn vil bli behandlet i henhold til gjeldende personvernlover.
          </p>
          <h3 className="mt-5 mb-3">Informasjonskapsler:</h3>
          <p>
            Nettstedet tar alle nødvendige forholdsregler for å beskytte personlig informasjon mot uautorisert tilgang,
            endring eller ødeleggelse. Informasjonen vil ikke bli delt med tredjeparter uten skriftlig samtykke fra bruker, med mindre det er pålagt for
            å etterkomme en lov eller forskrift.
          </p>
          <h3 className="mt-5 mb-3">Brukernes rettigheter:</h3>
          <p>
            Brukere har rett til å be om korrigering av personlig informasjon. Klinikken har med hjemmel i lov ikke anledning til å slette
            legejournal.
          </p>
        </Col>
      </Row>
    </Container>
  )
}
//The component is exported as a default export.
export default TermsPrivacyForm;
