<template>
  <div>
    <div id="layout-wrapper">
      <Header/>
      <SideBar :is-condensed="isMenuCondensed"/>
      <div class="main-content">
        <div class="page-content">
          <!-- Start Content-->
          <div class="container-fluid">
            <error-boundary :stop-propagation="false">
              <router-view/>
            </error-boundary>
          </div>
        </div>
      </div>
    </div>
    <!--    <h1>공하톡</h1>-->
    <!--    <p>-->
    <!--      공통의 관심사를 가진 사람들의 채팅-->
    <!--    </p>-->
    <!--    <div id="buttons1">-->
    <!--      <div-->
    <!--        id="createButton1"-->
    <!--        class="ui huge grey basic button"-->
    <!--        @click="register">-->
    <!--        회원가입-->
    <!--      </div>-->
    <!--    </div>-->

    <!--    <div id="buttons2">-->
    <!--      <div-->
    <!--        id="createButton2"-->
    <!--        class="ui huge grey basic button"-->
    <!--        @click="chatting">-->
    <!--        채팅하기-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <p>-->
    <!--      © Gonghatalk Corporation All Rights Reserved by 2022.-->
    <!--    </p>-->
  </div>
</template>

<script>
import feather from 'feather-icons';
import ErrorBoundary from "../exception/ErrorBoundary";
import Header from "../../components/common/Header";
import SideBar from "../../components/common/SideBar";
import router from "../../router";

export default {
  name: 'Index',
  components: {
    ErrorBoundary,
    Header,
    SideBar,
  },
  data() {
    return {
      isMenuCondensed: false,
      layoutWidth: 'fluid',
      leftSidebarType: 'dark',
    };
  },
  methods: {
    register() {
      this.$router.push({name: 'Login'});
    },
    chatting() {
      this.$router.push({name: 'RoomList'});
    },
    toggleMenu() {
      document.body.classList.toggle('sidebar-enable');

      if (window.screen.width >= 992) {
        router.afterEach(() => {
          document.body.classList.remove('sidebar-enable');
          document.body.classList.remove('vertical-collpsed');
        });
        document.body.classList.toggle('vertical-collpsed');
      } else {
        router.afterEach(() => {
          document.body.classList.remove('sidebar-enable');
        });
        document.body.classList.remove('vertical-collpsed');
      }
      this.isMenuCondensed = !this.isMenuCondensed;
    },
  },
  mounted() {
    feather.replace();
  },
};
</script>

<style scoped>
main {
  padding: 0 !important;
}
</style>
