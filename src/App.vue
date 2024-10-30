<template>
  <div id="app">
    <UserCRUD />
  </div>
</template>

<script>
import UserCRUD from './components/UserCRUD.vue';

export default {
  name: 'App',
  components: {
    UserCRUD
  }
};
</script>