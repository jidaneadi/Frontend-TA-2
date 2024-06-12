<template>
  <v-row justify="center" align="center">
    <v-col class="py-4">
      <v-alert border="left" color="#C08261" class="text-subtitle-3 font-weight-bold  white--text">
        My Profile
      </v-alert>
      <div class="pt-3">
        <v-card>
          <div class="pa-2">
            <v-alert color="grey lighten-4" class="text-subtitle-2 text-center font-weight-bold  black--text">
              Edit Profile
            </v-alert>
          </div>
          <v-form ref="form" lazy-validation class="px-1 pb-3 pt-0 mx-auto">
            <v-container class="">
              <v-row no-gutters align="center" class="py-2">
                <!-- Jika sudah masuk api sepertinya harus menggunakan v-model -->
                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="3" lg="3" md="3">Nomor Induk
                  Kependudukan <strong class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="9" lg="9" md="9">
                  <v-text-field v-model="form.nik" :counter="20" :rules="nikRules" label="Input nomor induk kependudukan"
                    required solo readonly>
                  </v-text-field>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="3" lg="3" md="3">Nomor Kartu
                  Keluarga<strong class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="9" lg="9" md="9">
                  <v-text-field v-model="form.no_kk" :counter="20" :rules="noKkRules" label="Input nomor kartu keluarga"
                    required solo readonly>
                  </v-text-field>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="3" lg="3" md="3">Email <strong
                    class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="9" lg="9" md="9">
                  <v-text-field v-model="form.email" :rules="emailRules" label="Input email" solo required
                    clear-icon="mdi-close-circle" clearable>
                  </v-text-field>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="3" lg="3" md="3">Nama Lengkap <strong
                    class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="9" lg="9" md="9">
                  <v-text-field v-model="form.nama" :counter="50" :rules="nameRules" label="Input nama lengkap" solo
                    required clear-icon="mdi-close-circle" clearable>
                  </v-text-field>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="3" lg="3" md="3">Jenis Kelamin <strong
                    class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="3" lg="3" md="3">
                  <v-select v-model="form.gender" :items="jenisKelamin" :rules="jkRules" label="Input jenis kelamin" solo
                    required>
                  </v-select>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="2" lg="2" md="2">Agama <strong
                    class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="4" lg="4" md="4">
                  <v-select v-model="form.agama" :items="dataAgama" :rules="agamaRules" label="Input agama" solo required>
                  </v-select>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="3" lg="3" md="3">Tempat Lahir <strong
                    class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="3" lg="3" md="3">
                  <v-text-field v-model="form.tempat_lahir" :counter="100" :rules="tmptRules" label="Input tempat lahir"
                    solo append-icon="mdi-map-marker" required clear-icon="mdi-close-circle" clearable>
                  </v-text-field>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="2" lg="2" md="2">Tanggal Lahir <strong
                    class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="4" lg="4" md="4">
                  <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                    offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="form.birthday" label="Input tanggal lahir" append-icon="mdi-calendar"
                        v-bind="attrs" v-on="on" solo required>
                      </v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
                  </v-menu>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="3" lg="3" md="3">Status Perkawinan
                  <strong class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="3" lg="3" md="3">
                  <v-select v-model="form.status" :items="dataStatus" :rules="statusRules" label="Input status perkawinan"
                    solo required>
                  </v-select>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="2" lg="2" md="2">No HP <strong
                    class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="4" lg="4" md="4">
                  <v-text-field v-model="form.no_hp" :counter="20" :rules="noRules" label="Input nomor handphone" solo
                    required clear-icon="mdi-close-circle" clearable>
                  </v-text-field>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="3" lg="3" md="3">Pekerjaan <strong
                    class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="3" lg="3" md="3">
                  <v-text-field v-model="form.pekerjaan" :rules="pekerjaanRules" label="Input pekerjaan saat ini" solo
                    required>
                  </v-text-field>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="2" lg="2" md="2">Kewarganegaraan
                  <strong class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="4" lg="4" md="4">
                  <v-text-field v-model="form.warga_negara" :counter="20" :rules="wargaNegaraRules"
                    label="Input asal negara" solo required clear-icon="mdi-close-circle" clearable>
                  </v-text-field>
                </v-col>

                <v-col class="d-flex flex-wrap text-subtitle-2 px-2" cols="12" xl="3" lg="3" md="3">Alamat Rumah <strong
                    class="red--text">*</strong> </v-col>
                <v-col cols="12" xl="9" lg="9" md="9">
                  <v-text-field v-model="form.alamat" :counter="100" :rules="alamatRules" label="Input alamat" solo
                    append-icon="mdi-map-marker" required clear-icon="mdi-close-circle" clearable>
                  </v-text-field>
                </v-col>
                <v-btn color="success" @click="dialog2 = true" block>
                  Kirim
                </v-btn>
              </v-row>
            </v-container>
          </v-form>
        </v-card>
      </div>

      <!-- =========Dialog============ -->
      <v-dialog v-model="dialog" persistent max-width="315">
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
            <v-spacer></v-spacer>
            <v-btn text color="green darken-1" @click="dialog = false">
              Mengerti
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- =========Dialog============ -->

      <!-- =========Dialog2============ -->
      <v-dialog v-model="dialog2" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h5">
            Apakah data diri yang anda inputkan sudah benar?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="updateProfile">
              Ya
            </v-btn>
            <v-btn color="red darken-1" text @click="dialog2 = false">
              Tidak
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- =========Dialog2============ -->

    </v-col>
  </v-row>
</template>
<script>

import { mapGetters, mapState } from 'vuex'
export default {
  middleware: ['auth'],
  head() {
    return {
      title: 'My Profile'
    }
  },

  data() {
    return {
      dialog: false,
      dialog2: false,
      disabled: true,
      isEditing: false,
      isEditing2: false,
      isEditing3: false,
      isEditing4: false,
      isEditing5: false,
      isEditing6: false,
      isEditing7: false,
      isEditing8: false,
      error: false,
      icon: '',
      judul: '',
      color: '',
      action: '',
      message: '',

      form: {
        nik: '',
        email: '',
        password: '',
        konf_pass: '',
        no_kk: '',
        nama: '',
        no_hp: '',
        gender: '',
        tempat_lahir: '',
        birthday: '',
        agama: '',
        pekerjaan: '',
        status: '',
        alamat: '',
        warga_negara: ''
      },
      nameRules: [
        v => !!v || 'Name masih k osong',
        v => (v && v.length <= 50) || 'Nama harus kurang dari 50 karakter',
      ],
      nikRules: [
        v => !!v || 'NIK masih kosong',
        v => (v && v.length >= 15) || 'NIK minimal berjumlah 15 karakter berupa angka',
      ],
      noKkRules: [
        v => !!v || 'NIK masih kosong',
        v => (v && v.length >= 15) || 'NIK minimal berjumlah 15 karakter berupa angka',
      ],
      jkRules: [
        v => !!v || 'Jenis kelamin masih kosong',
      ],
      alamatRules: [
        v => !!v || 'Alamat masih kosong',
        v => (v && v.length <= 100) || 'Alamat harus kurang dari 100 karakter',
      ],
      jenisKelamin: ['laki-laki', 'perempuan'],
      dataAgama: [
        'islam',
        'kristen',
        'katholik',
        'budha',
        'hindu',
        'khonghucu',
      ],
      dataStatus: [
        'kawin',
        'belum kawin',
        'cerai hidup',
        'cerai mati'
      ],
      noRules: [
        v => !!v || 'No HP masih kosong',
        v => (v && v.length <= 20) || 'No HP melebihi 20 karakter',
      ],
      tmptRules: [
        v => !!v || 'Tempat lahir masih kosong',
      ],
      tglRules: [
        v => !!v || 'Tanggal lahir masih kosong',
      ],
      agamaRules: [
        v => !!v || 'Agama tidak boleh kosong'
      ],
      pekerjaanRules: [
        v => !!v || 'Pekerjaan tidak boleh kosong'
      ],
      statusRules: [
        v => !!v || 'Status pernikahan tidak boleh kosong'
      ],
      wargaNegaraRules: [
        v => !!v || 'Kewarganegaraan tidak boleh kosong'
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'Masukkan email yang valid',
      ],
      newemailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'Masukkan email yang valid',
        // v => newEmail==oldEmail || 'Email tidak boleh sama',
      ],
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
    }
  },
  created() {
    this.initialize()

  },
  methods: {
    initialize() {
      this.$axios.$get(`/profile/${this.user.id}`)
        .then((response => {
          this.$data.form = response
          console.log(response)
        })).catch((error) => {
          console.log(error)
        })
    },

    updateProfile() {
      this.$axios.$put(`/profile/${this.form.nik}`, this.form)
        .then((response => {
          if (response.msg === 'Profile berhasil di update') {
            this.$data.dialog2 = false
            this.$data.dialog = true
            this.$data.color = 'green darken-1'
            this.$data.message = response.msg
            this.$data.icon = 'mdi-checkbox-marked-circle'
            this.$data.judul = 'Update Profile Berhasil'
          }
        })).catch((error) => {
          this.$data.dialog2 = false
          this.$data.dialog = true
          this.$data.color = 'red darken-1'
          this.$data.icon = 'mdi-cancel'
          this.$data.judul = 'Gagal Update Profile!!!'
          if (error.response.data.msg == "Nik sudah digunakan" || error.response.data.msg == "Email sudah digunakan") { this.message = "NIK atau E-mail sudah digunakan!" }
          if (error.response.data.msg == "Key: 'Masyarakat.No_hp' Error:Field validation for 'No_hp' failed on the 'numeric' tag") { this.message = "Nomor hp harus berupa angka" }
          if (error.response.data.msg == "Nik kosong" || error.response.data.msg == "E-mail kosong" || error.response.data.msg == "Password kosong" || error.response.data.msg == "Konfirmasi password kosong"
            || error.response.data.msg == "Nama kosong" || error.response.data.msg == "Nomor hp kosong" || error.response.data.msg == "Tempat lahir kosong" || error.response.data.msg == "Tanggal lahir kosong"
            || error.response.data.msg == "Nomor kk kosong" || error.response.data.msg == "Agama kosong" || error.response.data.msg == "Pekerjaan kosong" || error.response.data.msg == "Status kawin kosong"
            || error.response.data.msg == "Alamat kosong" || error.response.data.msg == "Warga negara kosong" || error.response.data.msg == "Password dan konfirmasi password tidak sama" || error.response.data.msg == "NIK atau E-mail sudah digunakan"
          ) { this.message = error.response.data.msg }
          if (error.response.data.msg_required == "Error 1406 (22001): Data too long for column 'nama' at row 1") { this.message = "nama data terlalu panjang" }
          if (error.response.data.msg_required == "Error 1406 (22001): Data too long for column 'tempat_lahir' at row 1") { this.message = "tempat lahir data terlalu panjang" }
          if (error.response.data.msg_required == "Error 1292 (22007): Incorrect date value: '' for column 'birthday' at row 1") { this.message = "tanggal lahir terdapat kesalahan" }
          if (error.response.data.msg_validate == "Key: 'User.Email' Error:Field validation for 'Email' failed on the 'email' tag") { this.message = "email salah, contoh email yang benar example@gmail.com" }
          if (error.response.data.msg_validate == "Key: 'User.ID' Error:Field validation for 'ID' failed on the 'min' tag") { this.message = "nik harus memiliki minimal 15 karakter" }
          if (error.response.data.msg_validate == "Key: 'User.ID' Error:Field validation for 'ID' failed on the 'numeric' tag") { this.message = "NIK harus berupa angka" }
          if (error.response.data.msg_validate == "Key: 'User.Password' Error:Field validation for 'Password' failed on the 'min' tag") { this.message = "password minimal berjumlah 8 karakter" }
          if (error.response.data.msg_validate == "Key: 'User.Konf_pass' Error:Field validation for 'Konf_pass' failed on the 'min' tag") { this.message = "konfirmasi password minimal berjumlah 8 karakter" }
        })
    }
  },

  computed: {
    ...mapGetters('auth', {
      user: 'user'
    })
  },
}
</script>
