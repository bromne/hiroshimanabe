<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '../node_modules/materialize-css/dist/css/materialize.min.css';

html {
    overflow-y: scroll;
}
</style>
