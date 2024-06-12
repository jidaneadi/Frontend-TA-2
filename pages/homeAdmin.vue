<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <div class="pt-4 pb-2">
        <h3 class="text-subtitle font-weight-regular-blod">Welcome Back, Admin</h3>
      </div>
      <v-chip outlined color="grey">
        <v-icon color="grey">mdi-account</v-icon>
        Admin
      </v-chip>

      <!-- ===============Batas Card===================== -->
      <CardDataSuratComponents/>
      <!-- ===============Batas Card===================== -->

      <!-- ===============Batas Data User===================== -->
      <div class="d-flex justify-center mb-2 mt-2 pt-6">
        <p class="grey--text text-subtitle-1 font-weight-bold">Lihat Data User</p>
        <v-spacer />
        <v-btn color="white" class="teal--text" to="/dataUser" rounded>
          <v-icon icon color="teal">mdi-account-multiple-outline</v-icon>
        </v-btn>
      </div>
      <v-divider color="black"></v-divider>
    </v-col>
  </v-row>
</template>

<script>
import CardDataSuratComponents from '~/components/GlobalComponents/Card/CardDataSuratComponents.vue';

export default {
    middleware: ["authAdmin"],
    head() {
        return {
            title: "Home Admin"
        };
    },
    layout: "defaultAdmin",
    data() {
        return {
            items: [
                {
                    title: "Surat Diproses",
                    icon: "mdi-history",
                    bg: "yellow lighten-5",
                    color: "yellow darken-2",
                    image: "img/icon/diproses.svg",
                    to: "/diajukan",
                },
                {
                    title: "Surat Ditolak",
                    bg: "red lighten-5",
                    color: "red lighten-1",
                    icon: "mdi-cancel",
                    image: "img/icon/ditolak.svg",
                    to: "/tolak",
                },
                {
                    title: "Surat Terverifikasi",
                    icon: "mdi-checkbox-marked-circle-outline",
                    bg: "green lighten-5",
                    color: "green lighten-1",
                    image: "img/icon/terverifikasi.svg",
                    to: "/terverivikasi",
                },
                {
                    title: "Surat Diterbitkan",
                    bg: "indigo lighten-5",
                    color: "indigo lighten-1",
                    icon: "fa-solid fa-signature",
                    image: "img/icon/diterbitkan.svg",
                    to: "/terbit",
                },
            ],
        };
    },
    name: "IndexPage",
    components: { CardDataSuratComponents }
}
</script>
