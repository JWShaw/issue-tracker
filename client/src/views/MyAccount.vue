<template>
  <b-form @submit="submit">
    <b-form-group
      id="name-input-group"
      label="Your name:"
      label-for="name-input"
    >
      <b-form-input
        id="name-input"
        v-model="me.name"
        type="text"
        placeholder="Enter your name..."
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="email-input-group"
      label="Your email:"
      label-for="email-input"
    >
      <b-form-input
        id="email-input"
        v-model="me.email"
        type="email"
        placeholder="Enter your email..."
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="password-input-group"
      label="Your password:"
      label-for="password-input"
    >
      <b-form-input
        id="password-input"
        v-model="me.password"
        type="password"
        placeholder="Enter a new password"
      ></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Update My Info</b-button>
    <b-button variant="warning" v-bind:href="`#/projects/`">Cancel</b-button>
    <b-button variant="danger" @click="deleteAccount">Delete Account</b-button>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      me: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    submit() {
      const me = this.me;
      if (me.password.length == 0) delete me.password;
      this.$http
        .patch(`/users/me`, me, {
          headers: { Authorization: `Bearer ${localStorage.jwt}` },
        })
        .then(() => {
          this.$swal("Details updated successfully!", {
            icon: "success",
            buttons: false,
            timer: 1500,
          });
          return;
        })
        .catch((err) => {
          console.log(err);
          this.$swal("Error!", {
            icon: "error",
            buttons: false,
            timer: 1500,
          });
        });
    },
    deleteAccount() {
      this.$swal({
        title: "Are you sure?",
        text: "Deleting your account is an irreversible action!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((yes) => {
        if (yes) {
          this.$http
            .delete(`/users/me`, {
              headers: { Authorization: `Bearer ${localStorage.jwt}` },
            })
          this.$store
            .dispatch("logout")
            .then(() => this.$router.push("/"))
            .catch((error) => console.log(error))
          this.$swal("Your account has been deleted!", {
            icon: "success",
            buttons: false,
            timer: 1500
          })

          this.$router.push('/')
        } else {
          this.$swal("Your account has not been deleted."), {
            icon: "info",
            buttons: false,
            timer: 1500
          }
        }
      })
    }
  },
  created: async function () {
    const res = await this.$http.get(`/users/me`, {
      headers: { Authorization: `Bearer ${localStorage.jwt}` },
    });
    this.me.name = res.data.name;
    this.me.email = res.data.email;
  },
};
</script>