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

    <!-- Formulier voor toevoegen/bewerken van gebruikers -->
    <h2>{{ isEditing ? 'Gebruiker Bewerken' : 'Nieuwe Gebruiker Toevoegen' }}</h2>
    <form @submit.prevent="isEditing ? updateUser() : createUser()">
      <div>
        <label>Gebruikersnaam:</label>
        <input v-model="userData.username" required />
      </div>
      <div>
        <label>Rol:</label>
        <select v-model="userData.roleId" required>
          <option v-for="role in roles" :key="role.id" :value="role.id">
            {{ role.name }}
          </option>
        </select>
      </div>
      <button type="submit">{{ isEditing ? 'Bijwerken' : 'Toevoegen' }}</button>
      <button type="button" @click="resetForm()">Annuleren</button>
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
      userData: {
        username: '',
        password: '', // Voeg een veld toe voor het wachtwoord als dat nodig is
        roleId: null // Rol-ID om de rol van de gebruiker te selecteren
      },
      roles: [
        { id: 1, name: 'Role 1' },
        { id: 2, name: 'Role 2' }
      ], // Beschikbare rollen
      userId: null,
      isEditing: false
    };
  },
  created() {
    this.fetchUsers();
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

    async createUser() {
      try {
        await axios.post('http://localhost:8080/api/users/add', this.userData, { withCredentials: true });
        this.fetchUsers();
        this.resetForm();
      } catch (error) {
        console.error("Er is een fout opgetreden bij het toevoegen van de gebruiker:", error);
      }
    },

    editUser(user) {
      this.userId = user.id;
      this.userData = {
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
        await axios.put(`http://localhost:8080/api/users/${this.userId}`, this.userData, { withCredentials: true });
        this.fetchUsers();
        this.resetForm();
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

    resetForm() {
      this.userData = {
        username: '',
        password: '',
        roleId: null
      };
      this.userId = null;
      this.isEditing = false;
    }
  }
};
</script>

<style scoped>
/* CSS blijft ongewijzigd */
</style>
