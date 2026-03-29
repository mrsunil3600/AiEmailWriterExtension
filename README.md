# Email Writer Assistant

<div align="center">
  <h3>Futuristic AI replies inside Gmail</h3>
  <p>Instant, professional responses generated from the email you are viewing or composing.</p>

  <p>
    <img src="https://img.shields.io/badge/Manifest-V3-0ea5e9" alt="Manifest V3" />
    <img src="https://img.shields.io/badge/Gmail-Ready-22c55e" alt="Gmail Ready" />
    <img src="https://img.shields.io/badge/Local%20API-8080-f97316" alt="Local API 8080" />
  </p>
</div>

---

## Why It Feels Futuristic

The extension detects Gmail compose windows in real time and injects a sleek **AI Reply** button directly into the toolbar. One click, and a professional reply appears in your draft box as if it were written by a virtual assistant.

---

## Core Features

- **One‑click AI reply**: Generates a response based on the visible email content.
- **Gmail‑native UI**: Button sits inside the Gmail compose toolbar.
- **Live compose detection**: MutationObserver tracks new compose windows instantly.
- **Fast local API**: Sends the email content to a local endpoint and inserts the result.

---

## Architecture (3‑Layer Flow)

1. **Gmail DOM Detection**
   Scans for email content and compose toolbars, then listens for new compose dialogs via MutationObserver.
2. **AI Request**
   Sends the email content to `http://localhost:8080/v1/email` using a JSON payload with a `professional` tone.
3. **Draft Injection**
   Inserts the generated reply into Gmail’s editable compose box.

---

## Install (Chrome / Chromium)

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select this folder.
4. Open Gmail and start composing.

---

## Usage

1. Open Gmail and click **Compose** or open a reply.
2. Click **AI Reply** in the compose toolbar.
3. Wait for the reply to appear in the editor.

---

## Local API Contract

**Request**
```json
POST /v1/email
{
  "emailContent": "string",
  "tone": "professional"
}
```

**Response**
```
text/plain
```

---

## Permissions (Manifest V3)

- `storage` and `activeTab`
- Runs only on `mail.google.com`

---

## Project Structure

```
EmailWriterExtension/
├─ content.js        # DOM detection + AI button injection
├─ content.css       # Styles (optional / extendable)
├─ manifest.json     # Extension manifest (MV3)
└─ README.md
```

---

## Roadmap Ideas

- Tone selector (professional, friendly, concise)
- Streaming responses
- On‑device fallback prompts
- Reply history panel

---

## Troubleshooting

- If the button doesn’t appear, refresh Gmail or open a new compose window.
- If replies fail, ensure the local API is running at `localhost:8080`.
