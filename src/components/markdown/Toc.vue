<template>
  <v-card div flat v-if="tokens.length > 0" style="position: fixed" class="background">
    <v-card-title>ON THIS PAGE</v-card-title>
    <v-card-text>
      <div class="markdown-body" v-html="md.renderer.render(tokens, md.options)"></div>
    </v-card-text>
  </v-card>
</template>

<script>
import "github-markdown-css";
export default {
  name: "markdown-toc",
  props: {
    md: { type: Object, required: true },
    tokens: { type: Array, required: true }
  }
};
</script>

<style>
* ::v-deep .markdown-toc .anchor {
  float: none !important;
  margin-left: 0 !important;
  padding-left: 4px;
}
</style>