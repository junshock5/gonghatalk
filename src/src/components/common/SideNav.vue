<template>
  <!--- Sidemenu -->
  <div id="sidebar-menu">
    <!-- Left Menu Start -->
    <ul id="side-menu" class="metismenu list-unstyled">
      <template v-for="item in menuList">
        <li class="menu-title" v-if="item.isTitle" :key="item.linkToName">
          {{ item.label }}
        </li>
        <li v-if="!item.isTitle && !item.isLayout" :key="item.linkToName">
          <div v-if="item.label===`소모임` && isCondensed === false">
            <h1 style="border-bottom: 1px solid gray"></h1>
            <div style="font-weight: bolder;font-size: 1.5rem;color: white;
            text-align:center;">
            <span class="logo-lg">
              커뮤니티 <i class="mdi mdi-account-supervisor-outline"></i>
            </span>
            </div>
          </div>
          <div v-if="item.label===`친구 찾기` && isCondensed === false">
            <h1 style="border-bottom: 1px solid gray"></h1>
            <div style="font-weight: bolder;font-size: 1.5rem;color: white;
            text-align:center;">
            <span class="logo-lg">
              매칭 <i class="mdi mdi-account-search"></i>
            </span>
            </div>
          </div>
          <a
              v-if="hasItems(item)"
              v-show="canShow(item)"
              href="javascript:void(0);"
              class="is-parent"
              :class="{ 'has-arrow': !item.badge, 'has-dropdown': item.badge }"
              :id="item.label"
          >
            <i class="menu-icon" :class="`bx ${item.icon}`" v-if="item.icon"></i>
            <span>{{ item.label }}</span>
            <span
                :class="`badge rounded-pill bg-${item.badge.variant} float-end`"
                v-if="item.badge"
            >
              {{ item.badge.text }}
            </span>
          </a>

          <a
              href="javascript: void(0)"
              v-if="!hasItems(item)"
              class="side-nav-link-ref"
              @click="menuSelect(item)"
              :id="item.label"
          >
            <i class="menu-icon" :class="`bx ${item.icon}`" v-if="item.icon"></i>
            <span>{{ item.label }}</span>
            <span
                :class="`badge rounded-pill bg-${item.badge.variant} float-end`"
                v-if="item.badge"
            >
              {{ item.badge.text }}
            </span>
          </a>

          <ul
              v-if="hasItems(item)"
              class="sub-menu"
              aria-expanded="false"
              v-show="canShow(item)"
          >
            <li v-for="subitem in item.children" :key="subitem.linkToName">
              <a
                  href="javascript: void(0)"
                  v-if="!hasItems(subitem)"
                  class="side-nav-link-ref"
                  @click="menuSelect(subitem)"
                  :id="subitem.label"
              >
                {{ subitem.label }}
              </a>
              <a
                  v-if="hasItems(subitem)"
                  class="side-nav-link-a-ref has-arrow"
                  href="javascript:void(0);"
                  :id="subitem.label"
              >
                {{ subitem.label }}
              </a>
              <ul v-if="hasItems(subitem)" class="sub-menu mm-collapse" aria-expanded="false">
                <li v-for="subSubitem in subitem.children" :key="subSubitem.linkToName">
                  <a
                      href="javascript: void(0)"
                      class="side-nav-link-ref"
                      @click="menuSelect(subSubitem)"
                      :id="subSubitem.label"
                  >
                    {{ subSubitem.label }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </template>
    </ul>
  </div>
  <!-- Sidebar -->
</template>

<script>
import MetisMenu from 'metismenujs';
import menuList from '@/components/common/json/side_menu.json';

export default {
  name: 'SideNav',
  data() {
    return {
      menuList,
      menuData: null,
      menuRef: null,
      hasPermission: false,
    };
  },
  mounted() {
    this.initializeMetisMenu();
    this.checkActiveMenu();
  },
  computed: {
    canShow() {
      return (item) => item.linkToName !== 'Administrator' || (item.linkToName === 'Administrator' && this.hasPermission);
    },
    isCurrent(menuName) {
      return this.$route.name === menuName;
    },
  },
  props: {
    isCondensed: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    hasItems(item) {
      return item.children !== undefined ? item.children.length > 0 : false;
    },

    toggleMenu(event) {
      event.currentTarget.nextElementSibling.classList.toggle('mm-show');
    },

    initializeMetisMenu() {
      this.menuRef = MetisMenu.attach(document.getElementById('side-menu'));
    },

    checkActiveMenu() {
      const sideMenu = document.getElementById('side-menu');
      if (sideMenu) {
        sideMenu.querySelectorAll('.mm-active')
          .forEach((child) => {
            child.classList.remove('mm-active');
          });
        sideMenu.querySelectorAll('.active')
          .forEach((child) => {
            child.classList.remove('active');
          });
      }

      const links = document.getElementsByClassName('side-nav-link-ref');
      let matchingMenuItem = null;
      const paths = [];

      for (let i = 0; i < links.length; i += 1) {
        paths.push(links[i].pathname);
      }
      const expandedMenu = {};
      let menuCopied = [...menuList];
      for (let i = 0; i < menuCopied.length; i += 1) {
        const item = { ...menuCopied[i] };
        if (Object.prototype.hasOwnProperty.call(item, 'children')) {
          menuCopied = menuCopied.concat(item.children);
          delete item.children;
        }
        expandedMenu[item.linkToName] = item;
      }

      if (expandedMenu[this.activeMenu]) {
        matchingMenuItem = document.getElementById(expandedMenu[this.activeMenu].label);
      } else {
        const strIndex = window.location.pathname.lastIndexOf('/');
        const item = window.location.pathname.substr(0, strIndex)
          .toString();
        matchingMenuItem = links[paths.indexOf(item)];
      }

      if (matchingMenuItem) {
        matchingMenuItem.classList.add('active');
        const parent = matchingMenuItem.parentElement;

        // 테마 쪽에 들어 있던 하드코딩 된 부분
        if (parent) {
          parent.classList.add('mm-active');
          const parent2 = parent.parentElement.closest('ul');
          if (parent2 && parent2.id !== 'side-menu') {
            parent2.classList.add('mm-show');

            const parent3 = parent2.parentElement;
            if (parent3) {
              parent3.classList.add('mm-active');
              const childAnchor = parent3.querySelector('.has-arrow');
              const childDropdown = parent3.querySelector('.has-dropdown');
              if (childAnchor) childAnchor.classList.add('mm-active');
              if (childDropdown) childDropdown.classList.add('mm-active');

              const parent4 = parent3.parentElement;
              if (parent4 && parent4.id !== 'side-menu') {
                parent4.classList.add('mm-show');
                const parent5 = parent4.parentElement;
                if (parent5 && parent5.id !== 'side-menu') {
                  parent5.classList.add('mm-active');
                  const childanchor = parent5.querySelector('.is-parent');
                  if (childanchor && parent5.id !== 'side-menu') {
                    childanchor.classList.add('mm-active');
                  }
                }
              }
            }
          }
        }
      }
    },
    menuSelect(item) {
      if (this.$route.name === item.linkToName) {
        return;
      }
      if (item.link && this.$route.name !== item.linkToName) {
        this.$router.push({
          name: item.linkToName,
          params: {
            // serviceCode: this.currentUserService.serviceCode,
          },
        });
      } else {
        window.location.reload();
      }
    },
  },
  watch: {
    $route: {
      handler: 'checkActiveMenu',
    },
    activeMenu: {
      handler: 'checkActiveMenu',
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style scoped>
.logo .logo-lg {
  font-weight: bolder;
  font-size: 1.5rem;
  color: white;
}

</style>
