<script lang="ts">
  import "$lib/main";
  import { invoke } from "@tauri-apps/api/core";
  import { setupShortcut } from "$lib/show";
  import { initiateTrayMenu } from "$lib/tray";
  import { onMount } from "svelte";

  // let name = $state("");
  // let greetMsg = $state("");

  // async function greet(event: Event) {
  //   event.preventDefault();
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   greetMsg = await invoke("greet", { name });
  // }

  onMount(() => {
    setupShortcut();
    initiateTrayMenu();
  });

  interface Label {
    show: boolean,
    type: string,
    desc?: string,
  }

  let search = $state('');
  let label = $state<Label>({
    show: false,
    type: 'Placeholder',
    desc: '',
  });

  $effect(() => {
    if (search.startsWith('?'))
      label = {
        show: true,
        type: '<img class="icon-label" src="/tag/help.svg" alt="help" />Help',
      }
    else if (search.startsWith('>'))
      label = {
        show: true,
        type: '<img class="icon-label" src="/tag/command-prompt.svg" alt="command-prompt" />Command Prompt',
      }
    else if (search.startsWith('=$'))
      label = {
        show: true,
        type: '<img class="icon-label" src="/tag/calculator-exchange.svg" alt="calculator-exchange" />Calculator Exchange',
        desc: 'Update: 09/04/2025',
      }
    else if (search.startsWith('=:'))
      label = {
        show: true,
        type: '<img class="icon-label" src="/tag/calculator-converter.svg" alt="calculator-converter" />Calculator Converter',
      }
    else if (search.startsWith('='))
      label = {
        show: true,
        type: '<img class="icon-label" src="/tag/calculator.svg" alt="calculator" />Calculator',
      }
    else if (search.startsWith('/:'))
      label = {
        show: true,
        type: '<img class="icon-label" src="/tag/file-converter.svg" alt="file-converter" />Files Converter',
      }
    else if (search.startsWith('/'))
      label = {
        show: true,
        type: '<img class="icon-label" src="/tag/file.svg" alt="file" />Files',
      }
    else label.show = false;
  })
</script>

<div id="app">
  <div class="tag">label</div>
  <div id="container">
    <div id="type" class="label tag {label.show ? 'show' : ''}">
      {@html label.type}
    </div>
    <div id="desc" class="label tag {label.show && label.desc ? 'show' : ''}">
      {@html label.desc}
    </div>
    <input id="search" type="text" bind:value={search} placeholder="Type here to search..." autocomplete="off" />
  </div>

  <main id="info">
    Hello world!
  </main>

  <footer id="foot">
    Keyboard shortcut
  </footer>
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
  padding: .8em .6rem;
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

#info {
  background-color: #181825;
  padding: .6em;
}

#foot {
  background-color: #11111b;
  border-radius: 0 0 8px 8px;
  padding: .6em;
}

#type {
  left: 0;
}

#desc {
  right: 0;
}

.tag {
  padding: .2em .6rem;
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
  gap: .4em;
  align-items: center;

  color: white;

  transition: transform .5s;
  transform: translateY(100%);
}

.show {
  transform: translateY(0);
}

:global(.icon-label) {
  height: 1em;
  width: auto;
  filter: invert(100%) sepia(0%) saturate(2%) hue-rotate(232deg) brightness(106%) contrast(101%);
}

@media (prefers-color-scheme: dark) {
  /* :root {
    color: #f6f6f6;
    background-color: #2f2f2f;
  } */
}

</style>
