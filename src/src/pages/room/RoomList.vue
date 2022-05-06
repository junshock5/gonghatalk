<template>
  <div>
  <Layout>
    <PageHeader :title="title" :items="items"/>
    <div class="">
      <div class="chat-leftsidebar me-lg-4">
        <div class>
          <div class="py-4 border-bottom">
            <div class="media">
              <div class="align-self-center me-3">
              </div>
              <div class="media-body">
                <h5 class="font-size-15 mt-0 mb-1">이름</h5>
                <p class="text-muted mb-0">
                  <i class="mdi mdi-circle text-success align-middle me-1"></i>
                  활성
                </p>
              </div>
              <b-dropdown
                menu-class="dropdown-menu-end"
                class="chat-noti-dropdown active"
                right
                variant="white"
              >
                <template v-slot:button-content>
                  <i class="bx bx-bell bx-tada"></i>
                </template>
                <b-dropdown-item>Action</b-dropdown-item>
                <b-dropdown-item>Another action</b-dropdown-item>
                <b-dropdown-item>Something else here</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>
        </div>

        <div class="search-box chat-search-box py-4">
          <div class="position-relative">
            <input type="text" class="form-control" placeholder="검색..."/>
            <i class="bx bx-search-alt search-icon"></i>
          </div>
        </div>

        <div class="chat-leftsidebar-nav">
          <b-tabs pills fill content-class="py-4">
            <b-tab title="Tab 1" active>
              <template v-slot:title>
                <i class="bx bx-chat font-size-20 d-sm-none"></i>
                <span class="d-none d-sm-block">채팅방</span>
              </template>
              <b-card-text>
                <div>
                  <simplebar style="max-height: 410px" id="chat-list">
                    <ul class="list-unstyled chat-list">
                      <div class="item" v-for="room in rooms" :key="room.id" style="padding: 0 1em;">
                        <div class="ui stackable grid">
                          <div class="two wide column nomobile">
                            <h3 class="ui header">{{ room.id }}</h3>
                          </div>
                          <div class="ten wide column">
                            <span class="onlymobile">
                                <i style="width: 20px; margin-right: 0;" class="black minus icon"></i><i
                              style="width: 20px;margin-left: -10px;" class="black minus icon"></i>
                                <router-link :to="{ name: 'room', query: { label: room.label }}">
                                    <span style="display: inline-block; color: #000;">{{ room.label }}</span>
                                </router-link>
                            </span>
                            <span class="nomobile">
                                <span style="display: inline-block; color: #000;">{{ room.label }}</span>
                            </span>
                          </div>
                          <div class="four wide column nomobile">
                            <router-link :to="{ name: 'Room', query: { label: room.label }}">
                              <h5 style="float: right;" class="ui green header">입장</h5>
                            </router-link>
                          </div>
                        </div>
                        <div class="ui divider" style="margin-left: -1em; margin-right: -1em;"></div>
                      </div>
                    </ul>
                  </simplebar>
                </div>
              </b-card-text>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <i class="bx bx-group font-size-20 d-sm-none"></i>
                <span class="d-none d-sm-block"  @click="createRoom" >방만들기</span>
              </template>
              <b-card-text>
                <h5 class="font-size-14 mb-3">Groups</h5>
                <ul class="list-unstyled chat-list">
                  <li>
                    <a href="#">
                      <div class="media align-items-center">
                        <div class="avatar-xs me-3">
                          <span
                            class="avatar-title rounded-circle bg-soft bg-primary text-primary"
                          >G</span
                          >
                        </div>

                        <div class="media-body">
                          <h5 class="font-size-14 mb-0">General</h5>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <div class="media align-items-center">
                        <div class="avatar-xs me-3">
                          <span
                            class="avatar-title rounded-circle bg-soft bg-primary text-primary"
                          >R</span
                          >
                        </div>

                        <div class="media-body">
                          <h5 class="font-size-14 mb-0">Reporting</h5>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <div class="media align-items-center">
                        <div class="avatar-xs me-3">
                          <span
                            class="avatar-title rounded-circle bg-soft bg-primary text-primary"
                          >M</span
                          >
                        </div>

                        <div class="media-body">
                          <h5 class="font-size-14 mb-0">Meeting</h5>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <div class="media align-items-center">
                        <div class="avatar-xs me-3">
                          <span
                            class="avatar-title rounded-circle bg-soft bg-primary text-primary"
                          >A</span
                          >
                        </div>

                        <div class="media-body">
                          <h5 class="font-size-14 mb-0">Project A</h5>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li>
                    <a href="#">
                      <div class="media align-items-center">
                        <div class="avatar-xs me-3">
                          <span
                            class="avatar-title rounded-circle bg-soft bg-primary text-primary"
                          >B</span
                          >
                        </div>

                        <div class="media-body">
                          <h5 class="font-size-14 mb-0">Project B</h5>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </b-card-text>
            </b-tab>
            <b-tab>
              <template v-slot:title>
                <i class="bx bx-book-content font-size-20 d-sm-none"></i>
                <span class="d-none d-sm-block">즐겨찾기</span>
              </template>
              <b-card-text>
                <h5 class="font-size-14 mb-3">Contacts</h5>
                <simplebar style="height: 410px">
                  <div>
                    <div class="avatar-xs mb-3">
                      <span
                        class="avatar-title rounded-circle bg-soft bg-primary text-primary"
                      >A</span
                      >
                    </div>

                    <ul class="list-unstyled chat-list">
                      <li>
                        <a href="#">
                          <h5 class="font-size-14 mb-0">Adam Miller</h5>
                        </a>
                      </li>

                      <li>
                        <a href="#">
                          <h5 class="font-size-14 mb-0">Alfonso Fisher</h5>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div class="mt-4">
                    <div class="avatar-xs mb-3">
                      <span
                        class="avatar-title rounded-circle bg-soft bg-primary text-primary"
                      >B</span
                      >
                    </div>

                    <ul class="list-unstyled chat-list">
                      <li>
                        <a href="#">
                          <h5 class="font-size-14 mb-0">Bonnie Harney</h5>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div class="mt-4">
                    <div class="avatar-xs mb-3">
                      <span
                        class="avatar-title rounded-circle bg-soft bg-primary text-primary"
                      >C</span
                      >
                    </div>

                    <ul class="list-unstyled chat-list">
                      <li>
                        <a href="#">
                          <h5 class="font-size-14 mb-0">Charles Brown</h5>
                        </a>
                        <a href="#">
                          <h5 class="font-size-14 mb-0">Carmella Jones</h5>
                        </a>
                        <a href="#">
                          <h5 class="font-size-14 mb-0">Carrie Williams</h5>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div class="mt-4">
                    <div class="avatar-xs mb-3">
                      <span
                        class="avatar-title rounded-circle bg-soft bg-primary text-primary"
                      >D</span
                      >
                    </div>

                    <ul class="list-unstyled chat-list">
                      <li>
                        <a href="#">
                          <h5 class="font-size-14 mb-0">Dolores Minter</h5>
                        </a>
                      </li>
                    </ul>
                  </div>
                </simplebar>
              </b-card-text>
            </b-tab>
          </b-tabs>
        </div>
      </div>
    </div>
    <!-- end row -->
  </Layout>
<!--절취선-->
<!--    <div id="roomlist" class="ui segment">-->
<!--      <div class="ui selection list">-->
<!--        <div class="nomobile item" style="padding: 1em;">-->
<!--          <div class="ui grid">-->
<!--            <div class="two wide column">-->
<!--              <h3 class="ui header">방번호</h3>-->
<!--            </div>-->
<!--            <div class="eight wide column">-->
<!--              <h3 class="ui header">방이름</h3>-->
<!--            </div>-->
<!--            <div class="six wide column">-->
<!--              <h3 class="ui right floated header">-</h3>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="ui divider"></div>-->
<!--        <div class="item" v-for="room in rooms" :key="room.id" style="padding: 0 1em;">-->
<!--          <div class="ui stackable grid">-->
<!--            <div class="two wide column nomobile">-->
<!--              <h3 class="ui header">{{ room.id }}</h3>-->
<!--            </div>-->
<!--            <div class="ten wide column">-->
<!--                            <span class="onlymobile">-->
<!--                                <i style="width: 20px; margin-right: 0;" class="black minus icon"></i><i-->
<!--                              style="width: 20px;margin-left: -10px;" class="black minus icon"></i>-->
<!--                                <router-link :to="{ name: 'room', query: { label: room.label }}">-->
<!--                                    <span style="display: inline-block; color: #000;">{{ room.label }}</span>-->
<!--                                </router-link>-->
<!--                            </span>-->
<!--              <span class="nomobile">-->
<!--                                <span style="display: inline-block; color: #000;">{{ room.label }}</span>-->
<!--                            </span>-->
<!--            </div>-->
<!--            <div class="four wide column nomobile">-->
<!--              <router-link :to="{ name: 'Room', query: { label: room.label }}">-->
<!--                <h5 style="float: right;" class="ui green header">입장</h5>-->
<!--              </router-link>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="ui divider" style="margin-left: -1em; margin-right: -1em;"></div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="description" style="margin-bottom: 0;">
      <p>
        © Gonghatalk Corporation All Rights Reserved by 2022.
      </p>
    </div>
  </div>
</template>


<script>
import Vue from 'vue';

export default {
  data() {
    return {
      rooms: [],
      root: Vue.http.options.root,
      items: [
        {
          text: 'Skote',
          href: '/',
        },
        {
          text: 'Chat',
          active: true,
        },
      ],
      submitted: false,
      form: {
        message: '',
      },
      username: '관리자',
    }
  },

  methods: {
    createRoom() {
      this.$http.post('api/room/').then((response) => {
        this.$router.push({name: 'Room', query: {label: response.body["label"]}})
      })
    },
  },

  mounted() {
    this.$http.get('api/room/').then((response) => {
      this.rooms = response.body
    })
  }
}
</script>

<style>

.code {
  font-family: Courier, 'Courier New', monospace !important;
}

a {
  font-weight: normal;
  color: #5BBD72;
}

.description {
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 2em;
  line-height: 150%;
}

.footer {

}

#createButton {
  font-size: 2.42857143rem;
  margin-bottom: 1em;
}

.onlymobile {
  display: none;
}

#header {
  margin-top: 2em;
  font-size: 5em;
}

@media only screen and (max-width: 767px) {
  #buttons {
    text-align: center;
  }

  #createButton {
    font-size: 0.92857143rem;
    margin-bottom: 1em;
    margin-left: auto;
    margin-right: auto;
    width: 100%;
  }

  #header {
    font-size: 2em;
  }

  .description {
    margin-top: 1em;
    margin-bottom: 1em;
    font-size: 1em;
    line-height: 150%;
    background-color: rgba(230, 224, 208, 0.09);
    margin-left: -1em !important;
    margin-right: -1em !important;
    padding: 1em;
  }

  .footer {
    font-size: 1em;
  }

  #roomlist {
    border: 0;
    box-shadow: 0px 0px 0px 0px;
    padding: 0;
    margin: -1em;
    margin-top: 1em;
  }

  .onlymobile {
    display: inline;
  }

  .nomobile {
    display: none !important;
  }

  * {
    border-radius: 0 !important;
  }
}

</style>


