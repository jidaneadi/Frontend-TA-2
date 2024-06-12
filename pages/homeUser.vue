<template>
  <v-row justify="center" align="center">
    <v-col class="py-1">
      <!-- <p>NIK: {{ $route.query.nik }}</p> -->
      <div class="pt-4 pb-2">
        <h3 class="text-subtitle font-weight-regular-bold">Welcome Back, {{ nama }}</h3>
      </div>
      <v-chip outlined color="grey">
        <v-icon color="grey">mdi-account</v-icon>
        Masyarakat
      </v-chip>

      <!-- ===============Batas Card===================== -->
      <CardDataSuratUserComponents/>
      <!-- ===============Batas Card===================== -->
      <!-- ===============Batas Card Jenis Layanan Surat===================== -->
      <CardLayananComponents />
      <!-- ===============Batas Card Jenis Layanan Surat===================== -->

    </v-col>
  </v-row>
</template>

<script>

import { mapState, mapGetters } from 'vuex';
import CardDataSuratUserComponents from '~/components/UserComponents/homeScreen/Card/CardDataSuratUserComponents.vue';
import CardLayananComponents from '~/components/UserComponents/homeScreen/Card/CardLayananComponents.vue';
export default {
  middleware: ["auth"],
  head() {
    return {
      title: "Home"
    };
  },
  data() {
    return {
      model: "",
      dataDiproses: "",
      dataTolak: "",
      diVerifikasi: "",
      diTerbitkan: "",
      layanan: [
        {
          title: "Pengantar KTP",
          icon: "fa-regular fa-id-card",
          to: "/pengajuanktp",
        },
        {
          title: "Pengantar KK",
          icon: "fa-solid fa-house-chimney-user",
          to: "/pengajuankk",
        },
        {
          title: "Keterangan Kematian",
          icon: "fa-solid fa-book-skull",
          to: "/pengajuankematian",
        },
        {
          title: "Keterangan Kelahiran",
          icon: "fa-solid fa-baby",
          to: "/pengajuankelahiran",
        },
        {
          title: "Keterangan Tidak Mampu",
          icon: "fa-solid fa-hand-holding-dollar",
          to: "/pengajuantidakmampu",
        },
      ],
    };
  },
  computed: {
    ...mapState("auth", ["nama"]),
    ...mapGetters("auth", {
      user: "user"
    })
  },
  mounted() {
    // console.log(this.user.role)
  },
  components: { CardLayananComponents, CardDataSuratUserComponents }
}
</script>
