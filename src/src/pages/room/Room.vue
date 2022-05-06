<template>
  <div>
    <div class="w-100 user-chat">
      <div class="card">
        <div class="p-4 border-bottom">
          <div class="row">
            <div class="col-md-4 col-9">
              <h5 class="font-size-15 mb-1">{{ username }}</h5>
              <p class="text-muted mb-0">
                <i class="mdi mdi-circle text-success align-middle me-1"></i>
                    채팅방: {{ $route.query.label }}
              </p>
            </div>
            <div class="col-md-8 col-3">
              <ul class="list-inline user-chat-nav text-end mb-0">
                <li class="list-inline-item d-none d-sm-inline-block">
                  <b-dropdown
                    menu-class="dropdown-menu-md dropdown-menu-end"
                    variant="white"
                    right
                    toggle-class="nav-btn"
                  >
                    <template v-slot:button-content>
                      <i class="bx bx-search-alt-2"></i>
                    </template>
                    <form class="p-3">
                      <div class="form-group m-0">
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Search ..."
                            aria-label="Recipient's username"
                          />
                          <div class="input-group-append">
                            <button class="btn btn-primary" type="submit">
                              <i class="mdi mdi-magnify"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </b-dropdown>
                </li>
                <li class="list-inline-item d-none d-sm-inline-block">
                  <b-dropdown
                    toggle-class="nav-btn"
                    menu-class="dropdown-menu-end"
                    right
                    variant="white"
                  >
                    <template v-slot:button-content>
                      <i class="bx bx-cog"></i>
                    </template>
                    <b-dropdown-item>View Profile</b-dropdown-item>
                    <b-dropdown-item>Clear chat</b-dropdown-item>
                    <b-dropdown-item>Muted</b-dropdown-item>
                    <b-dropdown-item>Delete</b-dropdown-item>
                  </b-dropdown>
                </li>

                <li class="list-inline-item">
                  <b-dropdown
                    toggle-class="nav-btn"
                    menu-class="dropdown-menu-end"
                    right
                    variant="white"
                  >
                    <template v-slot:button-content>
                      <i class="bx bx-dots-horizontal-rounded"></i>
                    </template>
                    <b-dropdown-item>Action</b-dropdown-item>
                    <b-dropdown-item>Another action</b-dropdown-item>
                    <b-dropdown-item>Something else</b-dropdown-item>
                  </b-dropdown>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="chat-users">
          <div class="chat-conversation p-3">
            <simplebar
              style="max-height: 470px"
              id="containerElement"
              ref="current"
            >
              <ul class="list-unstyled">
                <li>
                  <div class="chat-day-title">
                    <span class="title">Today</span>
                  </div>
                </li>
                <li
                  v-for="data of messages"
                  :key="data.message"
                  :class="{ right: `${data.writer}` === `${username}` }"
                >
                  <div class="conversation-list">
                    <b-dropdown
                      variant="white"
                      menu-class="dropdown-menu-end"
                    >
                      <template v-slot:button-content>
                        <i class="bx bx-dots-vertical-rounded"></i>
                      </template>
                      <b-dropdown-item>Copy</b-dropdown-item>
                      <b-dropdown-item>Save</b-dropdown-item>
                      <b-dropdown-item>Forward</b-dropdown-item>
                      <b-dropdown-item>Delete</b-dropdown-item>
                    </b-dropdown>
                    <div class="ctext-wrap">
                      <div class="conversation-name">{{ username }}</div>
                      <p>{{ data.message }}</p>
<!--                      <p>{{ data.align }}</p>-->
                      <p class="chat-time mb-0">
                        <i class="bx bx-time-five align-middle me-1"></i>
                                                  {{ data.time }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </simplebar>
          </div>
          <div class="p-3 chat-input-section">
            <div class="row">
              <div class="col">
                <input
                      type="text"
                      v-model="newMessage"
                      class="form-control chat-input"
                      placeholder="Enter Message..."
                      :class="{
                        'is-invalid': submitted && $v.form.message.$error,
                      }"
                    />
              </div>
              <div class="col-auto">
                <button
                  @click="send"
                  class="btn btn-primary btn-rounded chat-send w-md"
                >
                  <span
                    class="d-none d-sm-inline-block me-2">
                    <i class="reply icon"></i>
                    보내기
                  </span>
                  <i class="mdi mdi-send"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReconnectingWebsocket from 'reconnectingwebsocket';
import Haikunator from 'haikunator';
import moment from 'moment';

var STORAGE_KEY = "channels-example";
var haikunator = new Haikunator();

var Storage = {
  fetch: function () {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  },
  save: function (data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }
};


export default {
  data() {
    return {
      chatsock: null,
      messages: [],
      handle: '',
      newMessage: "",
      form: {
        message: '',
      },
      username: 'Junshock5',
    }
  },

  watch: {
    handle(name) {
      Storage.save({name: name})
    }
  },

  methods: {
    send() {
      var message = {
        handle: this.handle,
        message: this.newMessage,
        writer: this.username
      }
      this.chatsock.send(JSON.stringify(message));
      this.newMessage = "";
    },

    randomName() {
      var random = haikunator.haikunate({tokenLength: 0});

      this.handle = random.split('-').map(function (n) {
        return n[0].toUpperCase() + n.substr(1);
      }).join(' ');
    },

    whoami() {
      var data = Storage.fetch()

      if (data.name) {
        this.handle = data.name
      } else {
        this.randomName()
      }
    },

    timeFormat(time) {
      return moment(moment.utc(time, 'lll')._d).format('lll')
    },

    isNew(message) {
      var ms = moment.utc().diff(moment.utc(message.timestamp, 'lll'))
      if (ms / 1000 < 60) {
        return true
      }
      return false
    }
  },

  mounted() {
    var url = "api/message/?limit=50&label=" + this.$route.query.label
    this.$http.get(url).then((response) => {
      this.messages = response.body
    })
    // Chat WebSocket
    var vm = this
    this.chatsock = new ReconnectingWebsocket(window.wsRoot + '/chat' + '/' + this.$route.query.label);

    this.chatsock.onmessage = function (message) {
      var data = JSON.parse(message.data);
      vm.messages.push(data);
      debugger;
    };

    this.whoami()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: bold;
  font-size: 5em;
}

.mobile {
  visibility: hidden !important;
}

.mobile.divider {
  margin: 0 !important;
}

.new {
  background-color: rgba(230, 224, 208, 0.29) !important;
}

@media only screen and (max-width: 767px) {
  h1, h2 {
    font-weight: bold;
    font-size: 2em;
  }

  #messagelist {
    border: 0;
    box-shadow: 0px 0px 0px 0px;
    padding: 0;
    margin: -1em;
    margin-top: 1em;
  }

  #messagelist .list {
    margin-top: 0;
  }

  .mobile {
    visibility: visible !important;
  }

  #inputhandle {
    border: 0;
    box-shadow: 0px 0px 0px 0px;
    padding: 0;
    margin: -1em;
    margin-top: 1em;
    margin-top: 30px;
  }

  .nopadding {
    padding: 0 !important;
  }

  .new {
    background-color: rgba(230, 224, 208, 0.29) !important;
  }

  * {
    border-radius: 0 !important;
  }
}
</style>
