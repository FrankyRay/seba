<script lang="ts">
  // import { invoke } from "@tauri-apps/api/core";
  import "$lib/main";
  import { setupShortcut } from "$lib/scripts/show";
  import { initiateTrayMenu } from "$lib/scripts/tray";
  import { onMount, untrack, type Component } from "svelte";
  import Result from "$lib/Result.svelte";
  import { parseSearch } from "$lib/scripts/search";
  import Placeholder from "$lib/Placeholder.svelte";
  import type { Plugin } from "$lib/interfaces/Plugins";
  import type { PluginComponentList } from "$lib/interfaces/Components";

  // let name = $state("");
  // let greetMsg = $state("");

  // async function greet(event: Event) {
  //   event.preventDefault();
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   greetMsg = await invoke("greet", { name });
  // }

  onMount(async () => {
    setupShortcut();
    // initiateTrayMenu();
  });

  type Label = {
    show: boolean,
    text: string,
  }

  let pluginList: PluginComponentList = {};
  // Initiate all components
  const comps: Record<string, { default: Component; plugin: Plugin }> =
    import.meta.glob("$lib/plugins/*/main.svelte", { eager: true });

  pluginList[""] = {
    id: "placeholder",
    name: "Placeholder",
    prefix: "",
    execute(data) {},
    restart() {},
    component: Placeholder,
  };

  for (const [key, val] of Object.entries(comps)) {
    // console.log(key);
    pluginList[val.plugin.prefix] = { ...val.plugin, component: val.default };
  }

  let search = $state("");
  let result = $derived.by(() => {
    const searchParam = parseSearch(search);

    if (pluginList[searchParam.prefix]) return pluginList[searchParam.prefix];
    else return pluginList[""];
  });
  let ComponentResult = $derived(result.component);

  let nameLabel = $state<Label>({
    show: false,
    text: "Placeholder",
  });

  let infoLabel = $state<Label>({
    show: false,
    text: "",
  });

  function showLabelAndResult(value: string) {
    search = value;
    const searchParam = parseSearch(search);
    if (searchParam.prefix === "") {
      nameLabel.show = false;
      infoLabel.show = false;
      return;
    }

    const plugin = pluginList[searchParam.prefix];
    if (!plugin) {
      nameLabel.show = false;
      infoLabel.show = false;
      return;
    }

    result.restart();
    plugin.execute(searchParam.param);

    // Add plugin name
    nameLabel = {
      show: true,
      text: `<img class="icon-label" src="/tag/${plugin.id}.svg" alt="${plugin.name}" />${plugin.name}`,
    };

    if (!plugin.info) return;
    const info = plugin.info;
      infoLabel = {
        show: true,
        text: `<img class="icon-label" src="/tag/info/${info.icon}.svg" alt="${info.icon}" />${info.text}`,
      };
  }

  function detectShortcut(event: KeyboardEvent) {
    console.log({
      key: event.key,
      ctrl: event.ctrlKey,
      shift: event.shiftKey,
      alt: event.altKey,
      meta: event.metaKey,
    });
    if (!result.keybinds) return;

    const keybinds = [];
    if (event.ctrlKey) keybinds.push("Ctrl");
    if (event.shiftKey) keybinds.push("Shift");
    if (event.altKey) keybinds.push("Alt");
    if (event.metaKey) keybinds.push("Meta");
    keybinds.push(event.key)

    for (const bind of result.keybinds) {
      let valid = JSON.stringify(bind.key) === JSON.stringify(keybinds);
      console.log(bind.key, keybinds, valid)
      if (valid) {
        bind.execute();
        break;
      }
    }
  }
</script>

<div id="app">
  <div class="tag">label</div>
  <div id="container">
    <div id="type" class="label tag {nameLabel.show ? 'show' : ''}">
      {@html nameLabel.text}
    </div>
    <div id="desc" class="label tag {infoLabel.show ? 'show' : ''}">
      {@html infoLabel.text}
    </div>
    <input
      id="search"
      type="text"
      bind:value={() => search, showLabelAndResult}
      placeholder="Type here to search..."
      autocomplete="off"
      onkeydown={detectShortcut}
    />
  </div>
  <!-- <Search bind:search={search} data={componentList} /> -->
  <Result>
    {#if result.prefix !== ""}
      <ComponentResult />
    {/if}

    <div id="keybind" slot="keybind">
      {#if result.keybinds}
        {#each result.keybinds as key}
          <div id="key">
            <kbd>{key.key.join(" + ")}</kbd>
            {key.name}
          </div>
        {/each}
      {/if}
    </div>
  </Result>
</div>

<style>
  /* :root {
  color: #f6f6f6;
  background-color: #000000;
} */

  #app {
    position: relative;
    width: 100%;
    height: 100%;
    font-family: "Lexend", sans-serif;
    font-optical-sizing: auto;
    color: white;
  }

  #container {
    position: relative;
  }

  #search {
    position: relative;
    box-sizing: border-box;
    border-radius: 8px 8px 0 0;
    border: 0;
    width: 100%;
    padding: 0.8em 1rem;
    z-index: 10;
    background-color: #1e1e2e;

    font-size: 1.3em;
    color: white;
    font-family: "Lexend", sans-serif;
    font-optical-sizing: auto;
  }

  #search:focus {
    outline: none;
  }

  #search::placeholder {
    color: #6c7086;
  }

  #type {
    left: 0;
  }

  #desc {
    right: 0;
  }

  #key {
    display: flex;
    align-items: center;
    gap: .8em;
  }

  #key kbd {
    padding: .1em .4em;
    border: 1px solid white;
    box-shadow: 1px 1px 0 0 white;
  }

  .tag {
    padding: 0.2em 0.6rem;
    border-radius: 8px 8px 0 0;
    color: transparent;
    user-select: none;
  }

  .label {
    position: absolute;
    bottom: calc(100% - 1px);

    width: max-content;
    background-color: #181825;
    box-shadow: 0 8px 0 0 #181825;

    display: flex;
    gap: 0.4em;
    align-items: center;

    color: white;

    transition: transform 0.5s;
    transform: translateY(100%);
  }

  .show {
    transform: translateY(0);
  }

  :global(.icon-label) {
    height: 1em;
    width: auto;
    filter: invert(100%) sepia(0%) saturate(2%) hue-rotate(232deg)
      brightness(106%) contrast(101%);
  }

  /* @media (prefers-color-scheme: dark) {
  :root {
    color: #f6f6f6;
    background-color: #2f2f2f;
  }
} */
</style>
