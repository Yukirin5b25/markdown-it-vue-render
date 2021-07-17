<template>
  <div class="px-6">
    <v-row>
      <v-col cols="8" style="margin-left: 8px">
        <MarkdownRenderer v-if="tokens.length > 0" :md="md" :tokens="tokens"></MarkdownRenderer>
        <h2 v-else>
          Ooops, there's nothing in this doc.
        </h2>
      </v-col>
      <v-col sm="12" md="2">
        <MarkdownToc v-if="toc" :md="md" :tokens="toc"></MarkdownToc>
      </v-col>
    </v-row>
    <v-fab-transition>
      <v-btn
        v-show="scroll > 512"
        dark
        bottom
        right
        fixed
        fab
        @click="backToTop"
      >
        <v-icon>mdi-arrow-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </div>
</template>

<script>
import md from "../../plugins/markdown/markdown-it";
export default {
  name: "markdown-loader",
  components: {
    MarkdownToc: () => import("./Toc.vue"),
    MarkdownRenderer: () => import("./Renderer.vue")
  },
  data() {
    return {
      md: md,
      scroll: undefined,
      tokens: undefined,
      toc: undefined
    };
  },
  computed: {
    raw: function() {
      const contexts = require.context("../../docs", true);
      return contexts("./Support-Markdown-Plugins.md").default || contexts;
    }
  },
  methods: {
    handleScroll() {
      this.scroll = window.scrollY || window.scrollTop;
    },
    backToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    },
    spliceTocTokens() {
      var toc = [];
      var nesting = 0;
      for (var i = 0, len = this.tokens.length; i < len; i++) {
        var token = this.tokens[i];
        nesting += token.nesting;
        if (token.type === "inline" && token.content === "[toc]" && nesting === 1) {
          toc = this.tokens.splice(i - 1, 3);
          len = len - 3;
        }
      }
      return toc;
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    raw: {
      immediate: true,
      handler(newRaw) {
        this.tokens = this.md.parse(newRaw, {});
        this.toc = this.spliceTocTokens();
      }
    }
  }
};
</script>

<style scoped>
* ::v-deep .markdown-body {
  color: var(--text-color);
}
* ::v-deep .markdown-body a {
  color: var(--link);
}
* ::v-deep .markdown-body th {
  color: var(--text-color);
  background-color: var(--background-color);
}
* ::v-deep .markdown-body tr:nth-child(odd) {
  color: var(--text-color);
  background-color: var(--tr-odd);
}
* ::v-deep .markdown-body tr:nth-child(even) {
  color: var(--text-color);
  background-color: var(--background-color);
}
* ::v-deep .markdown-body pre {
  background-color: var(--shell);
}
</style>