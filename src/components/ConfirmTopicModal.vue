<template>
  <div>
    <div v-if="showModal" class="modal" :class="{estilizado: showing}">
      <div class="modal-content">
        <span class="close" @click="$emit('closeModal')">&times;</span>
        <h2>Charla escogida: {{ titulo }}</h2>
        <p>Please confirm vote</p>
        <button @click="$emit('closeModal')">Cancel</button>
        <button @click="$emit('upvoteModal')">Confirm</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props : ['titulo', 'showModal'],
    data () {
      return {
        showing: true,
        msg: "Showing modal"
      }
    },
    methods: {
      toggleShowing () {
        this.showing = !this.showing
      }
    }
  }
</script>


<style>
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
