<script module lang="ts">
    import { data, plugin } from "./index.svelte";
    export { plugin };
  </script>
  
  <div id="result">
    <h1 id="exchange">{data.result}</h1>
  
    {#if data.error}
      <p id="error">{data.error}</p>
    {/if}
  </div>
  
  <style>
    #exchange {
      margin: 0;
      font-size: 1.6rem;
    }
  
    /* #desc {
      margin: 0;
      font-size: 0.8rem;
      color: #a6adc8;
    } */
  
    #error {
      margin: 0;
      font-size: 0.8rem;
      color: #f38ba8;
    }
  </style>
  