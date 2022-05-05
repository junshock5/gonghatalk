<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <router-link :to="{name: 'Dashboard'}" class="logo logo-light">
            <span class="logo-sm" style="color: white">
              Talk
              <sup>{{ environment }}</sup>
            </span>
            <span class="logo-lg">
              공하톡  <i class="mdi mdi-chat"></i>
              <sup>{{ environment }}</sup>
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
<!--          <multi-select-->
<!--              ref="multiSelect"-->
<!--              v-model="selectedService"-->
<!--              placeholder="항목명을 입력해주세요"-->
<!--              :options="userServices"-->
<!--              :show-labels="false"-->
<!--              :allow-empty="false"-->
<!--              :close-on-select="true"-->
<!--              :clear-on-select="false"-->
<!--              :searchable="false"-->
<!--              track-by="serviceName"-->
<!--              label="serviceName"-->
<!--              class="helo"-->
<!--          />-->
        </div>
      </div>

      <div class="d-flex">
        <div class="dropdown d-none d-lg-inline-block ms-1">
          <img
              ref="userProfile"
              class="rounded-circle header-profile-user"
              :src="`https://portal.weboffice.co.kr/hr/emp/${this.userData.CMPCode}/${this.userData.EMPNO}.jpg?v=38`"
              alt="Header Avatar"
          />
          <button class="btn header-item noti-icon default-cursor">
            {{ this.userData.DEPTName }} {{ this.userData.EMPKORName }} ({{ this.userData.EMPID }})
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
import { mapActions, mapGetters } from 'vuex';
import ApiHelper from '@/utils/apiHelper';

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

      const { hostname } = window.location;

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
      // eslint-disable-next-line no-unused-expressions
      // await ApiHelper.SsoApi.Logout();
      this.$router.push({name: 'Login'});
    },
    ...mapActions([
      'signIn',
      'signOut',
      'getUserData',
    ]),
    toggleMenu() {
      this.$parent.toggleMenu();
    },
  },
  async mounted() {
    this.$refs.userProfile.addEventListener('error', function errorHandler() {
      this.src = 'data:image/png;base64,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';
    });
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
