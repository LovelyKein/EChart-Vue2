<template>
  <div class="wrap">
    <div class="title">
      <h2>Sales data visualization system</h2>
    </div>
    <div class="chart">
      <div class="chartBox">
        <Trend></Trend>
        <Seller></Seller>
      </div>
      <div class="chartBox">
        <Map></Map>
        <Rank></Rank>
      </div>
      <div class="chartBox">
        <Hot></Hot>
        <Stock></Stock>
      </div>
    </div>
  </div>
</template>

<script>
import Seller from "./components/seller.vue";
import Trend from "./components/trend.vue";
import Map from './components/map.vue'
import Rank from './components/rank.vue'
import Hot from './components/hot.vue'
import Stock from "./components/stock.vue";

export default {
  name: "App",
  components: {
    Seller,
    Trend,
    Map,
    Rank,
    Hot,
    Stock,
  },
};
</script>

<style>
.wrap {
  width: 100vw;
  height: 100vh;
  background-color: rgb(14, 20, 110);
  overflow: hidden;
  background-image: url('./assets/digital.png');
  background-repeat: no-repeat;
  background-size: 100% 94%;
  background-position: 0 98%;
}

.title {
  width: 100%;
  height: 10%;
  position: relative;
  z-index: 100;
}

.title > h2 {
  font-family: "Futura";
  color: #ffffff;
  text-align: center;
  font-size: 30px;
  text-transform: uppercase;
  font-weight: normal;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.chart {
  width: 98%;
  height: 88%;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}

.chartBox {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.chartBox:first-child {
  width: 30%;
  position: relative;
}

.chartBox:nth-child(2) {
  width: 38%;
  position: relative;
}

.chartBox:last-child {
  width: 30%;
  position: relative;
}
</style>
