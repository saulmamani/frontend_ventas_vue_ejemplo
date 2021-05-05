<template>
  <v-card>
    <form
        method="POST"
        id="frmImagen"
        @submit.prevent="save"
        enctype="multipart/form-data"
    >
      <v-card-title>
        <h3>Subir imagen para el producto: {{ producto.codigo }}</h3>
        <v-spacer/>
        <v-btn
          icon
          @click="$emit('salir')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider/>

      <v-card-text>
        <input type="file" ref="url_imagen" name="url_imagen" id="url_imagen" accept="image/gif, image/jpeg, image/png, image/jpg"
               @change="escogerDocumento"
               required>
      </v-card-text>

      <v-card-actions>
        <v-btn type="submit" color="info" :loading="loading">
          Subir imagn
        </v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "aubir-imagen",
  props: ['producto'],
  data: () => ({
    loading: false,
    file: null,
  }),
  computed: {
    ...mapState(['url']),
  },
  methods: {
    escogerDocumento(event) {
      this.file = event.target.files[0];
    },
    subirArchivo(url, formData, config) {
      return new Promise((resolve, reject) => {
        this.axios.put(
            url,
            formData,
            config
        ).then(response => {
          if (response.data.res) {
            this.$toastr.success(response.data.message);
          } else {
            this.$toastr.error("Error: Puede que un archivo esté protegico con constraseña, revise y vuelva a intentarlo" + "\n" + response.data.e);
          }
          resolve(response);
        }).catch(e => {
          this.$toastr.error("Error: Puede que un archivo esté protegico con constraseña, revise y vuelva a intentarlo" + "\n" + e.response);
          reject(e);
        })
      });
    },
    async save() {
      let url = this.url + "set_imagen/" + this.producto.id;
      let formData = new FormData();

      //cargando varios archivos para enviarlo al servidor
      // for (let i = 0; i < this.files.length; i++) {
      //   let file = this.files[i];
      //   formData.append("url[" + i + "]", file);
      // }

      let config = {
        headers: {'Content-Type': 'multipart/form-data'}
      };

      this.loading = true;
      await this.subirArchivo(url, formData, config).then(response => {
        if (response.data.res) {
          this.$emit('listar');
          this.$emit('salir')
        }
        else{
          this.$toastr.error(response.data.message);
        }
      }).finally(() => {
        this.loading = false;
      });
    }

  }
}
</script>

<style scoped>

</style>