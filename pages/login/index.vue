<template>
  <div>
    <div class="left"></div>
    <img
      src="../../assets/images/login-r.png"
      alt="login image"
      class="loginImage"
    />
    <div class="top">
      <span>don't have an account? </span>
      <nuxt-link to="/signup"
        ><button class="signTop">Sign up</button></nuxt-link
      >
    </div>
    <div class="right">
      <h2>Login</h2>
      <div>
        <v-text-field
          outlined
          label="Email"
          class="emailField"
          type="text"
          v-model="email"
        ></v-text-field>
        <v-text-field
          outlined
          label="Password"
          class="passwordField"
          type="password"
          v-model="password"
        ></v-text-field>
        <button class="register" @click="handleLogin">Submit</button>
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

import loginuser from "~/apollo/queries/users/login_user.gql";

const LOGIN_USER = gql`
  ${loginuser}
`;
export default {
  data() {
    return {
      email: null,
      password: null,
      message: "",
    };
  },

  methods: {
    async handleLogin() {
      this.message = "Loading...";
      console.log(
        "email value is",
        this.email,
        "and password value is ",
        this.password
      );

      const variables = {
        email: this.email,
        password: this.password,
      };
      try {
        const logindata = await this.$apollo.mutate({
          mutation: LOGIN_USER,
          variables,
        });

        console.log("the login response is ", logindata);
        this.$store.dispatch("setToken", logindata.data.login_user.token);
        this.$store.dispatch("setUser", logindata.data.login_user.message);

        console.log(
          "the authenticated value is ",
          this.$store.getters.authenticated
        );

        console.log("the token value is ", this.$store.getters.token);

        if (logindata.data.login_user.message == "user not found") {
          this.message = "User not found";
        } else if (
          logindata.data.login_user.message == "Password does not match"
        ) {
          this.message = "Password does not match";
        } else if (logindata.data.login_user.message.role == "admin") {
          this.$router.push("/admin");
        } else {
          this.$router.push("/contact");
        }
      } catch (err) {
        this.message = "opppppppps! Some error has ocurred";

        console.log("the error is ", err);
      }
    },
  },
};
</script>
<style>
.left {
  height: 100vh;
  width: 35%;
  float: left;
  background-color: rgb(160, 221, 201);
}

.loginImage {
  height: 500px;
  width: 500px;
  margin-left: -200px;
  margin-top: 100px;
  float: left;
}

.top {
  margin-left: 80%;
  padding-top: 20px;
}
.signTop {
  width: 100px;
  background-color: rgb(23, 146, 23);
  color: white;
  border-radius: 10px;
}
.right {
  padding-top: 200px;
  left: 100px;
}

.emailField {
  width: 400px;
  top: 30px;
}

.passwordField {
  width: 400px;
  top: 30px;
}

.register {
  width: 300px;
  background-color: green;
  height: 35px;
  margin-top: 50px;
  border-radius: 30px;
  color: white;
  margin-left: 50px;
}
</style>
