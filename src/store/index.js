import Vuex from 'vuex'

import Vue from 'vue'

import firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    charlas: [],
    usuario: null,
    isLoggedUser: false,
    charlaEscogida: null,
    charlaEscogidaID: null,
    haVotado: false
  },

  getters: {

  },

  actions: {
    fetchCharlas ({commit}) {
      const container = []
      const db = firebase.database()
      db.ref('charlas').on('child_added', snapshot => {
        container.push({...snapshot.val(), id: snapshot.key})
      })
      commit('setCharlas', container)
    },
    setUsuario ({commit}, usuario) {
      commit('setUsuario', usuario)
      const db = firebase.database()
      let refUsuario = db.ref('usuarios').child(usuario.split('.')[0])
      refUsuario.on('value', function(snapshot) {
        commit('setCharlaEscogida', snapshot.val())
      })
    },
    unSetUsuario ({commit}) {
      commit('unSetUsuario')
    },
    escogerCharla ({commit, state}, charlaID) {
      //commit('escogerCharla', charlaID)
      let indx = state.usuario.indexOf('.')
      let clave = state.usuario.slice(0, indx)
      //state.charlaEscogida = charlaID
      //state.charlas.map()
      let index = state.charlas.findIndex((elem) => elem.id === charlaID)
      //console.log('indice: ', index)
      commit('aumentarVoto', index)
      //state.charlas[index].votos++
      let votos = state.charlas[index].votos
      // Update firebase database:
      const db = firebase.database()
      db.ref('charlas').child(charlaID).update({votos: votos})
      db.ref('charlas').child(charlaID).child('listaVotantes').push({nombre: state.usuario})
      let objeto = {
        charlaEscogidaID: charlaID,
        charlaEscogida: state.charlas[index].titulo,
        haVotado: true
      }
      db.ref('usuarios').child(clave).update(objeto)
        .then(() => {
          commit('updateUser', objeto)
          // console.log(state.haVotado)
          // state.haVotado = true
          // state.charlaEscogida = state.charlas[index].titulo
          // state.charlaEscogidaID = charlaID
          // console.log(state.haVotado)
          // console.log(state.charlaEscogidaID)
        })
    }
  },

  mutations: {
    setCharlaEscogida (state, obj) {
      state.charlaEscogida = {...obj}
    },
    updateUser (state, obj) {
      state.haVotado = true
      state.charlaEscogida = {...obj}
      state.charlaEscogidaID = {...obj}
    },
    aumentarVoto (state, indx) {
      state.charlas[indx].votos++
    },
    confirmVote (state, titulo) {
      state.charlaEscogida = titulo
    },
    setCharlas (state, charlas) {
      state.charlas = charlas
    },
    setUsuario (state, usuario) {
      state.usuario = usuario
      state.isLoggedUser = true
    },
    unSetUsuario (state) {
      state.usuario = null,
      state.isLoggedUser = false
    },
    escogerCharla (state, charlaID) {
      let indx = state.usuario.indexOf('.')
      let clave = state.usuario.slice(0, indx)
      state.charlaEscogida = charlaID
      //state.charlas.map()
      let index = state.charlas.findIndex((elem) => elem.id === charlaID)
      //console.log('indice: ', index)
      state.charlas[index].votos++
      let votos = state.charlas[index].votos
      // Update firebase database:
      const db = firebase.database()
      db.ref('charlas').child(charlaID).update({votos: votos})
      let objeto = {
        charlaEscogidaID: charlaID,
        charlaEscogida: state.charlas[index].titulo,
        haVotado: true
      }
      db.ref('usuarios').child(clave).update(objeto)
        .then(() => {
          console.log(state.haVotado)
          state.haVotado = true
          state.charlaEscogida = state.charlas[index].titulo
          state.charlaEscogidaID = charlaID
          console.log(state.haVotado)
          console.log(state.charlaEscogidaID)
        })
    }
  }
})
