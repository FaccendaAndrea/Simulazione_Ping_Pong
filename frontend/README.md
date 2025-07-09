# Frontend — Torneo Ping-Pong Aziendale

## Stack Tecnologico
- **React 19** (CSR)
- **Vite** (dev server)
- **React Router DOM** (routing)
- **jwt-decode** (lettura JWT)
- **ESLint** (già configurato)
- **JavaScript**

---

## Struttura delle cartelle
```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   ├── Partecipanti.jsx
│   │   ├── Incontri.jsx
│   │   ├── Classifica.jsx
│   │   └── NotFound.jsx
│   ├── App.jsx
│   └── main.jsx
└── ...
```

---

## Pagine principali

### Login.jsx
- Form di login, salva token e dati utente, redirect alla dashboard.

### Register.jsx
- Form di registrazione con nome, cognome, email, password.

### Home.jsx (Dashboard utente)
- Mostra nome/cognome/email.
- Pulsante “Iscriviti al torneo” se non iscritto.
- Pulsante “Sono un organizzatore” se iscritto ma non organizzatore.
- Menu di navigazione tra Partecipanti, Incontri, Classifica.
- Logout.

### Partecipanti.jsx
- Tabella con elenco iscritti (nome, cognome, email, organizzatore).
- Visibile solo agli iscritti.

### Incontri.jsx
- Tabella incontri (data, partecipanti, stato, punteggio).
- Se organizzatore: CRUD incontri (crea, modifica, elimina, inserisci/modifica punteggio) tramite modale.
- Aggiornamento automatico della lista.

### Classifica.jsx
- Tabella classifica (giocate, vinte, % vittorie, ordinamento richiesto).
- Visibile solo agli iscritti.

### NotFound.jsx
- Pagina 404 per rotte non trovate.

### App.jsx
- Routing centralizzato, protezione rotte, fallback 404.
- Context per notifiche globali.

---

## Gestione autenticazione
- Dopo il login, il token JWT e i dati utente vengono salvati in `localStorage`.
- Le pagine protette sono accessibili solo se il token è presente.
- I dati utente (nome, cognome, ruoli) sono letti da `localStorage` e dal JWT.
- Le API sono sempre chiamate con il token JWT nell’header.

---

## Protezione e ruoli
- Le pagine sono protette da un componente `PrivateRoute` che controlla la presenza del token.
- Le azioni da organizzatore sono visibili solo se il ruolo è attivo.
- Le API sono sempre chiamate con il token JWT nell’header.

---

## UX/UI
- Responsive, accessibile, coerente, con feedback chiari.
- Notifiche globali tramite context.
- Loader e alert per operazioni CRUD.
- Stile moderno: input bianchi, testo nero, bottoni colorati.

---

## Avvio e test
1. `cd frontend`
2. `npm install` (solo la prima volta)
3. `npm run dev`
4. Accedi all’app su `http://localhost:5173`

---

## Note e best practice
- Tutte le chiamate API sono protette da JWT.
- Le azioni CRUD incontri sono disponibili solo agli organizzatori.
- Le notifiche e i loader migliorano l’esperienza utente.
- Codice commentato e organizzato per pagina.

---

Per dettagli su ogni pagina, consulta i file in `src/pages/`.
