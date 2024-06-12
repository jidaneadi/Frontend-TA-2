<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="12" class="d-flex justify-center align-center">
          <v-card max-width="800px" max-heigth="400px">
            <v-list-item two-line>
              <v-list-item-avatar tile size="100" color="white">
                <img src="img/logo3.png" class="print-img" style="max-width:200px; max-height: 100px;" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1 text-center">
                  <p class="mt-0 mb-0">Pemerintah Kabupaten Boyolali</p>
                  <p class="mt-0 mb-0">Kecamatan Cepogo</p>
                  <p class="mt-0 mb-0">Desa Sumbung</p>
                </v-list-item-title>
                <v-list-item-subtitle class="text-center">
                  <p class="mt-0 mb-0">Sekretariat: Dukuh Tegalarum RT.009 / RW.001</p>
                  <p class="mt-0 mb-0">Desa Sumbung Kecamatan Cepogo Kabupaten Boyolali</p>
                  <p class="mt-0 mb-0"> Provinsi Jawa Tengah Kode Pos 57362</p>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-card-title>
              <v-divider></v-divider>
              <hr>
              <v-divider></v-divider>
            </v-card-title>
            <v-card-text class="mb-0">
              Kode Desa : 09032004
            </v-card-text>
            <v-card-title class="mt-0 mb-0 justify-center">
              <span class="text-decoration-underline">Surat Pengantar</span>
            </v-card-title>
            <v-card-text>
              <div class="d-flex justify-center align-center mt-0 pt-0">
                <p class="text-subtitle-2  pt-0"> Nomor : </p>
                <v-col cols="3" sm="3" md="3" class="mt-0 pt-0">
                  <v-text-field class="mt-0 pt-0" placeholder="474/13/KTP/004/2022"></v-text-field>
                </v-col>
              </div>
              <p class="indented-text">Yang bertanda tangan di bawah ini kami Kepala Desa Sumbung, Kecamatan Cepogo,
                Kabupaten Boyolali, Provinsi
                Jawa Tengah, menerangkan bahwa:</p>
              <ol class="ma-3">
                <li class="flex-list"><span class="label">Nama</span> <span class="value text-uppercase">: {{ this.dataUser.nama }}</span>
                  <span class="value">LAKI-LAKI</span>
                </li>
                <li class="flex-list"><span class="label">Tempat/Tanggal Lahir</span> <span class="value text-uppercase">: {{this.dataUser.tempat_lahir}}/{{ this.dataUser.birthday }}</span></li>
                <li class="flex-list"><span class="label">Warganegara</span> <span class="value text-uppercase">: {{this.dataUser.warga_negara}}</span></li>
                <li class="flex-list"><span class="label">Agama</span> <span class="value text-uppercase">: {{this.dataUser.agama}}</span></li>
                <li class="flex-list"><span class="label">Pekerjaan</span> <span class="value text-uppercase">: {{this.dataUser.pekerjaan}}</span>
                </li>
                <li class="flex-list"><span class="label">Status Perkawinan</span> <span class="value text-uppercase">: {{ this.dataUser.status }}</span></li>
                <li class="flex-list"><span class="label">Tempat Tinggal</span> <span class="value text-uppercase">: {{ this.dataUser.alamat }}</span></li>
                <li class="flex-list">
                  <span class="label">Surat bukti diri</span>
                  <span class="value text-uppercase">: NIK. {{this.dataUser.nik}}, No. KK. {{this.dataUser.no_kk}}</span>
                </li>
                <li class="flex-list"><span class="label">Keperluan</span> <span class="value">: {{ keperluanSurat }}</span></li>
                <li class="flex-list"><span class="label">Berlaku</span> <span class="value">: {{ formattedStartDate }} s/d {{ formattedEndDate }}</span></li>
                <li class="flex-list"><span class="label">Keterangan lain</span> <span class="value">: {{ this.dataSurat.keterangan }}</span></li>
              </ol>
              <p class=""> Demikian Surat Keterangan ini dibuat untuk dipergunakan seperlunya.</p>
              <v-card-text class="mb-3 pb-3 mt-3">
                <p class="flex-list text-center">
                  <span class="label"></span>
                  <span class="value">No Reg :___________________</span>
                  <span class="value"></span>
                </p>
                <p class="flex-list text-center">
                  <span class="label"></span>
                  <span class="value">Tanggal :___________________</span>
                  <span class="value"></span>
                </p>
                <p class="flex-list text-center">
                  <span class="label">Pemohon</span>
                  <span class="value">Mengetahui</span>
                  <span class="value">Sumbung, {{ formattedCurrentDate }}</span>
                </p>
                <p class="flex-list text-center">
                  <span class="label"></span>
                  <span class="value">Camat Cepogo</span>
                  <span class="value">Kepala Desa Sumbung</span>
                </p>
              </v-card-text>
              <v-card-text class="mt-3 pt-3">
                <p class="flex-list text-center">
                  <span class="value text-uppercase">( {{this.dataUser.nama}} )</span>
                  <span class="value">( </span>
                  <span class="value"> )</span>
                  <span class="value text-uppercase">( SUTARTO )</span>
                </p>
              </v-card-text>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="print">Print</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  name: 'LetterComponent',
  middleware: ['authAdmin'],
  layout: 'surat',
  data(){
    return {
      dataUser:[],
      dataSurat:[],
      formattedCurrentDate: '',
      formattedStartDate: '',
      formattedEndDate: '',
    }
  },created() {
    this.initialize()
    this.initialize2()
    this.setDates()
  },

  methods: {
    initialize() {
      this.$axios.$get(`/profile/${this.$route.query.id}`)
        .then((response => {
          console.log(response)
          this.dataUser = response
          console.log(response)
        })).catch((error) => {
          console.log(error.response)
        })
    },
    initialize2() {
      this.$axios.$get(`/surat/show/${this.$route.query.id_surat}`)
        .then((response => {
          console.log(response)
          this.dataSurat = response
          console.log(response)
        })).catch((error) => {
          console.log(error.response)
        })
    },
    setDates() {
      const currentDate = new Date();
      const startDate = new Date(currentDate);
      const endDate = new Date(currentDate);
      endDate.setMonth(currentDate.getMonth() + 1);

      this.formattedCurrentDate = this.formatDate(currentDate);
      this.formattedStartDate = this.formatDate(startDate);
      this.formattedEndDate = this.formatDate(endDate);
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('id-ID', options);
    },
    print() {
      window.print()
    }
  },
  computed: {
    keperluanSurat() {
      switch (this.dataSurat.jns_surat) {
        case 'ktp_lama':
          return 'Pengantar Cetak Ulang KTP-E Karena Rusak';
        case 'ktp_baru':
          return 'Pengantar Cetak KTP-E Baru';
        default:
          return this.dataSurat.jns_surat;
      }
    }
  }
};
</script>
<style>
.flex-list {
  display: flex;
}

.label {
  width: 200px;
  /* Sesuaikan lebar sesuai kebutuhan */
  font-weight: bold;
}

.value {
  flex: 1;
}

.indented-text {
  /* padding-left: 2em; Sesuaikan ukuran indentasi sesuai kebutuhan */
  text-indent: 2em;
}

@media print {
  .print-img {
    display: block !important;
    width: auto !important;
    height: auto !important;
  }
}
</style>
