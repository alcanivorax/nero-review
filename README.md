<br />

<h1 align="center">nero-review</h1>

<p align="center">
  <img src="https://img.shields.io/npm/v/nero-review?color=6366f1" alt="npm version" />
  <img src="https://img.shields.io/npm/dw/nero-review?color=0f172a" alt="npm downloads" />
  <img src="https://img.shields.io/github/license/alcanivorax/nero-review?color=22c55e" alt="license" />
</p>

<br />

<p align="center">
  <img
    src="https://raw.githubusercontent.com/alcanivorax/nero-review/main/assets/nero-review-preview.gif"
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
👉 **[Read documentation](link)** -->

`nero-reivew` currently supports **OpenRouter** as its AI provider

You must configure and OpenRouter API key and model before running the CLI.

---

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

## Recommended OpenRouter Models

`nero-review` performance depends heavily on the selected model.

For the best experince, use one of the following OpenRouter models:

---

<br />

### Fast & Balanced (Recommended)

Best choice for everyday use. Good speed with reliable reasoning.

**Free**

```text
mistralai/devstral-2512:free
google/gemma-3-27b-it:free
```

**Paid**

```text
anthropic/claude-3.5-sonnet
openai/gpt-4o-mini
```

<br />

### High Quality (Slower)

**Free**

```text
qwen/qwen3-coder:free
```

**Paid**

```text
anthropic/claude-3-opus
openai/gpt-4o
```

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
