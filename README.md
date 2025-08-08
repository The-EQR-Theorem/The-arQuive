# The ArQuive

**The ArQuive is an open-source platform that surfaces the latest unsolved problems from arXiv's quantum science papers, connecting researchers to their next project and to each other.**

This project was built as a prototype for the Unitary Foundation's microgrant program. It is a fully functional web application that reads from a live cloud database and includes an automated backend service for connecting interested researchers.

---

### ✨ A Note from the Creator(s)

**Hi, I'm Nafisa Shamim Rafa, and I conceived, designed, and built The ArQuive.** I'm passionate about quantum science and making cool, open-source tools that researchers will actually use.

This project is Step 1.

The big plan? The ArQuive is slated to be the flagship project of **The EQR Theorem** - a non-profit I'm launching with my friend, **Eshika Tripura Puja**, to build more stuff like this.

---

### What This Thing Actually Does

- **A Live Feed of _New_ Problems:** Forget dusty archives. This displays a clean, reverse-chronological feed of open questions curated from the very latest `quant-ph` preprints. If it was published this week, it's on here.
- **The Collaboration Matchmaker:** You can anonymously "Express Interest" in a problem. If someone else does too, the system's backend automatically connects you both over email. It’s a simple way to spark new research partnerships.
- **An Academic-Inspired Design:** I wanted this to feel less like a generic website and more like a beautiful, interactive journal page. The design is intentional; it's meant to be a charming and focused space for deep thinking.

---

### 🛠️ Tech Stack (Because I Like Building with Good Tools)

Sure, this could be a simple static site, but where's the fun in that?

- **Frontend:** [Astro](https://astro.build/) - The frontend is pretty fast.
- **Backend & DB:** [Supabase](https://supabase.com/) - An amazing open-source backend with a real PostgreSQL database and serverless Edge Functions.
- **Transactional Email:** [Nodemailer](https://nodemailer.com/) - Sent via Gmail SMTP for a reliable, free solution.
- **Deployment:** [Vercel](https://vercel.com/) - Hassle-free!

---

### 🚀 Clone it. Run it. Break it.

Seriously, the best way to see what this is about is to run it yourself.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/The-EQR-Theorem/The-arQuive.git
    ```
2.  **Navigate into the project:**
    ```bash
    cd The-arQuive
    ```
3.  **Set up your environment variables:**
    You'll need a `.env` file for your Supabase keys. Just copy the example file to get started:

    ```bash
    cp .env.example .env
    ```

    Then, open the new `.env` file and add your actual Supabase URL and Anon Key.

4.  **Install all dependencies:**
    ```bash
    npm install
    ```
5.  **And blast off:**
    ```bash
    npm run dev
    ```
    The site will be running at `http://localhost:4321`.
