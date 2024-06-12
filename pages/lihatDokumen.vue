<template>
  <v-container class="pa-4">
    <div class="pb-4">
      <v-card>
        <v-tabs background-color="grey lighten-4" center-active dark>
          <v-tab class="text-center black--text">Data Dokumen Persyaratan</v-tab>
        </v-tabs>
      </v-card>
    </div>
    <v-card>
      <v-data-table dense :headers="headers" :items="data_dokumen_syarat" item-key="id" class="elevation-1">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="showFile(item)">
            fa-solid fa-download
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
export default {
  middleware: ['authAdmin'],
  layout: 'defaultAdmin',
  data() {
    return {
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Filename', value: 'filename' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      data_dokumen_syarat: [],
      showIndex: -1,
      dataItem: {
        id: '',
        filename: '',
        jns_surat: '',
      },
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    initialize() {
      this.$axios.$get(`/surat/data_doc/${this.$route.query.id_surat}`)
        .then((response => {
          console.log(response)
          this.$data.data_dokumen_syarat = response
        })).catch((error) => {
          console.log(error)
        })
    },
    download() {

    },
    showFile(item) {
      this.showIndex = this.data_dokumen_syarat.indexOf(item);
      this.dataItem = Object.assign({}, item);
      this.$router.push({ path: '/dataDokumenSyarat', query: { id: this.$data.dataItem.id } });
    },
  }
}
</script>
