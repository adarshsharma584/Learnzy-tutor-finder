# Backend (Learnzy)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create and update `backend/.env`:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/learnzy

ACCESS_TOKEN_SECRET=replace_with_access_token_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=replace_with_refresh_token_secret
REFRESH_TOKEN_EXPIRY=7d

FRONTEND_ORIGIN=http://localhost:5173

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
HOST_EMAIL_ADDRESS=replace_with_email@example.com
SMTP_PASS_KEY=replace_with_app_password
EMAIL_FROM=Learnzy <replace_with_email@example.com>
```

3. Run backend:
```bash
npm run dev
```

## Formatting

This repo uses 2-space indentation in backend.

- Format:
```bash
npm run format
```

- Check formatting:
```bash
npm run format:check
```

Formatting defaults are enforced by:
- `.editorconfig`
- `.prettierrc.json`
- `.vscode/settings.json`

## Model Notes

- `User` stores common profile identity fields.
- Role models (`Student`, `Parent`, `Teacher`) link with `userId` and keep only role-specific data.
- `Address` model is flat (no nested `location` object):
  - `streetAddress`
  - `city`
  - `state`
  - `country`
  - `pinCode`
  - `lat`
  - `lng`

## Address Payload (Register User)

Preferred payload:
```json
{
  "streetAddress": "221B Baker Street",
  "city": "London",
  "state": "Greater London",
  "country": "UK",
  "pinCode": "NW1",
  "lat": 51.5237,
  "lng": -0.1585
}
```

Backward compatibility exists for older fields (`houseNumber`, `location.latitude`, `location.longitude`), but new code should send the flat payload above.
