<template>
  <v-card
      class="mx-auto"
      max-width="280"
      max-height="640"

  >
    <v-img
        height="150"
        :src="'http://127.0.0.1:8000/imagenes/' + producto.url_imagen"
        @click="cambiarImagen"
    />

    <v-card-title>{{ producto.nombre }}</v-card-title>

    <v-card-text>
      <v-row
          align="center"
          class="mx-0"
      >
        <v-rating
            :value="1"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
        />

        <div class="grey--text ml-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        {{ producto.precio }} BOB
      </div>

      <div> {{ producto.descripcion }}</div>
    </v-card-text>

    <v-divider class="mx-4"/>

    <v-card-text>
      <v-chip-group
          active-class="deep-purple accent-4 white--text"
          column
      >
        <v-chip :visible="false">
          <v-icon>mdi-thumb-up</v-icon>
          ({{ producto.like }})
        </v-chip>
        <v-chip>
          <v-icon>mdi-thumb-down</v-icon>
          ({{ producto.dislike }})
        </v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
          color="blue"
          text
          @click="openForm(producto.id)"
      >
        Editar
      </v-btn>

      <v-btn
          color="red"
          text
      >
        Eliminar
      </v-btn>
    </v-card-actions>

    <v-dialog
        v-model="dialogImagen"
        persistent
        max-width="500px"
    >
      <aubir-imagen
          :producto="producto"
          @salir="dialogImagen = false"
          @listar="$emit('listar')"
      />
    </v-dialog>

  </v-card>
</template>

<script>
import AubirImagen from "./aubir-imagen";

export default {
  name: "producto",
  components: {AubirImagen},
  props: ['producto'],
  data:() =>({
    dialogImagen: false
  }),
  methods: {
    cambiarImagen() {
      this.dialogImagen = true;
    },
    openForm(id) {
      this.$router.push({name: 'producto.edit', params: {id: id}})
    }
  }
}
</script>

<style scoped>

</style>