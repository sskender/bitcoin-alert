<template>
  <v-navigation-drawer enable-resize-watcher dark app :value="navOpen">
    <v-list>
      <v-list-tile>
        <v-list-tile-title class="title">Menu</v-list-tile-title>
      </v-list-tile>
    </v-list>
    <v-list dense class="pt-0">
      <v-list-tile v-for="item in items" :key="item.title" :to="item.href">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "NavigationDrawer",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "home", href: "/" },
        { title: "Dashboard", icon: "dashboard", href: "/dashboard" }
      ]
    };
  },
  methods: {
    toggleDrawer: function() {
      console.log("ran");
      this.drawer = !this.drawer;
    }
  },
  computed: {
    ...mapState({
      navOpen: state => state.navOpen
    })
  }
};
</script>

<style lang="scss">
$link_active_background: #f5f5f5;
$link_active_color: #333 !important;

a.primary--text {
  background: $link_active_background;
  color: $link_active_color !important;
}
a.primary--text:hover {
  background: $link_active_background !important;
}
</style>
