<template>
  <div class="wrap">
    <div class="titleBox">
      <div class="titlehead">
        <p class="indexTitle" ref="title">{{ title }}</p>
        <div class="arrow" @click="stateChange">
          <span class="iconfont icon-arrow"></span>
        </div>
      </div>
      <ul class="chooseList" v-show="titleState">
        <li
          class="chooseItem"
          v-for="item in dataType"
          :key="item.key"
          @click="display(item)"
        >
          {{ item.text }}
        </li>
      </ul>
    </div>
    <div class="chart" ref="trend"></div>
  </div>
</template>

<script>
export default {
  name: "Trend",
  data() {
    return {
      instance: null,
      allData: null,
      timer: null,
      categoryAxis: null,
      categoryData: null,
      titleState: false,
    };
  },
  methods: {
    createInstance() {
      this.instance = this.$echarts.init(this.$refs.trend, "custom");
      // 对图表进行初始化的配置，之后只添加修改的的部分；
      const initOption = {
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        grid: {
          left: "9%",
          top: "26%",
          width: "82%",
          height: "60%",
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "line",
          },
        },
        legend: {
          top: "14%",
          right: "6%",
          textStyle: {
            fontSize: 14,
            fontFamily: "苹方-简",
          },
        },
      };
      // 初始化图表配置；
      this.instance.setOption(initOption);
    },
    getData() {
      this.$axios({
        method: "GET",
        url: "trend.json",
      }).then(
        (response) => {
          this.allData = response.data;
          // 类目轴的数据；
          this.categoryAxis = this.allData.common.month.map((item) => {
            return {
              value: item,
              textStyle: {
                fontSize: 12,
                fontFamily: "苹方-简",
                lineHeight: 20,
              },
            };
          });
          this.categoryData = this.allData[this.chooseValue[0]];
          this.update();
        },
        (error) => {
          console.log(error.message);
        }
      );
    },
    update() {
      const seriesColor_1 = [
        "rgba(237,47,106,1)",
        "rgba(251,182,18,1)",
        "rgba(16,174,194,1)",
        "rgba(252,121,48,1)",
        "rgba(105,167,148,1)",
      ];
      const seriesColor_2 = [
        "rgba(237,47,106,0)",
        "rgba(251,182,18,0)",
        "rgba(16,174,194,0)",
        "rgba(252,121,48,0)",
        "rgba(105,167,148,0)",
      ];
      let seriesData = this.categoryData.data.map((item, index) => {
        return {
          name: item.name,
          type: "line",
          data: item.data,
          // smooth: false,
          stack: "map",
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: seriesColor_1[index],
              },
              {
                offset: 1,
                color: seriesColor_2[index],
              },
            ]),
          },
        };
      });
      let legendData = this.categoryData.data.map((item) => {
        return item.name;
      });
      const dataOption = {
        xAxis: {
          data: this.categoryAxis,
        },
        series: seriesData,
        legend: {
          data: legendData,
        },
      };
      this.instance.setOption(dataOption);
    },
    adapt() {
      this.instance.resize();
    },
    stateChange() {
      this.titleState = !this.titleState;
    },
    display(item) {
      this.categoryData = this.allData[item.key];
      this.stateChange();
      this.update();
    },
  },
  computed: {
    dataType() {
      if (this.allData) {
        return this.allData.type.filter((item) => {
          return this.title !== item.text;
        });
      } else {
        return [];
      }
    },
    chooseValue() {
      if (this.allData) {
        return this.allData.type.map((item) => {
          return item.key;
        });
      } else {
        return [];
      }
    },
    title() {
      if (this.categoryData) {
        return this.categoryData.title;
      } else {
        return "";
      }
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
  },
  beforeDestroy() {
    clearInterval(this.timer);
    window.removeEventListener("resize", this.adapt);
  },
};
</script>

<style scoped>
.wrap {
  width: 100%;
  height: 56.6%;
  border-radius: 10px;
  overflow: hidden;
}

.chart {
  width: 100%;
  height: 100%;
}

.titleBox {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 10;
}

.titlehead {
  display: flex;
  justify-content: start;
  height: 20px;
}

.arrow {
  width: 14px;
  height: 14px;
  margin-left: 8px;
  margin-top: -1px;
}

.arrow > span {
  color: #ffffff;
  font-size: 14px;
  line-height: 14px;
  transform-origin: center;
  opacity: 0.6;
  transition: all 0.2s;
  cursor: pointer;
}

.arrow:hover span {
  opacity: 0.9;
}

.indexTitle {
  font-size: 20px;
  line-height: 20px;
  color: #ffffff;
  text-align: left;
}

.chooseList {
  position: absolute;
  top: 40px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 14px 24px;
  border-radius: 6px;
}

.chooseItem {
  white-space: nowrap;
  color: #cccccc;
  font-size: 14px;
  line-height: 30px;
  transition: all 0.2s;
  cursor: pointer;
}

.chooseItem:hover {
  color: #f6f6f6;
}
</style>