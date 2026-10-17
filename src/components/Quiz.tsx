import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { questions } from "../data/quiz";
import { Arrow, Eyebrow, Photo } from "./ui";
export default function Quiz() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const questionRef = useRef<HTMLHeadingElement>(null);
  const q = questions[index];
  useEffect(() => {
    if (started) questionRef.current?.focus();
  }, [index, done, started]);
  function choose(answer: number) {
    if (selected !== null) return;
    setSelected(answer);
    if (answer === q.correct) setScore((s) => s + 1);
  }
  function next() {
    if (index === questions.length - 1) setDone(true);
    else {
      setIndex((i) => i + 1);
      setSelected(null);
    }
  }
  function restart() {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setStarted(true);
  }
  if (!started)
    return (
      <section className="container quiz-intro">
        <div>
          <Eyebrow>En lille udfordring til din nysgerrighed</Eyebrow>
          <h1>
            Hvor godt
            <br />
            kender du
            <br />
            <em>islandshesten?</em>
          </h1>
          <p className="lead">
            Fra vikingetid til tölt. Test din viden, og tag et par nye
            opdagelser med dig.
          </p>
          <div className="quiz-meta">
            <span>15 spørgsmål</span>
            <span>Ca. 5 minutter</span>
            <span>For alle nysgerrige</span>
          </div>
          <button className="button" onClick={() => setStarted(true)}>
            Start quizzen <Arrow />
          </button>
          <Link className="text-link quiz-read" to="/islandshesten">
            Læs om islandshesten først
          </Link>
        </div>
        <div className="quiz-intro-visual">
          <Photo position="68% center" />
          <div className="quiz-seal">
            Nysgerrighed
            <br />
            <em>klæder dig.</em>
            <span>✦</span>
          </div>
        </div>
      </section>
    );
  if (done)
    return (
      <section className="container quiz-shell">
        <Eyebrow>Du kom hele vejen</Eyebrow>
        <h1 ref={questionRef} tabIndex={-1}>
          {score < 7
            ? "Du er godt på vej!"
            : score < 12
              ? "Du ved allerede en hel del!"
              : "Du er en ægte islandshesteekspert!"}
        </h1>
        <div className="result-score">
          <strong>{score}</strong>
          <span>af {questions.length} rigtige</span>
        </div>
        <p className="lead">
          {score < 7
            ? "Der er en hel verden at opdage. Tag et kig på fakta om islandshesten, og prøv igen, når du har lyst."
            : score < 12
              ? "Du har godt fat i hestens særlige verden. Måske er der stadig en ny rytme at opdage?"
              : "Du har styr på både hove, historie og hesteliv. Behold nysgerrigheden — der er altid mere at lære."}
        </p>
        <div className="result-summary">
          <span>{score} rigtige svar</span>
          <span>{questions.length - score} nye ting at øve</span>
        </div>
        <button className="button" onClick={restart}>
          Prøv igen <Arrow />
        </button>
        <Link className="text-link quiz-read" to="/islandshesten">
          Gå på opdagelse i fakta
        </Link>
      </section>
    );
  return (
    <section className="container quiz-shell">
      <div className="quiz-topline">
        <Eyebrow>Test din viden</Eyebrow>
        <span>
          Spørgsmål {index + 1} af {questions.length}
        </span>
      </div>
      <progress
        className="quiz-progress"
        value={index + (selected !== null ? 1 : 0)}
        max={questions.length}
        aria-label="Quizfremgang"
      />
      <span className="question-number">
        {String(index + 1).padStart(2, "0")} /
      </span>
      <h1 className="question-title" ref={questionRef} tabIndex={-1}>
        {q.question}
      </h1>
      <div className="answers">
        {q.answers.map((answer, i) => (
          <button
            key={`${index}-${i}`}
            onClick={() => choose(i)}
            disabled={selected !== null}
            className={`answer ${selected !== null && i === q.correct ? "correct" : ""} ${selected === i && i !== q.correct ? "wrong" : ""}`}
          >
            <span className="answer-letter">{String.fromCharCode(65 + i)}</span>
            <span>{answer}</span>
            <span aria-hidden="true">
              {selected !== null && i === q.correct ? (
                "✓"
              ) : selected === i ? (
                "×"
              ) : (
                <Arrow />
              )}
            </span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <div className="answer-feedback" role="status">
          <strong>
            {selected === q.correct ? "Helt rigtigt." : "Et godt forsøg."}
          </strong>
          <p>{q.explanation}</p>
          <button onClick={next} className="button">
            {index === questions.length - 1
              ? "Se dit resultat"
              : "Næste spørgsmål"}{" "}
            <Arrow />
          </button>
        </div>
      )}
      <p className="small muted">Svarene gemmes kun, mens quizzen er åben.</p>
    </section>
  );
}
