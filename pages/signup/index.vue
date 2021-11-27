<template>
  <div>
    <div class="left"></div>
    <img
      src="../../assets/images/signup-r.png"
      alt="login image"
      class="signupImage"
    />
    <div class="top">
      <span>already have an account? </span>
      <nuxt-link to="/login"><button class="logTop">Login</button></nuxt-link>
    </div>
    <div class="right">
      <h2>Signup</h2>
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
        <!-- <nuxt-link to="/contact"> -->
        <button class="register" @click="handleRegister">Submit</button>
        <!-- </nuxt-link> -->
        <p>{{ message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import adduser from "~/apollo/queries/users/add_user.gql";
import gql from "graphql-tag";

const ADD_USER = gql`
  ${adduser}
`;

export default {
  data() {
    return {
      email: "",
      password: "",
      message: "",
    };
  },

  methods: {
    async handleRegister() {
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
        const addeddata = await this.$apollo.mutate({
          mutation: ADD_USER,
          variables,
        });

        console.log(
          "the added data response is ",
          addeddata,
          "and the token value is ",
          addeddata.data.create_user.token
        );

        this.$store.dispatch("setToken", addeddata.data.create_user.token);
        this.$store.dispatch("setUser", addeddata.data.create_user.message);

        console.log(
          "the authenticated value is ",
          this.$store.getters.authenticated
        );

        console.log("the token value is ", this.$store.getters.token);

        if (addeddata.data.create_user.message == "user exists") {
          this.message = "User already exists";
        } else if (addeddata.data.create_user.message == "Error occured") {
          this.message = "oppppps! Some error has just occured";
        } else {
          this.$router.push("/contact");
        }
      } catch (err) {
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

.signupImage {
  height: 400px;
  width: 400px;
  margin-left: -200px;
  margin-top: 100px;
  float: left;
}

.top {
  margin-left: 80%;
  padding-top: 20px;
}
.logTop {
  width: 100px;
  background-color: rgb(23, 146, 23);
  color: white;
  border-radius: 10px;
}
.right {
  position: relative;
  padding-top: 200px;
  margin-left: 100px;
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
