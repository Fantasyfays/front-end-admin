<template>
  <nav class="navbar">
    <div>
      <router-link to="/">Dashboard</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavBar'
};
</script>

<style scoped>
.navbar {
  background-color: #34495e;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.navbar h1 {
  color: #ffffff;
  margin: 0;
  font-size: 1.5em;
}

.navbar a {
  color: #ffffff;
  text-decoration: none;
  margin-left: 20px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.navbar a:hover {
  color: #2ecc71;
}
</style>
