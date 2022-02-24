<template>
  <div class="wrap">
    <div class="chart" ref="seller"></div>
  </div>
</template>

<script>
export default {
  name: "Seller",
  data() {
    return {
      instance: null,
      allData: null,
      currentData: null,
      timer: null,
      currentPage: 1,
      totalPage: null,
    };
  },
  methods: {
    createInstance() {
      this.instance = this.$echarts.init(this.$refs.seller, "custom");
      // 对图表进行初始化的配置，之后只添加修改的的部分；
      const initOption = {
        title: {
          text: "商家销售",
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
        grid: {
          left: "9%",
          top: "29%",
          width: "74%",
          height: "60%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: false,
          show: false,
        },
        yAxis: {
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
            barMaxWidth: "72",
            label: {
              show: true,
              color: "#ffffff",
              fontFamily: "Optima",
              fontSize: 14,
              position: "right",
              offset: [10, 0],
            },
            itemStyle: {
              borderRadius: [0, 36, 36, 0],
              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#5052ee",
                },
                {
                  offset: 1,
                  color: "#76f2f2",
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
        this.switchDisplay();
      });
    },
    getData() {
      this.$axios({
        method: "GET",
        url: "seller.json",
      }).then(
        (response) => {
          this.allData = response.data;
          this.totalPage =
            this.allData.length % 5 === 0
              ? this.allData.length / 5
              : Math.floor(this.allData.length / 5) + 1;
          this.update();
          this.switchDisplay();
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    update() {
      let preIndex = (this.currentPage - 1) * 5;
      this.currentData = this.allData.slice(preIndex, preIndex + 5);
      let sellerName = this.currentData.map((item) => {
        return {
          value: item.name,
          textStyle: {
            fontSize: 12,
            fontFamily: "苹方-简",
            lineHeight: 20,
            align: 'right',
            padding: [0,12,0,0]
          },
        };
      });
      let sellerValue = this.currentData.map((item) => {
        return item.value;
      });
      const dataOption = {
        yAxis: {
          data: sellerName,
        },
        series: [
          {
            data: sellerValue,
          },
        ],
      };
      this.instance.setOption(dataOption);
    },
    switchDisplay() {
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        this.currentPage++;
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1;
        }
        this.update();
      }, 3600);
    },
    adapt() {
      this.instance.resize();
    },
  },
  mounted() {
    this.createInstance();
    this.getData();
    // 图表自适应；
    window.addEventListener("resize", this.adapt);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    window.removeEventListener("resize", this.adapt);
  },
};
</script>

<style scoped>
.wrap {
  position: relative;
  width: 100%;
  height: 41%;
  border-radius: 10px;
  overflow: hidden;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>