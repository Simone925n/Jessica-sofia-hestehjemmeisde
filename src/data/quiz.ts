export type Difficulty = "Begynder" | "Øvet" | "Ekspert";
export type Question = {
  question: string;
  answers: string[];
  correct: number;
  explanation: string;
  difficulty: Difficulty;
};
export const questions: Question[] = [
  {
    question: "Hvor stammer islandshesten fra?",
    answers: ["Island", "Irland", "Finland"],
    correct: 0,
    explanation:
      "Racen er udviklet på Island fra heste, som bosætterne bragte med sig.",
    difficulty: "Begynder",
  },
  {
    question: "Hvornår kom de første heste til Island?",
    answers: ["I 1800-tallet", "I vikingetiden", "I 1500-tallet"],
    correct: 1,
    explanation:
      "Bosætterne bragte heste til Island fra slutningen af 800-tallet.",
    difficulty: "Begynder",
  },
  {
    question: "Hvor mange gangarter kan en islandshest have?",
    answers: ["Kun tre", "Altid seks", "Op til fem"],
    correct: 2,
    explanation:
      "Skridt, trav, galop, tölt og flyvende pas. Ikke alle viser alle fem.",
    difficulty: "Begynder",
  },
  {
    question: "Hvor mange takter er der i tölt?",
    answers: ["Fire", "To", "Tre"],
    correct: 0,
    explanation: "Tölt er en firetaktsgangart uden svævefase.",
    difficulty: "Begynder",
  },
  {
    question: "Hvad er særligt ved flyvende pas?",
    answers: [
      "Hesten går baglæns",
      "Samme sides ben bevæger sig sammen",
      "Kun forbenene bevæger sig",
    ],
    correct: 1,
    explanation: "Flyvende pas er lateral og totaktet med en svævefase.",
    difficulty: "Øvet",
  },
  {
    question: "Hvilket stangmål er almindeligt for islandsheste?",
    answers: ["Ca. 180–190 cm", "Ca. 90–100 cm", "Ca. 135–145 cm"],
    correct: 2,
    explanation:
      "Ca. 135–145 cm er et vejledende interval. Den enkelte hest kan ligge udenfor.",
    difficulty: "Begynder",
  },
  {
    question: "Hvilket vægtinterval bruges ofte vejledende?",
    answers: ["Ca. 300–400 kg", "Ca. 50–100 kg", "Ca. 900–1.100 kg"],
    correct: 0,
    explanation:
      "Ca. 300–400 kg er vejledende. Størrelse, bygning og huld har stor betydning.",
    difficulty: "Øvet",
  },
  {
    question: "Hvor gammel kan en velpasset hest ofte blive?",
    answers: [
      "Kun 5–8 år",
      "Omkring 25–30 år, nogle ældre",
      "Altid mindst 50 år",
    ],
    correct: 1,
    explanation:
      "25–30 år er et generelt vejledende interval for heste, ingen garanti for et individ.",
    difficulty: "Begynder",
  },
  {
    question: "Hvad hjælper islandshesten i vinterkulden?",
    answers: [
      "Den har ingen pels",
      "Den sover hele vinteren",
      "Dens tætte vinterpels",
    ],
    correct: 2,
    explanation:
      "Vinterpelsen isolerer, men erstatter ikke læ, foder, vand og tilsyn.",
    difficulty: "Begynder",
  },
  {
    question: "Hvilken bevægelse kendetegner trav?",
    answers: [
      "Diagonale benpar følges ad",
      "Benene på samme side følges ad",
      "Alle fire ben står stille",
    ],
    correct: 0,
    explanation: "Trav er diagonal og totaktet med en svævefase.",
    difficulty: "Øvet",
  },
  {
    question: "Hvad betyder betegnelsen firegænger?",
    answers: [
      "En hest med fire år på bagen",
      "En hest, der viser skridt, trav, galop og tölt",
      "En hest, der kun går i skridt",
    ],
    correct: 1,
    explanation:
      "En firegænger viser disse fire gangarter; en femgænger viser også flyvende pas.",
    difficulty: "Øvet",
  },
  {
    question: "Hvad bør afgøre en turs sværhedsgrad?",
    answers: [
      "Kun hestens farve",
      "Kun dagens temperatur",
      "Både rytterens erfaring og hestens forudsætninger",
    ],
    correct: 2,
    explanation:
      "En tryg tur tilpasses både hest, rytter, terræn og forholdene.",
    difficulty: "Begynder",
  },
  {
    question: "Er alle islandsheste ens i temperament?",
    answers: [
      "Nej, hver hest er et individ",
      "Ja, de er altid helt rolige",
      "Ja, de er alle meget sky",
    ],
    correct: 0,
    explanation:
      "Racebeskrivelser kan ikke erstatte kendskab til den enkelte hest.",
    difficulty: "Begynder",
  },
  {
    question: "Hvad er vigtigt i den daglige pasning?",
    answers: [
      "Kun at børste manen",
      "Vand, foder, social kontakt, bevægelse og opsyn",
      "At undgå kontakt med andre heste",
    ],
    correct: 1,
    explanation: "Hestens fysiske og sociale behov skal tilgodeses hver dag.",
    difficulty: "Begynder",
  },
  {
    question: "Hvad adskiller tölt fra trav?",
    answers: [
      "Tölt har altid en svævefase",
      "Der er ingen forskel",
      "Tölt er firetaktet, trav er totaktet",
    ],
    correct: 2,
    explanation:
      "Tölt har fire takter uden svævefase. Trav har to takter og en svævefase.",
    difficulty: "Ekspert",
  },
];
