<template>
  <v-card
      outlined
  >
    <v-form
        ref="form"
        lazy-validation
        v-model="valid"
        @submit.prevent="save"
    >

      <v-card-title>
        <h3>Nuevo / Editar producto</h3>

        <v-spacer/>
        <v-btn
            outlined
            @click="$router.back()"
        >
          Volver
        </v-btn>
      </v-card-title>
      <v-divider/>
      <v-card-text>
        <v-text-field
            label="Código *"
            v-model="producto.codigo"
            required
            type="number"
            outlined
            :rules="[
                       (v) => !!v || 'Codigo es requerido',
                       v => (v && v.length >= 3 && v.length <= 5) || 'codigo debe ser de 3 a 5 digitos'
                    ]"
        ></v-text-field>

        <v-text-field
            label="Nombre *"
            v-model="producto.nombre"
            required
            :rules="[
                       (v) => !!v || 'Nombre es requerido',
                       v => (v && v.length >= 3 && v.length <= 30) || 'desripcion debe ser de 3 a 30 caracteres'
                    ]"
        ></v-text-field>

        <v-textarea
            label="Descripción *"
            v-model="producto.descripcion"
            required
            :rules="[
                       (v) => !!v || 'Descripcion es requerido'
                    ]"
        ></v-textarea>

        <v-text-field
            label="Precio *"
            v-model="producto.precio"
            required
            type="number"
            :rules="[
                       (v) => !!v || 'Precio es requerido'
                    ]"
        ></v-text-field>

        <pre>
          {{ errores }}
        </pre>
      </v-card-text>

      <v-card-actions>
        <v-btn
            color="green"
            outlined
            type="submit"
            :loading="loading"
        >
          Guardar
        </v-btn>
      </v-card-actions>

    </v-form>
  </v-card>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "productos-form",
  data: () => ({
    isNew: false,
    valid: false,
    loading: false,

    producto: {
      user: {}
    },
    errores: []
  }),
  computed:{
    ...mapState(['url'])
  },
  created() {
    this.isNew = !this.$route.params.id;
  },
  mounted() {
    if (!this.isNew) {
      this.getProducto(this.$route.params.id);
    }
  },
  methods: {
    getProducto(id) {
      this.loading = true
      const url = this.url + "productos/" + id;
      this.axios.get(url).then(response => {
        this.producto = response.data
      }).catch(e => {
        this.$toastr.error(e.error.data)
      }).finally(() => {
        this.loading = false;
      });
    },

    save() {
      if (!this.$refs.form.validate())
        return;

      this.loading = true
      const url = this.isNew ?  (this.url + "productos") : (this.url + "productos/" + this.producto.id);
      this.axios(
          {
            method: this.isNew ? 'POST' : 'PUT',
            url: url,
            data: this.producto
          }
      ).then(response => {
        if(response.data.res) {
          this.$toastr.success(response.data.message)
          this.$router.push({name: 'Home'})
        }
        else
          this.$toastr.error(response.data.message)
      }).catch(e => {
        console.log(e.response.data.errors);
        this.errores = e.response.data.errors;
      }).finally(() => {
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped>

</style>