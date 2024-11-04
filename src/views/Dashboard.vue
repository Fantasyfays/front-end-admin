<template>
  <div>
    <h1>Admin Dashboard</h1>
    <UserCRUD />
  </div>
</template>

<script>
import UserCRUD from '@/components/UserCRUD.vue';

export default {
  components: {
    UserCRUD
  }
};
</script>
