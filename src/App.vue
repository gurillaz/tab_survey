<template>
  <v-app>
    <transition enter-active-class="animate__animated animate__fadeIn">
      <router-view></router-view>
    </transition>
  </v-app>
</template>

<script>
export default {};
</script>

<style>
@import "../node_modules/animate.css/animate.min.css";
</style>
