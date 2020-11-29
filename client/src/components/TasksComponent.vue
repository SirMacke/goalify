<template>
  <div>
    <h3>Tasks</h3>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'TasksComponent',
  setup() {
    const state = reactive({

    });

    return {
      state
    }
  }
}
</script>

<style lang="sass" scoped>
div
  width: 100%
  height: 100vh
  background-color: orange

  h3
    margin: 0px
</style>