<template>
  <!-- ========== Left Sidebar Start ========== -->
  <div class="vertical-menu">
    <SimpleBar
      v-if="!isCondensed"
      :settings="settings"
      class="h-100"
      ref="currentMenu"
      id="my-element"
      @scroll="onScroll"
    >
      <SideNav :is-condensed="isCondensed"/>
    </SimpleBar>

    <SimpleBar v-else class="h-100">
      <SideNav :is-condensed="isCondensed" />
    </SimpleBar>
  </div>
  <!-- Left Sidebar End -->
</template>

<script>
import SimpleBar from 'simplebar-vue';
import SideNav from '@/components/common/SideNav';

export default {
  name: 'SideBar',
  components: {
    SimpleBar,
    SideNav,
  },
  props: {
    isCondensed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      settings: {
        minScrollbarLength: 60,
      },
    };
  },
  methods: {
    onScroll() {
      // for Prevent undefined scroll event handler
      // do nothing
    },
    onRouteChange() {
      setTimeout(() => {
        if (document.getElementsByClassName('mm-active').length > 0) {
          const currentPosition = document.getElementsByClassName('mm-active')[0].offsetTop;
          if (currentPosition > 500) {
            this.$refs.currentMenu.SimpleBar.getScrollElement().scrollTop = currentPosition + 300;
          }
        }
      }, 300);
    },
  },
  watch: {
    $route: {
      handler: 'onRouteChange',
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    document.body.setAttribute('data-layout-mode', 'fluid');
    document.body.removeAttribute('data-layout-size');
    document.body.removeAttribute('data-layout-scrollable');

    document.body.setAttribute('data-sidebar', 'dark');
    document.body.removeAttribute('data-topbar');
    document.body.removeAttribute('data-sidebar-size');
  },
};
</script>

<style scoped>

</style>
