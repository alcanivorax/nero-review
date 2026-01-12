<br />

<h1 align="center">nero-review</h1>

<p align="center">
  <img src="https://img.shields.io/npm/v/nero-review?color=6366f1" alt="npm version" />
  <!-- <img src="https://img.shields.io/npm/dm/nero-review?color=0f172a" alt="npm downloads" /> -->
  <img src="https://img.shields.io/github/license/alcanivorax/nero-review?color=22c55e" alt="license" />
</p>

<br />

<p align="center">
  <img
    src="https://raw.githubusercontent.com/<your-username>/nero-review/main/demo.gif"
    alt="nero-review demo"
    width="800"
  />
</p>

<br />

## What is nero-review?

`nero-review` is a terminal-first AI code review tool.  
It analyzes source files, understands their role and structure, validates AI output,
and delivers **clear, structured, actionable feedback** — without pulling you into a browser or UI.

Built for developers who live in the terminal.

<br />

## Installation

Install globally using npm:

```bash
npm install -g nero-review
```

<br/>

## Basic Usage

`nero-review` reviews **one file at a time**.

Run it from your project root and pass the path to a single source file:

```bash
nero-review <filepath>
```

<br/>

### Example

```bash
nero-review ./api/login/route.ts
```

<br />

## Environment Variable Setup

<!-- Full configuration details are available in the docs:
👉 **[Read documentation](link)**

--- -->

<br />

### Linux / macOS (Recommended)

Create a secrets file:

```bash
~/.config/nero/secrets.sh
```

Add your configuration:

```bash
export NERO_API_KEY="your_api_key_here"
export NERO_MODEL="your_model_name"
```

Then source it in your shell config (.zshrc, .bashrc, etc.):

```bash
[ -f "$HOME/.config/nero/secrets.sh" ] && source "$HOME/.config/nero/secrets.sh"
```

<br />

### Windows (PowerShell)

Set environment variables using PowerShell:

```bash
setx NERO_API_KEY "your_api_key_here"
setx NERO_MODEL "your_model_name"
```

Restart your terminal or VS Code after setting them.

<br />

## How nero-review works

```bash
File → Analyze → Prompt → AI → Validate → Format → Output
```

<br />

## Security Notes

- API keys are read only from environment variables
- No keys are logged or printed
- No data is stored or cached
- Requests are sent only for the file under review
