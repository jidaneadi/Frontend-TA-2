import jwtDecode from 'jwt-decode'

export const state = () => ({
  acces_token: null,
  refresh_token: null,
  nama: null,
  role:null,
})

export const getters = {

  authitencated(state) {
    if (state.acces_token) {
      const cek = jwtDecode(state.acces_token)
      if (cek.role == 'masyarakat') {
        return true
      }
      return false
    }
    return false
  },
  authitencatedAdmin(state) {
    if (state.acces_token) {
      const cek = jwtDecode(state.acces_token)
      // console.log(cek)
      if (cek.role == 'admin') {
        return true
      }
      return false
    }
    return false
  },
  user: (state) => {
    if (state.acces_token) {
      return jwtDecode(state.acces_token)
    }
    return nil
  },
}

export const mutations = {
  setNama(state, nama) {
    state.nama = nama
  },
  setAccesToken(state, acces_token) {
    state.acces_token = acces_token
  },
  setRefreshToken(state, refresh_token) {
    state.refresh_token = refresh_token
  },
}
export const actions = {
  async login({ commit }, payload) {
    const response = await this.$axios.$post(
      '/auth/login',
      payload
    )
    console.log(response)
    if (!response) {
      return false
    }
    commit('setAccesToken', response.acces_token)
    commit('setRefreshToken', response.refresh_token)
    commit('setNama', response.nama)

    return response
  },
}
