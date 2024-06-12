<template>
  <div>
    <div class="pt-8 darken-1 text-center text-subtitle font-weight-black">
      Jenis Layanan Surat
    </div>
    <div>
      <v-sheet class="mx-auto" max-width="1500" color="#F7F7F7">
        <v-slide-group v-model="model" class="py-4 px-0" center-active show-arrows>
          <v-slide-item v-for="(n, i) in layanan" :key="i" v-slot="{ active, toggle }">
            <v-card class="ma-4" width="250" height="150" hover @click="toggle">
              <v-list-item>
                <v-list-item-action class="mx-auto">
                  <v-icon dark x-large color="#C08261">
                    {{ n.icon }}
                  </v-icon>
                </v-list-item-action>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <div class="text-subtitle-1 font-weight-bold text-center">
                    {{ n.title }}
                  </div>
                </v-list-item-content>
              </v-list-item>
              <v-fade-transition>
                <v-overlay v-if="active" absolute color="#F2ECBE">
                  <v-btn color="#C08261" :to="n.to">Ajukan surat</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      model:"",
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
}
</script>
