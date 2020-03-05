<template>
  <div :class="{charlaItem__selected: hasVoted}">
    <ConfirmTopicModal @upvoteModal="upVote" @closeModal="modalShowing = false" :showModal="modalShowing" :titulo="titulo" v-if="modalShowing"/>
    <div class="charlaIcon">
      <i
        v-if="!hasVoted"
        @click="confirmVote(charla)"
        class="far fa-heart fa-2x" :class="{charlaIcon__heart: !escogido}"
      ></i>
      <i v-else class="fas fa-heart fa-2x"></i>

      <div class="charlaIcon__votes">{{ charla.votos }} votos</div>
    </div>
    <div class="charlaImg">
      <div class="charlaImg__box">
        <img :src="charla.imgUrl" width="115" height="115" alt>
      </div>
    </div>
    <div class="charlaMeta">
      <span style="color: red" v-if="hasVoted">{{ msg.toUpperCase() }}</span>
      <div class="charlaMeta__title">{{ charla.titulo }}</div>
      <div class="charlaMeta__descripcion">{{ charla.descripcion }}</div>
      <div class="charlaMeta__author">{{ charla.usuario }} - {{ charla.fecha }}</div>
    </div>
  </div>

</template>

<script>

import ConfirmTopicModal from './ConfirmTopicModal'

export default {
  name: 'Charla',
  props: ['charla'],
  components: {
    ConfirmTopicModal
  },
  data () {
    return {
      modalShowing: false,
      titulo: this.charla.titulo,
      clave: '',
      msg: "Tema escogido:",
      usuario: this.$store.state.usuario
    }
  },
  computed: {
    // TODO: funcion para mostrar los que ya han votado
    votantes () {
      let nombres = ''
      let objs = this.charla.listaVotantes
      for (let key in objs) {
        let valor = objs[key]
        nombres = nombres + valor.nombre + ', '
      }
      
      return nombres
    },
    hasVoted () {
      return this.$store.state.charlaEscogida.charlaEscogida === this.titulo
    },
    escogido: function() {
      return this.$store.state.charlaEscogida.haVotado
    }
  },
  methods: {
    // Función para activar el modal
    confirmVote(elem) {
      this.modalShowing = this.escogido ? false : true
      this.clave = elem.id
    },
    // Guardar la elección en Vuex y firebase
    upVote () {
      this.modalShowing = false
      this.$store.dispatch('escogerCharla', this.clave)
      console.log(this.usuario + " You voted for " + this.titulo + " " + this.clave + ". Good job!")
      
    }
  }
}
</script>

<style>
  .charlaIcon__heart {
    cursor: pointer;
  }

  .charlaItem__selected {
    background: lightblue;
  }
</style>
