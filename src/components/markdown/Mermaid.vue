<template>
  <div class="mermaid" ref="mermaid-container">
    {{ definition }}
  </div>
</template>

<script>
import mermaid from "mermaid";
export default {
  name: "markdown-mermaid",
  props: {
    definition: { type: String, required: true }
  },
  computed: {
    dark() {
      // return this.$vuetify.theme.dark;
      return false;
    }
  },
  watch: {
    definition: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          mermaid.init(undefined, this.$refs["mermaid-container"]);
        });
      }
    },
    dark: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          mermaid.initialize({ theme: "dark" });
        } else {
          mermaid.initialize({ theme: "base" });
        }
      }
    }
  }
};
</script>