import React, { useEffect, type ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Quiz from "./components/Quiz";
import Booking from "./components/Booking";
import {
  Home,
  Education,
  HorseList,
  HorseProfile,
  About,
  Contact,
  Privacy,
  NotFound,
} from "./pages";
import { horses } from "./data/horses";
import { business } from "./data/business";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-400-italic.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "./styles.css";
const titles: Record<string, [string, string]> = {
  "/": [
    "Forside",
    "Et univers med nærvær, natur og islandske heste. Lær racen at kende, og find din egen rytme.",
  ],
  "/islandshesten": [
    "Om islandshesten",
    "Lær om islandshestens historie, pasning og fem gangarter i en interaktiv guide.",
  ],
  "/hestene": [
    "Mød hestene",
    "Mød tre tydeligt markerede fiktive hesteprofiler i vores demonstrationsgalleri.",
  ],
  "/quiz": [
    "Test din viden",
    "Hvor godt kender du islandshesten? Prøv quizzen med 15 spørgsmål og forklaringer.",
  ],
  "/rideture": [
    "Rideture & booking",
    "Udforsk eksempeloplevelser og afprøv en bookingdemo uden reservation eller betaling.",
  ],
  "/om": [
    "Om Jessica-Sofia",
    "Mennesket bag hestene. Et tekstforslag til Jessica-Sofias kommende personlige præsentation.",
  ],
  "/kontakt": [
    "Kontakt",
    "Se kommende kontaktoplysninger og afprøv kontaktformularen uden at sende oplysninger.",
  ],
  "/privatliv": [
    "Privatliv & billedbrug",
    "Læs om data, demonstrationer og billedbrug på hjemmesiden.",
  ],
};
function Metadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const horse = horses.find((h) => pathname === `/hestene/${h.slug}`);
    const [title, description] = horse
      ? [
          horse.name,
          `Mød ${horse.name}, en fiktiv demonstrationsprofil af en islandsk hest.`,
        ]
      : titles[pathname] || ["Siden findes ikke", "Denne side findes ikke."];
    document.title = `${title} | ${business.name} · ${business.descriptor}`;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.05 },
    );
    document
      .querySelectorAll(
        ".section-heading,.editorial-copy,.care-grid article,.bio-section",
      )
      .forEach((el) => {
        el.classList.add("reveal");
        observer.observe(el);
      });
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
class ErrorBoundary extends React.Component<
  { children: ReactNode },
  { error: boolean }
> {
  state = { error: false };
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    return this.state.error ? (
      <div className="container section">
        <h1>Der opstod en fejl.</h1>
        <p>
          Prøv at genindlæse siden. Formularoplysninger er ikke sendt eller
          gemt.
        </p>
        <button className="button" onClick={() => window.location.reload()}>
          Genindlæs
        </button>
      </div>
    ) : (
      this.props.children
    );
  }
}
// BrowserRouter kræver en SPA-omskrivning på hostingplatformen, se README.
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Metadata />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="islandshesten" element={<Education />} />
            <Route path="hestene" element={<HorseList />} />
            <Route path="hestene/:slug" element={<HorseProfile />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="rideture" element={<Booking />} />
            <Route path="om" element={<About />} />
            <Route path="kontakt" element={<Contact />} />
            <Route path="privatliv" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
);
