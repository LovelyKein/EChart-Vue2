<template>
  <div class="wrap">
    <div class="chart" ref="stock"></div>
  </div>
</template>

<script>
export default {
  name: "Stock",
  data() {
    return {
      instance: null,
      allData: null,
      startIndex: 0,
      endIndex: 2,
      timer: null,
    };
  },
  methods: {
    createInstance() {
      this.instance = this.$echarts.init(this.$refs.stock, "custom");
      // 对图表进行初始化的配置，之后只添加修改的的部分；
      const initOption = {
        title: {
          text: "库存与销量",
          left: "30",
          top: "30",
          textStyle: {
            fontFamily: "苹方-简",
            fontSize: 20,
            lineHeight: 20,
            fontWeight: "normal",
          },
          textAlign: "left",
        },
        tooltip: {
          show: true,
        },
        series: [
          {
            type: "gauge",
            center: ["26%", "56%"],
            radius: "60%",
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false,
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
            },
            axisLine: {
              lineStyle: {
                width: 28,
              },
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
              distance: 50,
            },
            title: {
              fontSize: 16,
              left: "center",
              textStyle: {
                color: "#ffffff",
                fontFamily: "苹方-简",
              },
            },
            detail: {
              width: 36,
              height: 20,
              fontSize: 12,
              color: "inherit",
              borderColor: "inherit",
              borderRadius: 20,
              borderWidth: 1,
            },
          },
          {
            type: "gauge",
            center: ["74%", "56%"],
            radius: "60%",
            startAngle: 90,
            itemStyle: {
              color: "#ee3f4d",
            },
            endAngle: -270,
            pointer: {
              show: false,
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
            },
            axisLine: {
              lineStyle: {
                width: 28,
              },
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
              distance: 50,
            },
            title: {
              fontSize: 16,
              left: "center",
              textStyle: {
                color: "#ffffff",
                fontFamily: "苹方-简",
              },
            },
            detail: {
              width: 36,
              height: 20,
              fontSize: 12,
              color: "inherit",
              borderColor: "inherit",
              borderRadius: 20,
              borderWidth: 1,
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
        this.dataChange();
      });
    },
    getData() {
      this.$axios({
        method: "GET",
        url: "stock.json",
      }).then(
        (response) => {
          this.allData = response.data;
          this.update();
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    update() {
      const dataOption = {
        series: [
          {
            min: 0,
            max: this.displayData[0].stock,
            data: [
              {
                value: this.displayData[0].sales,
                name: this.displayData[0].name,
                title: {
                  offsetCenter: ["0%", "-20%"],
                },
                detail: {
                  valueAnimation: true,
                  offsetCenter: ["0%", "20%"],
                },
              },
            ],
            detail: {
              formatter: (value) => {
                return (
                  ((value / this.displayData[0].stock) * 100).toFixed(1) + "%"
                );
              },
            },
          },
          {
            min: 0,
            max: this.displayData[1].stock,
            data: [
              {
                value: this.displayData[1].sales,
                name: this.displayData[1].name,
                title: {
                  offsetCenter: ["0%", "-20%"],
                },
                detail: {
                  valueAnimation: true,
                  offsetCenter: ["0%", "20%"],
                },
              },
            ],
            detail: {
              formatter: (value) => {
                return (
                  ((value / this.displayData[1].stock) * 100).toFixed(1) + "%"
                );
              },
            },
          },
        ],
      };
      this.instance.setOption(dataOption);
    },
    adapt() {
      this.instance.resize();
    },
    dataChange() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.startIndex += 2;
        this.endIndex += 2;
        if (this.endIndex > this.allData.length) {
          this.startIndex = 0;
          this.endIndex = 2;
        }
        this.update();
      }, 3600);
    },
  },
  computed: {
    displayData() {
      return this.allData.slice(this.startIndex, this.endIndex);
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
    this.dataChange();
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
  height: 45.6%;
  border-radius: 10px;
  overflow: hidden;
}

.chart {
  width: 100%;
  height: 100%;
}

.arrowLeft,
.arrowRight {
  position: absolute;
  top: 50%;
  z-index: 100;
}

.arrowLeft > span,
.arrowRight > span {
  color: #ffffff;
  opacity: 0.3;
  font-size: 30px;
  transition: all 0.2s;
  cursor: pointer;
}

.arrowLeft:hover > span,
.arrowRight:hover > span {
  opacity: 0.9;
}

.arrowLeft {
  left: 6vw;
  transform: translateY(-50%) rotate(90deg);
}

.arrowRight {
  right: 6vw;
  transform: translateY(-50%) rotate(-90deg);
}
</style>