<template lang="pug">
  v-app
    Navigation
    v-content(class="ml-4")
      h1 Placeholder text for more info
</template>
<script>
import Navigation from "../components/Navigation";
export default {
  components: {
    Navigation
  },
  created() {
    this.$vuetify.theme.primary = "#333";
  }
};
</script>
<style lang="scss">
</style>
