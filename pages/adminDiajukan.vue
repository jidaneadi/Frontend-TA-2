<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <CardTitleSuratDiajukanComponents/>
      <!-- ===========Table==========  -->
      <v-card>
        <v-card-title class="grey--text text-h6 font-weight-bold">
          <v-icon color="grey lighten-1" large>mdi-account-multiple-outline</v-icon>Surat Yang Diajukan
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
        </v-card-title>
        <div class="pb-2"></div>
        <v-data-table :headers="headers" :items="dataSurat" :search="search">

          <!-- ===========Action========= -->
          <template v-slot:item.actions="{ item }">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="blue-grey darken-2" small icon dark v-bind="attrs" v-on="on">
                  <v-icon>mdi-gesture-tap-button</v-icon>
                </v-btn>
              </template>
              <v-list nav dense>
                <v-list-item @click="tolakItem(item)">
                  <v-icon color="red" icon>
                    mdi-cancel
                  </v-icon>
                  <v-list-item-content>
                    <v-list-item-title>Ditolak</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="verifItem(item)">
                  <v-icon color="green" icon>
                    mdi-checkbox-marked-circle
                  </v-icon>
                  <v-list-item-content>
                    <v-list-item-title>Verifikasi</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="lihatDokumenItem(item)">
                  <v-icon color="yellow" icon>
                    mdi-eye
                  </v-icon>
                  <v-list-item-content>
                    <v-list-item-title> Lihat Dokumen Syarat</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card>

      <!-- ============Dialog Surat Ditolak================= -->
      <v-dialog v-model="dialogTolak" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Berikan Keterangan</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea v-model="editedItem.keterangan" label="Keterangan" />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogTolak = false">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="tolakItemConfirm">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- ============Dialog Verifikasi================= -->
      <v-dialog v-model="dialogVerif" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Berikan Keterangan</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-textarea v-model="editedItem.keterangan" label="Keterangan" />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogVerif = false">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="verifItemConfirm">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- ============Dialog ERROR================= -->
      <v-dialog v-model="dialogErr" persistent max-width="315">
        <v-card>
          <v-card-text align="center">
            <h2 class="pt-4 pb-2 black--text font-weight-bold">GAGAL!!!</h2>
          </v-card-text>
          <v-card-text align="center"><v-btn class="mx-2" fab dark large color="red">
              <v-icon x-large dark>
                mdi-close
              </v-icon>
            </v-btn>
          </v-card-text>
          <v-card-text>Cek kembali data anda!. Pastikan NIK dan E-mail yang anda inputkan
            benar</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="green darken-1" @click="dialogErr = false">
              Mengerti
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- ============Dialog Berhasil================= -->
      <v-dialog v-model="dialogBerhasil" persistent max-width="290">
        <v-card>
          <v-card-text align="center">
            <h2 class="pt-4 pb-2 black--text font-weight-bold">SUKSES!!!</h2>
          </v-card-text>
          <v-card-text align="center"><v-btn class="mx-2" fab dark large color="green">
              <v-icon x-large dark>
                mdi-checkbox-marked-circle
              </v-icon>
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="green darken-1" class="white--text" @click="reload">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-col>
  </v-row>
</template>
<script>
import CardTitleSuratDiajukanComponents from '~/components/GlobalComponents/Card/CardTitleSuratDiajukanComponents.vue';

export default {
  middleware: ['authAdmin'],
  head() {
    return {
      title: 'Data Surat Diajukan'
    }
  },

  layout: 'defaultAdmin',
  data() {
    return {
      dialogTolak: false,
      dialogDelete: false,
      dialogVerif: false,
      dialogBerhasil: false,
      dialogErr: false,
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
        // { text: 'Keterangan', value: 'keterangan' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      dataSurat: [],
      dataEditSurat:[],
      editedIndex: -1,
      editedItem: {
        id_surat: '',
        idm: '',
        nik: '',
        nama: '',
        syarat: '',
        jns_surat: '',
        status: '',
        updated_at:'',
        keterangan: '',
      },
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

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  created() {
    this.initialize()
  },

  methods: {

    reload() {
      window.location.href = '/admindiajukan';
    },

    initialize() {
      this.$axios.get('/surat/')
        .then((response => {
          console.log(response.data)
          const filteredData = response.data.filter(item => item.status === "diproses");
          //Sorting data dr waktu paling awal
          const sortedData = filteredData.sort((a, b) => a.updated_at.localeCompare(b.updated_at));
          this.dataSurat = sortedData;
          // this.editedItem=sortedData;
          console.log(filteredData.updated_at)
        })).catch((error) => {
          console.log(error.response)
        })
    },

    lihatDokumenItem(item) {
      this.editedIndex = this.dataSurat.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.$router.push({ path: '/lihatdokumen', query: { id_surat: this.$data.editedItem.id_surat } });
    },

    tolakItem(item) {
      this.editedIndex = this.dataSurat.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogTolak = true
    },

    tolakItemConfirm() {
      this.editedItem.status = "ditolak"
      this.editedItem.updated_at = "2024-02-04T01:04:21Z"
      this.$axios.$put(`surat/${this.editedItem.id_surat}`, this.editedItem)
        .then((response) => {
          console.log(response)
          this.$data.dialogTolak = false
          this.$data.dialogBerhasil = true
        }).catch((error) => {
          console.log(error)
          this.$data.dialogTolak = false
          this.dialogErr = true
        })
    },

    verifItem(item) {
      this.editedIndex = this.dataSurat.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogVerif = true
    },

    verifItemConfirm() {
      this.editedItem.status = "terverifikasi"
      this.editedItem.updated_at = "2024-02-04T01:04:21Z"
      this.$axios.$put(`/surat/${this.editedItem.id_surat}`, this.editedItem)
        .then((response) => {
          console.log(response)
          this.$data.dialogVerif = false
          this.$data.dialogBerhasil = true
        }).catch((error) => {
          console.log(error)
          this.$data.dialogVerif = false
          this.dialogErr = true
        })
    },

    deleteItem(item) {
      this.editedIndex = this.dataSurat.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$axios.delete(`/surat/${this.editedItem.id_surat}`, this.editedItem)
        .then((response) => {
          console.log(response)
          this.$data.dialogDelete = false
          this.$data.dialogBerhasil = true
        }).catch((error) => {
          console.log(error)
          this.$data.dialogDelete = false
          this.dialogErr = true
        })

      // this.dataSurat.splice(this.editedIndex, 1)
      // this.closeDelete()
    },
  },

  components: { CardTitleSuratDiajukanComponents }
}
</script>
