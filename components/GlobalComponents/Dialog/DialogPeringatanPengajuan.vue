<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-card>
      <v-card-text>
        <h2 class="pt-4 pb-2 black--text font-weight-bold text-center ">PERHATIAN !!!!</h2>
        <v-divider color="black"></v-divider>
      </v-card-text>
      <v-card-text class="text-justify">Layanan ini hanya melayani pengajuan penerbitan surat pengantar. Surat yang
        sudah diajukan dapat diambil apabila status surat sudah dinyatakan diterbitkan atau sudah berada pada tabel
        penerbitan di halaman diterbitkan dan anda harus datang ke Kantor Desa Sumbung untuk mengambil surat yang
        sudah diterbitkan. </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">
          Mengerti
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      model: '',
      dialog: true,
    }
  }
}
</script>
