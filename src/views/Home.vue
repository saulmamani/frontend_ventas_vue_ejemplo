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
          v-if="isLogin"
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
              @click="pagination.current_page = 1; getProductos()"
          >
            <v-icon>mdi-magnify</v-icon>
            Buscar
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="12" sm="12">
            <v-pagination
                v-model="pagination.current_page"
                :length="pagination.last_page"
                @input="getProductos"
                :total-visible="7"
                circle
                small
            />
        </v-col>
        
        <v-col cols="12" md="4" sm="6" v-for="(item, index) in productos" :key="index">
          <producto
            :producto="item"
            @listar="getProductos"
          />
        </v-col>
      </v-row>

    </v-card-text>
  </v-card>
</template>

<script>

import Producto from "../components/producto";
import {mapGetters, mapState} from "vuex";

export default {
  name: 'Home',
  components: {Producto},
  data: () => ({
    productos: [],
    loading: false,
    //paginacion
    pagination: {
      per_page: 0,
      current_page: 1,
      last_page: 0,
    },
  }),
  computed: {
    ...mapState(['url']),
    ...mapGetters({
      isLogin: "isLogin"
    })
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
      const url = this.url + "productos?page=" + this.pagination.current_page;
      this.axios.get(url).then(response => {
        this.productos = response.data.data
        this.makePagination(response.data);
      }).catch(e => {
        this.$toastr.error(e.error.data)
      }).finally(() => {
        this.loading = false;
      });
    },
    makePagination: function (page) {
      this.pagination.per_page = page.per_page;
      this.pagination.current_page = page.current_page;
      this.pagination.last_page = page.last_page;
    }
  }
}
</script>