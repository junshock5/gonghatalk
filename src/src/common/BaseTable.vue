<template>
  <div class="table-responsive">
    <table class="table table-nowrap table-sm align-middle">
      <thead class="table-light">
      <tr>
        <th
          v-for="head in columns"
          :key="head.code"
          :class="textAlignClass(head)"
        >
          {{ head.name }}
        </th>
      </tr>
      </thead>
      <tbody>
      <template v-if="rows.length > 0">
        <tr v-for="(row, index) in rows" v-bind:key="row.code">
          <td
            v-for="(column, idx) in columns"
            :key="`${row.id}_${idx}`"
            :class="textAlignClass(column)"
          >
            <template v-if="column.code === 'itemNo' && linkName.trim() !== null">
              <router-link
                :to="{name: linkName, params: {spaceCode: row.spaceCode, itemKey: row.itemKey}}"
              >
                {{ row[column.code] }}
              </router-link>
              <a
                href="#"
                v-if="column.code === 'itemNo' && containExternal === true"
                @click.prevent="onExternal(row)"
              >
                <i class="bx bx-link-external"></i>
              </a>
            </template>
            <template v-else>
              <p v-if="column.code === 'checkbox'">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="flexCheckDefault">
                </label>
              </p>
              <p v-else-if="column.code === 'use'" class="p-0 m-0">
                <i v-if="row.use" class="bx bx-sm bx-check text-success"></i>
              </p>
              <p v-else-if="column.code === 'update'" class="m-0 text-success">
                <i class="bx bxs-edit-alt"
                   @click="update(row, index)"
                ></i>
              </p>
              <p v-else-if="column.code === 'delete'" class="m-0 text-danger">
                <i class="bx bxs-trash"
                   @click="remove(index)"
                ></i>
              </p>
              <p v-else-if="column.code === 'enter'" class="m-0 text-danger">
                <router-link :to="{ name: 'Room', query: { label: row['label'] }}">
                  <span class="ui green header">입장</span>
                 </router-link>
              </p>
              <p v-else class="m-0">
                {{ filterFunc(column, row[column.code]) }}
              </p>
            </template>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr>
          <th :colspan="columns.length" class="text-center">
            <slot name="empty">결과가 없습니다.</slot>
          </th>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'BaseTable',
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    rows: {
      type: Array,
      default: () => [],
    },
    linkName: String,
    containExternal: {
      type: Boolean,
      default: false,
    },
    textCenterCodeList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    textAlignClass() {
      return (column) => ({
        'text-center': this.textCenterCodeList.indexOf(column.code) >= 0,
      });
    },
  },
  methods: {
    filterFunc(column, value) {
      if (!column.filterFunc) {
        return value;
      }
      return column.filterFunc(value);
    },
    onExternal(row) {
      const route = this.$router.resolve({
        name: this.linkName,
        params: {
          spaceCode: row.spaceCode,
          itemKey: row.itemKey,
        },
      });

      window.open(route.href, '_blank');
    },
    update(row, index) {
      this.$emit('onUpdate', row, index);
    },
    remove(index) {
      this.$emit('onRemove', index);
    },
  },
};
</script>

<style scoped>
th, td {
  padding-top: calc(0.5rem + 1px);
  padding-bottom: calc(0.5rem + 1px);
}

tr > th:first-child,
tr > td:first-child {
  padding-left: 1rem;
}
</style>
