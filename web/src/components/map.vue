<template>
  <div class="wrap">
    <div class="chart" ref="map" @dblclick="backChina"></div>
  </div>
</template>

<script>
// 导入中文转拼音的方法；
import getProvinceInfo from "../../tools/getProvinceInfo";

export default {
  name: "Map",
  data() {
    return {
      instance: null,
      allData: null,
      // 缓存获取的地图数据，防止重复发起请求；
      provinceMapData: {},
      isdetail: false
    };
  },
  methods: {
    async createInstance() {
      this.instance = this.$echarts.init(this.$refs.map, "custom");
      // 获取中国地图；
      const map = await this.$axios({
        method: "GET",
        url: "china.json",
      });
      this.$echarts.registerMap("china", map.data);
      // 对图表进行初始化的配置，之后只添加修改的的部分；
      const initOption = {
        title: {
          text: "商家分布",
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
        geo: {
          type: "map",
          map: "china",
          // 设置允许缩放和拖动；
          // roam: true,
          itemStyle: {
            areaColor: "rgba(32,60,148,1)",
            borderColor: "#2f90b9",
          },
        },
        legend: {
          bottom: "30",
          left: "30",
          orient: "vertical",
          itemGap: 20,
          textStyle: {
            fontSize: 12,
            fontFamily: "苹方-简",
          },
        },
      };
      // 初始化图表配置；
      this.instance.setOption(initOption);
      // 地图的鼠标点击事件；
      this.instance.on("click", async (context) => {
        if(this.isdetail){
          return 
        }
        this.isdetail = true
        const provinceName = context.name;
        const provinceInfo = getProvinceInfo(provinceName);
        if (!this.provinceMapData[provinceInfo.name]) {
          // 获取省份的地图数据；
          const provinceMap = await this.$axios({
            method: "GET",
            url: provinceInfo.url,
          });
          this.$set(this.provinceMapData, provinceInfo.name, provinceMap.data);
          // 注册省份地图；
          this.$echarts.registerMap(provinceInfo.name, provinceMap.data);
        }
        const changeOption = {
          geo: {
            map: provinceInfo.name,
          },
        };
        this.instance.setOption(changeOption);
      });
    },
    getData() {
      this.$axios({
        method: "GET",
        url: "map.json",
      }).then((response) => {
        this.allData = response.data;
        this.update();
      });
    },
    update() {
      const seriesData = this.allData.map((item) => {
        return {
          type: "effectScatter",
          name: item.name,
          data: item.children,
          coordinateSystem: "geo",
          // 设置散点图的涟漪动画的比例；
          rippleEffect: {
            scale: 4,
          },
        };
      });
      const legendText = this.allData.map((item) => {
        return item.name;
      });
      const dataOption = {
        series: seriesData,
        legend: {
          data: legendText,
        },
      };
      this.instance.setOption(dataOption);
    },
    adapt() {
      this.instance.resize();
    },
    backChina() {
      // 初始化时已注册过中国地图；
      const chinaOption = {
        geo: {
          map: "china",
        },
      };
      this.instance.setOption(chinaOption);
      this.isdetail = false
    },
  },
  // computed: {
  //   provinceNameList() {
  //     return Object.keys(this.provinceMapData);
  //   },
  // },
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
  height: 64%;
  border-radius: 10px;
  overflow: hidden;
}

.chart {
  width: 100%;
  height: 100%;
}
</style>