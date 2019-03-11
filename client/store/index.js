import Vue from 'vue';

export const state = () => ({
  navOpen: true
});

export const mutations = {
  toggleNav(state) {
    state.navOpen = !state.navOpen;
  }
};
