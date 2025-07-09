# Backend — Torneo Ping-Pong Aziendale

## Stack Tecnologico
- **ASP.NET Core 9 (Web API)**
- **Entity Framework Core** (SQLite)
- **BCrypt.Net-Next** (hash password)
- **JWT** (JwtBearer middleware)
- **Swashbuckle.AspNetCore** (Swagger/OpenAPI)

---

## Struttura delle cartelle
```
backend/
├── Controllers/         # Controller API (Auth, Torneo, Partecipanti, Incontri, Classifica)
├── Models/              # Modelli Entity Framework
│   └── DTO/             # Data Transfer Object per input/output API
├── Migrations/          # Migration EF Core
├── DbSeeder.cs          # Seeder iniziale
├── AppDbContext.cs      # DbContext EF Core
├── Program.cs           # Configurazione servizi, JWT, Swagger, CORS
├── appsettings.json     # Configurazione DB e JWT
└── app.db               # Database SQLite
```

---

## Modelli principali

### User
- Id, Nome, Cognome, Email, PasswordHash
- IscrittoAlTorneo (bool), OrganizzatoreDelTorneo (bool)
- Navigazione: IncontriComeA, IncontriComeB

### Incontro
- IncontroID, Data, PartecipanteAID, PartecipanteBID
- Giocato (bool), PuntiA, PuntiB
- Navigazione: PartecipanteA, PartecipanteB

---

## Seeder iniziale
- 3 utenti (di cui 1 organizzatore)
- 5 incontri (alcuni giocati, alcuni no)
- Viene eseguito all’avvio (`Program.cs`)

---

## API principali

### Autenticazione
- `POST /api/auth/register` — Registrazione (nome, cognome, email, password)
- `POST /api/auth/login` — Login, restituisce JWT e dati utente

### Torneo
- `POST /api/torneo/iscriviti` — Iscrive l’utente autenticato al torneo
- `POST /api/torneo/sono-un-organizzatore` — Imposta l’utente come organizzatore

### Partecipanti
- `GET /api/partecipanti` — Elenco iscritti (solo per iscritti)

### Incontri
- `GET /api/incontri` — Elenco incontri (solo per iscritti)
- `POST /api/incontri` — Crea incontro (solo organizzatori)
- `PUT /api/incontri/{id}` — Modifica incontro/punteggio (solo organizzatori)
- `DELETE /api/incontri/{id}` — Elimina incontro (solo organizzatori)

### Classifica
- `GET /api/classifica` — Classifica torneo (solo per iscritti)

---

## Autenticazione JWT
- Login genera un JWT con i dati utente e i ruoli.
- Il token va inviato come `Authorization: Bearer <token>` in tutte le chiamate protette.
- La chiave segreta è configurata in `appsettings.json` e `Program.cs`.

---

## Regole di business
- **Iscrizione:** solo utenti autenticati possono iscriversi.
- **Gestione incontri:** solo organizzatori possono creare/modificare/eliminare incontri.
- **Validazione punteggio:** implementata lato backend (no pareggi, almeno 11 punti, +2 di scarto, ecc.).
- **Classifica:** ordinamento e calcolo secondo specifica.

---

## Test e Swagger
- **Swagger**: documentazione e test manuale di tutte le API su `/swagger`.
- **Pulsante Authorize**: inserisci il token JWT per testare le API protette.

---

## Avvio e deploy
1. `cd backend`
2. `dotnet build`
3. `dotnet ef database update` (solo la prima volta)
4. `dotnet run`
5. Accedi a Swagger su `http://localhost:5161/swagger`

---

## Note e best practice
- Password sempre hashate (mai in chiaro)
- JWT con ruoli e dati utente
- Validazione e gestione errori centralizzata
- Seeder per test immediato
- Codice commentato e organizzato per controller

---

Per dettagli su ogni endpoint, consulta Swagger o il codice dei controller. 