<template>
  <div class="profile">
      Id : {{user._id}} <br/>
      Name : {{user.fullname}} <br/>
      Email : {{user.email}} <br/>
    <button @click="del()">Delete account</button> <br/>
    <button @click="home()">Home</button> <br/>

  </div>
</template>

<script>

import api from '../api'
export default {
  name: 'Home',
  data () {
    return {
      user: {}
    }
  },
  created () {
    api.get('/members/' + this.user._id + '/signedin').then((response) => {
      this.user = response.data
    })
  },
  methods: {
      home() {
          this.$router.push({name: "home"})
      },
      del() {
          api.delete('/members/' + this.user._id).then(response => {
                this.$store.dispatch('auth/delete', this.user).then(response => {
                    this.$router.push({name: "signin"})
                })
            }).catch(error => {
            console.log("error deleting account")
        })
      }
  }
}
</script>
