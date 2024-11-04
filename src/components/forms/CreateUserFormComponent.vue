<template>
  <div>
    <h2>Create User</h2>
    <form @submit.prevent="createUser">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <input v-model="roleId" placeholder="Role ID" required />
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      roleId: ''
    };
  },
  methods: {
    async createUser() {
      try {
        const response = await fetch('/api/users/add?roleId=' + this.roleId, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });
        if (response.ok) {
          alert('User created successfully');
          this.$emit('userCreated');
        } else {
          alert('Failed to create user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};
</script>
