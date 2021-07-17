import MarkdownIt from "markdown-it";
import MarkdownItAbbreviation from "markdown-it-abbr";
import MarkdownItContainer from "markdown-it-container";
import MarkdownItDeflist from "markdown-it-deflist";
import MarkdownItEmoji from "markdown-it-emoji";
import MarkdownItFootnote from "markdown-it-footnote";
import MarkdownItGithubToc from "markdown-it-github-toc";
import MarkdownItInsDel from "./markdown-it-ins-del";
import MarkdownItMdi from "./markdown-it-mdi";
import MarkdownItMark from "markdown-it-mark";
import MarkdownItSubscript from "markdown-it-sub";
import MarkdownItSuperscript from "markdown-it-sup";
import MarkdownItTasklists from "markdown-it-task-lists";

const options = {
  markdownIt: {
    linkify: true
  },
  githubToc: {
    tocFirstLevel: 2,
    tocLastLevel: 3,
    tocClassName: "toc",
    anchorLinkBefore: false,
    anchorLinkSymbol: "",
    anchorLinkSpace: false,
    anchorClassName: "anchor",
    anchorLinkSymbolClassName: "octicon octicon-link"
  }
}

const md = new MarkdownIt(options.markdownIt);

// toc
// md.use(MarkdownItGithubToc);
md.use(MarkdownItGithubToc, options.githubToc);

// emoji
md.use(MarkdownItEmoji);

// mdi icons
md.use(MarkdownItMdi);

// Abbreviation
md.use(MarkdownItAbbreviation);

// sub & super scripts
md.use(MarkdownItSubscript);
md.use(MarkdownItSuperscript);

// insert & delete tags
md.use(MarkdownItInsDel);

// mark
md.use(MarkdownItMark);

// footnotes
md.use(MarkdownItFootnote);

// define list
md.use(MarkdownItDeflist);

// task list
md.use(MarkdownItTasklists);

// alerts
md.use(MarkdownItContainer, "info", { validate: function(params) { return params.trim() === "info" } });
md.use(MarkdownItContainer, "error", { validate: function(params) { return params.trim() === "error" } });
md.use(MarkdownItContainer, "success", { validate: function(params) { return params.trim() === "success" } });
md.use(MarkdownItContainer, "warning", { validate: function(params) { return params.trim() === "warning" } });

export default md;