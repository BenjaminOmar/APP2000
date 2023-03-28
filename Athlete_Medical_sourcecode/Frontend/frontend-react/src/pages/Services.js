/*This code imports React Bootstrap components and images. It then defines a function, called Services, 
that returns a view of a set of cards showing various services. 
Each of these cards contains a description of investigations and treatments for a specific medical condition, such as Orthopedic or Physiotherapist. 
The code also includes a header component and styling to set the margin around the cards. 
The overall function of the code is to display a list of medical services and their descriptions on a web page.*/


import { Container, Row, Col, Card } from 'react-bootstrap'; //import necessary components from 'react-bootstrap'
import HeaderNormal from '../components/HeaderNormal'; //import HeaderNormal component
import ortoped from '../images/ortoped.png';//import local image files
import nurse from '../images/nurse.png';
import fysio from '../images/fysio.png';
import fysikalskLege from '../images/fysikalskLege.png'

const Services = () => {
    return (
        <>
            <HeaderNormal /> {/*Render HeaderNormal component */}
            <div>
                <Container style={{ marginBottom: "50px", marginTop: "50px" }}> {/*A centered container with a margin top and bottom*/}
                    <Row className="justify-content-center">{/*create a row with a centered column*/}
                        <Col lg={8}>
                            <h1 className="text-center mb-5">Våre tjenester</h1>{/*title for services*/}
                        </Col>
                    </Row>
                    <Row>{/*A row with columns for each service*/}
                        <Col lg={3} className="mb-4">{/*A column for the first service*/}
                            <Card>{/*A card component*/}
                                <Card.Img variant="top" src={ortoped} alt='ortoped' />{/*An image */}
                                <Card.Body>
                                    <Card.Title> <h3 style={{ marginLeft: "20pxS", marginBottom: '20px' }}>Ortoped</h3></Card.Title>
                                    <Card.Text>{/* Headers with list items*/}
                                        <h5>Utredninger:</h5>
                                        <ul>
                                            <li>Klinisk undersøkelse av muskuloskeletale symptomer og plager.</li>
                                            <li>Røntgenundersøkelse av ledd og bein.</li>
                                            <li>Ultralydundersøkelse av muskler, sener og leddbånd.</li>
                                            <li>MR-undersøkelse for å avdekke skader på ledd, bein og bløtvev.</li>

                                        </ul>
                                        <h5>Behandlinger:</h5>
                                        <ul>
                                            <li>Konservativ behandling av skader og plager, inkludert smertestillende medikamenter, fysioterapi og rehabilitering.</li>
                                            <li>Injeksjoner med kortison eller hyaluronsyre for å redusere betennelse og smerte.</li>
                                            <li>Kirurgisk behandling av mindre skader, som for eksempel artroskopisk kirurgi for å reparere skader på leddbrusk eller sener.</li>
                                            <li>Behandling av bruddskader med gipsing eller immobilisering.</li>
                                            <li>Preoperativ utredning og forberedelse for større kirurgiske inngrep, som for eksempel proteseoperasjoner.</li>
                                        </ul>
                                        <p>
                                            Det er nødvendig å påpeke at det er mange ulike typer skader og plager som kan oppstå i
                                            muskuloskeletalsystemet, og at utredning og behandling vil variere avhengig av pasientens
                                            individuelle tilstand og symptomer.<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                                        </p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={3} className="mb-4">{/*A column for the second service*/}
                            <Card>{/*A card component*/}
                                <Card.Img variant="top" src={fysikalskLege} alt='fysikalsk lege' />{/*An image */}
                                <Card.Body>
                                    <Card.Title> <h3 style={{ marginLeft: "20pxS", marginBottom: '20px' }}>Fysikalsk Lege </h3></Card.Title>
                                    <Card.Text>
                                        {/* Headers with list items*/}
                                        <h5>Utredninger:</h5>
                                        <ul>
                                            <li>Klinisk undersøkelse av muskuloskeletale symptomer og plager.</li>
                                            <li>Røntgenundersøkelse av ledd og bein.</li>
                                            <li>Ultralydundersøkelse av muskler, sener og leddbånd.</li>
                                            <li>MR-undersøkelse for å avdekke skader på ledd, bein og bløtvev.</li>
                                            <li>Elektromyografi (EMG) og nevrografi for å undersøke muskel- og nerveskader.</li>
                                        </ul>
                                        <h5>Behandlinger:</h5>
                                        <ul>
                                            <li>Konservativ behandling av skader og plager, inkludert smertestillende medikamenter, fysioterapi og rehabilitering.</li>
                                            <li>Injeksjoner med kortison eller hyaluronsyre for å redusere betennelse og smerte.</li>
                                            <li>Leddmobilisering og manipulasjon for å forbedre leddbevegelse og redusere smerte</li>
                                            <li>Triggerpunktbehandling for å løse opp muskelknuter og redusere smerte</li>
                                            <li>Akupunktur og akupressur for å lindre smerte og øke blodsirkulasjonen i områder med muskel- og leddplage</li>
                                            <li>Mind-body teknikker, som for eksempel avspenningsteknikker og meditasjon, for å redusere stress og fremme helbredelse.</li>
                                            <li>Preoperativ utredning og forberedelse for mindre operative inngrep, som for eksempel artroskopi eller injeksjoner</li>
                                        </ul>
                                        <p>
                                            Det er viktig å huske på at utredning og behandling vil variere avhengig av pasientens
                                            individuelle tilstand og symptomer. En Fysikalsk lege vil også kunne gi råd om forebyggende
                                            tiltak og livsstilsendringer for å redusere risikoen for fremtidige skader og plager
                                        </p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={3} className="mb-4">{/*A column for the third service*/}
                            <Card>{/*A card component*/}
                                <Card.Img variant="top" src={fysio} alt='fysioterapaut' />{/*An image */}
                                <Card.Body>
                                    <Card.Title> <h3 style={{ marginLeft: "20pxS", marginBottom: '20px' }}>Fysioterapaut</h3></Card.Title>
                                    <Card.Text>
                                        {/* Headers with list items*/}
                                        <h5>Utredninger:</h5>
                                        <ul>
                                            <li>Klinisk undersøkelse av muskuloskeletale symptomer og plager, inkludert tester av bevegelighet, styrke og funksjonelle bevegelser.</li>
                                            <li>Vurdering av biomekanikk og holdning for å identifisere potensielle årsaker til smerte eller skade</li>
                                            <li>Gjennomgang av pasientens trenings- og aktivitetsnivå, inkludert teknikk og intensitet.</li>
                                            <li>Kartlegging av pasientens sykehistorie og tidligere skader</li>
                                            <li>Bildediagnostikk, som røntgen, MR eller ultralyd for å bekrefte diagnoser eller utelukke alvorlige skader</li>
                                            <li>Utarbeidelse av individuelle behandlingsplaner basert på pasientens behov og mål</li>
                                        </ul>
                                        <h5>Behandlinger:</h5>
                                        <ul>
                                            <li>Manuell terapi, inkludert mobilisering og manipulasjon av ledd for å øke bevegelighet og redusere smerte</li>
                                            <li>Tøying og øvelsesbehandling for å øke fleksibilitet og styrke muskler og ledd</li>
                                            <li>Smertelindringsteknikker som is, varme, elektroterapi eller massasje</li>
                                            <li>Idrettsmassasje for å redusere muskelspenninger og øke blodsirkulasjonen</li>
                                            <li>Instruksjon i riktig teknikk og ergonomi for å unngå fremtidige skader eller smerter</li>
                                            <li>Forebyggende øvelser for å styrke muskler og forebygge skade</li>
                                            <li>Rehabilitering etter skade eller operasjon, inkludert øvelser for å gjenopprette styrke, fleksibilitet og funksjon</li>
                                        </ul>
                                        <p>
                                            Det er essensiellt å merke seg at dette er bare noen få eksempler, og at fysioterapi
                                            kan tilpasses individuelle pasientbehov.
                                        </p><br />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col lg={3} className="mb-4">{/*A column for the fourth service*/}
                            <Card>{/*A card component*/}
                                <Card.Img variant="top" src={nurse} alt='sykepleier' />{/*An image */}
                                <Card.Body>
                                    <Card.Title> <h3 style={{ marginLeft: "20pxS", marginBottom: '20px' }}>Sykepleier</h3></Card.Title>
                                    <Card.Text>
                                        {/* Headers with list items*/}
                                        <ul>
                                            <li>Gi pasienter veiledning og informasjon om ulike behandlingsalternativer og prosedyrer</li>
                                            <li>Forberede pasienter til operasjoner eller prosedyrer ved å ta blodprøver, sette opp intravenøse linjer, sjekke vitale tegn og lignende</li>
                                            <li>Administrere medisiner, inkludert smertestillende og andre medisiner som kan være nødvendige for å lindre smerter og behandle plager og skader</li>
                                            <li>Følge opp pasienter etter operasjoner eller prosedyrer og gi råd om opptrening og rehabilitering</li>
                                            <li>Bidra til å opprettholde en trygg og hygienisk klinisk praksis ved å sørge for at utstyr og rom er rent og desinfisert</li>
                                            <li>Samarbeide med leger, fysioterapeuter og andre helsepersonell for å sikre at pasientene får best mulig behandling og oppfølging</li>
                                            <li>Hjelpe til med dokumentasjon og pasientjournaler, inkludert å registrere vitale tegn, medisiner og behandlinger.</li>
                                            <li>Gi støtte og omsorg til pasientene og deres pårørende, og hjelpe til med å håndtere eventuelle følelsesmessige utfordringer som kan oppstå i forbindelse med behandlingen</li>
                                        </ul><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                </Container>
            </div>
        </>

    );
}
//The component is exported as a default export
export default Services;