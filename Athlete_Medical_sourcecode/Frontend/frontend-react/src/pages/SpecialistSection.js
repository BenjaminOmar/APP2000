import React, {useState} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import HeaderNormal from '../components/HeaderNormal';
import doctor1 from '../images/doctor1.jpg';
import doctor2 from '../images/doctor2.jpg';
import physician from '../images/physician.jpg';
import physiotherapist from '../images/physiotherapist.jpg';


const staff = [
  {
    name: 'Geir Arne Nilsen',
    title: 'Ortoped',
    bio: `Geir Arne Nilsen er en erfaren ortoped ved vår klinikk, med en spesialkompetanse innenfor behandling
    av skader og sykdommer i bein og ledd. Han har lang erfaring med å behandle pasienter med ulike typer
    ortopediske problemer, fra mindre skader til mer alvorlige tilstander.
    
    Geir Arne har en doktorgrad i ortopedisk medisin fra Universitetet i Oslo, og har tidligere jobbet ved flere
    store sykehus i Norge og internasjonalt. Han har også deltatt på en rekke internasjonale konferanser og
    seminarer for å holde seg oppdatert på de nyeste behandlingsmetodene innenfor sitt felt.
    
    Som ortoped er Geir Arne opptatt av å tilby sine pasienter en helhetlig behandling som tar hensyn til deres
    individuelle behov og livssituasjon. Han er kjent for å være grundig i sin undersøkelse og diagnostisering,
    og tar seg alltid tid til å lytte til sine pasienter og besvare eventuelle spørsmål de måtte ha.
    
    Vi er svært glade for å ha Geir Arne Nilsen som en del av vårt team, og vi er trygge på at hans kompetanse
    og erfaring vil være til stor hjelp for våre pasienter.`,
    picture: doctor1
  },
  {
    name: 'Karoline Ernstsen',
    title: 'Fysikalsk lege',
    bio: `Karoline Ernstsen er en fysikalsk lege med flere års erfaring innenfor feltet. Hennes spesialområder 
    inkluderer rehabilitering av pasienter med ulike former for muskel- og skjelettplager, så vel som behandling
    av idrettsrelaterte skader og arbeidsrelaterte lidelser. Karoline er kjent for å være grundig og nøyaktig i 
    sine vurderinger og for å ha en pasientfokusert tilnærming til behandling.

    Karoline har en imponerende utdanningsbakgrunn, med en bachelorgrad i fysioterapi og en doktorgrad i medisin
    fra Universitetet i Oslo. Hun har også fullført en spesialisering i fysikalsk medisin og rehabilitering ved
    Rikshospitalet. Karoline har publisert flere artikler og forskningsstudier innenfor sitt felt, og har deltatt
    på en rekke konferanser og seminarer nasjonalt og internasjonalt. Hun er medlem av Norsk forening for fysikalsk
    medisin og rehabilitering, og er også sertifisert av European Society of Physical and Rehabilitation Medicine.
    
    Karoline har et stort hjerte for pasientene sine, og jobber alltid hardt for å gi dem den beste behandlingen
    og oppfølgingen mulig. Hun er opptatt av å se hele mennesket bak smertene, og å finne løsninger som passer 
    for den enkelte pasientens livssituasjon og behov.`,
    picture: physician
  },
  {
    name: 'Hedda Vold',
    title: 'Fysioterapeut',
    bio: `Hedda Vold er en erfaren fysioterapeut med spesialisering innenfor muskel- og skjelettplager. 
    Hun har jobbet som fysioterapeut i over 10 år, og har i løpet av denne tiden utviklet en sterk kompetanse 
    innenfor fysioterapeutisk behandling av en rekke ulike tilstander. Hedda har spesielt mye erfaring med 
    rehabilitering etter operasjoner og idrettsskader.

    Hedda har en bachelorgrad i fysioterapi fra Høgskolen i Oslo og Akershus, og har i tillegg tatt en rekke 
    videreutdanningskurs innenfor ulike fysioterapeutiske områder. Hun er også medlem av Norsk 
    Fysioterapeutforbund, og holder seg alltid oppdatert på den nyeste forskningen og utviklingen innenfor 
    fysioterapi.
    
    Hedda er opptatt av å tilby en helhetlig og personlig tilnærming til behandling, og legger stor vekt på å 
    lytte til pasientenes behov og ønsker. Hun er engasjert og dedikert i sitt arbeid, og strekker seg alltid 
    langt for å hjelpe pasientene sine til å oppnå best mulig resultat av behandlingen. `,
    picture: physiotherapist
  },
  {
    name: 'Eva Johnsen',
    title: 'Sykepleier',
    bio: `Eva Johnsen er en erfaren og dyktig sykepleier som har spesialisert seg på behandling av idrettsskader.
    Hun har jobbet på medisinske klinikker i mange år og har en omfattende erfaring i å behandle ulike typer skader
    og plager som oppstår som følge av idrettsaktiviteter. Hennes spesialområder inkluderer blant annet forebygging
    og behandling av muskel- og leddskader, rehabilitering etter operasjoner og skader, samt smertelindring.

    Eva har en solid utdanningsbakgrunn som sykepleier og har gjennom årene deltatt på en rekke relevante kurs og
    seminarer for å utvide sin kunnskap og kompetanse innenfor feltet. Hun er lidenskapelig opptatt av å hjelpe 
    pasientene sine med å komme seg tilbake til idretten så raskt og trygt som mulig, og hun er alltid villig til 
    å ta seg tid til å lytte og svare på spørsmål.
    
    Eva er en nøkkelperson på vårt team av helsepersonell som arbeider for å gi våre pasienter den beste mulige 
    behandlingen og omsorgen. Vi er stolte av å ha henne som en del av vår klinikk og vi er sikre på at hennes
     ekspertise vil være til stor nytte for alle som trenger hjelp med å komme seg tilbake etter en idrettsskade.`,
    picture: doctor2
  }
];

const SpecialistSection = () => {
  const [expandedBioIndex, setExpandedBioIndex] = useState(-1);

  const handleReadMoreClick = (index) => {
    setExpandedBioIndex(index);
  }

  const handleReadLessClick = () => {
    setExpandedBioIndex(-1);
  }

  const shouldDisplayReadMoreButton = (bio, index) => {
    const wordCount = bio.split(/\s+/).length;
    return wordCount > 60 && expandedBioIndex !== index;
  }

  return (
    <>
    <HeaderNormal/>
    <div className="container" style={{ whiteSpace: 'pre-line' ,marginTop: '50px', marginBottom: '50px' }}>
      <div className="row">
        <div className="col-12 text-center" style={{ marginBottom: '20px' }}>
          <h1 id="behandlere">Våre behandlere</h1>
        </div>
      </div>
      <div className="row">
        {staff.map((employee, index) => (
          <div key={index} className="col-md-6">
            <Card>
              <Card.Img top src={employee.picture} alt={employee.name} />
              <Card.Body>
                <Card.Title>{employee.name}</Card.Title>
                <Card.Subtitle>{employee.title}</Card.Subtitle>
                <p>
                  {shouldDisplayReadMoreButton(employee.bio, index) ?
                    `${employee.bio.split(/\s+/).slice(0, 60).join(' ')}...` :
                    employee.bio
                  }
                </p>
                {shouldDisplayReadMoreButton(employee.bio, index) ?
                  <button className="btn btn-link" style={{ color: 'white' , textDecoration: 'none' }} onClick={() => handleReadMoreClick(index)}>
                    Les mer
                  </button> :
                  expandedBioIndex === index ?
                  <button className="btn btn-link" style={{ color: 'white', textDecoration: 'none' }} onClick={handleReadLessClick}>
                    Les mindre
                  </button> : null
                }
              </Card.Body>
            </Card>
            
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default SpecialistSection;