<template>
  <div>

    <div v-if="authUser">
      <h3>Signed as {{ authUser.email }}</h3>
      <button @click="signOut">Sign Out</button>
    </div>

    <div v-else>
      <div class="sign-log-container">
        <p @click="showing = true, registering = false" class="signin-signup">Log in</p>
        <p @click="registering = true, showing = true" class="signin-signup">Sign up</p>
      </div>
      <div v-if="showing" class="modal" :class="{estilizado: showing}">
        <div class="modal-content">
          <span class="close" @click="showing = false,error = '',email = '',password = ''">&times;</span>

          <form v-if="registering" @submit.prevent="register">
            <h2>Sign up</h2>
            <p v-if="error" style="color: red">Error: {{ error }}</p>
            <input type="email" v-model="email" placeholder="Type email">
            <input type="password" v-model="password" placeholder="Type password">
            <button>Sign up</button>
          </form>

          <form v-else @submit.prevent="signIn">
            <h2>Log in</h2>
            <p v-if="error" style="color: red">Error: {{ error }}</p>
            <input type="email" v-model="email" placeholder="Type email">
            <input type="password" v-model="password" placeholder="Type password">
            <button>Log in</button>
          </form>

      </div>

    </div>
    </div>

  </div>

</template>

<script>

import firebase from 'firebase'

export default {
  name: 'Formulario',
  data () {
    return {
      registering: false,
      showing: false,
      email: '',
      password: '',
      authUser: null,
      error: ''
    }
  },
  methods: {
    saveUserToDb () {
      let indx = this.email.indexOf('.')
      let clave = this.email.slice(0, indx)
      let usuario = {
        correo: this.email,
        haVotado: false,
        charlaEscogida: "",
        charlaEscogidaID: ""
      }
      const db = firebase.database();
      const ref = db.ref('usuarios')
      let users = ref.child(clave)
      users.set(usuario)
    },
    register () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.saveUserToDb();
        this.$store.dispatch('setUsuario', this.email)
        this.registering = false
        this.showing = false
      }).catch((error) => {this.error = error.message})
    },
    signOut () {
      firebase.auth().signOut()
        .then(() => {
          this.$store.dispatch('unSetUsuario')
          this.authUser = null
        })
    },
    signIn () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$store.dispatch('setUsuario', this.email)
          this.showing = false
        }).catch((error) => {this.error = error.message})
      console.log(this.email)
    }
  },
  created () {
    // TODO: enlazar aquí con el store, actualizar usuario 
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authUser = user
        this.$store.dispatch('setUsuario', user.email)
      }
    })
  }
}
</script>

<style>

.sign-log-container {
  display: flex;
}

.signin-signup {
  cursor: pointer;
  margin: 0 1em;
}

.modal {
    box-sizing: border-box;
    border: 1px solid blue;
    width: 50%;
    margin: 20px auto;
  }

  .estilizado {
    background: lightblue;
    border-radius: 5px;
    display: block;
    left: 0;
    top: 0;
    padding: 20px;
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: 1;
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  .modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
  }

  .close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
</style>
