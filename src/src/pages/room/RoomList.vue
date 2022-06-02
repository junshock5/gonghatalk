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
                  <template v-if="this.userData !== {} && 'name' in this.userData">
                    <h5 class="font-size-15 mt-0 mb-1">이름: {{ this.userData.name }}</h5>
                    <p class="text-muted mb-0">
                      <i class="mdi mdi-circle text-success align-middle me-1"></i>
                      활성
                    </p>
                  </template>
                  <template v-else>
                    <p class="text-muted mb-0">
                      <button
                        type="button"
                        class="btn header-item noti-icon"
                        @click="toLogin"
                      >
                        <i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>
                      </button>
                      로그인
                    </p>
                  </template>

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

          <!--          <div class="search-box chat-search-box py-4">-->
          <!--            <div class="position-relative">-->
          <!--              <input type="text" class="form-control" placeholder="검색..."/>-->
          <!--              <i class="bx bx-search-alt search-icon"></i>-->
          <!--            </div>-->
          <!--          </div>-->

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
                  <span class="d-none d-sm-block">방만들기</span>
                </template>
                <b-card-text>
                  <InputLabel
                    name="방이름"
                    label-class="4"
                    input-class="8"
                    :column="12"
                  >
                    <div class="form-check-inline">
                      <input type="text" class="form-control" placeholder="방제목" v-model="roomName"/>
                    </div>
                    <div class="form-check-inline">
                      <button
                        @click="createRoom"
                        class="btn btn-primary btn-rounded chat-send w-md"
                      >
                          <span
                            class="d-none d-sm-inline-block me-2">
                            생성하기
                          </span>
                      </button>
                    </div>
                  </InputLabel>
                </b-card-text>
              </b-tab>
              <b-tab>
                <template v-slot:title>
                  <i class="bx bx-book-content font-size-20 d-sm-none"></i>
                  <span class="d-none d-sm-block">참여목록</span>
                </template>
                <b-card-text>
                  <div>
                    <simplebar style="max-height: 410px" id="chat-list">
                      <ul class="list-unstyled chat-list">
                        <div class="item" v-for="room in myRooms" :key="room.id" style="padding: 0 1em;">
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
            </b-tabs>
          </div>
        </div>
      </div>
      <!-- end row -->
    </Layout>
    <!--절취선-->
    <div class="description" style="margin-bottom: 0;">
      <p>
        © {{ new Date().getFullYear() }} Gonghatalk Coporation. <i class="mdi mdi-heart text-danger"></i>
      </p>
    </div>
  </div>
</template>


<script>
import Vue from 'vue';
import {mapActions, mapGetters} from "vuex";
import RoomApi from "../../utils/apiHelper/room";
import ContentHeader from "../../common/ContentHeader";
import InputLabel from "../../common/InputLabel";
import SwalHelper from "../../functions/swalHelper";
import CookieHelper from "../../functions/cookieHelper";

export default {
  components: {
    InputLabel,
  },
  data() {
    return {
      rooms: [],
      myRooms: [],
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
      roomName: '',
    }
  },
  computed: {
    ...mapGetters([
      'userData',
    ]),
  },
  methods: {
    async createRoom() {
      // TODO: 유저 정보 추가해서 django에 post create room 호출하기.
      const requestCreateRoom = {
        label: this.roomName,
        userEmail: this.userData.email
      };
      const response = await RoomApi.createRoom(requestCreateRoom);
      if (response.status == 201) {
        await SwalHelper.httpResponseAlert(response, '방만들기', {
          successMessage: '완료되었습니다.',
        });
        this.$router.push({name: 'RoomList'});
      } else {
        await SwalHelper.error('방이름을 다시 입력해주세요', '');
      }
    },
    toLogin() {
      this.$router.push({name: 'Login'});
    },
    ...mapActions([
      'setUserData',
    ]),
  },
  async mounted() {
    if (CookieHelper.getCookie('email') === null) {
      this.$router.push({name: 'Login'});
    } else {
      // const data = {
      //   'name': CookieHelper.getCookie('userName'),
      //   'email': CookieHelper.getCookie('email')
      // };
      // await this.setUserData(data);
    }
    // 전체 리스트
    let response = await RoomApi.getRoomList(this.userData);
    if (response.status == 200) {
      this.rooms = response.data;
    }
    // 내가 속해있는 방 리스트
    response = await RoomApi.getMyRoomList(this.userData);
    if (response.status == 200) {
      await SwalHelper.httpResponseAlert(response, '방불러오기', {
        successMessage: '방목록 불러오기 완료되었습니다.',
      });
      this.myRooms = response.data;
    }
  }
}
</script>

<style>

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

.onlymobile {
  display: none;
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


