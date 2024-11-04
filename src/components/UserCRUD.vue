<template>
  <div>

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

    <!-- Gebruiker Bewerken Formulier -->
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

const apiUrl = 'http://localhost:8080/api/users';

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
      roles: [],
      userId: null,
      isEditing: false
    };
  },
  created() {
    this.fetchUsers();
    this.fetchRoles();
  },
  methods: {
    // Haal gebruikers op
    async fetchUsers() {
      try {
        const response = await axios.get(`${apiUrl}`, {withCredentials: true});
        this.users = response.data;
      } catch (error) {
        console.error("Er is een fout opgetreden bij het ophalen van gebruikers:", error);
      }
    },

    // Haal rollen op
    async fetchRoles() {
      try {
        const response = await axios.get(`${apiUrl}/roles`, {withCredentials: true});
        this.roles = response.data;
      } catch (error) {
        console.error("Er is een fout opgetreden bij het ophalen van rollen:", error);
      }
    },

    // Maak een nieuwe gebruiker aan
    async createUser() {
      try {
        const roleId = this.createData.roleId;
        if (!roleId) {
          console.error("Role ID is missing. Please select a role.");
          return;
        }

        await axios.post(`${apiUrl}/add?roleId=${roleId}`, {
          username: this.createData.username,
          password: this.createData.password
        }, {withCredentials: true});

        this.fetchUsers();
        this.resetCreateForm();
      } catch (error) {
        console.error("Er is een fout opgetreden bij het toevoegen van de gebruiker:", error);
      }
    },

    // Bewerk een bestaande gebruiker
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
        const roleId = this.updateData.roleId;
        if (!roleId) {
          console.error("Role ID ontbreekt. Selecteer een rol.");
          return;
        }

        await axios.put(`${apiUrl}/${this.userId}?roleId=${roleId}`, {
          username: this.updateData.username,
          password: this.updateData.password // Stuur wachtwoord alleen als het is ingevuld
        }, { withCredentials: true });

        this.fetchUsers();
        this.resetUpdateForm();
      } catch (error) {
        console.error("Er is een fout opgetreden bij het bijwerken van de gebruiker:", error);
      }
    },

    // Verwijder een gebruiker
    async deleteUser(id) {
      try {
        await axios.delete(`${apiUrl}/${id}`, {withCredentials: true});
        this.fetchUsers();
      } catch (error) {
        console.error("Er is een fout opgetreden bij het verwijderen van de gebruiker:", error);
      }
    },

    // Reset het formulier voor het aanmaken van een gebruiker
    resetCreateForm() {
      this.createData = {
        username: '',
        password: '',
        roleId: null
      };
    },

    // Reset het formulier voor het bewerken van een gebruiker
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
/* Stijl voor de tabel en formulieren */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

button {
  margin-right: 5px;
}

form {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 300px;
}

form div {
  margin-bottom: 10px;
}

h2 {
  margin-top: 20px;
}
</style>
