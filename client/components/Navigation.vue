<template>
  <div>
    <NavigationDrawer/>
    <NavigationToggle/>
  </div>
</template>

<script>
import NavigationDrawer from "../components/NavigationDrawer";
import NavigationToggle from "../components/NavigationToggle";

export default {
  name: "Navigation",
  components: {
    NavigationDrawer,
    NavigationToggle
  }
};
</script>

