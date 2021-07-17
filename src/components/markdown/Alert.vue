<template>
  <v-alert
    dense
    border="left"
    :type="type"
    style="margin-top: 8px"
  >
    <slot></slot>
  </v-alert>
</template>

<script>
export default {
  name: "markdown-alert",
  props: {
    type: { type: String, required: true }
  }
};
</script>