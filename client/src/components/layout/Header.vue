<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#/">IssueTracker</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#/projects">Projects</b-nav-item>
          <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div v-if="this.$store.getters.isLoggedIn">
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>{{ }}</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
          <b-button-group v-else>
            <b-button variant="outline-light" href="#/login">Login</b-button>
            <b-button variant="light" href="#/register">Register</b-button>
          </b-button-group>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => this.$router.push("/"))
        .catch((error) => console.log(error));
    },
  },
};
</script>