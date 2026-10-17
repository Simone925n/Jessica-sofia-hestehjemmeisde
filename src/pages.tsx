import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Arrow,
  ButtonLink,
  Closing,
  DemoNote,
  Eyebrow,
  PageIntro,
  Photo,
} from "./components/ui";
import { biography } from "./data/biography";
import { horses } from "./data/horses";
import { facts, gaits, seasonal } from "./data/facts";
import { experiences } from "./data/experiences";
import { formatPrice, prices } from "./data/prices";
import { images } from "./data/images";
import { business } from "./data/business";

export function Home() {
  return (
    <>
      <section className="hero">
        <Photo priority />
        <div className="hero-shade" />
        <div className="container hero-content">
          <Eyebrow>Et liv med islandske heste</Eyebrow>
          <h1>
            Tættere på naturen.
            <br />
            <em>Tættere på hesten.</em>
          </h1>
          <p>
            Der er noget særligt ved at sænke tempoet.
            <br />
            Mærke rytmen. Og møde verden fra hesteryg.
          </p>
          <div className="hero-buttons">
            <ButtonLink to="/rideture" light>
              Udforsk rideture
            </ButtonLink>
            <Link to="/islandshesten" className="hero-text-link">
              Lær islandshesten at kende <Arrow />
            </Link>
          </div>
        </div>
        <div className="hero-bottom container">
          <span>RO I SINDET. VIND I MANEN.</span>
          <span className="hero-caption">AI-genereret stemningsbillede</span>
          <a href="#velkommen" aria-label="Læs videre">
            ↓
          </a>
        </div>
      </section>
      <div className="manifesto-strip">
        <span>Nærvær frem for tempo</span>
        <i>✦</i>
        <span>Små heste. Store personligheder.</span>
        <i>✦</i>
        <span>Naturen som følgesvend</span>
      </div>
      <section id="velkommen" className="container section editorial">
        <div className="editorial-copy">
          <Eyebrow>Velkommen til vores hesteunivers</Eyebrow>
          <h2>
            En lille hest.
            <br />
            En <em>helt særlig</em>
            <br />
            forbindelse.
          </h2>
          <p>
            Den kraftige manke. Det nysgerrige blik. Og en rytme, der er helt
            dens egen. Islandshesten rummer meget mere, end størrelsen afslører.
          </p>
          <p>
            Her kan du lære racen at kende, gå på opdagelse i hestenes
            forskelligheder og finde inspiration til et møde med naturen fra
            sadlen.
          </p>
          <Link className="text-link" to="/islandshesten">
            Mød islandshesten <Arrow />
          </Link>
        </div>
        <div className="editorial-visual">
          <Photo position="70% center" />
          <span className="vertical-label">
            ROBUST AF NATUR · BLID AF VÆSEN
          </span>
          <div className="image-tag">
            <span>01 /</span> En verden i sit eget tempo
          </div>
        </div>
      </section>
      <section className="explore-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>Følg din nysgerrighed</Eyebrow>
              <h2>
                Hver sin vej ind.
                <br />
                <em>Samme kærlighed til hesten.</em>
              </h2>
            </div>
            <p>
              Bliv klogere, kom tættere på,
              <br />
              eller udfordr det, du allerede ved.
            </p>
          </div>
          <div className="explore-grid">
            <Link to="/islandshesten" className="explore-card photo-card">
              <Photo position="40% center" />
              <div>
                <span className="eyebrow">01 · Lær racen at kende</span>
                <h3>
                  Mere end
                  <br />
                  en smuk manke.
                </h3>
                <span className="round-arrow">
                  <Arrow />
                </span>
              </div>
            </Link>
            <Link to="/hestene" className="explore-card sage-card">
              <span className="eyebrow">02 · Mød hestene</span>
              <div className="line-art" aria-hidden="true">
                ♞
              </div>
              <div>
                <h3>
                  Tre personligheder.
                  <br />
                  Masser af hjerte.
                </h3>
                <span className="round-arrow">
                  <Arrow />
                </span>
              </div>
              <small>Fiktive demonstrationsprofiler</small>
            </Link>
            <Link to="/quiz" className="explore-card quiz-card">
              <span className="eyebrow">03 · Test din viden</span>
              <span className="large-number" aria-hidden="true">
                5
              </span>
              <div>
                <h3>
                  Fem gangarter.
                  <br />
                  Hvor meget ved du?
                </h3>
                <span className="round-arrow">
                  <Arrow />
                </span>
              </div>
              <small>15 spørgsmål · ét nysgerrigt sind</small>
            </Link>
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <Eyebrow>Fra første møde til nye stier</Eyebrow>
            <h2>
              Oplevelser med
              <br />
              <em>plads til nærvær.</em>
            </h2>
          </div>
          <Link className="text-link" to="/rideture">
            Se rideture & bookingdemo <Arrow />
          </Link>
        </div>
        <DemoNote>
          Eksempeloplevelser og eksempelpriser · Ingen ture kan reserveres
          endnu.
        </DemoNote>
        <div className="experience-preview">
          {experiences.map((e) => (
            <Link
              key={e.id}
              to={`/rideture?tur=${e.id}`}
              className="experience-row"
            >
              <span className="index">{e.number}</span>
              <div>
                <small>{e.category}</small>
                <h3>{e.title}</h3>
              </div>
              <span>{e.duration}</span>
              <span>Eksempel {formatPrice(prices[e.id])}</span>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>
      <section className="about-preview">
        <div className="container about-preview-inner">
          {images.portrait ? (
            <Photo
              className="owner-portrait"
              src={images.portrait}
              alt="Portræt af Jessica-Sofia"
            />
          ) : (
            <div className="portrait-placeholder">
              <span className="portrait-mark">J–S</span>
              <small>Plads til Jessica-Sofias eget portræt</small>
            </div>
          )}
          <div>
            <Eyebrow>Mennesket bag hestene</Eyebrow>
            <h2>
              Heste i hjertet.
              <br />
              <em>Ro i tilgangen.</em>
            </h2>
            <p>{biography.introduction}</p>
            <p className="small muted">
              Tekstforslag til den kommende personlige præsentation.
            </p>
            <ButtonLink to="/om">Lær Jessica-Sofia at kende</ButtonLink>
          </div>
        </div>
      </section>
      <Closing />
    </>
  );
}

export function Education() {
  const [gait, setGait] = useState(0);
  return (
    <>
      <PageIntro
        label="Et lille stykke Island"
        title="En hest som ingen anden."
        text="Formet af landskabet. Bevaret gennem generationer. Lær den lille, stærke hest med de mange facetter at kende."
      />
      <section className="container education-opening">
        <Photo caption />
        <div>
          <Eyebrow>Rødder i vikingetiden</Eyebrow>
          <h2>
            En lang historie.
            <br />
            <em>Et levende nærvær.</em>
          </h2>
          <p>
            Da de første nordiske bosættere kom til Island fra slutningen af
            800-tallet, tog de heste med. Gennem århundreder har den isolerede
            bestand udviklet sig til den race, vi kender i dag.
          </p>
          <p>
            En kompakt krop, en tæt pels og en fyldig man og hale er
            karakteristiske træk. Men islandshesten er også alsidig: fra rolige
            ture og arbejde fra jorden til sport og præcisionsridning.
          </p>
          <p>
            Den beskrives ofte som robust og samarbejdsvillig. Hver hest har dog
            sit eget temperament og sine egne behov.
          </p>
        </div>
      </section>
      <section className="container section">
        <div className="section-heading">
          <div>
            <Eyebrow>Små fakta, store forskelle</Eyebrow>
            <h2>
              Lær den lidt <em>bedre at kende.</em>
            </h2>
          </div>
          <p>Åbn et felt, og kom et lag dybere.</p>
        </div>
        <div className="facts-grid">
          {facts.map((f, i) => (
            <details className="fact" key={f.title}>
              <summary>
                <span className="eyebrow">
                  0{i + 1} · {f.title}
                </span>
                <strong>{f.value}</strong>
                <span className="fact-expand" aria-hidden="true">
                  +
                </span>
              </summary>
              <p>{f.text}</p>
              <small>{f.source}</small>
            </details>
          ))}
        </div>
      </section>
      <section className="gait-section">
        <div className="container">
          <Eyebrow>Find rytmen</Eyebrow>
          <h2>
            Fem måder at
            <br />
            <em>bevæge sig gennem verden.</em>
          </h2>
          <div
            role="tablist"
            aria-label="De fem gangarter"
            className="gait-tabs"
          >
            {gaits.map((g, i) => (
              <button
                role="tab"
                key={g.name}
                id={`gait-${i}`}
                aria-controls="gait-panel"
                aria-selected={gait === i}
                tabIndex={gait === i ? 0 : -1}
                onClick={() => setGait(i)}
                onKeyDown={(event) => {
                  if (
                    ["ArrowRight", "ArrowLeft", "Home", "End"].includes(
                      event.key,
                    )
                  ) {
                    event.preventDefault();
                    const next =
                      event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 4
                          : (i + (event.key === "ArrowRight" ? 1 : 4)) % 5;
                    setGait(next);
                    document.getElementById(`gait-${next}`)?.focus();
                  }
                }}
              >
                <span>0{i + 1}</span>
                {g.name}
              </button>
            ))}
          </div>
          <div
            className="gait-panel"
            role="tabpanel"
            id="gait-panel"
            aria-labelledby={`gait-${gait}`}
            tabIndex={0}
          >
            <div>
              <span className="gait-big">0{gait + 1}</span>
              <Eyebrow>{gaits[gait].rhythm}</Eyebrow>
              <h3>{gaits[gait].name}</h3>
              <p>{gaits[gait].text}</p>
              <p className="gait-unique">{gaits[gait].unique}</p>
            </div>
            <div className="gait-visual">
              <div className="hoof-pattern" aria-hidden="true">
                {Array.from({ length: 4 }, (_, i) => (
                  <span
                    key={i}
                    className={
                      i < (gait === 0 || gait === 3 ? 4 : gait === 2 ? 3 : 2)
                        ? "active"
                        : ""
                    }
                  >
                    {i + 1}
                  </span>
                ))}
              </div>
              <p>Rytmeillustration · {gaits[gait].rhythm.toLowerCase()}</p>
              <small>Plads til en fagligt gennemgået gangartsvideo.</small>
            </div>
          </div>
          <div className="gait-footnote">
            <h3>Firegænger eller femgænger?</h3>
            <p>
              En firegænger viser skridt, trav, galop og tölt. En femgænger
              viser desuden flyvende pas. Gangartsanlæg og træning varierer fra
              hest til hest.
            </p>
            <a
              href="https://www.feif.org/icelandic-horse/gaits/"
              target="_blank"
              rel="noreferrer"
            >
              Læs mere hos FEIF ↗
            </a>
          </div>
        </div>
      </section>
      <section className="container section">
        <Eyebrow>Omsorg gennem året</Eyebrow>
        <h2>
          Robust betyder ikke
          <br />
          <em>uden behov.</em>
        </h2>
        <div className="care-grid">
          {seasonal.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="inline-cta">
          <div>
            <h3>Hvor meget hænger ved?</h3>
            <p>Prøv 15 spørgsmål om islandshestens særlige verden.</p>
          </div>
          <ButtonLink to="/quiz">Test din viden</ButtonLink>
        </div>
      </section>
    </>
  );
}

export function HorseList() {
  return (
    <>
      <PageIntro
        label="Hver hest, sin fortælling"
        title="Små heste. Store personligheder."
        text="Et nysgerrigt blik, en blød mule og deres helt egen måde at være i verden på. Her er plads til at lære hver enkelt at kende."
      />
      <section className="container horse-section">
        <DemoNote>
          Alle tre heste er fiktive eksempler. Billederne er
          stemningsillustrationer og forestiller ikke de enkelte profiler.
        </DemoNote>
        <div className="horse-grid">
          {horses.map((h, i) => (
            <Link to={`/hestene/${h.slug}`} key={h.slug} className="horse-card">
              <div className="horse-photo">
                <Photo src={h.image} position={h.position} />
                <span className="horse-counter">0{i + 1} / 03</span>
              </div>
              <div className="horse-card-title">
                <h2>{h.name}</h2>
                <Arrow />
              </div>
              <span className="eyebrow">
                {h.age} år · {h.color} · Fiktiv profil
              </span>
              <h3>{h.personality}</h3>
              <p>{h.short}</p>
              <span className="text-link">
                Mød mig <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <Closing />
    </>
  );
}
export function HorseProfile() {
  const { slug } = useParams();
  const horse = horses.find((h) => h.slug === slug);
  if (!horse) return <NotFound />;
  return (
    <>
      <section className="container profile">
        <Link to="/hestene" className="text-link">
          ← Alle hestene
        </Link>
        <div className="profile-grid">
          <Photo src={horse.image} position={horse.position} caption />
          <div>
            <Eyebrow>En fiktiv fortælling</Eyebrow>
            <h1>{horse.name}</h1>
            <p className="lead">{horse.personality}</p>
            <DemoNote>
              Demonstrationsprofil · Ikke en virkelig hest hos Jessica-Sofia.
            </DemoNote>
            <dl className="profile-facts">
              <div>
                <dt>Alder</dt>
                <dd>{horse.age} år</dd>
              </div>
              <div>
                <dt>Race</dt>
                <dd>Islandsk hest</dd>
              </div>
              <div>
                <dt>Farve</dt>
                <dd>{horse.color}</dd>
              </div>
            </dl>
            <p>{horse.story}</p>
            <h2 className="h3">De små glæder</h2>
            <p>
              <strong>Holder af:</strong> {horse.activities}
            </p>
            <p>
              <strong>En lille godbid:</strong> {horse.treats}. Godbidder gives
              kun efter aftale med den ansvarlige.
            </p>
          </div>
        </div>
        <div className="profile-gallery">
          <div>
            <Eyebrow>Plads til flere øjeblikke</Eyebrow>
            <h2>Et liv i billeder.</h2>
            <p>
              Tilføj egne billeder i indholdsfilen, når den virkelige profil er
              klar.
            </p>
          </div>
          {horse.gallery.map((src, i) => (
            <Photo
              key={i}
              src={src}
              position={i === 0 ? horse.position : "10% center"}
              caption
            />
          ))}
        </div>
      </section>
      <Closing />
    </>
  );
}
export function About() {
  return (
    <>
      <PageIntro
        label="Om Jessica-Sofia"
        title="Mennesket bag hestene."
        text="En personlig fortælling om glæden ved heste, samspillet og alle de små øjeblikke imellem."
      />
      <section className="container about-body">
        {images.portrait ? (
          <Photo
            className="owner-portrait large"
            src={images.portrait}
            alt="Portræt af Jessica-Sofia"
          />
        ) : (
          <div className="portrait-placeholder large">
            <span className="portrait-mark">J–S</span>
            <small>Jessica-Sofias eget portræt tilføjes her</small>
          </div>
        )}
        <div>
          <Eyebrow>En begyndelse</Eyebrow>
          <h2>
            Det begynder
            <br />
            med <em>forbindelsen.</em>
          </h2>
          <p className="lead">{biography.introduction}</p>
          <DemoNote>{biography.note}</DemoNote>
          {biography.sections.map((s) => (
            <article className="bio-section" key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="values-band">
        <div className="container">
          <Eyebrow>Forslag til værdier</Eyebrow>
          <div>
            <h2>Nærvær.</h2>
            <h2>Respekt.</h2>
            <h2>Nysgerrighed.</h2>
          </div>
          <p>
            De endelige værdier og fortællinger bliver formuleret sammen med
            Jessica-Sofia.
          </p>
        </div>
      </section>
      <Closing />
    </>
  );
}
export function Privacy() {
  return (
    <>
      <PageIntro
        label="Godt at vide"
        title="Privatliv & billedbrug."
        text="En åben forklaring af, hvad denne demonstrationsside gør — og hvad der mangler før en rigtig lancering."
      />
      <section className="container prose section">
        <h2>Dine oplysninger bliver i din browser</h2>
        <p>
          Booking- og kontaktformularerne er demonstrationer. Oplysninger sendes
          ikke til en server, gemmes ikke i en database og lægges ikke i lokal
          lagring. De forsvinder, når du forlader formularen eller genindlæser
          siden.
        </p>
        <h2>Ingen måling eller betaling</h2>
        <p>
          Siden anvender ikke analyseværktøjer, markedsføringscookies eller
          betalingsløsninger. Skrifttyper og billeder leveres sammen med
          hjemmesiden.
        </p>
        <h2>Stemningsbilleder og eksempelindhold</h2>
        <p>
          Hestebilledet er AI-genereret til denne demonstration. Det viser ikke
          Jessica-Sofia, hendes heste, faciliteter eller faktiske rideture.
          Hesteprofiler, priser og ture er tydeligt markerede eksempler.
          Portrætter afventer egne billeder.
        </p>
        <h2>Før hjemmesiden åbner for kunder</h2>
        <p>
          Den dataansvarliges rigtige kontaktoplysninger, behandlingsgrundlag,
          modtagere, opbevaringsfrister og oplysninger om rettigheder skal
          tilføjes i en fuld privatlivstekst. Denne side er alene en beskrivelse
          af den aktuelle demo.
        </p>
        <ButtonLink to="/kontakt">Til kontakt</ButtonLink>
      </section>
    </>
  );
}
export function Contact() {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <PageIntro
        label="Lad os tage en snak"
        title="Et godt møde begynder her."
        text="Spørgsmål om hestene, en tur i naturen eller noget helt tredje? Her bliver der plads til kontakten."
      />
      <section className="container contact-grid">
        <div>
          <Eyebrow>Find vej til hinanden</Eyebrow>
          <h2>
            Vi glæder os til
            <br />
            <em>at høre fra dig.</em>
          </h2>
          <dl className="contact-details">
            <div>
              <dt>E-mail</dt>
              <dd>
                {business.email ? (
                  <a href={`mailto:${business.email}`}>{business.email}</a>
                ) : (
                  "Tilføjes før lancering"
                )}
              </dd>
            </div>
            <div>
              <dt>Telefon</dt>
              <dd>
                {business.phone ? (
                  <a href={`tel:${business.phone.replace(/\s/g, "")}`}>
                    {business.phone}
                  </a>
                ) : (
                  "Tilføjes før lancering"
                )}
              </dd>
            </div>
            <div>
              <dt>Område</dt>
              <dd>{business.location || "Sted oplyses senere"}</dd>
            </div>
            <div>
              <dt>Sociale medier & åbningstider</dt>
              <dd>
                {business.instagram ? (
                  <a href={business.instagram} target="_blank" rel="noreferrer">
                    Instagram ↗
                  </a>
                ) : (
                  "Sociale medier tilføjes senere"
                )}
                {business.hours && <p>{business.hours}</p>}
              </dd>
            </div>
          </dl>
          <p className="small muted">
            Der vises først et kort, når den rigtige adresse er tilføjet.
          </p>
        </div>
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            setChecked(true);
          }}
          onChange={() => setChecked(false)}
        >
          <DemoNote>
            Formulardemo · Intet sendes eller gemmes. Brug kun fiktive
            oplysninger.
          </DemoNote>
          <div className="form-row">
            <label>
              Navn
              <input
                name="name"
                autoComplete="off"
                required
                maxLength={100}
                placeholder="Eksempel: Anna"
              />
            </label>
            <label>
              E-mail
              <input
                name="email"
                type="email"
                autoComplete="off"
                required
                maxLength={200}
                placeholder="Eksempel: anna@example.com"
              />
            </label>
          </div>
          <label>
            Emne
            <input
              name="subject"
              required
              maxLength={160}
              placeholder="Hvad vil du gerne vide?"
            />
          </label>
          <label>
            Din besked
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={3000}
              rows={5}
              placeholder="Skriv en eksempelbesked …"
            />
          </label>
          <p className="small">
            Ved en rigtig henvendelse skal du bruge de kontaktoplysninger, der
            tilføjes senere. Læs om <Link to="/privatliv">privatliv</Link>.
          </p>
          <button className="button" type="submit">
            Afprøv formular <Arrow />
          </button>
          {checked && (
            <div className="form-feedback" role="status">
              Felterne er udfyldt korrekt. Dette er kun en demonstration — din
              besked er ikke sendt.
            </div>
          )}
        </form>
      </section>
    </>
  );
}
export function NotFound() {
  return (
    <>
      <PageIntro
        label="404 · En lille omvej"
        title="Her ender stien."
        text="Siden findes ikke. Lad os finde tilbage til hestene."
      />
      <div className="container section">
        <ButtonLink to="/">Til forsiden</ButtonLink>
      </div>
    </>
  );
}
