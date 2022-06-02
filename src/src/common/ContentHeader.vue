<template>
  <!-- start page title -->
  <div class="row">
    <div class="col-12">
      <div class="page-title-box align-items-center justify-content-between">
        <h2 class="mb-0 fw-bolder">{{ title }}</h2>

        <div class="page-title-right">
          <b-breadcrumb :items="breadCrumb" class="m-0 mt-1"></b-breadcrumb>
        </div>
      </div>
    </div>
  </div>
  <!-- end page title -->
</template>

<script>
export default {
  name: 'ContentHeader',
  props: {
    title: String,
    breadCrumb: Array,
  },
};
</script>

<style scoped>
  .page-title-box {
    background-color: #ffffff;
    padding: 15px;
  }
</style>
