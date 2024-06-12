<template>
  <!-- ===============Batas Card===================== -->
  <div class="px-0 mx-0">
    <v-row no-gutters>
      <v-col class="d-flex justify-space-around flex-wrap mx-auto my-2">
        <v-col cols="12" xl="3" lg="3" md="3" sm="6" >
          <v-card class="mx-auto" width="300px" height="100px" to="/diajukan">
            <v-system-bar color="yellow darken-2" height="20px">
              <div class="text-subtitle-2 font-weight-bold white--text text-center">
                Surat Diproses
              </div>
              <v-spacer />
              <div>
                <v-icon dark small color="white">
                  mdi-history
                </v-icon>
              </div>
            </v-system-bar>
            <div class="text-subtitle-1 font-weight-bold text-center">
              <v-row no-gutters>
                <v-col cols="7" class="d-flex justify-center align-center">
                  <v-card color="yellow lighten-5" width="110px" height="60px">
                    <v-card-title class="text-subtitle-2 justify-center">
                      {{ dataDiproses }}
                    </v-card-title>
                  </v-card>
                </v-col>
                <v-col cols="5" class="justify-center">
                  <v-img height="75px" class="" width="100px" src="img/icon/diproses.svg"> </v-img>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="6" class="mx-auto">
          <v-card class="mx-auto" width="300px" height="100px" to="/tolak">
            <v-system-bar color="red lighten-1" height="20px">
              <div class="text-subtitle-2 font-weight-bold white--text text-center">
                Surat Ditolak
              </div>
              <v-spacer />
              <div>
                <v-icon dark small color="white">
                  mdi-cancel
                </v-icon>
              </div>
            </v-system-bar>
            <div class="text-subtitle-1 font-weight-bold text-center">
              <v-row no-gutters>
                <v-col cols="7" class="d-flex justify-center align-center mx-auto">
                  <v-card color="red lighten-5" width="110px" height="60px">
                    <v-card-title class="text-subtitle-2 justify-center">
                      {{ dataTolak }}
                    </v-card-title>
                  </v-card>
                </v-col>
                <v-col cols="5" class="justify-center">
                  <v-img height="75px" class="" width="100px" src="img/icon/ditolak.svg"> </v-img>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="6" class="mx-auto">
          <v-card class="mx-auto" width="300px" height="100px" three-line to="/terverivikasi">
            <v-system-bar color="green lighten-1" height="20px">
              <div class="text-subtitle-2 font-weight-bold white--text text-center">
                Surat Terverifikasi
              </div>
              <v-spacer />
              <div>
                <v-icon dark small color="white">
                  mdi-checkbox-marked-circle-outline
                </v-icon>
              </div>
            </v-system-bar>
            <div class="text-subtitle-1 font-weight-bold text-center">
              <v-row no-gutters>
                <v-col cols="7" class="d-flex justify-center align-center mx-auto">
                  <v-card color="green lighten-5" width="110px" height="60px">
                    <v-card-title class="text-subtitle-2 justify-center">
                      {{ diVerifikasi }}
                    </v-card-title>
                  </v-card>
                </v-col>
                <v-col cols="5" class="justify-center">
                  <v-img height="75px" class="" width="100px" src="img/icon/terverifikasi.svg"> </v-img>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" xl="3" lg="3" md="3" sm="6" class="mx-auto">
          <v-card class="mx-auto" width="300px" height="100px" three-line to="/terbit">
            <v-system-bar color="indigo lighten-1" height="20px">
              <div class="text-subtitle-2 font-weight-bold white--text text-center">
                Surat Diterbitkan
              </div>
              <v-spacer />
              <div>
                <v-icon dark small color="white">
                  fa-solid fa-signature
                </v-icon>
              </div>
            </v-system-bar>
            <div class="text-subtitle-1 font-weight-bold text-center">
              <v-row no-gutters>
                <v-col cols="7" class="d-flex justify-center align-center mx-auto">
                  <v-card color="indigo lighten-5" width="110px" height="60px">
                    <v-card-title class="text-subtitle-2 justify-center">
                      {{ diTerbitkan }}
                    </v-card-title>
                  </v-card>
                </v-col>
                <v-col cols="5" class="justify-center">
                  <v-img height="75px" class="" width="100px" src="img/icon/diterbitkan.svg"> </v-img>
                </v-col>
              </v-row>
            </div>
          </v-card>
        </v-col>
      </v-col>
    </v-row>
  </div>
  <!-- ===============Batas Card===================== -->
</template>
<script>

import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      dataDiproses: '',
      dataTolak: '',
      diVerifikasi: '',
      diTerbitkan: '',
    }
  },
  created() {
    this.diproses()
    this.ditolak()
    this.diverifikasi()
    this.diterbitkan()
  },
  methods: {
    diproses() {
      this.$axios.get('/surat/')
        .then((response => {
          const filteredData = response.data.filter(item => item.status === "diproses");
          this.$data.dataDiproses = filteredData.length

        })).catch((error) => {
          console.log(error.response)
        })
    },
    ditolak() {
      this.$axios.get('/surat/')
        .then((response => {
          const filteredData = response.data.filter(item => item.status === "ditolak");
          this.$data.dataTolak = filteredData.length

        })).catch((error) => {
          console.log(error.response)
        })
    },
    diverifikasi() {
      this.$axios.get('/surat/')
        .then((response => {
          const filteredData = response.data.filter(item => item.status === "terverifikasi");
          this.$data.diVerifikasi = filteredData.length

        })).catch((error) => {
          console.log(error.response)
        })
    },
    diterbitkan() {
      this.$axios.get('/surat/')
        .then((response => {
          const filteredData = response.data.filter(item => item.status === "diterbitkan" || item.status === "diambil");
          this.$data.diTerbitkan = filteredData.length

        })).catch((error) => {
          console.log(error.response)
        })
    },
  },
  computed: {
    ...mapGetters('auth', {
      user: 'user'
    })
  },
}
</script>
