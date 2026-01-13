<br />

# Contributing to nero-review

Thanks for your interest in contributing to **nero-review**.

---

<br />

## How to Contribute

1. Fork the repository
2. Create a new branch (use a clear, descriptive name)
3. Make your changes
4. Open a pull request with a concise explanation

👉 **Small, focused PRs are strongly preferred.**

---

<br />

## Picking Issues

Issues labeled **`good first issue`** or **`help wanted`** are open for anyone to work on.

If an issue is unassigned, feel free to take it — no need to ask for permission.  
If you plan a larger change, open an issue first to discuss scope and direction.

---

<br />

## Local Development Setup

### Prerequisites

- **Node.js ≥ 18**
- **pnpm**

Install pnpm globally:

    ```bash
    npm install -g pnpm
    ```

or

Install pnpm: https://pnpm.io/installation

1. **Fork the repo**

2. **Clone your fork**

   ```bash
   git clone https://github.com/<username>/nero-review.git
   ```

3. **Move to the project root directory**

   ```bash
   cd nero-review
   ```

4. **Install dependencies**

   ```bash
   pnpm install
   ```

5. **Build the project**

   ```bash
   pnpm build
   ```

---

<br />

## Running the CLI locally (using npm link)

**To test nero-review as a global command during development:**

1. Link the package

   ```bash
   npm link
   ```

2. Run the CLI

   ```bash
   nero-review ./api/login/route.ts
   ```

3. After making changes

   ```bash
   pnpm build
   ```

The linked command will automatically use the updated build.

---

<br />

**Unlinking (cleanup)**

When you’re done:

```bash
npm unlink
```

---
