<template>
  <v-app>
    <v-app-bar
        app
        color="pink darken-2"
        dark
    >
      <div class="d-flex align-center">
        <h2>SHOP STORE</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn
          text
          @click="dialogLogin = true"
          v-if="!isLogin"
      >
        <span class="mr-2" >LogIn</span>
      </v-btn>

      <v-btn
          text
          v-else
          @click="logout"
      >
        <span class="mr-2">{{ user.email }} | Cerrar Sesion</span>

        <v-avatar>
          <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
          >
        </v-avatar>
      </v-btn>

    </v-app-bar>

    <v-main class="grey lighten-2">
      <v-container>
        <router-view/>
      </v-container>
    </v-main>

    <v-dialog
        v-model="dialogLogin"
        persistent
        max-width="300px"
    >
      <login
          @salir="dialogLogin = false"
      />
    </v-dialog>

  </v-app>
</template>

<script>

import Login from "./components/login";
import {mapGetters} from "vuex";
import store from '@/store/index';

export default {
  name: 'App',
  components: {Login},
  data: () => ({
    dialogLogin: false
  }),
  computed:{
    ...mapGetters({
      isLogin: "isLogin",
      user: "getUser"
    })
  },
  methods: {
    logout(){
      if(confirm("Seguro que quiere salir del sistema?")) {
        store.dispatch("destroyToken").then(response => {
          if (response.data.res) {
            this.$toastr.success(response.data.message)
          } else
            this.$toastr.error(response.data.message)
        })
      }
    }
  }
};
</script>
