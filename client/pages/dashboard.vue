<template lang="pug">
  v-app
    Navigation
    v-content(class="ml-4 mt-5 pr-4")
      DashDisplayTable
</template>
<script>
import Navigation from "../components/Navigation";
import DashDisplayTable from "../components/DashDisplayTable";
export default {
  components: {
    Navigation,
    DashDisplayTable
  }
};
</script>
<style lang="scss">
</style>


