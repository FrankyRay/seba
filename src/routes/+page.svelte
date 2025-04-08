<script lang="ts">
  import { invoke } from "@tauri-apps/api/core";
  import { setupShortcut } from "../lib/show";
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
  });

  let search = $state('');
  let label = $state({
    show: false,
    content: 'Placeholder',
  });

  $effect(() => {
    if (search.startsWith('steam'))
      label = {
        show: true,
        content: 'Steam',
      }
    else if (search.startsWith('>'))
      label = {
        show: true,
        content: 'Command Prompt',
      }
    else if (search.startsWith('=$'))
      label = {
        show: true,
        content: 'Calculator Exchange',
      }
    else if (search.startsWith('=:'))
      label = {
        show: true,
        content: 'Calculator Converter',
      }
    else if (search.startsWith('='))
      label = {
        show: true,
        content: 'Calculator',
      }
    else if (search.startsWith('/:'))
      label = {
        show: true,
        content: 'Files Converter',
      }
    else if (search.startsWith('/'))
      label = {
        show: true,
        content: 'Files',
      }
    else label.show = false;
  })
</script>

<main id="app">
  <div class="tag">label</div>
  <div id="container">
    <div id="label" class="tag {label.show ? 'show' : ''}">
      {label.content}
    </div>
    <input id="search" type="text" bind:value={search} />
  </div>
</main>

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
  background-color: #303030;
  border: 0;
  border-radius: 8px;
  width: 100%;
  padding: .8em;
  box-sizing: border-box;
  z-index: 10;
  
  font-size: 1.5em;
  color: white;
  font-family: "Lexend", sans-serif;
  font-optical-sizing: auto;
}

#search:focus {
  outline: none;
}

#label {
  position: absolute;
  background-color: #303030;
  padding: .2em .5em;
  border-radius: 8px 8px 0 0;
  width: max-content;
  box-shadow: 0 8px 0 0 #303030;
  left: 0;
  bottom: calc(100% - 1px);
  color: white;
  transform: translateY(100%);
  transition: transform .5s;
}

#label.show {
  transform: translateY(0);
}

.tag {
  padding: .2em .5em;
  border-radius: 8px 8px 0 0;
  color: transparent;
  user-select: none;
}

@media (prefers-color-scheme: dark) {
  /* :root {
    color: #f6f6f6;
    background-color: #2f2f2f;
  } */
}

</style>
