<template>
  <div>
    <div class="navBar">
      <img
        src="../../assets/images/logo3.png"
        alt="login image"
        class="logoImage"
      />

      <button class="logout">Logout</button>
    </div>

    <h1 class="headline">Edit contact page</h1>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6" md="3" lg="5">
          <v-text-field
            outlined
            label="Contact Name"
            v-model="editdata.name"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="3" lg="5">
          <v-text-field
            outlined
            label="Contact Tel"
            v-model="editdata.tel"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="3" lg="5">
          <v-text-field
            outlined
            label="Contact Address"
            v-model="editdata.address"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="3" lg="5">
          <v-btn color="#07ab29" depressed class="update" @click="handleUpdate">
            <!-- <v-icon left>
                {{ icons.mdiUpdate }}
              </v-icon> -->
            Update
          </v-btn>
          <p>{{ message }}</p>
        </v-col>
      </v-row>
      <p class="message">...</p>
    </v-container>
  </div>
</template>
<script>
import { mdiUpdate } from "@mdi/js";
import gql from "graphql-tag";
import updatecontact from "~/apollo/queries/contacts/update_contact.gql";

const UPDATE_CONTACT = gql`
  ${updatecontact}
`;

export default {
  data() {
    return {
      icons: {
        mdiUpdate,
      },
      editdata: {
        name: this.$store.getters.edit.name,
        tel: this.$store.getters.edit.tel,
        address: this.$store.getters.edit.address,
        id: this.$store.getters.edit.id,
      },
      message: "",
    };
  },

  methods: {
    async handleUpdate() {
      this.message = "Contact Updating ...";
      console.log("update button is clicked");
      let { name, tel, address, id } = this.editdata;
      console.log("final updates are", name, tel, address, id);

      const variables = {
        name,
        tel,
        address,
        id,
      };

      try {
        const updateddata = await this.$apollo.mutate({
          mutation: UPDATE_CONTACT,
          variables,
        });

        console.log("user is updated successfully", updateddata);

        this.message = "Contact Updated Successfully!";
        window.location.reload();

        // this.$notify({
        //   group: "Edited",
        //   title: "Notification",
        //   text: "Contact Updated! ",
        //   type: "success",
        // });
        //this.$router.push("/contact");
        // const variables = {
        //   id: this.$store.getters.user.id,
        // };

        // try{
        //      const response = await this.$apollo.query({
        //   query: GET_CONTACTS,
        //   variables,
        // });
        // console.log("this user contacts are ", response);
        // }catch(err){
        //   console.log("error while fetching contacts,err")
        // }
      } catch (err) {
        this.message = "Oppppps! Some error has occured";
        console.log("the catch error is ", err);
      }
    },
  },

  // created() {
  //   this.name = this.$store.getters.edit.name;
  //   this.tel = this.$store.getters.edit.tel;
  //   this.address = this.$store.getters.edit.address;
  //   console.log("the edit value is ", this.name, this.tel, this.address);
  // },
};
</script>

<style>
.navBar {
  width: 100%;
  background-color: rgb(89, 231, 113);
}

.logout {
  margin-left: 70%;
  width: 150px;
  background-color: white;
  height: 30px;
  margin-bottom: 10px;
  border-radius: 20px;
}
</style>
