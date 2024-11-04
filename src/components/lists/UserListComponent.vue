<template>
  <div>
    <h2>User List</h2>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.username }} - Role: {{ user.role }}
        <button @click="deleteUser(user.id)">Delete</button>
        <button @click="$emit('editUser', user)">Edit</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: []
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await fetch(`${apiUrl}/users`);
        if (!response.ok) throw new Error('Network response was not ok');
        const users = await response.json();
        this.users = users;
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
,
    async deleteUser(userId) {
      try {
        const response = await fetch(`/api/users/${userId}`, { method: 'DELETE' });
        if (response.ok) {
          alert('User deleted');
          this.fetchUsers(); // Refresh the list
        } else {
          alert('Failed to delete user');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>
