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
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
      >
        <span class="mr-2">LogIn</span>
        <span class="mr-2">Cerrar Sesion</span>

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
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
