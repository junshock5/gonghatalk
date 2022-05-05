<template>
  <div>
    <!--    <ContentHeader-->
    <!--        :title="title"-->
    <!--        :bread-crumb="breadCrumb"-->
    <!--    />-->
    <h1>공하톡</h1>
    <p>
      공통의 관심사를 가진 사람들의 채팅
    </p>
    <div id="buttons1">
      <div
        id="createButton1"
        class="ui huge grey basic button"
        @click="register">
        회원가입
      </div>
    </div>

    <div id="buttons2">
      <div
        id="createButton2"
        class="ui huge grey basic button"
        @click="chatting">
        채팅하기
      </div>
    </div>
    <p>
      © Gonghatalk Corporation All Rights Reserved by 2022.
    </p>
  </div>
</template>

<script>
//
//import ContentHeader from '@/components/common/ContentHeader';

export default {
  name: 'Index',
  components: {
    //ContentHeader,
  },
  data() {
    return {
      title: '서비스 설정',
      breadCrumb: [{
        text: '설정',
        to: {
          name: 'Setting',
        },
      }, {
        text: '서비스 설정',
        to: {
          name: 'Service',
        },
      }],
    };
  },
  methods: {
    register() {
      this.$router.push({name: 'Login'});
    },
    chatting() {
      this.$router.push({name: 'RoomList'});
    }
  },
};
</script>

<style scoped>

</style>
