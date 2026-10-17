# Jessica-Sofia | Islandske Heste

En dansk hjemmeside bygget med React, TypeScript, Vite og Tailwind CSS. Alle billeder og skrifttyper leveres lokalt. Ingen backend, kundedatabase, betaling eller analyseværktøjer er tilkoblet.

## Start og se hjemmesiden

Kræver Node.js 22 eller 24 og npm. Kør fra repositoryets rod:

```bash
npm ci
npm run dev -- --port 5173
```

Vite starter på port **5173** og lytter på alle interfaces. Åbn `/Jessica-sofia-hestehjemmeisde/` på udviklingsserveren. Hvis din Codex-visning tilbyder en webvisning eller portvisning, vælg port 5173. Cloud-onboardingvisningen understøtter ikke et direkte localhost-preview; brug i så fald en lokal checkout og åbn den adresse, Vite viser i din terminal. GitHub Pages udgives af workflowet beskrevet nedenfor.

```bash
npm run build       # TypeScript-kontrol + produktionsbuild i dist/
npm run preview     # Afprøv produktionsbuild på port 4173
npm test            # Browsertests: desktop, mobil og automatisk WCAG-kontrol
npm run format:check # Kontrollér læsbar kodeformatering
```

Browsertests bruger `/usr/bin/chromium`, når den findes. På en anden maskine installeres testbrowseren med `npx playwright install chromium` (Linux kan også kræve systemafhængigheder). Der er ingen separat ESLint-konfiguration; TypeScript, Prettier og browsertests er de konfigurerede kontroller. Den automatiske WCAG-kontrol erstatter ikke manuel afprøvning med hjælpemidler.

## Redigér indholdet

Filerne ligger i `src/data/` og kan ændres i en almindelig teksteditor. Bevar anførselstegn, kommaer og feltnavne. Kør `npm run build` efter ændringer.

| Fil              | Indhold                                                                                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `business.ts`    | Navn, undertitel, navigation og kontaktoplysninger. Kontaktfelter er tomme, så der ikke opfindes kontaktdata.                                                                     |
| `biography.ts`   | Introduktion, tekstforslag og biografiske afsnit.                                                                                                                                 |
| `horses.ts`      | Tre fiktive profiler: navn, alder, farve, personlighed, historie, interesser, billede og galleri. Kopiér et objekt for at tilføje en hest; brug en unik `slug` med små bogstaver. |
| `images.ts`      | Fælles billedstier og forklaring af billedbrug.                                                                                                                                   |
| `experiences.ts` | Ture, varighed, deltagerkrav og praktisk information.                                                                                                                             |
| `prices.ts`      | Eksempelpriser pr. person i kroner, knyttet til turenes id.                                                                                                                       |
| `quiz.ts`        | Spørgsmål, svar og forklaring. `correct: 0` betyder første svar, `1` andet osv. Sværhedsgrad er klar til senere filtrering; første udgave bruger alle spørgsmål.                  |
| `facts.ts`       | Fakta, fem gangarter og kilde-/kontrolnoter. Tal er vejledende.                                                                                                                   |

### Egne billeder

Læg komprimerede WebP- eller JPG-filer i `public/images/`. Brug eksempelvis `/images/freja.webp` i hestens `image` og en liste af stier i `gallery`. Fælles stemningsbilleder skiftes i `images.ts`. Sæt `portrait` til stien til Jessica-Sofias portræt i samme fil; så erstattes de typografiske portrætfelter automatisk på forsiden og Om-siden. Billeder bør være ca. 1600–2000 px brede til hero og 800–1200 px til kort. Brug kun billeder med dokumenteret ret til offentliggørelse.

Det nuværende billede er AI-genereret demonstrationsmateriale. Det samme stemningsbillede bruges med forskellige udsnit, og det forestiller ikke de fiktive profiler eller Jessica-Sofias faktiske heste. Portrætfelter er bevidste typografiske pladsholdere. Ved ægte billeder opdateres også billedtekster og `alt`-beskrivelser i `components/ui.tsx` og de relevante sider.

## Hvad virker?

- Syv hovedsider, klientnavigation, sticky header og mobilmenu med Escape-lukning.
- Tre hesteprofiler og et billedgalleri pr. profil.
- Udvidelige fakta og fem gangartfaner med piletastnavigation.
- 15 quizspørgsmål, umiddelbar feedback, låsning af svar, score og genstart.
- Bookingdemo: oplevelse → dato/tid/deltagere → kontaktfelter → overblik. Felter valideres, eksempelbeløb opdateres, og der vises aldrig en falsk reservation.
- Kontaktformulardemo med indbygget validering. Der sendes ingen beskeder.
- Lokale skrifttyper, responsivt layout, billedfejltilstand, fokusmarkering, reduceret bevægelse og metadata pr. side.

Der anvendes ingen lokal lagring af formularer. Oplysninger findes kun i sidens hukommelse, mens den er åben. Brug fiktive oplysninger i demoerne.

## Før rigtige bookinger

1. Bekræft priser, ture, adresse, kontaktdata, biografi, hesteoplysninger og billedrettigheder. Udskift alle demonstrationstekster.
2. Vælg en rigtig bookingudbyder, fx Calendly. Integrér den i `src/components/Booking.tsx`; lad udbyderen håndtere faktisk kapacitet og bekræftelser. En udbyderintegration er endnu ikke implementeret.
3. Fastlæg sikkerhedsregler, alders-/vægtgrænser, krav til erfaring, afbestilling og vejrbetingelser.
4. Tilføj privatlivsoplysninger, databehandleraftaler og passende sikkerhed. Brug en godkendt server-/udbyderløsning til kundedata. API-nøgler må ikke ligge i frontend.
5. Tilslut kontaktformularen til en sikker formular-/mailtjeneste med spamkontrol og ærlige fejl-/kvitteringsbeskeder. Konfigurer ikke betaling, før aftalevilkår og sikker integration er klar.

## Automatisk udgivelse på GitHub Pages

Website: **https://simone925n.github.io/Jessica-sofia-hestehjemmeisde/**

Repositoryets **Settings → Pages → Source** skal være **GitHub Actions**. Workflowet i `.github/workflows/deploy-pages.yml` kører ved push til `main` og kan også startes manuelt fra fanen **Actions**. Det installerer låste afhængigheder med `npm ci`, bygger med Node 24 og `npm run build`, uploader `dist` og udgiver med GitHubs officielle Pages-actions. Under **Actions → Deploy website to GitHub Pages** ses status og eventuelle fejl. Første udgivelse kan tage nogle minutter.

Vite bruger den præcise base `/Jessica-sofia-hestehjemmeisde/`. Router, scripts, billeder, favicon og skrifttyper følger denne sti. `vite.config.ts` opretter `index.html` i hver sides undermappe samt `404.html`, fordi Pages ikke tilbyder SPA-omskrivning. Dermed virker direkte links og genindlæsning på fx `/Jessica-sofia-hestehjemmeisde/hestene/freja/` med HTTP 200. Ukendte sider viser hjemmesidens egen 404-side. Nye heste får automatisk en statisk side fra `horses.ts`; nye hovedsider skal også registreres i navigationen.

`npm test` kontrollerer både udviklingsserveren og produktionsfilerne på en separat, streng statisk server uden SPA-fallback. Det dækker repository-stien, billeder, direkte links, genindlæsning, klientnavigation og bookingparametre på mobil og desktop. Produktionsbuildet laves automatisk før den statiske testserver starter.

Ved senere flytning til eget domæne eller en anden host skal `base` i `vite.config.ts` tilpasses (ofte til `/`). Netlify- og Vercel-konfigurationerne er fortsat med, men GitHub Pages bruger kun Actions-workflowet.

Cloudmiljøets publicering og offentlig udgivelse af hjemmesiden er to forskellige handlinger. Et lokalt build udgiver ikke siden; push til `main` starter GitHub Actions.
