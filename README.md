Readme · MD
Kopieren

# Express.js + TypeScript Lernprojekt 🚀

Ein vollständiges Express.js Projekt mit TypeScript, vorbereitet für TypeORM und tsoa Integration.

## 📚 Tech Stack

- **Express.js 5.x** - Web Framework
- **TypeScript** - Type-sicheres JavaScript
- **Node.js** - Runtime Environment
- **Nodemon** - Auto-Reload für Development

### Geplante Integrationen:
- **TypeORM** - ORM für Datenbankoperationen
- **tsoa** - OpenAPI/Swagger Dokumentation

## 🏗️ Projektstruktur

```
express-js-test/
├── src/
│   ├── config/           # Konfigurationsdateien
│   │   └── config.ts
│   ├── controllers/      # Request Handler (wie Views in Flask)
│   │   └── user.controller.ts
│   ├── middleware/       # Express Middleware
│   │   └── error.middleware.ts
│   ├── models/          # Datenmodelle (später mit TypeORM)
│   ├── routes/          # Route Definitionen
│   │   └── user.routes.ts
│   ├── types/           # TypeScript Type Definitions
│   │   └── user.types.ts
│   └── index.ts         # Haupt-Entry Point
├── dist/                # Kompilierte JS Dateien
├── tsconfig.json        # TypeScript Konfiguration
├── package.json
└── .env.example         # Beispiel-Umgebungsvariablen
```

## 🚀 Installation & Start

### 1. Dependencies installieren
```bash
npm install
```

### 2. Environment Variables erstellen
```bash
cp .env.example .env
```

### 3. Development Server starten
```bash
npm run dev
```

Der Server läuft jetzt auf `http://localhost:3000`

## 📝 Verfügbare Scripts

| Script | Beschreibung |
|--------|--------------|
| `npm run dev` | Startet den Development Server mit Hot-Reload |
| `npm run build` | Kompiliert TypeScript zu JavaScript |
| `npm start` | Startet den Production Server |
| `npm run clean` | Löscht den dist/ Ordner |
| `npm run type-check` | Prüft TypeScript Typen ohne zu kompilieren |

## 🛣️ API Endpoints

### Health Check
```bash
GET http://localhost:3000/health
```

### User Endpoints

#### Alle User abrufen
```bash
GET http://localhost:3000/api/users
```

#### Einzelnen User abrufen
```bash
GET http://localhost:3000/api/users/:id
```

#### Neuen User erstellen
```bash
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "age": 25
}
```

#### User aktualisieren
```bash
PUT http://localhost:3000/api/users/:id
Content-Type: application/json

{
  "name": "Max Updated",
  "age": 26
}
```

#### User löschen
```bash
DELETE http://localhost:3000/api/users/:id
```

## 🎯 Vergleich mit Python Frameworks

### Express.js vs FastAPI/Flask

| Konzept | Express.js | FastAPI | Flask |
|---------|-----------|---------|-------|
| **Route Definition** | `router.get('/users', handler)` | `@app.get("/users")` | `@app.route('/users')` |
| **Type Hints** | TypeScript Interfaces | Pydantic Models | Optional mit Type Hints |
| **Middleware** | `app.use(middleware)` | `middleware` decorator | `@app.before_request` |
| **Error Handling** | Error Middleware | Exception Handlers | Error Handlers |
| **Dependency Injection** | Manual/Libraries | Eingebaut (Depends) | Flask-Injector |

### Ähnlichkeiten zu FastAPI

1. **Type Safety**: TypeScript bietet ähnliche Type-Sicherheit wie Pydantic
2. **Async/Await**: Beide unterstützen asynchrone Operationen
3. **Strukturierung**: Ähnliche Trennung von Routes, Controllers, Models

## 📖 Wichtige TypeScript Konzepte

### 1. Interfaces & Types
```typescript
interface User {
  id: string;
  name: string;
  email: string;
}
```

### 2. Generics (ähnlich wie TypeVar in Python)
```typescript
interface ApiResponse {
  data: T;
  success: boolean;
}
```

### 3. Type Guards
```typescript
if (err instanceof AppError) {
  // TypeScript weiß hier, dass err ein AppError ist
}
```

## 🔜 Nächste Schritte

### TypeORM Integration
1. Installation: `npm install typeorm reflect-metadata pg`
2. Entity Definitionen erstellen
3. Database Connection konfigurieren
4. Migrations einrichten

### tsoa Integration
1. Installation: `npm install tsoa`
2. Controller mit tsoa Decorators annotieren
3. Swagger/OpenAPI Dokumentation generieren
4. Validation einrichten

## 📚 Lernressourcen

- [Express.js Dokumentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeORM Dokumentation](https://typeorm.io/)
- [tsoa Dokumentation](https://tsoa-community.github.io/docs/)

## 🤝 Vergleich: Express Patterns

### Controller Pattern (aktuell)
```typescript
// Controller
export const getUsers = (req, res) => { ... }

// Route
router.get('/users', getUsers);
```

### Class-Based Pattern (mit tsoa später)
```typescript
@Route('users')
export class UserController {
  @Get()
  public async getUsers(): Promise { ... }
}
```

## 💡 Tipps

1. **Type-First**: Definiere immer erst die Types/Interfaces
2. **Async/Await**: Nutze async/await statt Callbacks
3. **Error Handling**: Nutze try-catch mit next(error)
4. **Middleware-Order**: Middleware-Reihenfolge ist wichtig!

## 🐛 Debugging

### TypeScript Fehler prüfen
```bash
npm run type-check
```

### Development Logs
Alle Requests werden automatisch geloggt im Dev-Mode.

---

**Viel Erfolg beim Lernen! 🎓**