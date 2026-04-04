# 💿 A.H. Mixtape - Digital Cassette Player

A retro-styled, whimsical digital mixtape player built for the desktop. Experience your local MP3 collection through a realistic 90s boombox interface, complete with a plywood bookshelf, spinning cassette animations, and editable track notes.

![Cassette Player Preview](public/preview_placeholder.png)

## ✨ Features
*   **Realistic Boombox UI**: Authentic silver metallic design with physical-style controls.
*   **Plywood Bookshelf**: Organize up to 8 custom mixtapes on a permanent wooden shelf.
*   **Animated Cassettes**: Watch the tape reels spin while your music plays.
*   **Digital Marquee**: Blue neon scrolling display for song titles.
*   **Editable Sticky Notes**: Write and save custom quotes or lyrics for every individual track.
*   **Smart Playback**: Automatic transitions between songs and playback controls.

## 🛠️ Technology Stack
*   **Frontend**: React 19 + Vite (for lightning-fast UI)
*   **Desktop App**: Electron (to run as a native Windows software)
*   **Styling**: Pure Vanilla CSS (no heavy frameworks, just clean custom gradients and animations)
*   **Audio Engine**: HTML5 Audio API

---

## 🚀 How to Use

### Option 1: Just Want to Play? (The Easy Way)
If you just want to use the player, you don't need any code!
1.  Download the `A.H_Mixtape_Revised_V7.zip` file.
2.  **Extract** the zip folder completely.
3.  Open the folder and double-click **`A.H Mixtape.exe`**.
4.  Click "ADD SONG" to load your MP3s and start your mixtape!

### Option 2: Want to Edit the Code? (The Developer Way)
To run this project locally and make your own changes:
1.  **Clone the repo**: `git clone https://github.com/your-username/cassette-player.git`
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run in Dev Mode**:
    ```bash
    npm run dev:electron
    ```
4.  **Package Your Own Build**:
    ```bash
    npm run make-installer
    ```

---

## 📂 Project Structure
*   `src/components/`: React UI components (Player, Bookshelf, Cassette).
*   `src/index.css`: The entire visual design system (Colors, Animations, Layouts).
*   `main.js`: Electron main process configuration.

---

**Developed by Afsana Hena**
