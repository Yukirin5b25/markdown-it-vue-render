<template>
  <div ref="echarts-container" :style="{ height: height}">
    {{ options }}
  </div>
</template>

<script>
import * as echarts from "echarts";
import { Promise } from "bluebird";
export default {
  name: "markdown-echarts",
  props: {
    options: { type: String, required: true }
  },
  data() {
    return {
      chart: undefined,
      height: "40vh"
    };
  },
  watch: {
    options: {
      immediate: true,
      handler(newOptions) {
        this.$nextTick(() => {
          Promise.try(() => {
            return JSON.parse(newOptions);
          }).then((options) => {
            if (options.height) {
              this.height = options.height + "px";
              this.chart = echarts.init(this.$refs["echarts-container"]);
            }
            if (!this.chart) {
              this.chart = echarts.init(this.$refs["echarts-container"]);
            }
            this.chart.setOption(options);
          }).catch((err) => {
            this.$refs["echarts-container"].innerHTML = err;
          });
        });
      }
    }
  }
};
</script>