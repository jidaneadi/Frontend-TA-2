<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <CardTitleSuratDitolakComponents />

      <!-- ===========Table==========  -->
      <v-card>
        <v-card-title class="grey--text text-h6 font-weight-bold">
          <v-icon color="grey lighten-1" large>mdi-account-multiple-outline</v-icon>Surat Yang Ditolak
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <div class="pb-2"></div>
        <v-data-table :headers="headers" :items="dataSurat" :search="search" />
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import CardTitleSuratDitolakComponents from '~/components/GlobalComponents/Card/CardTitleSuratDitolakComponents.vue'
export default {
  head() {
    return {
      title: 'Data Surat Diajukan'
    }
  },

  layout: 'defaultAdmin',
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'ID Surat',
          align: 'start',
          sortable: false,
          value: 'id_surat',
        },
        { text: 'NIK', value: 'nik' },
        { text: 'Nama Pemohon', value: 'nama' },
        { text: 'Jenis Surat', value: 'jns_surat' },
        { text: 'Tanggal Pengajuan', value: 'updated_at' },
        { text: 'Status', value: 'status' },
        { text: 'Keterangan', value: 'keterangan' },
      ],
      dataSurat: [],
      editedIndex: -1,
      defaultItem: {
        id_surat: '',
        nik: '',
        nama: '',
        syarat: '',
        jns_surat: '',
        status: '',
        keterangan: '',
        updated_at: '',
      },
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.$axios.get('/surat/')
        .then((response => {
          console.log(response.data)
          const filteredData = response.data.filter(item => item.status === "ditolak");
          //Sorting data dr waktu paling awal
          const sortedData = filteredData.sort((a, b) => a.updated_at.localeCompare(b.updated_at));
          this.dataSurat = sortedData;
          // this.editedItem=sortedData;
          console.log(filteredData.updated_at)
        })).catch((error) => {
          console.log(error.response)
        })
    },
  },
  components: { CardTitleSuratDitolakComponents },

  middleware: ['authAdmin'],
}
</script>
