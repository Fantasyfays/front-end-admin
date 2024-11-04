<template>
  <div>
    <h2>Edit User</h2>
    <form @submit.prevent="editUser">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" />
      <input v-model="roleId" placeholder="Role ID" />
      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ['userId', 'initialUsername', 'initialRoleId'],
  data() {
    return {
      username: this.initialUsername || '',
      password: '',
      roleId: this.initialRoleId || ''
    };
  },
  methods: {
    async editUser() {
      try {
        const response = await fetch(`/api/users/${this.userId}?roleId=` + this.roleId, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });
        if (response.ok) {
          alert('User updated successfully');
          this.$emit('userUpdated');
        } else {
          alert('Failed to update user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
};
</script>
