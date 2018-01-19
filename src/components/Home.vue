<template>
    <div class="hello">
      <h1>Channels</h1>
      <div v-for="channel in channels"> 
          <button @click="getChannel(channel._id)">Channel {{ channel._id }}</button>
      </div>
      <br/>
      <div>
          <h4>New Channel: </h4>
          <form @submit.prevent="newChannel()">
              <div>
                  <label for="label">Label</label>
                  <input v-model="channel.label" id="label">
              </div>
              <div>
                  <label for="topic">Topic</label>
                  <input v-model="channel.topic" id="topic">
              </div>
              <div class="button">
                  <input type="submit" value="Go">
              </div>
          </form>
      </div>
      <br/>
      <br/>


      <button @click="signout()">Signout?</button>
      <button @click="profile()">profile??</button>
      <button @click="user()">users???</button>

    </div>
</template>

<script>
  import api from '../api'

  export default {
    name: 'Home',
    data() {
      return {
        channel: {label: '', topic: ''},
        channels: {}
      }
    },
    created() {
      api.get('/channels').then((response) => {
        this.channels = response.data
      })
    },
    methods: {
      signout() {
        this.$store.dispatch('auth/logout', this.user).then(response => {
          this.$router.push({name: "signin"})
        })
      },
      newChannel() {
        return api.post('/channels', this.channel).then(response => {
          this.channels.push(response.data)
        }).catch(error => {
            console.log("store > channels > new -> error")
          }
        )
      },
      profile () {
        this.$router.push({name: "profile"})
      },
      user() {
        this.$router.push({name: "newuser"})
      },
      getChannel(c) {
        this.$router.push({name: "channel", params : { id : c}})
      }
    }
  }
</script>
