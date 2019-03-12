<template>
  <v-toolbar dark app class="pl-0">
    <i
      @click="toggleDrawer()"
      class="material-icons md-36"
      :class="{active: navOpen}"
    >settings_applications</i>
    <Title/>
  </v-toolbar>
</template>

<script>
import Title from "../components/Title";
import { mapState } from "vuex";

export default {
  name: "NavigationToggle",
  components: {
    Title
  },
  methods: {
    toggleDrawer: function() {
      this.$store.commit("toggleNav");
    }
  },
  computed: {
    ...mapState({
      navOpen: state => state.navOpen
    })
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

i {
  transition: all 0.5s ease-in-out;
}

i.active {
  transform: rotate(90deg);
}
</style>