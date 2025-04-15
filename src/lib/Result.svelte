<script lang="ts">
</script>

<div id="info">
    <slot></slot>
</div>
<div id="foot">
    <div id="version">
        Seba v0.1.0-beta.2
    </div>
    <div id="keybind">
      <slot name="keybind"></slot>
    </div>
</div>

<style>
  #info {
    display: block;
    background-color: #181825;
    padding: 0.4em 1em;

    transition: height 0.5s;
  }

  #info:empty {
    display: none;
  }

  #foot {
    background-color: #11111b;
    border-radius: 0 0 8px 8px;
    padding: 0.4em 1em;

    display: flex;
    align-items: center;
  }

  #version {
    flex: 1;
  }
</style>
