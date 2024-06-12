<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6" class="py-12 my-12 ">
      <v-card class="mx-auto" max-width="500">
        <v-row>
          <v-col cols="6" justify="center">
            <v-img src="img/logo.png" height="55" width="175" class="mx-auto"></v-img>
          </v-col>
          <v-col cols="6" justify="center">
            <v-img src="img/logo2.png" height="54" width="132" class="mx-auto"></v-img>
          </v-col>
        </v-row>
        <!-- ===================Form Register====================== -->
        <v-card-title class="text-h6 font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
          <v-avatar color="primary lighten-2" class="subheading white--text" size="24" v-text="step"></v-avatar>
        </v-card-title>
        <v-window v-model="step">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field v-model="form.id" :rules="rules.id" label="Input NIK" hint="Contoh: 3207012345678912" required
                solo counter />
              <v-text-field v-model="form.email" :rules="rules.email" label="Input Email" hint="Contoh: example@gmail.com"
                required solo />
            </v-card-text>
          </v-window-item>
          <v-window-item :value="2">
            <v-card-text>
              <v-text-field v-model="form.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="rules.password" :type="show1 ? 'text' : 'password'" name="input-10-1" counter
                @click:append="show1 = !show1" hint="Minimal 8 karakter" label="Input Password" solo required />
              <v-text-field v-model="form.konf_pass" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="rules.konf_pass" :type="show2 ? 'text' : 'password'" name="input-10-1" counter
                @click:append="show2 = !show2" hint="Minimal 8 karakter" label="Input Confirm Password" solo required />
            </v-card-text>
          </v-window-item>
          <v-window-item :value="3">
            <v-card-text>
              <v-text-field v-model="form.no_kk" :rules="rules.no_kk" label="Input Nomor KK" required solo />
              <v-text-field v-model="form.nama" :rules="rules.nama" label="Input Nama" required solo />
              <v-text-field v-model="form.no_hp" :rules="rules.no_hp" label="Input No HP" required solo />
              <v-combobox v-model="form.gender" :rules:="rules.gender" label="Input Jenis Kelamin" solo required
                :items="gender" />
              <v-text-field v-model="form.tempat_lahir" :rules="rules.tempat_lahir" label="Input Tempat Lahir" required
                solo />
              <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition"
                offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field v-model="form.birthday" :rules="rules.birthday" label="Input Tanggal Lahir"
                    append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" solo></v-text-field>
                </template>
                <v-date-picker v-model="form.birthday" @input="menu = false"></v-date-picker>
              </v-menu>
              <v-combobox v-model="form.agama" :rules:="rules.agama" label="Input Agama" solo required :items="agama" />
              <v-text-field v-model="form.pekerjaan" :rules="rules.pekerjaan" label="Input Pekerjaan" required solo />
              <v-combobox v-model="form.status" :rules:="rules.status" label="Input Status Pernikahan" solo required
                :items="status" />
              <v-text-field v-model="form.alamat" :rules="rules.alamat" label="Input Alamat" required solo />
              <v-text-field v-model="form.warga_negara" :rules="rules.warga_negara" label="Input Kewarganegaraan" required
                solo />
              <span class="text-caption grey--text text--darken-1">
                Please enter a real personal profile for yout account
              </span>
            </v-card-text>
          </v-window-item>
        </v-window>
        <v-card-actions>
          <v-btn :disabled="step === 1" text @click="step--">
            Back
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="step === 3" color="primary" depressed @click="step++">
            Next
          </v-btn>
          <v-btn :disabled="step !== 3" color="success" @click="onSubmit">
            Register
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-actions justify="center">
          <p>Sudah punya akun?<v-btn to="/" text plain color="primary">Login</v-btn></p>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="dialog" persistent max-width="315">
        <v-card>
          <v-card-text align="center">
            <h2 class="pt-4 pb-2 black--text font-weight-bold">REGISTRASI GAGAL!!!</h2>
          </v-card-text>
          <v-card-text align="center"><v-btn class="mx-2" fab dark large color="red">
              <v-icon x-large dark>
                mdi-close
              </v-icon>
            </v-btn>
          </v-card-text>
          <v-card-text>{{ message }}. Cek kembali data yang anda inputkan dan pastikan data yang anda inputkan
            benar!!!</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="green darken-1" @click="dialog = false">
              Mengerti
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog2" persistent max-width="315">
        <v-card>
          <v-card-text align="center">
            <h2 class="pt-4 pb-2 black--text font-weight-bold">REGISTRASI GAGAL!!!</h2>
          </v-card-text>
          <v-card-text align="center"><v-btn class="mx-2" fab dark large color="red">
              <v-icon x-large dark>
                mdi-close
              </v-icon>
            </v-btn>
          </v-card-text>
          <v-card-text>NIK atau E-mail sudah digunakan user lain, inputkan NIK atau E-mail lainnya!. Atau hubungi petugas
            terkait!</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="green darken-1" @click="dialog2 = false">
              Mengerti
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog3" persistent max-width="290">
        <v-card>
          <v-card-text align="center">
            <h2 class="pt-4 pb-2 black--text font-weight-bold">Registrasi Berhasil</h2>
          </v-card-text>
          <v-card-text align="center"><v-btn class="mx-2" fab dark large color="green">
              <v-icon x-large dark>
                mdi-checkbox-marked-circle
              </v-icon>
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="green darken-1" class="white--text" to="/" @click="dialog3 = false">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-col>
  </v-row>
</template>
<script>
export default {
  layout: 'auth',
  head() {
    return {
      title: 'Register'
    }
  },
  middleware: ['unauth'],
  data() {
    return {
      // dataExist:false,
      menu: false,
      modal: false,
      message: '',
      dialog: false,
      dialog2: false,
      dialog3: false,
      show1: false,
      show2: false,
      step: 1,
      form: {
        id: '',
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
      gender: [
        'laki-laki',
        'perempuan',
      ],
      agama: [
        'islam',
        'kristen',
        'katholik',
        'budha',
        'hindu',
        'khonghucu',
      ],
      status: [
        'kawin',
        'belum kawin',
        'cerai hidup',
        'cerai mati'
      ],
      rules: {
        id: [
          v => !!v || 'NIK tidak boleh kosong',
          v => (v && v.length >= 15) || 'NIK minimal berjumlah 15 karakter berupa angka',
        ],
        email: [
          v => !!v || 'E-mail tidak boleh kosong',
          v => /.+@.+\..+/.test(v) || 'E-mail tidak valid',
        ],
        password: [
          v => !!v || 'Password tidak boleh kosong',
          v => (v && v.length >= 8) || 'Password berisi minimal 8 karakter',
        ],
        konf_pass: [
          v => !!v || 'Konfirmasi password tidak boleh kosong',
          v => (v && v.length >= 8) || 'Konfirmasi password berisi minimal 8 karakter',
          v => v === this.form.password || 'Konfirmasi password tidak sama dengan password'
        ],
        no_kk: [
          v => !!v || 'Nomor KK tidak boleh kosong',
          v => (v && v.length >= 15) || 'Nomor KK minimal berjumlah 15 karakter berupa angka',
        ],
        nama: [
          v => !!v || 'nama tidak boleh kosong'
        ],
        no_hp: [
          v => !!v || 'Nomor HP tidak boleh kosong'
        ],
        gender: [
          v => !!v || 'Jenis kelamin tidak boleh kosong'
        ],
        tempat_lahir: [
          v => !!v || 'Tempat lahir tidak boleh kosong'
        ],
        birthday: [
          v => !!v || 'Tanggal lahir tidak boleh kosong'
        ], no_hp: [
          v => !!v || 'Nomor HP tidak boleh kosong'
        ],
        agama: [
          v => !!v || 'Agama tidak boleh kosong'
        ],
        pekerjaan: [
          v => !!v || 'Pekerjaan tidak boleh kosong'
        ],
        status: [
          v => !!v || 'Status pernikahan tidak boleh kosong'
        ],
        alamat: [
          v => !!v || 'Alamat tidak boleh kosong'
        ],
        warga_negara: [
          v => !!v || 'Kewarganegaraan tidak boleh kosong'
        ],
      }
    }
  },

  methods: {
    onSubmit() {
      this.$axios.$post('/auth/register', this.form)
        .then((response) => {
          console.log(response)
          this.$data.dialog3 = true
        }).catch((err) => {
          console.log(err.response.data.msg)
          if (err.response.data.msg == "Nik sudah digunakan" || err.response.data.msg == "Email sudah digunakan") { this.message = "NIK atau E-mail sudah digunakan!" }
          this.$data.dialog = true
          if (err.response.data.msg == "Key: 'Masyarakat.No_hp' Error:Field validation for 'No_hp' failed on the 'numeric' tag") { this.message = "Nomor hp harus berupa angka" }
          if (err.response.data.msg == "Nik kosong" || err.response.data.msg == "E-mail kosong" || err.response.data.msg == "Password kosong" || err.response.data.msg == "Konfirmasi password kosong"
            || err.response.data.msg == "Nama kosong" || err.response.data.msg == "Nomor hp kosong" || err.response.data.msg == "Tempat lahir kosong" || err.response.data.msg == "Tanggal lahir kosong"
            || err.response.data.msg == "Nomor kk kosong" || err.response.data.msg == "Agama kosong" || err.response.data.msg == "Pekerjaan kosong" || err.response.data.msg == "Status kawin kosong"
            || err.response.data.msg == "Alamat kosong" || err.response.data.msg == "Warga negara kosong" || err.response.data.msg == "Password dan konfirmasi password tidak sama" || err.response.data.msg == "NIK atau E-mail sudah digunakan"
            || err.response.data.msg == "Password harus berjumlah minimal 8 karakter" || err.response.data.msg == "Konfirmasi password harus berjumlah minimal 8 karakter") { this.message = err.response.data.msg }

          if (err.response.data.msg_required == "Error 1406 (22001): Data too long for column 'nama' at row 1") { this.message = "nama data terlalu panjang" }
          if (err.response.data.msg_required == "Error 1406 (22001): Data too long for column 'tempat_lahir' at row 1") { this.message = "tempat lahir data terlalu panjang" }
          if (err.response.data.msg_required == "Error 1292 (22007): Incorrect date value: '' for column 'birthday' at row 1") { this.message = "tanggal lahir terdapat kesalahan" }

          if (err.response.data.msg_validate == "Key: 'User.Email' Error:Field validation for 'Email' failed on the 'email' tag") { this.message = "email salah, contoh email yang benar example@gmail.com" }
          if (err.response.data.msg_validate == "Key: 'User.ID' Error:Field validation for 'ID' failed on the 'min' tag") { this.message = "nik harus memiliki minimal 15 karakter" }
          if (err.response.data.msg_validate == "Key: 'User.ID' Error:Field validation for 'ID' failed on the 'numeric' tag") { this.message = "NIK harus berupa angka" }
          if (err.response.data.msg_validate == "Key: 'User.Password' Error:Field validation for 'Password' failed on the 'min' tag") { this.message = "password minimal berjumlah 8 karakter" }
          if (err.response.data.msg_validate == "Key: 'User.Konf_pass' Error:Field validation for 'Konf_pass' failed on the 'min' tag") { this.message = "konfirmasi password minimal berjumlah 8 karakter" }
        })
    },
  },

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1: return 'Sign-up'
        case 2: return 'Create a password'
        default: return 'Create personal profile'
      }
    },
  },
}
</script>
