<script module lang="ts">
  import { data, plugin } from "./index.svelte";
  export { plugin };
</script>

<div id="result">
  <h1 id="exchange">{data.exchange}</h1>

  {#if data.error}
    <p id="error">{data.error}</p>
  {:else}
    <p id="desc">{data.description}</p>
  {/if}
</div>

<style>
  #exchange {
    margin: 0;
    font-size: 1.6rem;
  }

  #desc {
    margin: 0;
    font-size: 0.8rem;
    color: #a6adc8;
  }

  #error {
    margin: 0;
    font-size: 0.8rem;
    color: #f38ba8;
  }
</style>
