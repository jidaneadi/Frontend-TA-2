<template>
  <v-app dark>
    <!-- Drawer -->
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" fixed app dark color="#9A3B3B">
      <v-list nav dense>
        <div class="d-flex justify-center align-start pt-2 pb-2 px-6">
          <v-img class="pa-1" height="80px" width="55px" src="img/logo3.png"></v-img>
          <p class="align-start justify-start text-start white--text font-weight-black"><span
              class="amber--text darken-1">Pengajuan Surat</span><v-spacer></v-spacer>Desa Sumbung</p>
        </div>
        <v-divider color="#F5F5F5" class="mb-3"></v-divider>
        <v-list-item color="white" to="/homeAdmin">
          <v-list-item-icon>
            <v-icon color="white">mdi-home-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text">Home</v-list-item-title>
        </v-list-item>
        <v-list-item color="white" to="/dataUser">
          <v-list-item-icon>
            <v-icon color="white">mdi-account-multiple-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="white--text">Data User</v-list-item-title>
        </v-list-item>

        <!-- Grup 2 -->
        <v-list-group color="white" :value="false">
          <template v-slot:activator>
            <v-list-item-icon>
              <v-icon color="white">mdi-folder-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Data Surat</v-list-item-title>
          </template>
          <v-list-item color="white" v-for="(item, i) in dokumen" :key="i" :to="item.to" router exact>
            <v-list-item-action>
              <v-icon color="white">{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <!-- ====================Drawer=================== -->

    <!-- Navbar -->
    <v-main>
      <div class="d-flex justify-center">
        <v-app-bar-nav-icon :clipped-left="clipped" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer />
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="#C08261" icon v-bind="attrs" v-on="on">
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
          </template>
          <v-list nav dense>
            <v-list-item>
              <v-list-item-avatar>
                <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  Petugas Administrator
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-icon x-small>fa-solid fa-user-tie</v-icon>
                  Admin
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list-item text @click="dialog = true">
              <v-list-item-icon>
                <v-icon>mdi-lock-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="grey--text lighten-2">Reset Password</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- ================Logout================= -->
            <div class="pa-2">
              <v-btn color="red darken-1" text @click="dialog2 = true" block>
                <v-icon class="mx-2">mdi-export</v-icon>
                Logout
              </v-btn>
            </div>
          </v-list>
        </v-menu>
      </div>


      <!-- =================Pages================== -->
      <div class="px-8 pt-2">
        <Nuxt />
      </div>
    </v-main>
    <!-- =================Navbar====================== -->

    <!-- ===========footer============== -->
    <v-footer dark color="#E2C799" padless>
      <v-col class="text-center" cols="12">
        <v-btn v-for="(icon, i) in social" :key="i" :href="icon.to" class="mx-4" dark icon>
          <v-icon size="24px">
            {{ icon.logo }}
          </v-icon>
        </v-btn>
        <v-divider></v-divider>
        <div>{{ new Date().getFullYear() }} — <strong> jidanear </strong></div>
      </v-col>
    </v-footer>

    <!-- Dialog 1 -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Reset Password</span>
          <v-spacer />
          <v-icon color="red draken-1" icon @click="dialog = false">mdi-close</v-icon>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field v-model="form.old_pass" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="rules.old_pass" :type="show1 ? 'text' : 'password'" name="input-10-1" counter
                    @click:append="show1 = !show1" hint="Minimal 8 karakter" label="Old password*" required />
                </v-col>
                <v-col cols="12">
                  <v-text-field v-model="form.new_pass" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="rules.new_pass" :type="show2 ? 'text' : 'password'" name="input-10-1" counter
                    @click:append="show2 = !show2" hint="Minimal 8 karakter" label="New password*" required />
                </v-col>
                <v-col cols="12"><v-text-field v-model="form.konf_pass" :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="rules.konf_pass" :type="show3 ? 'text' : 'password'" name="input-10-1" counter
                    @click:append="show3 = !show3" hint="Minimal 8 karakter" label="Confirm password*" required />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color=" green darken-1" text @click="updatePassword">
            Save
          </v-btn>
          <v-btn color="red darken-1" text @click="clear">
            Clear
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Dialog 2 -->
    <v-dialog v-model="dialog2" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          Log Out
        </v-card-title>
        <v-card-text>Apakah anda yakin untuk keluar dari akun ini?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="onLogout">
            Ya
          </v-btn>
          <v-btn color="red darken-1" text @click="dialog2 = false">
            Tidak
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Batas Dialog 2 -->

    <v-dialog v-model="dialog3" persistent max-width="315">
      <v-card>
        <v-card-text align="center">
          <h2 class="pt-4 pb-2 black--text font-weight-bold">{{ judul }}</h2>
        </v-card-text>
        <v-card-text align="center"><v-btn class="mx-2" fab dark large :color="color">
            <v-icon x-large dark>
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text class="text-center">{{ message }}</v-card-text>
        <v-card-actions>
          <v-btn block :color="color" class="white--text" @click="dialog3 = false">
            Mengerti
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import * as Cookies from 'js-cookie'
import { mapGetters, mapState } from 'vuex'
export default {
  name: "DefaultLayout",
  data() {
    return {
      drawer: false,
      clipped: false,
      fixed: true,
      dialog: false,
      dialog2: false,
      dialog3: false,
      message: "",
      icon: "",
      judul: "",
      color: "",
      show1: false,
      show2: false,
      show3: false,
      form: {
        new_pass: "",
        old_pass: "",
        konf_pass: "",
      },
      rules: {
        old_pass: [
          v => !!v || "Password tidak boleh kosong",
          v => (v && v.length >= 8) || "Password berisi minimal 8 karakter",
        ],
        new_pass: [
          v => !!v || "Password tidak boleh kosong",
          v => (v && v.length >= 8) || "Password berisi minimal 8 karakter",
        ],
        konf_pass: [
          v => !!v || "Konfirmasi password tidak boleh kosong",
          v => (v && v.length >= 8) || "Konfirmasi password berisi minimal 8 karakter",
          v => v === this.form.new_pass || "Konfirmasi password tidak sama dengan password"
        ],
      },
      social: [
        {
          logo: "mdi-facebook",
          to: "https://www.facebook.com/jidaneadi.jidaneadi"
        },
        {
          logo: "mdi-twitter",
          to: "https://twitter.com/jidanear"
        },
        {
          logo: "mdi-instagram",
          to: "https://instagram.com/jidanear_"
        },
        {
          logo: "mdi-linkedin",
          to: "https://www.linkedin.com/in/jidane-adi-ramadhzan-130712216"
        },
        {
          logo: "mdi-github",
          to: "https://github.com/jidaneadi"
        },
      ],
      dokumen: [
        {
          title: "Diajukan",
          to: "/adminDiajukan",
        },
        {
          title: "Ditolak",
          to: "/adminTolak",
        },
        {
          title: "Terverifikasi",
          to: "/adminVerifikasi",
        },
        {
          title: "Diterbitkan",
          to: "/adminTerbit",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Desa Sumbung",
    };
  },
  methods: {
    onLogout() {
      Cookies.remove("token");
      window.location.href = "/";
    },
    updatePassword() {
      this.$axios.$put(`profile/password/${this.user.id}`, this.form)
        .then((response) => {
          if (response.msg === "Password berhasil diubah") {
            this.$data.icon = "mdi-checkbox-marked-circle";
            this.$data.judul = "Update password berhasil";
            this.$data.color = "green darken-1";
            this.$data.message = response.msg;
            this.$data.dialog = false;
            this.$data.dialog3 = true;
            this.$refs.form.reset();
          }
        }).catch((error) => {
          console.log(error.response);
          console.log(error.response);
          if (error.response.data.msg === "Old password tidak boleh kosong" || error.response.data.msg === "New password tidak boleh kosong" || error.response.data.msg === "Konfirmasi password tidak boleh kosong" || error.response.data.msg == "Password harus berjumlah minimal 8 karakter" || error.response.data.msg === "Password tidak sesuai" || error.response.msg === "Password lama tidak sesuai") {
            this.$data.icon = "mdi-cancel";
            this.$data.judul = "Update password gagal!!!";
            this.$data.color = "red darken-1";
            this.$data.message = error.response.data.msg;
            this.$data.dialog3 = true;
          }
        });
    },
    clear() {
      this.$refs.form.reset();
    }
  },
  computed: {
    ...mapGetters("auth", {
      user: "user"
    }),
  },
  mounted() {
    // console.log(this.user.id)
  },
}
</script>
