<template>
  <div class="wrap">
    <div class="titleBox">
      <div class="titlehead">
        <p class="indexTitle" @click="backLevel">{{ title }}</p>
        <div class="arrow" @click="isShow = !isShow">
          <span class="iconfont icon-arrow"></span>
        </div>
      </div>
      <ul class="chooseList" v-show="isShow">
        <li
          class="chooseItem"
          v-for="(item, index) in indexData"
          :key="index"
          @click="detail(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div class="arrowLeft" @click="subIndex">
      <span class="iconfont icon-arrow"></span>
    </div>
    <div class="arrowRight" @click="addIndex">
      <span class="iconfont icon-arrow"></span>
    </div>
    <div class="chart" ref="hot"></div>
  </div>
</template>

<script>
export default {
  name: "Hot",
  data() {
    return {
      instance: null,
      allData: null,
      pageIndex: 0,
      isShow: false,
    };
  },
  methods: {
    createInstance() {
      this.instance = this.$echarts.init(this.$refs.hot, "custom");
      // 对图表进行初始化的配置，之后只添加修改的的部分；
      const initOption = {
        tooltip: {
          show: true,
          trigger: "item",
          textStyle: {
            fontSize: "12",
          },
        },
        series: {
          type: "sunburst",
          radius: [52, "82%"],
          itemStyle: {
            borderRadius: 6,
            borderWidth: 4,
            borderColor: "rgb(22,30,138)",
          },
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "14",
              fontFamily: "苹方-简",
            },
          },
        },
      };
      // 初始化图表配置；
      this.instance.setOption(initOption);
    },
    getData() {
      this.$axios({
        method: "GET",
        url: "hotproduct.json",
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
        series: {
          data: this.indexData,
        },
      };
      this.instance.setOption(dataOption);
    },
    adapt() {
      this.instance.resize();
    },
    subIndex() {
      this.pageIndex--;
      if (this.pageIndex < 0) {
        this.pageIndex = this.allData.length - 1;
      }
      this.update();
    },
    addIndex() {
      this.pageIndex++;
      if (this.pageIndex > this.allData.length - 1) {
        this.pageIndex = 0;
      }
      this.update();
    },
    detail(index) {
      const detailOption = {
        series: {
          data: [this.indexData[index]],
        },
      };
      this.instance.setOption(detailOption);
    },
    backLevel(){
      const backOption = {
        series: {
          data: this.indexData
        },
      };
      this.instance.setOption(backOption);
      this.isShow = false;
    }
  },
  computed: {
    title() {
      if (this.allData) {
        return this.allData[this.pageIndex].name;
      } else {
        return "";
      }
    },
    indexData() {
      if (this.allData) {
        return this.allData[this.pageIndex].children;
      } else {
        return [];
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
    window.removeEventListener("resize", this.adapt);
  },
};
</script>

<style scoped>
.wrap {
  position: relative;
  width: 100%;
  height: 52%;
  border-radius: 10px;
  overflow: hidden;
}

.chart {
  width: 100%;
  height: 100%;
}

.titleBox {
  position: absolute;
  top: 34px;
  left: 34px;
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
  cursor: pointer;
}

.chooseList {
  position: absolute;
  top: 40px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.9);
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
  left: 6%;
  transform: translateY(-50%) rotate(90deg);
}

.arrowRight {
  right: 6%;
  transform: translateY(-50%) rotate(-90deg);
}
</style>