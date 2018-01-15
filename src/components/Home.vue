<template>
  <div class="hello">
    {{channels}}
    <button @click="signout()">Signout?</button>
  </div>
</template>

<script>

import api from '../api'
export default {
  name: 'Home',
  data () {
    return {
      channels: []
    }
  },
  created () {
    api.get('/channels').then((response) => {
      this.channels = response.data
    })
  },
  methods: {
      signout() {
          this.$store.dispatch('auth/logout', this.user).then(response => {
              this.$router.push({name: "signin"})
          })
      }
  }
}
</script>
