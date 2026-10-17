import { useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { experiences, practical } from "../data/experiences";
import { prices, formatPrice } from "../data/prices";
import { Arrow, DemoNote, Eyebrow, PageIntro, Photo } from "./ui";
const steps = ["Oplevelse", "Dato & tid", "Kontakt", "Overblik"];
export default function Booking() {
  const [params] = useSearchParams();
  const initial =
    experiences.find((e) => e.id === params.get("tur"))?.id || "intro";
  const [selected, setSelected] = useState(initial);
  const [step, setStep] = useState(0);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [participants, setParticipants] = useState("1");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [finished, setFinished] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const [error, setError] = useState("");
  const exp = experiences.find((e) => e.id === selected)!;
  const maxParticipants = selected === "intro" ? 2 : 4;
  const today = new Date();
  const minDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  function move(next: number) {
    setError("");
    setStep(next);
    setTimeout(() => heading.current?.focus(), 0);
  }
  function select(id: string) {
    setSelected(id);
    setParticipants("1");
    setFinished(false);
    move(0);
    document.getElementById("booking")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    if (step === 1 && date < minDate) {
      setError("Vælg i dag eller en senere dato.");
      return;
    }
    if (step < 3) move(step + 1);
    else setFinished(true);
  }
  const dateLabel = date
    ? new Intl.DateTimeFormat("da-DK", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(new Date(`${date}T12:00:00`))
    : "Ikke valgt";
  return (
    <>
      <PageIntro
        label="Naturen venter"
        title="Find din egen rytme."
        text="Et roligt første møde eller lidt længere ud i landskabet. Se, hvordan en rideoplevelse kan tage form."
      />
      <section className="container rides">
        <DemoNote>
          Bookingdemo · Alle ture, priser, tidspunkter og deltagerkrav er
          eksempler. Der vises ikke ledig kapacitet, og du kan ikke reservere.
        </DemoNote>
        <div className="ride-grid">
          {experiences.map((e, i) => (
            <article className="ride-card" key={e.id}>
              <div className="ride-image">
                <Photo
                  position={
                    i === 0
                      ? "68% center"
                      : i === 1
                        ? "15% center"
                        : "90% center"
                  }
                />
                <span>{e.duration}</span>
              </div>
              <Eyebrow>
                {e.number} · {e.category}
              </Eyebrow>
              <h2>{e.title}</h2>
              <p>{e.text}</p>
              <div className="ride-details">
                <span>{e.participants}</span>
                <span>{e.level}</span>
              </div>
              <div className="ride-price">
                <strong>{formatPrice(prices[e.id])}</strong>
                <small>pr. person · eksempelpris</small>
              </div>
              <button className="button outline" onClick={() => select(e.id)}>
                Afprøv denne tur <Arrow />
              </button>
            </article>
          ))}
        </div>
      </section>
      <section id="booking" className="booking-section">
        <div className="container">
          <Eyebrow>Fra tanke til tur · demonstration</Eyebrow>
          <h2>
            En lille pause
            <br />
            <em>begynder med et valg.</em>
          </h2>
          <div className="booking-grid">
            <div className="booking-workspace">
              <ol className="step-list" aria-label="Bookingtrin">
                {steps.map((s, i) => (
                  <li key={s} aria-current={i === step ? "step" : undefined}>
                    <span>{i < step ? "✓" : i + 1}</span>
                    <small>{s}</small>
                  </li>
                ))}
              </ol>
              {finished ? (
                <div className="booking-finished" role="status">
                  <span className="finish-symbol">✓</span>
                  <h3 ref={heading} tabIndex={-1}>
                    Du har afprøvet hele forløbet.
                  </h3>
                  <p>
                    Der er ikke foretaget en reservation. Dine oplysninger er
                    ikke sendt eller gemt, og ingen betaling er gennemført.
                  </p>
                  <button
                    className="button"
                    onClick={() => {
                      setFinished(false);
                      setName("");
                      setEmail("");
                      setPhone("");
                      setDate("");
                      setTime("");
                      move(0);
                    }}
                  >
                    Prøv forfra <Arrow />
                  </button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <h3 ref={heading} tabIndex={-1}>
                    {
                      [
                        "Hvilken oplevelse drømmer du om?",
                        "Hvornår kunne du tænke dig en tur?",
                        "Afprøv kontaktfelterne",
                        "Se dit eksempel samlet",
                      ][step]
                    }
                  </h3>
                  {step === 0 && (
                    <fieldset>
                      <legend className="sr-only">Vælg oplevelse</legend>
                      {experiences.map((e) => (
                        <label
                          className={`booking-option ${selected === e.id ? "selected" : ""}`}
                          key={e.id}
                        >
                          <input
                            type="radio"
                            name="experience"
                            value={e.id}
                            checked={selected === e.id}
                            onChange={() => {
                              setSelected(e.id);
                              setParticipants("1");
                            }}
                          />
                          <span>
                            <strong>{e.title}</strong>
                            <small>
                              {e.duration} · Eksempel{" "}
                              {formatPrice(prices[e.id])}
                            </small>
                          </span>
                          <Arrow />
                        </label>
                      ))}
                    </fieldset>
                  )}
                  {step === 1 && (
                    <>
                      <p>
                        Vælg en ønskedato og et eksempel på et tidspunkt.
                        Valgene siger intet om faktisk tilgængelighed.
                      </p>
                      <div className="form-row">
                        <label>
                          Ønsket dato
                          <input
                            type="date"
                            required
                            min={minDate}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </label>
                        <label>
                          Eksempeltidspunkt
                          <select
                            required
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                          >
                            <option value="">Vælg tidspunkt</option>
                            <option>10:00</option>
                            <option>13:00</option>
                            <option>15:00</option>
                          </select>
                        </label>
                      </div>
                      <label>
                        Antal deltagere
                        <select
                          value={participants}
                          onChange={(e) => setParticipants(e.target.value)}
                        >
                          {Array.from({ length: maxParticipants }, (_, i) => (
                            <option key={i} value={i + 1}>
                              {i + 1} {i === 0 ? "deltager" : "deltagere"}
                            </option>
                          ))}
                        </select>
                      </label>
                    </>
                  )}
                  {step === 2 && (
                    <>
                      <DemoNote>
                        Brug fiktive oplysninger. Felterne afprøves kun i din
                        browser.
                      </DemoNote>
                      <label>
                        Navn
                        <input
                          required
                          autoComplete="off"
                          maxLength={100}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Eksempel: Anna"
                        />
                      </label>
                      <label>
                        E-mail
                        <input
                          type="email"
                          required
                          autoComplete="off"
                          maxLength={200}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="anna@example.com"
                        />
                      </label>
                      <label>
                        Telefon (valgfrit)
                        <input
                          type="tel"
                          autoComplete="off"
                          maxLength={30}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="Kun et fiktivt eksempel"
                        />
                      </label>
                      <p className="small">
                        Oplysningerne slettes, når du forlader siden eller
                        genindlæser. Ingen e-mail sendes.
                      </p>
                    </>
                  )}
                  {step === 3 && (
                    <>
                      <DemoNote>
                        Dette er et overblik over dine demovalg, ikke en
                        reservationsbekræftelse.
                      </DemoNote>
                      <dl className="review-list">
                        <div>
                          <dt>Navn (demo)</dt>
                          <dd>{name}</dd>
                        </div>
                        <div>
                          <dt>E-mail (demo)</dt>
                          <dd>{email}</dd>
                        </div>
                        {phone && (
                          <div>
                            <dt>Telefon (demo)</dt>
                            <dd>{phone}</dd>
                          </div>
                        )}
                        <div>
                          <dt>Oplevelse</dt>
                          <dd>{exp.title}</dd>
                        </div>
                        <div>
                          <dt>Ønske</dt>
                          <dd>
                            {dateLabel} kl. {time}
                          </dd>
                        </div>
                        <div>
                          <dt>Deltagere</dt>
                          <dd>{participants}</dd>
                        </div>
                      </dl>
                      <p>
                        Ingen reservation, betaling eller aftale oprettes. Den
                        endelige udbyder skal først bekræfte vilkår,
                        tilgængelighed og pris.
                      </p>
                    </>
                  )}
                  {error && (
                    <p role="alert" className="error-text">
                      {error}
                    </p>
                  )}
                  <div className="booking-actions">
                    {step > 0 && (
                      <button
                        type="button"
                        className="text-link"
                        onClick={() => move(step - 1)}
                      >
                        ← Tilbage
                      </button>
                    )}
                    <button type="submit" className="button">
                      {step === 3 ? "Afslut demonstration" : "Fortsæt"}{" "}
                      <Arrow />
                    </button>
                  </div>
                </form>
              )}
            </div>
            <aside className="booking-summary">
              <Eyebrow>Dit eksempel</Eyebrow>
              <h3>{exp.title}</h3>
              <dl>
                <div>
                  <dt>Varighed</dt>
                  <dd>{exp.duration}</dd>
                </div>
                <div>
                  <dt>Ønsket dato</dt>
                  <dd>{dateLabel}</dd>
                </div>
                <div>
                  <dt>Eksempeltid</dt>
                  <dd>{time || "Ikke valgt"}</dd>
                </div>
                <div>
                  <dt>Deltagere</dt>
                  <dd>{participants}</dd>
                </div>
              </dl>
              <div className="summary-total">
                <span>Eksempel i alt</span>
                <strong>
                  {formatPrice(prices[selected] * Number(participants))}
                </strong>
              </div>
              <p>Vejledende demopris. Intet beløb opkræves.</p>
              <span className="small">◎ Ingen reel reservation</span>
            </aside>
          </div>
        </div>
      </section>
      <section className="container section">
        <Eyebrow>Godt at vide inden en tur</Eyebrow>
        <h2>
          Forberedelse giver
          <br />
          <em>plads til oplevelsen.</em>
        </h2>
        <div className="care-grid">
          {practical.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
