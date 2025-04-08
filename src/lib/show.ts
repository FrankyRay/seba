import { Window } from "@tauri-apps/api/window";
import { register } from "@tauri-apps/plugin-global-shortcut";

export async function setupShortcut() {
  const appWindow = await Window.getByLabel("main");
  if (appWindow === null) throw new Error("Windows main not found");

  try {
    await register("Alt+Space", async (event) => {
      // Run only when pressed
      if (event.state === "Released") return;

      console.log("Shortcut pressed!");
      const visible = await appWindow.isVisible();

      if (visible) {
        await appWindow.hide();
      } else {
        await appWindow.show();
        await appWindow.setFocus();
      }
    });
    console.log("Shortcut registered!");
  } catch (error) {
    console.error("Shortcut failed to register!", error);
  }
}
