import { Window } from "@tauri-apps/api/window";
import { Menu, Submenu } from "@tauri-apps/api/menu";
import { TrayIcon } from "@tauri-apps/api/tray";
import type { TrayIconOptions } from "@tauri-apps/api/tray";
import { defaultWindowIcon } from "@tauri-apps/api/app";
import { isShowingSeba, showSeba } from "./show";

export async function initiateTrayMenu() {
  const appWindow = await Window.getByLabel("main");
  if (appWindow === null) throw new Error("Windows main not found");

  const menu = await Menu.new({
    items: [
      {
        id: "show",
        text: "Show",
        action: async () => {
          if (await isShowingSeba(appWindow)) await showSeba(appWindow);
        },
      },
      {
        id: "exit",
        text: "Exit",
        action: async () => {
          await appWindow.close();
        },
      },
    ],
  });

  const options: TrayIconOptions = {
    menu,
    showMenuOnLeftClick: true,
  };

  // const icon = await defaultWindowIcon();
  // if (icon !== null) options.icon = icon;

  const tray = await TrayIcon.new(options);
}
