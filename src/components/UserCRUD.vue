<template>
  <div>
    <h1>Gebruikersbeheer</h1>

    <!-- Gebruikerslijst -->
    <table>
      <thead>
      <tr>
        <th>Gebruikersnaam</th>
        <th>Rol</th>
        <th>Acties</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.username }}</td>
        <td>{{ user.roleName }}</td>
        <td>
          <button @click="editUser(user)">Bewerken</button>
          <button @click="deleteUser(user.id)">Verwijderen</button>
        </td>
      </tr>
      </tbody>
    </table>

    <!-- Create User Form -->
    <h2>Nieuwe Gebruiker Toevoegen</h2>
    <form @submit.prevent="createUser">
      <div>
        <label>Gebruikersnaam:</label>
        <input v-model="createData.username" required />
      </div>
      <div>
        <label>Wachtwoord:</label>
        <input type="password" v-model="createData.password" required />
      </div>
      <div>
        <label>Rol:</label>
        <select v-model="createData.roleId" required>
          <option v-for="role in roles" :key="role.id" :value="role.id">
            {{ role.name }}
          </option>
        </select>
      </div>
      <button type="submit">Toevoegen</button>
      <button type="button" @click="resetCreateForm()">Annuleren</button>
    </form>

    <!-- Update User Form -->
    <h2 v-if="isEditing">Gebruiker Bewerken</h2>
    <form v-if="isEditing" @submit.prevent="updateUser">
      <div>
        <label>Gebruikersnaam:</label>
        <input v-model="updateData.username" required />
      </div>
      <div>
        <label>Rol:</label>
        <select v-model="updateData.roleId" required>
          <option v-for="role in roles" :key="role.id" :value="role.id">
            {{ role.name }}
          </option>
        </select>
      </div>
      <button type="submit">Bijwerken</button>
      <button type="button" @click="resetUpdateForm()">Annuleren</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserCRUD',
  data() {
    return {
      users: [],
      createData: {
        username: '',
        password: '',
        roleId: null
      },
      updateData: {
        username: '',
        roleId: null
      },
      roles: [], // Dynamically loaded roles
      userId: null,
      isEditing: false
    };
  },
  created() {
    this.fetchUsers();
    this.fetchRoles(); // Load roles on component creation
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8080/api/users', { withCredentials: true });
        this.users = response.data;
      } catch (error) {
        console.error("Er is een fout opgetreden bij het ophalen van gebruikers:", error);
      }
    },

    async fetchRoles() {
      try {
        const response = await axios.get('http://localhost:8080/api/users/roles', { withCredentials: true });
        this.roles = response.data; // Populate the roles list
      } catch (error) {
        console.error("Er is een fout opgetreden bij het ophalen van rollen:", error);
      }
    },

    async createUser() {
      try {
        const roleId = this.createData.roleId;
        if (!roleId) {
          console.error("Role ID is missing. Please select a role.");
          return;
        }

        await axios.post(`http://localhost:8080/api/users/add?roleId=${roleId}`, {
          username: this.createData.username,
          password: this.createData.password
        }, { withCredentials: true });

        this.fetchUsers();
        this.resetCreateForm();
      } catch (error) {
        console.error("Er is een fout opgetreden bij het toevoegen van de gebruiker:", error);
      }
    },

    editUser(user) {
      this.userId = user.id;
      this.updateData = {
        username: user.username,
        roleId: this.roles.find(role => role.name === user.roleName)?.id || null
      };
      this.isEditing = true;
    },

    async updateUser() {
      if (!this.userId) {
        console.error("Geen geldige gebruiker geselecteerd om te bewerken.");
        return;
      }

      try {
        const roleId = this.updateData.roleId; // Capture the selected roleId
        if (!roleId) {
          console.error("Role ID is missing. Please select a role.");
          return;
        }

        await axios.put(`http://localhost:8080/api/users/${this.userId}?roleId=${roleId}`, {
          username: this.updateData.username,
        }, { withCredentials: true });

        this.fetchUsers();
        this.resetUpdateForm();
      } catch (error) {
        console.error("Er is een fout opgetreden bij het bijwerken van de gebruiker:", error);
      }
    },

    async deleteUser(id) {
      try {
        await axios.delete(`http://localhost:8080/api/users/${id}`, { withCredentials: true });
        this.fetchUsers();
      } catch (error) {
        console.error("Er is een fout opgetreden bij het verwijderen van de gebruiker:", error);
      }
    },

    resetCreateForm() {
      this.createData = {
        username: '',
        password: '',
        roleId: null
      };
    },

    resetUpdateForm() {
      this.updateData = {
        username: '',
        roleId: null
      };
      this.userId = null;
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
/* CSS remains unchanged */
</style>
