<template>
    <div>
        <h1>Signin</h1>
        <form @submit.prevent="signin()">
            <div>
                <label for="email">Email</label>
                <input v-model="user.email">
            </div>
            <div>
                <label for="password">Password</label> 
                <input v-model="user.password" id="password">
            </div>
            <div class="button">
                <input type="submit" value="Go">
            </div>
        </form>
    </div>
</template>

<script>
import api from '../api'
export default {
  data () {
    return {
      user: {email: '', password:''}
    }
  },
  methods: {
      signin() {
          this.$store.dispatch('auth/login', this.user).then(response => {
              this.$router.push({name: "home"})
          })
      }
  }
}
</script>