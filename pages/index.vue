<template>
  <div class="all">
    <div class="main">
      <img
        src="../assets/images/logo4.jpg"
        alt="login image"
        class="logoImage"
      />
      <div class="text">
        <h1>Contact Manager</h1>
      </div>
      <div class="subtitle">
        <h3>Best choice to manage your contacts!</h3>
      </div>
      <div class="buttons">
        <button class="but" @click="handleSignup">SignUp</button>
        <button class="but" @click="handleLogin">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    handleSignup() {
      this.$router.push("/signup");
    },
    handleLogin() {
      this.$router.push("/login");
    },
  },
};
</script>``

<style>
.all{
  background-color: black;
}

.logoImage {
 height: 150px;
 width: 150px;
 margin-left: 30px;
 margin-top: 20px;
}

.main {
  height: 100vh;
  background-color: rgb(74, 153, 67);
  border-radius: 50px 0px 500px 0px;
  /* background-image: url("~assets/images/image1.jpeg"); */
}

.text {
  margin-top: 100px;
  margin-left: 100px;
  font-size: 28px;
  color: white;
}

.subtitle {
  margin-top: 50px;
  margin-left: 100px;
  font-style: italic;
  font-size: 20px;
}

.buttons {
  /* position: absolute; */
  margin-top: 100px;
  margin-left: 300px;
}

.but {
  width: 200px;
  height: 50px;
  background-color: white;
  border-radius: 30px;
  margin-left: 50px;
}
</style>
