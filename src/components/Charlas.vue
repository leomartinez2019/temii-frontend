<template>
  <div>
    <div class="charlasContainer">
      <Charla v-on:upvoted="blockVoting" class="charlaBox" v-for="(charla) in charlados"
        :charla="charla"
        :key="charla.id"
        :charlaSelected="charlaSelected"
        />
    </div>
  </div>
</template>

<script>

import Charla from './Charla.vue';

export default {
  name: 'Charlas',
  components: {
    Charla
  },
  computed: {
    charlados () {
      return this.$store.state.charlas
    }
  },
  created () {
    this.$store.dispatch('fetchCharlas')
  },
  methods: {
    addtopic () {
      console.log("getting data...")
    },
    blockVoting (elem) {
      if (this.readyToVote) return;
      if (confirm("Confirm vote?") === false) {
        return;
      }
      else {
        this.readyToVote = true;
        this.dbCharlas.child(elem.id).update(
          {votos: elem.votos + 1, upvoted: true})
        let charla = this.charlas.find(charla => charla.id === elem.id);
        charla.votos++;
        charla.upvoted = true;
        this.$emit('validarvote');
      }
    }
  },
  data() {
    return {
      currentUserId: null,
      dbCharlas: null,
      charlaSelected: null,
      upvoted: false,
      readyToVote: false,
      charlas: []
    }
  },

}
</script>

<style>
.charlasContainer {
  display: flex;
  flex-direction: column;
}

.charlaBox {
  margin: 5px;
  box-sizing: border-box;
  border-radius: 10px;
  width: 850px;
  height: 140px;
  display: flex;
}

.charlaBox:hover {
  border: 0.5px solid #00a7e1;
  /* cursor: pointer; */
}

.charlaIcon {
  width: 12%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.charlaIcon__votes {
  color: #a0bec8;
}

.charlaImg {
  width: 14%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.charlaImg__box {
  /* border-radius: 10px; */
  /* border: 0.5px solid #00a7e1; */
  height: 100px;
  width: 115px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.charlaMeta {
  margin-top: 34px;
  margin-left: 27px;
}

.charlaMeta__title {
  font-size: 20px;
}

.charlaMeta__author {
  font-size: 14px;
  color: #4d646d;
}

.fa-heart {
  color: #00a7e1;
}
</style>
