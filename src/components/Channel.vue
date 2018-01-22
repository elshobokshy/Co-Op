<template>
    <el-row :gutter="20">
      <el-col :span="5">
        <el-aside width="200px">
          <el-menu :default-openeds="['1']">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-menu"></i>Channels</template>
              <el-menu-item-group>
                    <el-menu-item 
                      index=""
                      v-for="channel in channels" 
                      @click="getChannel(channel._id)" 
                      v-bind:data="channel" 
                      v-bind:key="channel._id">
                        {{ channel.label }}
                      </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
      </el-col>

      <el-col :span="15">
        <el-container>

          <el-header style="text-align: right; font-size: 12px">
            <span>Welcome {{user.fullname}} </span>
            <el-dropdown>
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="home()">Homepage</el-dropdown-item>
                <el-dropdown-item @click.native="users()">List users</el-dropdown-item>
                <el-dropdown-item @click.native="profile()">Profile</el-dropdown-item>
                <el-dropdown-item @click.native="signout()">Logout</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-header>

          <el-main>
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="Channel" name="first">

                    <el-form>
                        <el-form-item label="Message">
                            <el-input @keyup.enter="addChannelPost" v-model="message.message" id="message" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addChannelPost">Send</el-button>
                        </el-form-item>
                    </el-form>
                    <div v-for="message in messages.slice().reverse()"> 

                        <el-form>
                            <el-form-item v-if="(editMode.id==message._id)">
                                <el-input v-model="editMsg.message" v-bind:id="message._id" clearable></el-input>
                                <div style="text-align: center;padding-top:10px;">
                                    <el-button type="primary" @click="saveMessage(message._id)" v-bind:id="message._id">save</el-button>
                                </div>
                            </el-form-item>
                            <el-form-item v-else :label="message.message">
                                <div style="text-align: right">
                                    <el-button type="primary" @click="editMessage(message._id)" v-bind:id="message._id">edit</el-button>
                                    <el-button type="danger" @click="deleteMessage(message._id)">delete</el-button>
                                </div>
                            </el-form-item>
                        </el-form>

                    </div>

                </el-tab-pane>
                <el-tab-pane label="Details" name="second">
                    <h1>This is channel : {{channelInfo.topic}}</h1>
                    Label : {{channelInfo.label}}
                </el-tab-pane>
                <el-tab-pane label="Edit" name="third">

                    <el-form>
                        <el-form-item label="Label">
                            <el-input @keyup.enter="editChannel" v-model="channel.label" id="label" clearable></el-input>
                        </el-form-item>
                        <el-form-item label="Topic">
                            <el-input @keyup.enter="editChannel" v-model="channel.topic" id="topic" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="editChannel">Update</el-button>
                        </el-form-item>
                    </el-form>

                    <el-alert v-if="created" title="Channel updated" type="success" center></el-alert>
                    <el-alert v-if="error" title="An error has occured, please try again. If it persists contact a sytem administrator." type="error" center></el-alert>

                    <div style="text-align: right">
                        <el-button type="danger" @click="del()" round>Delete channel</el-button>
                    </div>
                </el-tab-pane>
              </el-tabs>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
</template>

<script>
  import api from '../api'

  export default {
    name: 'Channel',
    data() {
      return {
        channel: {label: '', topic: ''},
        channelInfo: {},
        channels: {},
        messages: {},
        message: {message: ''},
        editMsg: {message: ''},
        editMode: {
            id: ''
        },
        user: {},
        activeName: 'first',
        created: false,
        error: false
      }
    },
    created() {
        api.get('/channels/' + this.$route.params.id).then((response) => {
            this.channelInfo = response.data
        })
        api.get('/channels/' + this.$route.params.id + '/posts').then((response) => {
            this.messages = response.data
            console.log(this.messages)
        })
        api.get('/channels').then((response) => {
            this.channels = response.data
        })
        api.get('/members/' + this.user._id + '/signedin').then((response) => {
            this.user = response.data
        })
        setInterval(function () {
            api.get('/channels/' + this.$route.params.id + '/posts').then((response) => {
                this.messages = response.data
            })
        }.bind(this), 5000); 
    },
    methods: {
      home() {
          this.$router.push({name: "home"})
      },
      editChannel() {
        return api.put('/channels/' + this.$route.params.id, this.channel).then(response => {
            api.get('/channels/' + this.$route.params.id).then((response) => {
                this.created = true
                this.channelInfo = response.data
                this.channel.label = ''
                this.channel.topic = ''
                api.get('/channels').then((response) => {
                    this.channels = response.data
                })
            })
            setInterval(function () {
                    this.created = false
                }.bind(this), 3000); 
            }).catch(error => {
                this.error = true
                setInterval(function () {
                    this.error = false
                }.bind(this), 3000); 
        })
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
        },
        signout() {
            this.$store.dispatch('auth/logout', this.user).then(response => {
                this.$router.push({name: "signin"})
            })
        },  
        profile () {
            this.$router.push({name: "profile"})
        },
        users() {
            this.$router.push({name: "users"})
        },
        getChannel(c) {
            this.$router.push({name: "channel", params : { id : c}})
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
  }
</script>
