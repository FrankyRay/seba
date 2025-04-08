import { Window } from "@tauri-apps/api/window";
import { register } from "@tauri-apps/plugin-global-shortcut";

export async function isShowingSeba(appWindow: Window) {
  return await appWindow.isVisible();
}

export async function hideSeba(appWindow: Window) {
  await appWindow.hide();
}

export async function showSeba(appWindow: Window) {
  await appWindow.show();
  await appWindow.setFocus();
}

export async function setupShortcut() {
  const appWindow = await Window.getByLabel("main");
  if (appWindow === null) throw new Error("Windows main not found");

  try {
    await register("Alt+Space", async (event) => {
      // Run only when pressed
      if (event.state === "Released") return;
      console.log("Shortcut pressed!");

      if (await isShowingSeba(appWindow)) {
        hideSeba(appWindow);
      } else {
        showSeba(appWindow);
      }
    });
    console.log("Shortcut registered!");
  } catch (error) {
    console.error("Shortcut failed to register!", error);
  }
}
