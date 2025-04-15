<script module lang="ts">
  import type { Plugin } from "$lib/interfaces/Plugins";

  const plugin: Plugin = {
    id: "info",
    name: "Info App",
    prefix: "!",
    restart() {},
    execute(data: string) {},
  };

  export { plugin };
</script>

<div id="result">
  <h1 id="title">SEBA (Search Bar)</h1>
  <p id="subtitle">
    v0.1.0-beta.2 | By FrankyRayMS | <a href="https://seba.frays.dev"
      >seba.frays.dev</a
    >
  </p>
</div>

<style>
  #title {
    margin: 0;
    font-size: 1.6rem;
  }

  #subtitle {
    margin: 0;
    font-size: 0.8rem;
    color: #a6adc8;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
