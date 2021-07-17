<script>
import "github-markdown-css";
var pointer;
export default {
  name: "markdown-renderer",
  components: {
    MarkdownAlert: () => import("./Alert.vue"),
    MarkdownCodeBlock: () => import("./CodeBlock.vue"),
    MarkdownMermaid: () => import("./Mermaid.vue"),
    MarkdownEcharts: () => import("./Echarts.vue")
  },
  props: {
    md: { type: Object, required: true },
    tokens: { type: Array, required: true }
  },
  methods: {
    renderAttrs(token) {
      var result = {};
      if (!token.attrs) {
        return result;
      }
      for (var i = 0, len = token.attrs.length; i < len; i++) {
        result[token.attrs[i][0]] = token.attrs[i][1];
      }
      return result;
    },
    renderAlert(tokens, idx, createElement) {
      const token = tokens[idx];
      if (token.nesting === 1) {
        const alert = {
          parent: pointer,
          alert_type: token.info.replace(/[^a-zA-Z]+/g, ""),
          attrs: this.renderAttrs(token),
          children: []
        };
        pointer = alert;
      }
      if (token.nesting === -1) {
        const alert = createElement("MarkdownAlert", {
          props: {
            type: pointer.alert_type
          }
        }, pointer.children);
        pointer.parent.children.push(alert);
        pointer = pointer.parent;
      }
    },
    renderToken(tokens, idx, createElement) {
      const token = tokens[idx];
      if (token.nesting === 1) {
        const sub = {
          parent: pointer,
          attrs: this.renderAttrs(token),
          children: []
        };
        pointer = sub;
      }
      if (token.nesting === -1) {
        pointer.parent.children.push(createElement(token.tag, { attrs: pointer.attrs }, pointer.children));
        pointer = pointer.parent;
      }
    },
    render(tokens, createElement) {
      var root = { parent: undefined, children: [] };
      pointer = root;
      for (var i = 0, len = tokens.length; i < len; i++) {
        var type = tokens[i].type;
        if (type === "inline") {
          if (tokens[i]._tocAnchor) {
            pointer.attrs.id = tokens[i]._tocAnchor;
            pointer.children.push(createElement("a", {
              class: "anchor",
              attrs: { href: "#" + tokens[i]._tocAnchor }
            }, [createElement("span", { class: "octicon octicon-link" })]));
          }
          this.renderInline(tokens[i].children, createElement);
        } else if (type === "fence") {
          if (tokens[i].info === "mermaid") {
            pointer.children.push(createElement("MarkdownMermaid", { props: { definition: tokens[i].content } }));
          } else if (tokens[i].info === "echarts") {
            pointer.children.push(createElement("MarkdownEcharts", { props: { options: tokens[i].content } }));
          } else {
            pointer.children.push(createElement("MarkdownCodeBlock", { props: { language: tokens[i].info, code: tokens[i].content } }));
          }
        } else if (/^container_[\w]+$/.test(type)) {
          this.renderAlert(tokens, i, createElement);
        } else {
          this.renderToken(tokens, i, createElement);
        }
      }
      return createElement("div", { class: "markdown-body" }, root.children);
    },
    renderInline(tokens, createElement) {
      pointer.children.push(createElement("div", {
        domProps: {
          innerHTML: this.md.renderer.renderInline(tokens, this.md.options)
        }
      }));
    }
  },
  render: function(createElement) {
    return this.render(this.tokens, createElement);
  }
};
</script>