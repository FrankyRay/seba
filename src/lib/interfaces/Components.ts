import type { Component } from "svelte";
import type { Plugin } from "./Plugins";

export type PluginComponent = Plugin & {
  component: Component;
};

export type PluginComponentList = {
  [key: string]: PluginComponent;
};
