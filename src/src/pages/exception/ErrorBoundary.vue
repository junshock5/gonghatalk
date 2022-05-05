<template>
  <div>
    <slot
        v-if="err"
        name="error"
        v-bind:err="err"
        v-bind:vm="vm"
        v-bind:info="info"
    >
      <div class="account-pages my-5 pt-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-center mb-5">
                <template v-if="apiError">
                  <template v-if="err.response.status === 403">
                    <div class="account-pages my-5 pt-5">
                      <div class="container">
                        <div class="row">
                          <div class="col-lg-12">
                            <div class="text-center mb-5">
                              <h1 class="display-2 fw-medium">
                                4<i class="bx bx-buoy bx-spin text-primary display-3"></i>3
                              </h1>
                              <h3 class="text-danger"> {{ err.response.statusText }}</h3>
                              <h5 class="text-uppercase">{{ apiErrorMessage }}</h5>
                              <div class="mt-3 text-center">
                              <h4 class="text-danger">접근권한이 없습니다. 권한 신청 부탁드립니다.</h4>
                                <a class="btn btn-primary" href="https://ncsr.nexon.com/CSR/Write/7/730">권한 신청 페이지
                                  이동</a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row justify-content-center">
                          <div class="col-md-8 col-xl-6">
                            <div>
                              <img src="@/assets/images/error-img.png" alt class="img-fluid"/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <h2 class="display-2 fw-medium">
                      {{ err.response.status / 100 }}
                      <i v-if="err.response.status % 100 < 10"
                         class="bx bx-buoy bx-spin text-primary display-3"></i>
                      {{ err.response.status % 100 }}
                    </h2>
                    <h3 class="text-danger"> {{ err.response.statusText }}</h3>
                    <h5 class="text-uppercase">{{ apiErrorMessage }}</h5>
                    <h5 class="text-uppercase">공하톡(topojs8@naver.com)에 문의주세요.</h5>
                    <div class="row m-3">
                      <div class="card card-body">
                        <h3 class="card-title">Front stack trace - {{ info }}</h3>
                        <p class="card-text"> {{ err.stack }}</p>
                      </div>
                    </div>
                  </template>
                </template>
                <template v-else>
                  <h2 class="display-2 fw-medium">
                    {{ err.message }}
                  </h2>
                  <h5 class="text-uppercase">공하톡(topojs8@naver.com)에 문의주세요.</h5>
                  <div class="row m-3">
                    <div class="card card-body">
                      <h3 class="card-title">Front stack trace - {{ info }}</h3>
                      <p class="card-text"> {{ err.stack }}</p>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-8 col-xl-6">
              <div>
                <img src="@/assets/images/error-img.png" alt class="img-fluid"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </slot>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  name: 'ErrorBoundary',
  props: {
    stopPropagation: Boolean,
  },
  data() {
    return {
      err: false,
      vm: null,
      info: null,
      apiError: false,
      apiErrorMessage: '',
    };
  },
  errorCaptured(err, vm, info) {
    this.err = err;
    this.vm = vm;
    this.info = info;

    if (this.err.response) {
      this.apiError = true;
      this.apiErrorMessage = this.err.response.data
        ? `${this.err.response.data.method}(${this.err.response.data.requestUrl}), ${this.err.response.data.title} : ${this.err.response.data.message}`
        : this.err.message;
    }

    return !this.stopPropagation;
  },
};
</script>

<style scoped>

</style>
