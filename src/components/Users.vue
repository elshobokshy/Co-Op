<template>
  <div class="newuser">
      <h1>List of users</h1>
        <div v-for="user in users"> 
            Id : {{ user._id }} | 
            Name : {{ user.fullname }} | 
            Email : {{ user.email }} <br/>
        </div>
    <button @click="home()">Home</button> <br/>
  </div>
</template>

<script>

import api from '../api'
export default {
  name: 'Home',
  data () {
    return {
      users: {}
    }
  },
  created () {
    api.get('/members').then((response) => {
      this.users = response.data
    })
  },
  methods: {
      home() {
          this.$router.push({name: "home"})
      }
  }
}
</script>
