<script module lang="ts">
  import type { Plugin } from "$lib/interfaces/Plugins";

  const plugin: Plugin = {
    id: "help",
    name: "Help",
    prefix: "?",
    restart() {},
    execute(data: string) {},
  };

  export { plugin };
</script>

<div id="result">
  <p>Hello world!</p>
  <p>
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat dolorum
    officia molestiae eum. Fuga corrupti beatae eveniet quibusdam quas pariatur
    facere nisi cupiditate iure maxime, distinctio aut excepturi quaerat. Eum.
  </p>
</div>

<style>
  p {
    margin: 0;
  }
</style>
