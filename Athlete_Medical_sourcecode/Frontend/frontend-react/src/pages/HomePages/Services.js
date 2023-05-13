/*This code imports necessary modules and image files for a React app. It also creates an array of 
objects that represent medical services offered, such as orthopedics and physical therapy. 
Each object contains information about the service, such as a description and a corresponding image. 
This information will be used to display the services on the app's frontend. The useState hook is also imported, 
which allows for state management within the app. Additionally, the react-bootstrap and
 HeaderNormal components are imported, which provide pre-built UI components for the app.*/

// Importing modules, components, and image files
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import HeaderNormal from '../../components/Home/HeaderNormal';
import ortoped from '../../images/ortoped.png';
import nurse from '../../images/nurse.png';
import fysio from '../../images/fysio.png';
import fysikalskLege from '../../images/fysikalskLege.png'


// Array of objects representing services
const serviceArray = [
    {
        service: 'Ortoped',
        description: `Ortopeder er spesialister som jobber med behandling av skader 
        og plager i muskel. Det finnes mange ulike typer skader og plager som 
        kan oppstå i dette systemet, og utredning og behandling vil variere avhengig av pasientens 
        individuelle tilstand og symptomer. Ortopeden vil utføre en grundig klinisk undersøkelse av
        muskuloskeletale symptomer og plager. I tillegg kan det være aktuelt med
        av ledd og bein, ultralydundersøkelse av muskler, sener og leddbånd og MR-undersøkelse for
        å avdekke skader på ledd, bein og bløtvev. Når det gjelder behandling, kan ortopeden tilby 
        konservativ behandling av skader og plager. Dette kan inkludere smertestillende 
        medikamenter, fysioterapi og rehabilitering. Injeksjoner med kortison eller 
        hyaluronsyre kan også brukes for å redusere betennelse og smerte. For mindre skader 
        kan ortopeden tilby kirurgisk behandling, for eksempel artroskopisk kirurgi for 
        å reparere skader på leddbrusk eller sener. Bruddskader kan behandles med gipsing eller 
        immobilisering. Ortopeden kan også utføre preoperativ utredning og forberedelse for større 
        kirurgiske inngrep, som for eksempel proteseoperasjoner. I sum er ortopedene spesialister 
        som kan hjelpe pasienter med en rekke forskjellige skader og plager i muskel- og skjelettsystemet. 
        De vil utføre grundige utredninger og tilby tilpasset behandling for å sikre best mulig resultat for 
        pasienten.`,
        picture: ortoped
    },
    {
        service: 'Fysikalsk Lege',

        description: `En Fysikalsk lege tilbyr en rekke utredninger og behandlinger for å hjelpe 
        pasienter med muskuloskeletale symptomer og plager. inkluderer klinisk undersøkelse, 
        sener og leddbånd, 
        MR-undersøkelser for å avdekke skader på ledd, bein og bløtvev,
        og nevrografi for å undersøke muskel- og nerveskader. Når det gjelder behandlinger, tilbyr 
        Fysikalsk lege konservativ behandling av skader og plager, inkludert smertestillende medikamenter, 
        fysioterapi og rehabilitering. Pasientene kan også motta injeksjoner med kortison eller 
        hyaluronsyre for å redusere betennelse og smerte, samt ledmobilisering og manipulasjon for 
        å forbedre leddbevegelse og redusere smerte. Triggerpunktbehandling kan også tilbys for å 
        løse opp muskelknuter og redusere smerte. Akupunktur og akupressur kan brukes for å 
        lindre smerte og øke blodsirkulasjonen i områder med muskel- og leddplage, og mind-body 
        teknikker som for eksempel avspenningsteknikker og meditasjon, kan redusere stress og fremme 
        helbredelse. Fysikalsk lege kan også tilby preoperativ utredning og forberedelse for mindre 
        operative inngrep, som for eksempel artroskopi eller injeksjoner. Det er viktig å påpeke at 
        utredning og behandling vil variere avhengig av pasientens individuelle tilstand og 
        symptomer. En Fysikalsk lege vil også kunne gi råd om forebyggende tiltak og 
        livsstilsendringer for å redusere risikoen for fremtidige skader og plager.`,
        picture: fysikalskLege
    },
    {
        service: 'Fysioterapaut',
        description: ` En Fysioterapeuts arbeidsoppgaver innebærer å utrede og behandle muskuloskeletale 
        symptomer og plager hos pasienter. Dette inkluderer bla. klinisk undersøkelse av bevegelighet, 
        styrke og funksjonelle bevegelser. Det blir også vurdert biomekanikk og holdning for å identifisere 
        mulige årsaker til smerte eller skade. Pasientens trenings- og aktivitetsnivå blir kartlagt, inkludert 
        teknikk og intensitet, sammen med sykehistorie og tidligere skader. For å bekrefte diagnoser 
        eller utelukke alvorlige skader, kan det være aktuelt å gjøre en bildediagnostikk, som røntgen, 
        MR eller ultralyd. Fysioterapeuten utarbeider individuelle behandlingsplaner basert på pasientens 
        behov og mål. Behandlingen kan bestå av manuell terapi, inkludert mobilisering og manipulasjon av ledd 
        for å øke bevegelighet og redusere smerte. Tøying og øvelsesbehandling kan bidra til økt fleksibilitet 
        og styrke i muskler og ledd. Smertelindringsteknikker som is, varme, elektroterapi eller massasje kan 
        også benyttes. Videre kan fysioterapeuten instruere pasienten i riktig teknikk og ergonomi for å unngå 
        fremtidige skader eller smerter. Forebyggende øvelser kan også være en del av behandlingen for å styrke 
        muskler og forebygge skade. Ved rehabilitering etter skade eller operasjon, vil fysioterapeuten 
        tilrettelegge øvelser for å gjenopprette styrke, fleksibilitet og funksjon. Det er viktig å understreke 
        at dette er kun noen eksempler, og at fysioterapi kan tilpasses individuelle pasientbehov.`,
        picture: fysio
    },
    {
        service: 'Sykepleier',
        description: `En sykepleier har en viktig rolle i å hjelpe og støtte pasientene på ulike måter. 
        En av deres hovedoppgaver er å gi pasientveiledning og informasjon om behandlingsalternativer 
        og prosedyrer. Dette kan inkludere forberedelse av pasienter til operasjoner eller prosedyrer ved å ta 
        blodprøver, sette opp intravenøse linjer, sjekke vitale tegn og lignende. Sykepleieren er også 
        ansvarlig for å administrere medisiner til pasientene, inkludert smertestillende og andre medisiner
        som kan være nødvendige for å lindre smerter og behandle plager og skader. Etter operasjoner eller 
        prosedyrer er det også viktig at sykepleieren følger opp pasientene og gir råd om opptrening og 
        rehabilitering. En annen viktig oppgave for en sykepleier er å bidra til å opprettholde en trygg 
        og hygienisk klinisk praksis. Dette innebærer å sørge for at utstyr og rom er rent og desinfisert. 
        Sykepleieren samarbeider også med leger, fysioterapeuter og annet helsepersonell for å sikre at 
        pasientene får best mulig behandling og oppfølging. Sykepleieren har også ansvar for dokumentasjon 
        og pasientjournaler, inkludert registrering av vitale tegn, medisiner og behandlinger. 
        I tillegg gir sykepleieren støtte og omsorg til pasientene og deres pårørende, og hjelper til med å 
        håndtere eventuelle følelsesmessige utfordringer som kan oppstå i forbindelse med behandlingen.
        Generelt sett spiller sykepleieren en viktig rolle i å gi omsorg og støtte til pasientene, og er en viktig del av teamet som jobber for å gi best mulig behandling og oppfølging`,
        picture: nurse
    },

];

// This is a functional component named ServiceSection
const Services = () => {

    const [expandedIndex, setExpandedIndex] = useState(-1);// A state variable 'expandedBioIndex' with an initial value of -1
    const handleReadMoreClick = (index) => { setExpandedIndex(index); }// This function is called when the 'Read more' button is clicked
    const handleReadLessClick = () => { setExpandedIndex(-1); }

    // This function determines if the 'Read more' button should be displayed for a given bio and index
    // It checks the word count of the bio and if it's greater than 60 and the bio is not already expanded, it returns true
    const shouldDisplayReadMoreButton = (description, index) => {
        const wordCount = description.split(/\s+/).length;
        return wordCount > 60 && expandedIndex !== index;
      }
    return (
        <>
            {/*Renders the "HeaderNormal" component*/}
            <HeaderNormal />
            {/*Renders the heading*/}
            <div className='container' 
            style={{ whiteSpace: 'pre-line', marginTop: '70px', marginBottom: '50px' }}>
                <div className="row">
                    <div className="col-12 text-center" style={{ marginBottom: '20px' }}>
                        <h1 style={{marginBottom: "-5px"}} id="behandlere">Våre tjenester</h1>
                    </div>
                </div>
            </div>

            {/*A row containing Cards for each employeee in the staff array*/}
            <div className='row row-cols-1 row-cols-md-2 g-4' 
                style={{ 
                    marginBottom: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                                      
                }}>
                {serviceArray.map((service, index) => (
                    //A Card component with the service, description, and picture. 
                    <div key={index} className='col-12 col-md-6 mb-4' style={{width: '38%'}}>
                        <Card>
                            <Card.Img top src={service.picture} alt={service.service} />
                            <Card.Body>
                                <Card.Title>{service.service}</Card.Title>
                                <p>
                                    {/* Displays the first 60 words of the service's information followed by "..." */}
                                    {shouldDisplayReadMoreButton(service.description, index) ?
                                        `${service.description.split(/\s+/).slice(0, 60).join(' ')}...` :
                                        service.description
                                    }
                                </p>
                                {/*Displays all the text in the description if the "Read More" link is clicked */}
                                {shouldDisplayReadMoreButton(service.description, index) ?
                                    <button
                                        className='btn btn-link'
                                        style={{ color: 'white', textDecoration: 'none' }}
                                        onClick={() => handleReadMoreClick(index)}>
                                        Les mer
                                    </button> :
                                    //Displaus "Read Less" button
                                    expandedIndex === index ?
                                        <button
                                            className="btn btn-link"
                                            style={{ color: 'white', textDecoration: 'none' }}
                                            onClick={handleReadLessClick}>
                                            Les Mindre
                                        </button> : null
                                }
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </>
    )


};
//The component is exported as a default export
export default Services;