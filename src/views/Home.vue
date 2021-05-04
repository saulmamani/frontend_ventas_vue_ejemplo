<template>
  <v-card>
    <v-card-title>
      CATALOGO DE PRODUCTOS
      <v-spacer/>
      <v-btn
          color="green"
          text
          outlined
          small
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
          <producto></producto>
        </v-col>
      </v-row>

    </v-card-text>
  </v-card>
</template>

<script>

import Producto from "../components/producto";
export default {
  name: 'Home',
  components: {Producto},
  data: () => ({
    productos: [
        {id: 1, nombre: "uno"},
        {id: 2, nombre: "dos"},
        {id: 3, nombre: "tres"},
        {id: 4, nombre: "tres"},
        {id: 5, nombre: "tres"},
    ]
  })
}
</script>