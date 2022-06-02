<template>
  <Layout>
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-soft bg-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-4">
                  <h5 class="text-primary">Welcome Back !</h5>
                  <p>Sign in to continue to Gonghatalk.</p>
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img
                  src="@/assets/images/profile-img.png"
                  alt
                  class="img-fluid"
                />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div>
              <router-link tag="a" to="/">
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle bg-light">
                    <img src="@/assets/images/logo.svg" alt height="34"/>
                  </span>
                </div>
              </router-link>
            </div>
            <b-alert
              v-model="isAuthError"
              variant="danger"
              class="mt-3"
              dismissible
            >{{ authError }}
            </b-alert
            >
            <b-form class="p-2" @submit.prevent="tryToLogIn">
              <b-form-group
                class="mb-3"
                id="input-group-1"
                label="Email"
                label-for="input-1"
              >
                <input type="text" class="form-control" id="userName" v-model="userEmail">
              </b-form-group>

              <b-form-group
                class="mb-3"
                id="input-group-2"
                label="Password"
                label-for="input-2"
              >
                <input type="password" class="form-control" id="key" v-model="userPassword">
              </b-form-group>
              <b-form-checkbox
                class="form-check"
                id="customControlInline"
                name="checkbox-1"
                value="accepted"
                unchecked-value="not_accepted"
              >
                Remember me
              </b-form-checkbox>
              <div class="mt-3 d-grid">
                <b-button variant="primary" class="btn-block"
                          @click="send"
                >Log In
                </b-button
                >
              </div>
              <div class="mt-4 text-center">
                <h5 class="font-size-14 mb-3">Sign in with</h5>

                <ul class="list-inline">
                  <li class="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      class="social-list-item bg-primary text-white border-primary"
                    >
                      <i class="mdi mdi-facebook"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      class="social-list-item bg-info text-white border-info"
                    >
                      <i class="mdi mdi-twitter"></i>
                    </a>
                  </li>
                  <li class="list-inline-item">
                    <a
                      href="javascript: void(0);"
                      class="social-list-item bg-danger text-white border-danger"
                    >
                      <i class="mdi mdi-google"></i>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="mt-4 text-center">
                <router-link tag="a" to="/forgotpassword" class="text-muted">
                  <i class="mdi mdi-lock me-1"></i> Forgot your password?
                </router-link>
              </div>
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="mt-5 text-center">
          <p>
            Don't have an account ?
            <router-link
              tag="a"
              to="/register"
              class="fw-medium text-primary"
            >Signup now
            </router-link
            >
          </p>
          <p>
            © {{ new Date().getFullYear() }} Gonghatalk. Crafted with
            <i class="mdi mdi-heart text-danger"></i> by Themesbrand
          </p>
        </div>
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<script>
// eslint-disable-next-line import/extensions
import Layout from './auth';
import ApiHelper from "../../utils/apiHelper";
import SwalHelper from "../../functions/swalHelper";
import CookieHelper from "../../functions/cookieHelper";
import {mapActions} from "vuex";

export default {
  name: 'Login',
  components: {
    Layout,
  },
  data() {
    return {
      userEmail: '',
      userPassword: '',
    };
  },
  methods: {
    ...mapActions([
      'setUserData',
    ]),
    async send() {
      const message = {
        email: this.userEmail,
        passWord: this.userPassword,
      }
      const response = await ApiHelper.UserApi.login(message);
      if (response.status == 200 && response !== undefined && response.data !== null) {
        await SwalHelper.httpResponseAlert(response, '로그인', {
          successMessage: '완료되었습니다.',
        });
        console.log('로그인이 완료되었습니다.');
        CookieHelper.setCookie('email', response.data.email, 30);
        // CookieHelper.setCookie('userName', response.data.name, 30);
        await this.setUserData(response.data);
        this.$router.push({name: 'RoomList'});
      } else {
        await SwalHelper.error('입력 항목을 다시 확인해주세요', '');
      }
    },
  }
};
</script>

<style scoped>

</style>
