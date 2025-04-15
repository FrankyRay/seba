import type { Component } from "svelte";

export type PluginIcon = string | Component;

export type Plugin = {
  /**
   * Identifier of the plugin.
   */
  id: string;
  /**
   * Name of the plugin.
   */
  name: string;
  /**
   * Prefix plugin use for initiate plugin.
   */
  prefix: string;
  icon?: PluginIcon;
  /**
   * Keybind used for evaluate some function.
   */
  keybinds?: PluginKeybind[];
  info?: PluginInfo;

  /**
   * Evaluate of search.
   * @param args String after prefix.
   */
  execute: (args: string) => void;
  /**
   * Restart plugin.
   */
  restart: () => void;
};

export type PluginKeybind = {
  key: string[];
  name: string;
  execute: () => void;
};

export type PluginInfo = {
  text: string;
  icon?: PluginIcon;
};
