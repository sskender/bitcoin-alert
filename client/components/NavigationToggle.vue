<template>
  <v-toolbar app>
    <i @click="toggleDrawer()" class="material-icons md-36">settings_applications</i>
    <Title/>
  </v-toolbar>
</template>

<script>
import Title from "../components/Title";

export default {
  name: "NavigationToggle",
  components: {
    Title
  },
  methods: {
    toggleDrawer: function() {
      this.$store.commit("toggleNav");
    }
  }
};
</script>

<style lang="scss" scoped>
.material-icons.md-36 {
  font-size: 36px;
  cursor: pointer;
}
span.text--red {
  color: indianred;
}
</style>