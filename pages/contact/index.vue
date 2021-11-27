<template>
  <div>
    <div>
      <div class="navBar">
        <img
          src="../../assets/images/logo3.png"
          alt="login image"
          class="logoImage"
        />

        <button class="logout" @click="handleLogout">Logout</button>
      </div>

      <v-container>
        <v-row>
          <v-col lg="5">
            <!-- <h2>Add contacts</h2> -->
            <v-icon left class="addicon" @click="handleAddicon" v-if="add">
              mdi-plus
            </v-icon>

            <v-icon left class="closeicon" @click="handleAddicon" v-else>
              mdi-close
            </v-icon>

            <div class="add" v-if="!add">
              <div class="picture">
                <img
                  :src="preview"
                  :style="{
                    height: '190px',
                    width: '190px',
                    'border-radius': '100px',
                  }"
                />
                <label for="file-input">
                  <v-icon left class="camera">{{ icons.mdiCamera }} </v-icon>
                </label>

                <input
                  id="file-input"
                  type="file"
                  class="input"
                  @change="filechange($event)"
                />
              </div>

              <v-text-field
                outlined
                label="Contact Name"
                class="nameField"
                type="text"
                v-model="name"
              ></v-text-field>
              <v-text-field
                outlined
                label="Tel No"
                class="telField"
                type="text"
                v-model="tel"
              ></v-text-field>
              <v-text-field
                outlined
                label="Address"
                class="addressField"
                type="text"
                v-model="address"
              ></v-text-field>
              <v-btn class="addButton" @click="handleAddcontact">Add</v-btn>
              <!-- <button class="addButton" @click="handleAddcontact">Add</button> -->
              <!-- <v-btn @click="addsomething">Add</v-btn> -->

              <p class="addmessage">{{ message }}</p>
            </div>
          </v-col>

          <v-col lg="1">
            <div class="divider"></div>
          </v-col>

          <v-col lg="5">
            <div class="myContacts">
              <h2>Contact List</h2>
              <div
                class="indContact"
                v-for="(contact, i) in usercontacts"
                :key="i"
              >
                <div class="indPicture">
                  <v-img :src="contact.picture_path"></v-img>
                </div>
                <div class="conInfo">Name- {{ contact.contact_Name }}</div>
                <div class="conInfo">Telephone- {{ contact.Tel }}</div>
                <div class="conInfo">
                  Address- {{ contact.Address }}
                  <span class="contactIcons">
                    <v-icon
                      left
                      class="editIcon"
                      @click="
                        handleEdit(
                          contact.contact_Name,
                          contact.Address,
                          contact.Tel,
                          contact.contact_Id
                        )
                      "
                      >{{ icons.mdiPencil }}
                    </v-icon>

                    <v-icon
                      left
                      class="deleteIcon"
                      @click="handleDelete(contact.contact_Id)"
                      >{{ icons.mdiDelete }}
                    </v-icon>
                  </span>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
import { mdiPlus, mdiCamera, mdiClose, mdiPencil, mdiDelete } from "@mdi/js";

import axios from "axios";
import gql from "graphql-tag";

import getContacts from "~/apollo/queries/contacts/get_contacts.gql";
import deletecontact from "~/apollo/queries/contacts/delete_contact.gql";
import addcontact from "~/apollo/queries/contacts/add_contact.gql";

const ADD_CONTACT = gql`
  ${addcontact}
`;

const GET_CONTACTS = gql`
  ${getContacts}
`;

const DELETE_CONTACT = gql`
  ${deletecontact}
`;
export default {
  // middleware({ store, redirect }) {
  //   // If the user is not authenticated
  //   if (!store.state.token) {
  //     return redirect("/login");
  //   }
  // },
  data() {
    return {
      fileselected: null,
      formdata: null,
      filecontents: null,
      name: "",
      tel: "",
      address: "",
      usercontacts: null,
      message: "",
      icons: { mdiPlus, mdiCamera, mdiClose, mdiPencil, mdiDelete },
      add: true,
      close: false,
      contacts: [
        {
          name: "Kirubel",
          tel: "0947368849",
          address: "Addis Ababa",
          picture:
            "http://res.cloudinary.com/dh6muae8v/image/upload/v1637250483/gernh4rwg13nfpaqjhyo.jpg",
        },
        {
          name: "Mussie",
          tel: "0947368849",
          address: "Addis Ababa",
          picture:
            "http://res.cloudinary.com/dh6muae8v/image/upload/v1637254595/umzrlccj6nvuka4ymjxf.jpg",
        },
        {
          name: "Kirubel",
          tel: "0947368849",
          address: "Addis Ababa",
          picture:
            "http://res.cloudinary.com/dh6muae8v/image/upload/v1637250483/gernh4rwg13nfpaqjhyo.jpg",
        },
        {
          name: "Mussie",
          tel: "0947368849",
          address: "Addis Ababa",
          picture:
            "http://res.cloudinary.com/dh6muae8v/image/upload/v1637254595/umzrlccj6nvuka4ymjxf.jpg",
        },
      ],
      file: null,
      path: null,
      formdata: null,
      preview: null,
      // reader: null,
    };
  },
  async beforeMount() {
    console.log("this is from tab before mount method");
    const variables = {
      id: this.$store.getters.user.id,
    };
    const response = await this.$apollo.query({
      query: GET_CONTACTS,
      variables,
    });
    console.log("this user contacts are ", response);

    this.$store.dispatch("setContacts", response.data.My_user[0].Contacts);

    this.usercontacts = this.$store.getters.contacts;
    console.log("the local contacts are", this.usercontacts);
  },
  methods: {
    handleAddicon() {
      console.log("add icon is clicked");
      if (this.add) {
        this.add = false;
        this.preview = null;
      } else {
        this.add = true;
      }
    },

    filechange(event) {
      console.log("file is changing");
      this.file = event.target.files[0];

      let reader = new FileReader();
      reader.onloadend = () => {
        this.preview = reader.result;
      };
      reader.readAsDataURL(this.file);
    },

    async handleAddcontact() {
      console.log("add button is clickedddddddddddddddddd");

      this.formdata = new FormData();
      this.formdata.append("upload_preset", "contact-images");
      this.formdata.append("file", this.file);

      console.log("the final formdata value is ", this.formdata);

      try {
        this.message = "Image uploading...";
        axios
          .post(
            "https://api.cloudinary.com/v1_1/dh6muae8v/image/upload",
            this.formdata
          )
          .then((res) => {
            this.message = "Adding Contact ...";
            console.log("final result is ", res);
            console.log("the user id is ", this.$store.getters.user.id);
            console.log("other values are", this.name, this.tel, this.address);
            console.log("the image url is ", res.data.url);

            const variables = {
              Address: this.address,
              Tel: this.tel,
              added_By: this.$store.getters.user.id,
              contact_Name: this.name,
              picture_path: res.data.url,
            };
            this.$apollo
              .mutate({
                mutation: ADD_CONTACT,
                variables,
              })
              .then((res2) => {
                this.message = "Contact Added!";
                console.log("holaaaa!!! the added value is ", res2);
                // this.$notify({
                //   group: "Added",
                //   title: "Notification",
                //   text: "Contact Saved",
                //   type: "success",
                // });
                window.location.reload();
              });
          });

        // const res = await axios({
        //   url: "https://api.cloudinary.com/v1_1/dh6muae8v/image/upload",
        //   method: "POST",
        //   data: this.formdata,
        // });
        // console.log("the result value is ", res);
      } catch (err) {
        console.log("the main error is ", err);
      }
    },
    // filechange(event) {
    //   console.log("file is changing");
    //   this.file = event.target.files[0];
    //   console.log("the file value is ", this.file);
    // },
    handleEdit(name, address, tel, id) {
      console.log("inse edit method");
      console.log("the passed arguments are", name, address, tel, id);
      let editdata = { name, address, tel, id };
      this.$store.dispatch("setEdit", editdata);

      this.$router.push("/edit");
    },

    async handleDelete(id) {
      let answer = confirm("Are you sure you want to delete this Contact?");
      console.log("the passed arguments are", id, answer);

      if (answer) {
        const variables = {
          id,
        };
        try {
          const response = await this.$apollo.mutate({
            mutation: DELETE_CONTACT,
            variables,
          });
          console.log("the deleted contact is ", response);
          window.location.reload();
        } catch (err) {
          console.log("error while deleting", err);
        }
      }

      //this.afterDelete();
      window.location.reload();
    },
    handleLogout() {
      console.log("logout is cliked");
      this.$store.dispatch("LogOut");
      console.log("user is logged out of the system");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.addicon {
  height: 50px;
  width: 50px;
  background-color: green;
  border-radius: 100px;
  margin-left: 300px;
  margin-top: 30px;
  cursor: pointer;
}

.closeicon {
  height: 50px;
  width: 50px;
  background-color: rgb(214, 74, 39);
  border-radius: 100px;
  margin-left: 300px;
  margin-top: 30px;
  cursor: pointer;
}

.add {
  height: 400px;
  /* border: ridge 5px gray; */
  margin-top: 20px;
  widows: 400px;
}

.picture {
  height: 200px;
  width: 200px;
  border: solid 2px rgb(108, 116, 108);
  margin-left: 30%;
  border-radius: 100px;
  margin-bottom: 50px;
  /* background-image: url("http://res.cloudinary.com/dh6muae8v/image/upload/v1637254595/umzrlccj6nvuka4ymjxf.jpg"); */
}

.camera {
  margin-left: 70px;

  cursor: pointer;
}

.input {
  display: none;
}

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

.myContacts {
  margin-top: 50px;
  height: 600px;
  width: 650px;
  overflow: auto;
}

.addButton {
  width: 200px;
  height: 30px;
  background-color: green;
  color: white;
  margin-left: 100px;
  border-radius: 10px;
}

.indContact {
  width: 600px;
  height: 150px;
  border: solid 2px black;
  border-radius: 20px;
  margin-top: 50px;
  font-style: italic;
}

.indPicture {
  height: 120px;
  width: 120px;
  /* border: solid 2px rgb(108, 116, 108); */
  margin-top: 5px;
  /* margin-left: 30%; */
  border-radius: 100px;
  margin-left: 10px;
  /* margin-bottom: 50px; */
  float: left;
}

.conInfo {
  font-weight: bold;
  margin-left: 200px;
  margin-top: 30px;
}

.divider {
  height: 400px;
  border-left: solid 1px black;
  margin-top: 100px;
}

.contactIcons {
  margin-left: 150px;
}

.editIcon {
  cursor: pointer;
}

.deleteIcon {
  cursor: pointer;
}
</style>
