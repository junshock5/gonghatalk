<template>
  <div>
    <ContentHeader
      :title="title"
      :bread-crumb="breadCrumb"
    />
  </div>
</template>

<script>


import ContentHeader from "../../common/ContentHeader";

export default {
  name: 'Account',
  components: {
    ContentHeader,
  },
  data() {
    return {
      title: '계정',
      breadCrumb: [{
        text: '설정',
        to: {
          name: 'Setting',
        },
      }, {
        text: '계정',
        to: {
          name: 'Service',
        },
      }],
      itemHead: [{
        name: '서버명',
        code: 'serverName',
      }, {
        name: '서버번호',
        code: 'serverCode',
      }, {
        name: '사용여부',
        code: 'salePermit',
      }, {
        name: '수정',
        code: 'update',
      }, {
        name: '삭제',
        code: 'delete',
      }],
      // totalRows: 6,
      // currentPage: 1,
      // perPage: 10,
      // sortBy: 'id',
      // sortDesc: false,
      isRegister: false,
      server: {
        serverCode: '',
        serverName: '',
        use: false,
        validationMessage: '',
      },
      searchWord: '',
      services: null,
      servers: [],
      selectedService: {},
    };
  },
};
</script>

<style scoped>

</style>
