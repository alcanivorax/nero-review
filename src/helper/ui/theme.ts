import chalk, { Chalk } from "chalk";

const dim = chalk.dim;
const bold = chalk.bold;

export { dim, bold };

export const theme = {
  primary: chalk.hex("#89B4FA").bold,
  secondary: chalk.hex("#CBA6F7").bold,
  accent: chalk.hex("#94E2D5"),

  header: chalk.hex("#89B4FA").bold,
  title: chalk.hex("#CDD6F4").bold,
  muted: chalk.hex("#6C7086"),
  subtle: chalk.hex("#45475A"),

  success: chalk.hex("#A6E3A1").bold,
  warning: chalk.hex("#F9E2AF").bold,
  error: chalk.hex("#F38BA8").bold,

  score: {
    excellent: chalk.hex("#A6E3A1").bold,
    good: chalk.hex("#89B4FA").bold,
    fair: chalk.hex("#F9E2AF").bold,
    poor: chalk.hex("#FAB387").bold,
    bad: chalk.hex("#F38BA8").bold,
  },

  severity: {
    high: chalk.hex("#F38BA8").bold,
    medium: chalk.hex("#FAB387").bold,
    low: chalk.hex("#A6E3A1").bold,
    unknown: chalk.hex("#6C7086").bold,
  },

  bullet: chalk.hex("#CBA6F7")("◆"),
  arrow: chalk.hex("#89DCEB")("›"),
  loader: chalk.hex("#CBA6F7"),

  box: {
    topLeft: "╭",
    topRight: "╮",
    bottomLeft: "╰",
    bottomRight: "╯",
    horizontal: "─",
    vertical: "│",
  },

  divider: (width: number) => dim("─".repeat(width)),

  lineInfo: (line: number | null) => chalk.hex("#6C7086")(`:${line ?? "?"}`),

  badge: (text: string, color: ReturnType<typeof chalk.hex>) => {
    return color(` ${text.toUpperCase()} `);
  },

  scoreBar: (score: number, width: number = 10) => {
    const filled = Math.round((score / 10) * width);
    const empty = width - filled;
    const barColor =
      score >= 8
        ? "#A6E3A1"
        : score >= 6
          ? "#89B4FA"
          : score >= 4
            ? "#F9E2AF"
            : "#F38BA8";
    return (
      chalk.hex(barColor)("█".repeat(filled)) +
      chalk.hex("#45475A")("░".repeat(empty))
    );
  },
};

export function fileIcon(language: string): string {
  const icons: Record<string, string> = {
    // ─── Web ───────────────────────────────────────────────────────────────
    typescript: chalk.hex("#3178C6")(" TS "),
    javascript: chalk.hex("#F7DF1E")(" JS "),
    html: chalk.hex("#E34F26")(" HT "),
    css: chalk.hex("#1572B6")(" CS "),
    scss: chalk.hex("#CC6699")(" SC "),
    sass: chalk.hex("#CC6699")(" SA "),
    less: chalk.hex("#1D365D")(" LE "),
    vue: chalk.hex("#42B883")(" VU "),
    svelte: chalk.hex("#FF3E00")(" SV "),
    astro: chalk.hex("#FF5D01")(" AS "),
    jsx: chalk.hex("#61DAFB")(" JX "),
    tsx: chalk.hex("#3178C6")(" TX "),

    // ─── Systems ───────────────────────────────────────────────────────────
    rust: chalk.hex("#CE412B")(" RS "),
    go: chalk.hex("#00ADD8")(" GO "),
    cpp: chalk.hex("#00599C")(" C+"),
    c: chalk.hex("#555555")("  C "),
    zig: chalk.hex("#F7A41D")(" ZG "),
    nim: chalk.hex("#FFE953")(" NI "),
    odin: chalk.hex("#3882D4")(" OD "),
    assembly: chalk.hex("#6E4C13")(" AS "),
    asm: chalk.hex("#6E4C13")(" AS "),

    // ─── JVM ───────────────────────────────────────────────────────────────
    java: chalk.hex("#B07219")(" JV "),
    kotlin: chalk.hex("#A97BFF")(" KT "),
    scala: chalk.hex("#DC322F")(" SC "),
    groovy: chalk.hex("#4298B8")(" GR "),
    clojure: chalk.hex("#5881D8")(" CL "),

    // ─── Scripting ─────────────────────────────────────────────────────────
    python: chalk.hex("#3776AB")(" PY "),
    ruby: chalk.hex("#CC342D")(" RB "),
    php: chalk.hex("#4F5D95")(" PH "),
    perl: chalk.hex("#39457E")(" PL "),
    lua: chalk.hex("#000080")(" LU "),
    bash: chalk.hex("#4EAA25")(" SH "),
    sh: chalk.hex("#4EAA25")(" SH "),
    zsh: chalk.hex("#4EAA25")(" ZS "),
    fish: chalk.hex("#4EAA25")(" FS "),
    powershell: chalk.hex("#012456")(" PS "),
    ps1: chalk.hex("#012456")(" PS "),

    // ─── Mobile ────────────────────────────────────────────────────────────
    swift: chalk.hex("#FA7343")(" SW "),
    dart: chalk.hex("#0175C2")(" DA "),
    objc: chalk.hex("#438EFF")(" OC "),

    // ─── Functional ────────────────────────────────────────────────────────
    haskell: chalk.hex("#5D4F85")(" HS "),
    elixir: chalk.hex("#6E4A7E")(" EX "),
    erlang: chalk.hex("#B83998")(" ER "),
    fsharp: chalk.hex("#378BBA")(" FS "),
    ocaml: chalk.hex("#EC6813")(" OC "),
    elm: chalk.hex("#60B5CC")(" EL "),
    purescript: chalk.hex("#1D222D")(" PS "),
    reason: chalk.hex("#DD4B39")(" RE "),

    // ─── Data / ML ─────────────────────────────────────────────────────────
    r: chalk.hex("#276DC3")("  R "),
    julia: chalk.hex("#9558B2")(" JL "),
    matlab: chalk.hex("#0076A8")(" ML "),
    sql: chalk.hex("#F29111")(" SQ "),
    graphql: chalk.hex("#E10098")(" GQ "),

    // ─── Config / Markup ───────────────────────────────────────────────────
    json: chalk.hex("#F7DF1E")(" JS "),
    yaml: chalk.hex("#CB171E")(" YM "),
    yml: chalk.hex("#CB171E")(" YM "),
    toml: chalk.hex("#9C4121")(" TM "),
    xml: chalk.hex("#F16529")(" XM "),
    markdown: chalk.hex("#083FA1")(" MD "),
    md: chalk.hex("#083FA1")(" MD "),
    mdx: chalk.hex("#1B1F24")(" MX "),
    dockerfile: chalk.hex("#2496ED")(" DO "),
    makefile: chalk.hex("#6D8086")(" MK "),
    cmake: chalk.hex("#064F8C")(" CM "),
    nix: chalk.hex("#7EBAE4")(" NX "),
    terraform: chalk.hex("#7B42BC")(" TF "),

    // ─── Other ─────────────────────────────────────────────────────────────
    csharp: chalk.hex("#239120")(" C# "),
    "c#": chalk.hex("#239120")(" C# "),
    // fsharp: chalk.hex("#378BBA")(" F# "),
    "f#": chalk.hex("#378BBA")(" F# "),
    crystal: chalk.hex("#000100")(" CR "),
    d: chalk.hex("#BA595E")("  D "),
    v: chalk.hex("#5D87BF")("  V "),
    solidity: chalk.hex("#363636")(" SO "),

    default: chalk.hex("#6C7086")("   "),
  };

  return icons[language.toLowerCase()] ?? icons.default;
}
