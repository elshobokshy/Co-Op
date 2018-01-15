<template>
  <div class="hello">
    <button @click="signout()">Signout?</button>
    <button @click="profile()">profile??</button>
    <button @click="user()">users???</button>
  </div>
</template>

<script>

import api from '../api'
export default {
  name: 'Home',
  methods: {
      signout() {
          this.$store.dispatch('auth/logout', this.user).then(response => {
              this.$router.push({name: "signin"})
          })
      },
      profile () {
        this.$router.push({name: "profile"})
      },
      user() {
        this.$router.push({name: "newuser"})
      }
  }
}
</script>
