<template >
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
        <v-row>
          <v-col class="px-10">
            <v-card-title class="text-h5 font-weight-regular justify-center black--text">
              <span>Sign In!</span>
            </v-card-title>
            <v-alert v-if="isErr" border="left" type="error" dense>
              {{ message }}
              <!-- <strong>Email</strong> or <strong>password</strong> failed -->
            </v-alert>
            <v-alert v-if="isTrue" border="left" type="success" dense>
              Berhasil Login
            </v-alert>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field v-model="form.email" :rules="emailRules" label="E-mail" hint="Contoh: example@gmail.com"
                required solo @click="isErr = false"></v-text-field>
              <v-text-field v-model="form.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passwordRules" :type="show1 ? 'text' : 'password'" name="input-10-1"
                @click:append="show1 = !show1" hint="Minimal 8 karakter" label="Password" solo required
                @click="isErr = false" />
              <v-btn :disabled="!valid" color="success" class="mr-4" @click="onSubmit">
                Login
              </v-btn>
              <v-btn color="error" class="mr-4" @click="reset">
                Reset
              </v-btn>
              <p class="pt-4">Belom Punya akun?<v-btn to="/register" text plain color="primary">Register</v-btn></p>
            </v-form>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import jwtDecode from 'jwt-decode'
import { mapGetters } from 'vuex'
export default {
  middleware:['unauth'],
  layout: 'auth',
  head() {
    return {
      title: 'Login'
    }
  },

  data() {
    return {
      message: '',
      isErr: false,
      isTrue : false,
      show1: false,
      id: '',
      valid: true,
      form: {
        email: '',
        password: '',
      },
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 8) || 'Password berisi minimal 8 karakter',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail tidak valid',
      ],
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    onSubmit() {
      this.$store.dispatch('auth/login', this.form)
        .then((data) => {
          this.isErr = false
          this.isTrue = true
            console.log(data.role)
          if (data.role == "admin") {
            window.location.href = '/homeadmin'
          } else if (data.role == "masyarakat") {
            window.location.href = '/homeuser'
          }
        }).catch((err) => {
          this.isErr = true
          if (err.response.data.msg == 'Email not found' || err.response.data.msg == 'Password Failed' ) { this.message = "E-mail tidak ditemukan atau password salah!"}
          if (err.response.data.msg == 'Email required') {this.message = "E-mail tidak boleh kosong"}
          if(err.response.data.msg == 'Password required') {this.message = "Password tidak boleh kosong"}
        });
    },
  },

  computed: {
    currentTitle() {
      switch (this.step) {
        case 1: return 'Sign In!'
      }
    },
    // ...mapGetters('auth', {
    //   user : 'user'
    // })

  },
  // mounted (){
  //   console.log()
  //  if(this.user.role == "admin"){
  //   window.location.href = '/homeadmin'
  //           this.$router.push('/homeadmin')
  //  }else if(this.user.role == "user"){

  //   window.location.href = '/homeuser'
  //           this.$router.push('/homeuser')
  //  }
  // },
  name: 'Login',
}
</script>

<style></style>
