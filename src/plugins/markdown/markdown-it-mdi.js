import regexp from "markdown-it-regexp";

const mdi = (md) => {
  md.use(regexp(
    /:mdi-([\w-]+)/,
    function(match, utils) {
      return '<i class="mdi mdi-' + utils.escape(match[1]) + '"></i>';
    }
  ));
};

export default mdi;