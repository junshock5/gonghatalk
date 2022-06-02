<template>
  <div
      :class="`col-lg-${column} col-sm-${column*2}`"
      :style="{paddingRight: isPaddingRightZero ? 0 : 'auto'}"
  >
    <div class="row">
      <div
          :class="classForLabel"
          :style="{backgroundColor: labelBg, color: labelColor}"
          :id="`tooltip_${name}`"
      >
        <template v-if="isBolder">
          <label class="col-form-label fw-bolder"
                 :style="{fontSize: `${fontSize}px`}">
            {{ name }}
          </label>
        </template>
        <template v-else>
          <label class="col-form-label"
                 :style="{fontSize: `${fontSize}px`}">
            {{ name }}
          </label>
        </template>

        <a href="#" @click.prevent="appendSomething" v-if="showAppend" class="append-btn">
          <i class="bx bx-sm bxs-plus-square"></i>
        </a>
        <template v-if="hasTooltip">
          <i class="bx bx-help-circle tooltip-target" style="top: 7%">
            <div class="tooltip-content">
              <slot name="tooltip"></slot>
            </div>
          </i>
        </template>
      </div>
      <div :class="classForInput">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputLabel',
  props: {
    name: String,
    labelClass: String,
    inputClass: String,
    column: {
      type: Number,
      default: 6,
    },
    labelBg: {
      type: String,
      default: '#ffffff',
    },
    labelColor: {
      type: String,
      default: '#495057',
    },
    showAppend: {
      type: Boolean,
      default: false,
    },
    isPaddingRightZero: {
      type: Boolean,
      default: false,
    },
    hasTooltip: {
      type: Boolean,
      default: false,
    },
    fontSize: {
      type: Number,
      default: 13,
    },
    isAlignCenter: {
      type: Boolean,
      default: false,
    },
    paddingSize: {
      type: Number,
      default: 0,
    },
    isBolder: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    classForLabel() {
      return `col-lg-${this.labelClass} col-4`;
    },
    classForInput() {
      if (this.isAlignCenter === true) {
        return `col-lg-${this.inputClass} col-8 align-self-center`;
      }
      return `col-lg-${this.inputClass} col-8`;
    },
  },
  methods: {
    appendSomething() {
      this.$emit('appendSomething');
    },
  },
};
</script>

<style scoped>
.append-btn {
  float: right;
  padding-top: calc(0.47rem + 1px);
  color: #495057;
}

.tooltip-target {
  position: relative;
  display: inline-block;
  margin: auto;
}

.tooltip-target .tooltip-content {
  visibility: hidden;
  background-color: #1F2326CC;
  padding: 0.5rem;
  color: #FFFFFF;
  text-align: center;
  position: absolute;
  z-index: 1;
  top: -15px;
  left: 105%;
  line-height: 1.5;
  font-weight: bolder;
  border-radius: 0.5rem;
  width: max-content;
}

.tooltip-target:hover .tooltip-content {
  visibility: visible;
}
</style>
