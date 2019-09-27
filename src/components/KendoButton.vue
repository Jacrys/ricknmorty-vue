<template>
  <button type="button" class="k-button">
    <i :class="[icon == undefined ? '' : iconClass]" class="k-icon"></i>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "KendoButton",
  props: {
    icon: String
  },
  computed: {
    iconClass() {
      const classes = {};
      classes[`k-i-${this.icon}`] = true;
      return classes;
    }
  }
};
</script>
