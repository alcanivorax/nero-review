import ora from "ora";
import { theme } from "../helper/ui/theme.js";

export function step(text: string) {
  return ora({
    text,
    spinner: {
      interval: 80,
      frames: [
        theme.loader("⠋"),
        theme.loader("⠙"),
        theme.loader("⠹"),
        theme.loader("⠸"),
        theme.loader("⠼"),
        theme.loader("⠴"),
        theme.loader("⠦"),
        theme.loader("⠧"),
        theme.loader("⠇"),
        theme.loader("⠏"),
      ],
    },
  });
}
