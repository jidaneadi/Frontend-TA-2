<template>
  <div>
    <v-card>
      <v-card-text class="pt-8 text-subtitle-1 font-weight-bold text-center black--text">Form Pengajuan Surat
        Pengantar Penerbitan KTP</v-card-text>
      <v-form ref="form" lazy-validation class="px-10 pb-5 mx-10">
        <v-container>
          <v-row align="center">
            <v-col cols="12" class="text-subtitle text-justify"> Untuk memulai pengajuan Anda, pastikan untuk
              mempersiapkan dokumen persyaratan yang
              diperlukan, yaitu Kartu Keluarga (KK), Akte Kelahiran, dan Surat Pengantar RT. Jika Anda tidak memiliki
              Surat Pengantar RT, Anda dapat menggantinya dengan menyertakan Surat Pernyataan yang relevan. Mohon
              unggah salinan-salinan tersebut dengan jelas dan akurat untuk memastikan bahwa pengajuan Anda dapat
              segera diproses. </v-col>
            <v-col cols="12" xl="8" lg="8" md="8">Inputkan dokumen Kartu Keluarga/Akte Kelahiran dalam format
              PDF</v-col>
            <v-col cols="12" xl="4" lg="4" md="4">
              <v-file-input v-model="form.dokumen_pribadi" show-size counter multiple label="Input KK"
                prepend-icon="mdi-cloud-upload" solo></v-file-input>
            </v-col>
            <v-col cols="12" xl="8" lg="8" md="8">Inputkan dokumen Surat Pengantar RT atau dokumen Surat
              Pernyataan</v-col>
            <v-col cols="12" xl="4" lg="4" md="4">
              <v-file-input v-model="form.keterangan_rt" show-size counter multiple label="Input Surat Pengantar"
                prepend-icon="mdi-cloud-upload" solo></v-file-input>
            </v-col>
            <v-col class="pt-2 pb-2" cols="12" xl="6" lg="6" md="6">
              <v-btn color="success" @click="createSurat" block>
                Ajukan
              </v-btn>
            </v-col>
            <v-col class="pt-2 pb-2" cols="12" xl="6" lg="6" md="6">
              <v-btn :disabled="!valid" color="#E40017" class="white--text" @click="clear" block>
                Clear
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>

    <!-- Dialog Berhasil -->
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
        <v-card-text>Cek kembali data anda!. Pastikan anda sudah menginputkan dua file dengan format PDF!</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="green darken-1" @click="dialogErr = false">
            Mengerti
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      dialogErr: false,
      dialogBerhasil: false,
      valid: true,
      form: {
        // id_masyarakat:'',
        jns_surat: "ktp_lama",
        status: "diproses",
        dokumen_pribadi: [],
        keterangan_rt: [],
      },
    };
  },
  methods: {
    reload() {
      this.$data.dialogBerhasil = false;
      this.$data.form.dokumen_pribadi =[];
      this.$data.form.keterangan_rt =[];
    },
    clear() {
      this.$refs.form.reset();
    },
    initialize() {
      this.$axios.$get(`/profile/${this.user.id}`)
        .then((response => {
          this.$data.dataUser = response;
          console.log(response);
        })).catch((error) => {
          console.log(error);
        });
    },
    createSurat() {
      this.$data.dialog2 = false;
      let formData = new FormData();
      formData.append("jns_surat", this.form.jns_surat);
      formData.append("status", this.form.status);
      formData.append("dokumen_pribadi", this.form.dokumen_pribadi[0]);
      formData.append("keterangan_rt", this.form.keterangan_rt[0]);
      this.$axios.$post(`/ktplama/${this.user.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Tambahkan tipe konten
        }
      }).then((response) => {
        console.log(response);
        this.$data.dialogBerhasil = true
      }).catch((error) => {
        console.log(this.form.status);
        console.log(error);
        this.$data.dialogErr = true
      });
    },
  },

  computed: {
      ...mapGetters("auth", {
        user: "user"
      })
    },
}
</script>
