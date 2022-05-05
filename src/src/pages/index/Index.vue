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
