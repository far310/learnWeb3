<template>
  <!-- <v-app class="v-app"> -->
  <NavHeader />
  <v-main>
    <router-view />
  </v-main>

  <AppFooter />
  <!-- </v-app> -->
</template>

<script setup>
import { http, createConfig } from "@wagmi/vue";
</script>
