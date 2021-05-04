<template>
  <v-card :loading="loading">
    <v-card-title>
      CATALOGO DE PRODUCTOS
      <v-spacer/>
      <v-btn
          color="green"
          text
          outlined
          small
          @click="openForm()"
      >
        Nuevo producto
      </v-btn>
    </v-card-title>

    <v-divider/>

    <v-card-text>

      <v-row>
        <v-col cols="10" md="10" sm="12">
          <v-text-field
              label="Buscar por nombre o descripcion"
              outlined
              dense
          />
        </v-col>
        <v-col cols="2" md="2" sm="12">
          <v-btn
              color="primary"
              depressed
              block
          >
            <v-icon>mdi-magnify</v-icon>
            Buscar
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="4" sm="6" v-for="(item, index) in productos" :key="index">
          <producto
            :producto="item"
          />
        </v-col>
      </v-row>

    </v-card-text>
  </v-card>
</template>

<script>

import Producto from "../components/producto";
import {mapState} from "vuex";

export default {
  name: 'Home',
  components: {Producto},
  data: () => ({
    productos: [],
    loading: false
  }),
  computed: {
    ...mapState(['url'])
  },
  mounted() {
    this.getProductos()
  },
  methods: {
    openForm(){
        this.$router.push({name: 'producto'});
    },
    getProductos() {
      this.loading = true
      const url = this.url + "productos";
      this.axios.get(url).then(response => {
        this.productos = response.data
      }).catch(e => {
        this.$toastr.error(e.error.data)
      }).finally(() => {
        this.loading = false;
      });
    }
  }
}
</script>