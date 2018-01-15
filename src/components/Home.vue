<template>
  <div class="hello">
    <h1>{{msg}}</h1>
    <button @click="signout()">Signout?</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Homepage !!!!!!!'
    }
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
