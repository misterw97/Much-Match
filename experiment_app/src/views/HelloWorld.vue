<template>
  <v-container>
    <loading :active.sync="isLoading" :is-full-page="true"></loading>
    <v-layout text-center wrap pa-6>
      <v-flex mb-4>
        <img alt="logo" :src="require('../assets/logo_cut.png')" />
        <h2 class="display-2 font-weight-bold mb-3">...a&nbsp;swiping experiment</h2>
        <p class="text-left subheading font-weight-regular">
          This experiment investigates the correlation between your swiping
          behaviour and the information it contains about you/your feelings.
          What can we (or cannot) infer about the user from its swiping
          features?
          <br />This project is part of the
          <a
            href="https://edu.epfl.ch/coursebook/en/experience-design-CS-489"
            target="_blank"
          >Experience Design class</a>
          given at EPFL.
        </p>
      </v-flex>

      <v-flex mb-5 xs12>
        <p class="alert">
          The library used for the swiping functionnality is not working well on some iPhones.
          Please use your computer or another phone to participate in the experiment if you are concerned.
        </p>
      </v-flex>

      <v-flex mb-5 xs12>
        <h3 class="headline font-weight-bold mb-3">Before starting the experiment...</h3>
        <p class="text-left font-weight-regular">
          In order to segment our data and to relate the information we might
          observe with some facts, we need some objective data about you.
          <b>No identification data is saved</b>.
        </p>
      </v-flex>

      <v-flex mb-4 xs12>
        <v-form ref="form" v-model="valid">
          <v-select
            v-model="age"
            :items="Array.from(Array(80).keys()).map(x => x + 16)"
            :rules="[v => !!v || 'Age is required']"
            label="Age"
            required
          ></v-select>

          <v-select
            v-model="gender"
            :items="genders"
            :rules="[v => !!v || 'Gender is required']"
            label="Gender"
            required
          ></v-select>

          <v-switch v-model="isStudent" class="ma-4" label="I am a student"></v-switch>
          <v-switch
            v-model="isWorking"
            class="ma-4"
            label="I work for a company or have my own one"
          ></v-switch>

          <v-checkbox
            v-model="agreed"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="I confirm my information is correct and that I allow EPFL students to use the data 
            I provided and my swiping features for this study in the context of the described class."
            required
          ></v-checkbox>

          <v-btn :disabled="!valid" color="accent" class="mr-4" @click="validate">Continue</v-btn>
        </v-form>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Well done!</v-card-title>

        <v-card-text>
          <br />
          <b>{{user}}</b> is the only identifier linked to your swiping data. You can use it if you need to contact us to remove your data from the study!
          <br />
          <br />Before starting the actual swiping features collection, you will follow a quick tutorial for using our user interface. Try to act normal!
          <br />The study is about 30 swipes, please stay until the end...
          <br />
          <br />Thanks a lot for your help!
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="next">Got it!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import router from "../router";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default Vue.extend({
  name: "HelloWorld",
  components: {
    Loading
  },
  data: () => ({
    isLoading: false,
    valid: true,
    age: null,
    gender: null,
    genders: ["Male", "Female"],
    isStudent: false,
    isWorking: false,
    agreed: false,
    user: null,
    dialog: false
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        const userData = {};
        userData.age = this.age;
        userData.isWorking = !!this.isWorking;
        userData.isStudent = !!this.isStudent;
        userData.isMale = this.gender === this.genders[0];

        axios
          .post(`${process.env.VUE_APP_API_BASE}subjects`, userData)
          .then(response => {
            this.user = response.data.id;
            this.dialog = !!this.user;
          })
          .catch(error => {
            window.alert(
              "An error occurred contacting the server... Please retry now or later. If the problem persists please contact us."
            );
            console.error(error);
          })
          .finally(() => (this.isLoading = false));
      }
    },
    next() {
      window.localStorage.setItem("userId", this.user);
      router.push("/tutorial");
    }
  }
});
</script>

<style lang="scss" scoped>
img {
  width: 80%;
  max-width: 400px;
}
p.alert {
  color: #ab2e46;
  border: 1px solid;
}
</style>