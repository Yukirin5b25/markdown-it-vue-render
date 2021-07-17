<template>
  <pre ref="code-block" :class="language">
    <code>
  {{ code }}
    </code>
  </pre>
</template>

<script>
import "highlight.js/styles/github.css"
import hljs from "highlight.js";
export default {
  name: "markdown-code-block",
  props: {
    language: { type: String, default: "text" },
    code: { type: String, required: true }
  },
  watch: {
    definition: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          hljs.highlightBlock(this.$refs["code-block"]);
        });
      }
    }
  }
};
</script>