<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <div class="pb-4">
        <v-card>
          <v-tabs background-color="grey lighten-4" center-active dark>
            <v-tab class="text-center black--text">Data Surat Yang Diambil</v-tab>
          </v-tabs>
        </v-card>
      </div>

      <!-- ===========Table==========  -->
      <v-card>
        <v-card-title class="grey--text text-h6 font-weight-bold">
          <v-icon color="grey lighten-1" large>mdi-account-multiple-outline</v-icon>Surat Yang Diambil
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
                <v-list-item @click="editItem(item)">
                  <v-icon color="yellow" icon>
                    mdi-pencil
                  </v-icon>
                  <v-list-item-content>
                    <v-list-item-title>Lihat Data</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="deleteItem(item)">
                  <v-icon color="red" icon>
                    mdi-delete
                  </v-icon>
                  <v-list-item-content>
                    <v-list-item-title>Hapus Data</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card>

      <!-- ============Dialog Edit Data================= -->
      <v-dialog v-model="dialogEdit" max-width="700px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Edit Data Masyarakat</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="3" md="4">
                  <v-text-field v-model="editedItem.id" label="ID Surat"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="4">
                  <v-text-field v-model="editedItem.nik" label="NIK"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="4">
                  <v-text-field v-model="editedItem.nama" label="Nama Lengkap"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="4">
                  <v-combobox v-model="editedItem.gender" label="Jenis Kelamin" :items="items"></v-combobox>
                </v-col>
                <v-col cols="12" sm="3" md="6">
                  <v-text-field v-model="editedItem.no_hp" label="No HP"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="6">
                  <v-text-field v-model="editedItem.ttl" label="Tempat, Tanggal Lahir"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="12">
                  <v-text-field v-model="editedItem.alamat" label="Alamat"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="12">
                  <v-text-field v-model="editedItem.jns_surat" label="Jenis Surat"></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" md="12">
                  <v-text-field v-model="editedItem.status" label="Status"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <!-- <v-textarea filled name="input-7-4" label="Keterangan"/> -->
                    <v-textarea v-model="editedItem.keterangan" label="Keterangan"/>
                </v-col>
                <v-col cols="12" sm="3" md="12">
                  <v-text-field v-model="editedItem.updated_at" label="Tanggal Pengambilan"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogEdit = false">
              Close
            </v-btn>
            <!-- <v-btn color="blue darken-1" text @click="editItemConfirm">
              Save
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- ============Dialog Cetak================= -->
      <v-dialog v-model="dialogCetak" max-width="500px">
        <v-card>
          <v-card-title class="text-h6" justify="center">Apakah anda yakin mencetak pengajuan ini?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialogCetak = false">Cancel</v-btn>
            <v-btn color="green darken-1" text @click="cetakItemConfirm">Ya</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- ============Dialog Delete================= -->
      <v-dialog v-model="dialogDelete" max-width="550px">
        <v-card>
          <v-card-title class="text-h6">Apakah anda yakin menghapus data pengajuan ini?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text @click="dialogDelete = false">Cancel</v-btn>
            <v-btn color="green darken-1" text @click="deleteItemConfirm">Ya</v-btn>
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
            <v-btn block color="green darken-1" class="white--text" @click="dialogBerhasil = false">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-col>
  </v-row>
</template>
<script>
export default {
  head() {
    return {
      title: 'Data Surat Diajukan'
    }
  },

  layout: 'defaultAdmin',
  data() {
    return {
      dialogEdit: false,
      dialogCetak: false,
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
        { text: 'Dokumen Syarat', value: 'syarat' },
        { text: 'Status', value: 'status' },
        { text: 'Keterangan', value: 'keterangan' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      dataSurat: [],
      editedIndex: -1,
      editedItem: {
        id_surat: '',
        nik: '',
        nama: '',
        syarat:'',
        jns_surat: '',
        status: '',
        keterangan: '',
        updated_at: '',
      },
      defaultItem: {
        id_surat: '',
        nik: '',
        nama: '',
        syarat:'',
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
    reload(){
      dialogBerhasil = false
      window.location.href = '/adminselesai';
    },

    initialize() {
      this.$axios.get('/ktp/')
        .then((response => {
          const filteredData = response.data.filter(item => item.status === 'diambil');
          const sortedData = filteredData.sort((a, b) => a.created_at.localeCompare(b.created_at));
          this.dataSurat = sortedData;
        })).catch((error) => {
          console.log(error.response)
        })
    },

    editItem(item) {
      this.editedIndex = this.dataSurat.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogEdit = true
    },

    editItemConfirm() {
      this.$axios.put(`/surat/${this.editedItem.id}`, this.editedItem)
        .then((response) => {
          console.log(response)
          this.$data.dialogEdit = false
          this.$data.dialogBerhasil = true
        }).catch((error) => {
          console.log(error)
          this.$data.dialogEdit = false
          this.dialogErr = true
        })
    },

    cetakItem(item) {
      this.editedIndex = this.dataSurat.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogCetak = true
    },

    cetakItemConfirm() {
      this.editedItem.status = "ditolak"
      this.$axios.put(`/surat/${this.editedItem.id}`, this.editedItem)
        .then((response) => {
          console.log(response)
          this.$data.dialogCetak = false
          this.$data.dialogBerhasil = true
        }).catch((error) => {
          console.log(error)
          this.$data.dialogCetak = false
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
      this.$axios.put(`/surat/${this.editedItem.id}`, this.editedItem)
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
      this.$axios.delete(`http://127.0.0.1:3005/api/surat/${this.editedItem.id}`, this.editedItem)
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

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
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

  middleware : ['authAdmin'],
}
</script>
