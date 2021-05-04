<template>
  <v-card outlined>
    <v-card-title>
      Nuevo / Modificar Producto
      {{ isNew }}
    </v-card-title>
    <v-card-text>
      Aqui los campos
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "productos-form",
  data: () => ({
    isNew: false
  }),
  created() {
    this.isNew = !this.$route.params.id;
  }
}
</script>

<style scoped>

</style>