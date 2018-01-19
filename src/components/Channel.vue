<template>
    <div class="hello">
      <h1>Channel {{channelInfo.topic}}</h1>
      Topic : {{channelInfo.label}}
      <br/>
      <div>
          <h1>Edit channel :</h1>
          <form @submit.prevent="editChannel()">
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

          <br/><br/>

          <h1>Channel posts :</h1>
          <div v-for="message in messages"> 
              <div>
                <p v-if="(editMode.id==message._id)"><input type="text" v-bind:id="message._id" v-model="editMsg.message"/></p> 
                <p v-else>Message : {{message.message}}</p> 
              </div>
              <div>
                <button @click="deleteMessage(message._id)">delete</button>

                <button v-if="(editMode.id==message._id)" @click="saveMessage(message._id)" v-bind:id="message._id">save</button>
                <button v-else @click="editMessage(message._id)" v-bind:id="message._id">edit</button>
                
              </div>
            <!-- <br/> {{message}} -->
          </div>

          <br/><br/>

          <h1>Add channel post :</h1>
          <form @submit.prevent="addChannelPost()">
              <div>
                  <label for="message">message</label>
                  <input v-model="message.message" id="message">
              </div>
              <div class="button">
                  <input type="submit" value="Go">
              </div>
          </form>

      </div>
      <br/>
      <br/>

      <button @click="del()">Delete channel</button> <br/>
      <button @click="home()">Home</button> <br/>

    </div>
</template>

<script>
  import api from '../api'

  export default {
    name: 'Channel',
    data() {
      return {
        channel: {label: '', topic: ''},
        channelInfo: {},
        messages: {},
        message: {message: ''},
        editMsg: {message: ''},
        editMode: {
            id: ''
        }
      }
    },
    created() {
        api.get('/channels/' + this.$route.params.id).then((response) => {
            this.channelInfo = response.data
        })
        api.get('/channels/' + this.$route.params.id + '/posts').then((response) => {
            this.messages = response.data
        })
    },
    methods: {
      home() {
          this.$router.push({name: "home"})
      },
      editChannel() {
        return api.put('/channels/' + this.$route.params.id, this.channel).then(response => {
            api.get('/channels/' + this.$route.params.id).then((response) => {
                this.channelInfo = response.data
                this.channel.label = ''
                this.channel.topic = ''
            })
        }).catch(error => {
            console.log("store > channel > edit -> error")
          }
        )
      },
      del() {
          api.delete('/channels/' + this.$route.params.id).then(response => {
                this.$router.push({name: "home"})
            }).catch(error => {
            console.log("error deleting account")
          })
      },
      addChannelPost() {
          return api.post('/channels/' + this.$route.params.id + '/posts', this.message).then(response => {
              api.get('/channels/' + this.$route.params.id + '/posts').then((response) => {
                this.messages = response.data
                this.message.message = ''
              })
        }).catch(error => {
            console.log("store > channels > addpost -> error")
          }
        )
      },
      deleteMessage(id) {
          api.delete('/channels/' + this.$route.params.id + '/posts/' + id).then(response => {
                api.get('/channels/' + this.$route.params.id + '/posts').then((response) => {
                    this.messages = response.data
                })
            }).catch(error => {
            console.log("error deleting message")
          })
      },
      editMessage(id) {
          this.editMode.id = id
      },
      saveMessage(id) {
          this.editMode.value = false
          api.put('/channels/' + this.$route.params.id + '/posts/' + id, this.editMsg).then(response => {
                api.get('/channels/' + this.$route.params.id + '/posts').then((response) => {
                    this.messages = response.data
                    this.editMode.id = ''
                    this.editMsg.message = ''
                })
            }).catch(error => {
            console.log("error editing message")
          })
      }
    }
  }
</script>
