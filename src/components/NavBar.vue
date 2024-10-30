<template>
  <nav>
    <router-link to="/dashboard">Dashboard</router-link>
    <router-link to="/dashboard/users">Gebruikersbeheer</router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
};
</script>

<style scoped>
nav {
  display: flex;
  gap: 10px;
}
</style>
