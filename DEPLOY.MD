# 🔐 INSTRUKCJA: Bezpieczeństwo i Deploy — Musicflew

## ⚠️ PILNE: Usuń klucz prywatny z historii gita

Twój `serviceAccountKey.json` z prywatnym kluczem Firebase jest commited do repozytorium.
To krytyczny problem bezpieczeństwa. Wykonaj poniższe kroki PRZED udostępnieniem portfolio.

---

## Krok 1: Unieważnij obecny klucz Firebase (zrób to TERAZ)

1. Wejdź na https://console.firebase.google.com
2. Wybierz projekt **musicflew**
3. Kliknij ikonę koła zębatego → **Project Settings** → zakładka **Service accounts**
4. Znajdź klucz i kliknij **Delete** (czerwona ikona kosza)
5. Kliknij **Generate new private key** — pobierz nowy plik JSON (tymczasowo, do wyciągnięcia wartości)

---

## Krok 2: Wyczyść historię gita

```bash
# W katalogu głównym projektu:
git filter-repo --path server/config/serviceAccountKey.json --invert-paths --force

# Jeśli nie masz git filter-repo:
pip install git-filter-repo
```

Alternatywnie — prostsze (jeśli repo jest prywatne):

```bash
# Dodaj plik do .gitignore
echo "server/config/serviceAccountKey.json" >> .gitignore

# Usuń z trackowania gita (plik pozostaje lokalnie)
git rm --cached server/config/serviceAccountKey.json
git commit -m "fix: remove Firebase service account key from tracking"
git push
```

---

## Krok 3: Skonfiguruj zmienne środowiskowe

### Lokalnie (development)

Skopiuj plik `.env.example` i wypełnij wartościami z nowo wygenerowanego klucza:

```bash
cp .env.example server/.env
```

Otwórz `server/.env` i uzupełnij:

```env
DB_STRING=mongodb+srv://...
CORS_ORIGIN=http://localhost:3000
FIREBASE_PROJECT_ID=musicflew
FIREBASE_PRIVATE_KEY_ID=ae99a...        # z nowego serviceAccountKey.json
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@musicflew.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=1109310...
FIREBASE_CLIENT_CERT_URL=https://www.googleapis.com/robot/v1/...
```

> ⚠️ Klucz prywatny (`FIREBASE_PRIVATE_KEY`) — wklej go z cudzysłowami i zostaw `\n` dosłownie (nie Enter).

---

## Krok 4: Deploy backendu na Railway

1. Wejdź na https://railway.app i zaloguj się przez GitHub
2. Kliknij **New Project** → **Deploy from GitHub repo**
3. Wybierz repozytorium `musicflew`
4. W ustawieniach projektu:
   - **Root Directory:** `server`
   - **Start Command:** `node app.js`
5. Kliknij **Variables** i dodaj wszystkie zmienne z `server/.env`:
   - `DB_STRING`
   - `CORS_ORIGIN` (zostaw tymczasowo `*`, zmienisz po deploymencie frontendu)
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_PRIVATE_KEY_ID`
   - `FIREBASE_PRIVATE_KEY`
   - `FIREBASE_CLIENT_EMAIL`
   - `FIREBASE_CLIENT_ID`
   - `FIREBASE_CLIENT_CERT_URL`
6. Railway automatycznie wdroży aplikację
7. Skopiuj URL backendu, np. `https://musicflew.up.railway.app`

---

## Krok 5: Deploy frontendu na Vercel

1. Wejdź na https://vercel.com i zaloguj przez GitHub
2. Kliknij **Add New Project** → importuj `musicflew`
3. Ustaw **Root Directory** na `client`
4. W sekcji **Environment Variables** dodaj:
   ```
   REACT_APP_API_URL = https://musicflew.up.railway.app/
   ```
5. Kliknij **Deploy**
6. Po deployu skopiuj swój URL Vercel, np. `https://musicflew.vercel.app`

---

## Krok 6: Zaktualizuj CORS na Railway

Wróć do Railway → Variables i zmień:

```
CORS_ORIGIN = https://musicflew.vercel.app
```

Aplikacja restartuje się automatycznie — gotowe! ✅

---

## Krok 7: Usuń tymczasowy plik JSON klucza

```bash
rm server/config/serviceAccountKey.json
```

---

## Weryfikacja

Po zakończeniu sprawdź:

- [ ] `server/config/serviceAccountKey.json` NIE istnieje w repozytorium
- [ ] `.gitignore` zawiera `server/config/serviceAccountKey.json`
- [ ] `server/config/firebase.config.js` używa `process.env.*`
- [ ] `client/src/api/index.js` używa `process.env.REACT_APP_API_URL`
- [ ] Aplikacja działa pod adresem Vercel

---

## Podsumowanie plików do zamiany

| Oryginalny plik                    | Zamień na                                |
| ---------------------------------- | ---------------------------------------- |
| `client/src/api/index.js`          | `fixes/client/src/api/index.js`          |
| `server/config/firebase.config.js` | `fixes/server/config/firebase.config.js` |
| `server/app.js`                    | `fixes/server/app.js`                    |
| `client/tailwind.config.js`        | `fixes/client/tailwind.config.js`        |
| `README.MD`                        | `fixes/README.md`                        |

Nowe pliki do dodania:

| Plik                  | Gdzie           |
| --------------------- | --------------- |
| `.env.example`        | root projektu   |
| `.gitignore`          | root projektu   |
| `client/vercel.json`  | katalog client/ |
| `server/railway.toml` | katalog server/ |
