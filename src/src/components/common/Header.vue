<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link :to="{name: 'Dashboard'}" class="logo logo-light">
            <span class="logo-sm" style="color: white">
              Talk
            </span>
            <span class="logo-lg">
              공하톡  <i class="mdi mdi-chat"></i>
            </span>
          </router-link>
        </div>

        <button
          id="vertical-menu-btn"
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item toggle-menu"
          @click="toggleMenu"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>
        <!-- Mega Dropdown -->
        <div class="service-selector header-item">
        </div>
      </div>

      <div class="d-flex">
        <div class="dropdown d-none d-lg-inline-block ms-1">
          <!--          <img-->
          <!--              ref="userProfile"-->
          <!--              class="rounded-circle header-profile-user"-->
          <!--              :src="`https://portal.weboffice.co.kr/hr/emp/${this.userData.name}/${this.userData.email}.jpg?v=38`"-->
          <!--              alt="Header Avatar"-->
          <!--          />-->
          <button class="btn header-item noti-icon default-cursor">
            <template v-if="this.userData!=null">
              <b>{{ this.userData.name }}</b> | <b>{{ this.userData.email }}</b>
            </template>
          </button>
        </div>
        <div class="dropdown d-none d-lg-inline-block ms-1">
          <button
            type="button"
            class="btn header-item noti-icon"
            @click="logIn"
          >
            <i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
// import MultiSelect from 'vue-multiselect';
import {mapActions, mapGetters} from 'vuex';
import ApiHelper from '@/utils/apiHelper';
import CookieHelper from "../../functions/cookieHelper";
import SwalHelper from "../../functions/swalHelper";
import functions from "../../functions";

export default {
  name: 'Header',
  components: {
    // MultiSelect,
  },
  computed: {
    environment() {
      // eslint-disable-next-line no-undef
      if (ENVIRONMENT === 'development') {
        return 'Local';
      }

      const {hostname} = window.location;

      if (hostname.indexOf('test') >= 0) {
        return 'Test';
      }
      return 'Live';
    },
    ...mapGetters([
      'isLoggedIn',
      'userData',
    ]),
  },
  data() {
    return {
      selectedService: {
        serviceCode: 'shdev',
        serviceName: '통합거래소',
      },
      userServices: [{
        serviceCode: 'shdev',
        serviceName: '통합거래소',
      },
        {
          serviceCode: 'mod',
          serviceName: 'MOD',
        }],
    };
  },
  methods: {
    async logIn() {
      // getter에 유저 데이터가 있다면 로그인 한걸로 판단.
      if (this.userData === null || this.userData === {})
        this.$router.push({name: 'Login'})
      else {
        const result = await functions.SwalHelper.confirm('로그아웃 하시겠습니까?');
        if (result.isConfirmed) {
          await this.setUserData(null);
          this.$router.push({name: 'Login'});
        }
      }
    },
    ...mapActions([
      'signIn',
      'signOut',
      'setUserData',
    ]),
    toggleMenu() {
      this.$parent.toggleMenu();
    },
  },
  beforeMount() {
  },
};
</script>

<style scoped>
.service-selector {
  left: 1rem;
}

.helo {
  width: 20rem;
  margin: 15px 0 15px 15px;
}

.logo .logo-lg {
  font-weight: bolder;
  font-size: 1.5rem;
  color: white;
}

.logo-sm {
  font-weight: bolder;
  font-size: 1rem;
}

sup {
  color: #FF0000;
  font-weight: normal;
  font-style: italic;
}

.default-cursor {
  cursor: default !important;
}

@media (max-width: 992px) {
  .helo {
    width: 10rem;
  }
}
</style>
