<template>
  <div class="wrap">
    <div class="chart" ref="rank"></div>
  </div>
</template>

<script>
export default {
  name: "Rank",
  data() {
    return {
      instance: null,
      allData: null,
      zoomStart: 0,
      zoomEnd: 7,
      timer: null,
    };
  },
  methods: {
    createInstance() {
      this.instance = this.$echarts.init(this.$refs.rank, "custom");
      // 对图表进行初始化的配置，之后只添加修改的的部分；
      const initOption = {
        title: {
          text: "区域销售",
          left: "30",
          top: "30",
          textStyle: {
            fontFamily: "苹方-简",
            fontSize: 20,
            lineHeight: 20,
            fontWeight: 'normal'
          },
          textAlign: "left",
        },
        grid: {
          left: "11%",
          top: "24%",
          width: "78%",
          height: "55%",
          // 设置图表的大小包含坐标轴；
          // containlabel: true
        },
        yAxis: {
          type: "value",
          show: false,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        tooltip: {
          trigger: "axis",
          textStyle: {
            color: "#525960",
          },
        },
        series: [
          {
            type: "bar",
            barMaxWidth: "64",
            label: {
              show: true,
              color: "#ffffff",
              fontFamily: "Optima",
              fontSize: 12,
            },
            itemStyle: {
              borderRadius: [32, 32, 0, 0],
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#ff527a",
                },
                {
                  offset: 1,
                  color: "#5d46fa",
                },
              ]),
            },
          },
        ],
      };
      // 初始化图表配置；
      this.instance.setOption(initOption);
      this.instance.on("mouseover", () => {
        clearInterval(this.timer);
      });
      this.instance.on("mouseout", () => {
        this.dataZoomChange();
      });
    },
    getData() {
      this.$axios({
        method: "GET",
        url: "rank.json",
      }).then((response) => {
        this.allData = response.data;
        this.update();
      });
    },
    update() {
      const araeAxis = this.allData.map((item) => {
        return {
          value: item.name,
          textStyle: {
            fontSize: 12,
            fontFamily: "苹方-简",
            lineHeight: 20,
          },
        };
      });
      const dataAxis = this.allData.map((item) => {
        return item.value;
      });
      const dataOption = {
        xAxis: {
          data: araeAxis,
        },
        series: [
          {
            data: dataAxis,
          },
        ],
        dataZoom: {
          show: false,
          startValue: this.zoomStart,
          endValue: this.zoomEnd,
        },
      };
      this.instance.setOption(dataOption);
    },
    adapt() {
      this.instance.resize();
    },
    dataZoomChange() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.zoomStart++;
        this.zoomEnd++;
        if (this.zoomEnd > this.allData.length - 1) {
          this.zoomStart = 0;
          this.zoomEnd = 7;
        }
        this.update();
      }, 3600);
    },
  },
  mounted() {
    // 初始化图表；
    this.createInstance();
    // 获取图表数据；
    this.getData();
    // 初始化先适应一次；
    this.adapt();
    // 图表自适应；
    window.addEventListener("resize", this.adapt);
    this.dataZoomChange();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.adapt);
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.wrap {
  position: relative;
  width: 100%;
  height: 33.6%;
  border-radius: 10px;
  overflow: hidden;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>