<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <CardTitleSuratTerverifikasiComponents />

      <!-- ===========Table==========  -->
      <v-card>
        <v-card-title class="grey--text text-h6 font-weight-bold">
          <v-icon color="grey lighten-1" large>mdi-account-multiple-outline</v-icon>Surat Yang Terverifikasi
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
                <v-list-item @click="terbitItem(item)">
                  <v-icon color="green" icon>
                    mdi-checkbox-marked-circle
                  </v-icon>
                  <v-list-item-content>
                    <v-list-item-title>Terbitkan</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="cetakSurat(item)">
                  <v-icon color="yellow" icon class="justify-center">
                    fa-solid fa-print
                  </v-icon>
                  <v-list-item-content>
                    <v-list-item-title>Cetak Surat</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card>

      <!-- ============Dialog Surat Diterbitkan================= -->
      <v-dialog v-model="dialogTerbit" max-width="500px">
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
            <v-btn color="blue darken-1" text @click="dialogTerbit = false">
              Cancel
            </v-btn>
            <v-btn color="blue darken-1" text @click="terbitItemConfirm">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- ============Dialog Cetak================= -->
      <v-dialog v-model="dialogCetak" max-width="500px">
        <v-card>
          <v-card-title class="text-h6" justify="center">Apakah anda yakin menerbitkan surat pengantar ini?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialogCetak = false">Cancel</v-btn>
            <v-btn color="green darken-1" text @click="dialogCetak = false">Ya</v-btn>
            <v-spacer></v-spacer>
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
import CardTitleSuratTerverifikasiComponents from '~/components/GlobalComponents/Card/CardTitleSuratTerverifikasiComponents.vue'
export default {
  head() {
    return {
      title: 'Data Surat Diajukan'
    }
  },

  layout: 'defaultAdmin',
  data() {
    return {
      dialogTerbit: false,
      dialogCetak: false,
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
        { text: 'Keterangan', value: 'keterangan' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      dataSurat: [],
      editedIndex: -1,
      editedItem: {
        id_surat: '',
        idm: '',
        nik: '',
        nama: '',
        syarat: '',
        jns_surat: '',
        status: '',
        updated_at: '',
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

  created() {
    this.initialize()
  },

  methods: {
    reload() {
      window.location.href = '/adminVerifikasi';
    },

    initialize() {
      this.$axios.get('/surat/')
        .then((response => {
          console.log(response.data)
          const filteredData = response.data.filter(item => item.status === "terverifikasi");
          //Sorting data dr waktu paling awal
          const sortedData = filteredData.sort((a, b) => a.updated_at.localeCompare(b.updated_at));
          this.dataSurat = sortedData;
          // this.editedItem=sortedData;
          console.log(filteredData.updated_at)
        })).catch((error) => {
          console.log(error.response)
        })
    },

    terbitItem(item) {
      this.editedIndex = this.dataSurat.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogTerbit = true
    },

    terbitItemConfirm() {
      this.editedItem.status = "diterbitkan"
      this.editedItem.updated_at = "2024-02-04T01:04:21Z"
      this.$axios.put(`/surat/${this.editedItem.id_surat}`, this.editedItem)
        .then((response) => {
          console.log(response)
          this.$data.dialogTerbit = false
          this.$data.dialogBerhasil = true
        }).catch((error) => {
          console.log(error)
          this.$data.dialogTerbit = false
          this.dialogErr = true
        })
    },

    cetakSurat(item){
      this.editedIndex = this.dataSurat.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.$router.push({ path: '/cetakSurat', query: {
        id: this.$data.editedItem.nik,
        id_surat: this.$data.editedItem.id_surat,
       }});
    },

    closeVerif() {
      this.dialogVerif = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.dataSurat[this.editedIndex], this.editedItem)
      } else {
        this.dataSurat.push(this.editedItem)
      }
      this.close()
    },
  },
  components: { CardTitleSuratTerverifikasiComponents },

  middleware: ['authAdmin'],
}
</script>
