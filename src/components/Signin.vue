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

        <h1>Create new user</h1>
        <form @submit.prevent="newuser()">
            <div>
                <label for="fullname">Full name</label>
                <input v-model="createuser.fullname">
            </div>
            <div>
                <label for="email">Email</label>
                <input v-model="createuser.email">
            </div>
            <div>
                <label for="password">Password</label> 
                <input v-model="createuser.password" id="password">
            </div>
            <div class="button">
                <input type="submit" value="Go">
            </div>
        </form>
        <p v-if="created">Account created</p>
    </div>
</template>

<script>
import api from '../api'
export default {
  data () {
    return {
      user: {email: '', password:''},
      createuser: {fullname: '', email: '', password:''},
      created: false
    }
  },
  methods: {
      signin() {
          this.$store.dispatch('auth/login', this.user).then(response => {
              this.$router.push({name: "home"})
          })
      },
      newuser() {
        api.post('/members', this.createuser).then(response => {
                this.created = true,
                this.createuser = {fullname: '', email: '', password:''}
            }).catch(error => {
            console.log("can not create account")
        })
      },
  }
}
</script>