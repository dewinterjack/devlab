import { Clipboard, showHUD } from "@raycast/api";
import fetch from "node-fetch";

export default async function main() {
  const component = await Clipboard.readText();
  if (!component) {
    await showHUD("No component found in clipboard");
    return;
  }
  const response = await fetch(
    "http://127.0.0.1:64321/functions/v1/component",
    {
      method: "POST",
      body: JSON.stringify({
        component,
      }),
    },
  );
  await showHUD(response.statusText);
}
