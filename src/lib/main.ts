import { getCurrentWindow } from "@tauri-apps/api/window";
import { hideSeba } from "./show";
import { listen } from "@tauri-apps/api/event";

const appWindow = getCurrentWindow();

appWindow.listen<FocusEvent>("tauri://focus", async (event) => {
  console.log(await appWindow.isFocused());
  if (!(await appWindow.isFocused())) await hideSeba(appWindow);
});
