<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <v-alert border="left" color="#C08261" class="text-subtitle-3 font-weight-bold  white--text">
        Pengajuan Surat Pengantar KTP Lama
      </v-alert>
      <CardFormInputFile />
      <div class="pt-4">
        <v-card>
          <v-tabs background-color="grey lighten-4" center-active dark>
            <v-tab class="text-subtitle-2 black--text">
              About
            </v-tab>
          </v-tabs>
        </v-card>
      </div>
      <div class="pt-2">
        <v-expansion-panels>
          <v-expansion-panel v-for="(item, i) in abaout" :key="i">
            <v-expansion-panel-header border="left">
              {{ item.pertanyaan }}
            </v-expansion-panel-header>
            <v-expansion-panel-content class="text-justify">
              {{ item.jawaban }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <!-- =========Dialog============ -->
      <DialogPeringatanPengajuan />

    </v-col>
  </v-row>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
import DialogPeringatanPengajuan from '~/components/GlobalComponents/Dialog/DialogPeringatanPengajuan.vue';
import CardFormInputFile from '~/components/UserComponents/pengajuanKtpBaru/Card/CardFormInputFile.vue';

export default {
  middleware: ["auth"],
  head() {
    return {
      title: "KTP"
    };
  },
  data() {
    return {
      dialog2: false,
      valid: true,
      dialog2: false,
      valid: true,
      form: {
        // id_masyarakat:'',
        jns_surat: "",
        status: "",
        dokumen_pribadi: [],
        keterangan_rt: [],
      },
      abaout: [
        {
          color: "teal lighten-2",
          pertanyaan: "Apa saja persyaratan yang saya perlukan?",
          jawaban: "Persyaratan yang diperlukan untuk mengajukan permohonan penerbitan surat pengantar KTP adalah file scan KK berformat PDF"
        },
        {
          color: "deep-purple lighten-2",
          pertanyaan: "Data apa saja yang harus saya imputkan?",
          jawaban: "Data yang diinputkan merupakan data diri meliputi nama, alamat lengkap, status, jenis kelamin, agama, pekerjaan dan kewarganegaraan"
        },
        {
          color: "yellow lighten-2",
          pertanyaan: "Bagaimana cara agar saya dapat mengetahui surat yang saya ajukan sudah diterbitkan?",
          jawaban: "Anda dapat mengetahui status surat anda sudah dapat diambil atau tidak dengan masuk ke menu file dokumen. Pada menu tersebut terdapat sub menu diajukan yang berisi data surat anda yang sedang dalam proses pengajuan, sub menu terverifikasi  yang berisi data surat anda yang sudah di verifikasi sehingga anda hanya perlu menunggu surat tersebut diterbitkan, sub menu ditolak  yang berisi data surat anda yang sudah ditolak dikarenakan ada data yang kurang lengkap atau salah sehingga anda harus mengajukan kembali dan mengisi persyaratan dengan benar, sub diterbitkan  yang berisi data surat anda yang sudah diterbitkan, sehingga anda dapat datang ke Kantor Pemerintahan Desa Sumbung untuk mengambil surat tersebut, dan sub menu selesai  yang berisi data surat anda yang sudah anda ambil sebelumnya"
        },
      ],
    };
  },
  methods: {
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
      const formData = new FormData();
      this.form.dokumen_pribadi.forEach((file, index) => {
        formData.append(`dokumen_pribadi${index + 1}`, file);
        console.log(this.$data.form.dokumen_pribadi);
      });
      this.form.keterangan_rt.forEach((file, index) => {
        formData.append(`keterangan_rt${index + 1}`, file);
        console.log(this.$data.form.keterangan_rt);
      });
      // formData.append("dokumen_pribadi", this.form.dokumen_pribadi.values, this.form.dokumen_pribadi.values.name)
      // formData.append("keterangan_rt", this.form.keterangan_rt.values, this.form.keterangan_rt.values.name)
      formData.append("jns_surat", this.form.jns_surat);
      formData.append("status", this.form.status);
      this.$axios.$post(`/ktplama/${this.user.id}`, formData)
        .then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
    }
  },
  computed: {
    ...mapGetters("auth", {
      user: "user"
    })
  },
  components: { DialogPeringatanPengajuan, CardFormInputFile }
}
</script>
