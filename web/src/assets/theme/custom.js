(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    define(["exports", "echarts"], factory);
  } else if (
    typeof exports === "object" &&
    typeof exports.nodeName !== "string"
  ) {
    // CommonJS
    factory(exports, require("echarts"));
  } else {
    // Browser globals
    factory({}, root.echarts);
  }
})(this, function (exports, echarts) {
  var log = function (msg) {
    if (typeof console !== "undefined") {
      console && console.error && console.error(msg);
    }
  };
  if (!echarts) {
    log("ECharts is not Loaded");
    return;
  }
  echarts.registerTheme("custom", {
    color: [
      "#ffc321",
      "#5d46fa",
      "#cfff82",
      "#ff527a",
      "#23b6f7",
      "#d4a4eb",
      "#d2f5a6",
      "#76f2f2",
    ],
    backgroundColor: "rgba(22,30,138,1)",
    textStyle: {},
    title: {
      textStyle: {
        color: "#ffffff",
      },
      subtextStyle: {
        color: "#96a7ff",
      },
    },
    line: {
      itemStyle: {
        borderWidth: "4",
      },
      lineStyle: {
        width: "2",
      },
      symbolSize: "0",
      symbol: "diamond",
      smooth: true,
    },
    radar: {
      itemStyle: {
        borderWidth: "4",
      },
      lineStyle: {
        width: "2",
      },
      symbolSize: "0",
      symbol: "diamond",
      smooth: true,
    },
    bar: {
      itemStyle: {
        barBorderWidth: "0",
        barBorderColor: "#96a7ff",
      },
    },
    pie: {
      itemStyle: {
        borderWidth: "0",
        borderColor: "#96a7ff",
      },
    },
    scatter: {
      itemStyle: {
        borderWidth: "0",
        borderColor: "#96a7ff",
      },
    },
    boxplot: {
      itemStyle: {
        borderWidth: "0",
        borderColor: "#96a7ff",
      },
    },
    parallel: {
      itemStyle: {
        borderWidth: "0",
        borderColor: "#96a7ff",
      },
    },
    sankey: {
      itemStyle: {
        borderWidth: "0",
        borderColor: "#96a7ff",
      },
    },
    funnel: {
      itemStyle: {
        borderWidth: "0",
        borderColor: "#96a7ff",
      },
    },
    gauge: {
      itemStyle: {
        borderWidth: "0",
        borderColor: "#96a7ff",
      },
    },
    candlestick: {
      itemStyle: {
        color: "#ed3455",
        color0: "#1fedb0",
        borderColor: "#fc97af",
        borderColor0: "#87f7cf",
        borderWidth: "0",
      },
    },
    graph: {
      itemStyle: {
        borderWidth: "0",
        borderColor: "#96a7ff",
      },
      lineStyle: {
        width: "1",
        color: "#ffffff",
      },
      symbolSize: "0",
      symbol: "diamond",
      smooth: true,
      color: [
        "#ffc321",
        "#5d46fa",
        "#cfff82",
        "#ff527a",
        "#23b6f7",
        "#d4a4eb",
        "#d2f5a6",
        "#76f2f2",
      ],
      label: {
        color: "#ffffff",
      },
    },
    map: {
      itemStyle: {
        areaColor: "#f3f3f3",
        borderColor: "#999999",
        borderWidth: 0.5,
      },
      label: {
        color: "#893448",
      },
      emphasis: {
        itemStyle: {
          areaColor: "rgba(255,178,72,1)",
          borderColor: "#eb8146",
          borderWidth: 1,
        },
        label: {
          color: "rgb(137,52,72)",
        },
      },
    },
    geo: {
      itemStyle: {
        areaColor: "#f3f3f3",
        borderColor: "#999999",
        borderWidth: 0.5,
      },
      label: {
        color: "#893448",
      },
      emphasis: {
        itemStyle: {
          areaColor: "rgba(255,178,72,1)",
          borderColor: "#eb8146",
          borderWidth: 1,
        },
        label: {
          color: "rgb(137,52,72)",
        },
      },
    },
    categoryAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "#2f4bd4",
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: "#333",
        },
      },
      axisLabel: {
        show: true,
        color: "#516efc",
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ["#e6e6e6"],
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
        },
      },
    },
    valueAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "#2f4bd4",
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: "#333",
        },
      },
      axisLabel: {
        show: true,
        color: "#516efc",
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ["#e6e6e6"],
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
        },
      },
    },
    logAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "#2f4bd4",
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: "#333",
        },
      },
      axisLabel: {
        show: true,
        color: "#516efc",
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ["#e6e6e6"],
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
        },
      },
    },
    timeAxis: {
      axisLine: {
        show: true,
        lineStyle: {
          color: "#2f4bd4",
        },
      },
      axisTick: {
        show: false,
        lineStyle: {
          color: "#333",
        },
      },
      axisLabel: {
        show: true,
        color: "#516efc",
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: ["#e6e6e6"],
        },
      },
      splitArea: {
        show: false,
        areaStyle: {
          color: ["rgba(250,250,250,0.05)", "rgba(200,200,200,0.02)"],
        },
      },
    },
    toolbox: {
      iconStyle: {
        borderColor: "#516efc",
      },
      emphasis: {
        iconStyle: {
          borderColor: "#d4daff",
        },
      },
    },
    legend: {
      textStyle: {
        color: "#516efc",
      },
    },
    tooltip: {
      axisPointer: {
        lineStyle: {
          color: "#f0f0f0",
          width: "0",
        },
        crossStyle: {
          color: "#f0f0f0",
          width: "0",
        },
      },
    },
    timeline: {
      lineStyle: {
        color: "#87f7cf",
        width: 1,
      },
      itemStyle: {
        color: "#87f7cf",
        borderWidth: 1,
      },
      controlStyle: {
        color: "#87f7cf",
        borderColor: "#87f7cf",
        borderWidth: 0.5,
      },
      checkpointStyle: {
        color: "#fc97af",
        borderColor: "#fc97af",
      },
      label: {
        color: "#87f7cf",
      },
      emphasis: {
        itemStyle: {
          color: "#f7f494",
        },
        controlStyle: {
          color: "#87f7cf",
          borderColor: "#87f7cf",
          borderWidth: 0.5,
        },
        label: {
          color: "#87f7cf",
        },
      },
    },
    visualMap: {
      color: ["#f595ac", "#87f7cf"],
    },
    dataZoom: {
      backgroundColor: "rgba(255,255,255,0)",
      dataBackgroundColor: "rgba(114,204,255,1)",
      fillerColor: "rgba(114,204,255,0.2)",
      handleColor: "#72ccff",
      handleSize: "100%",
      textStyle: {
        color: "#333333",
      },
    },
    markPoint: {
      label: {
        color: "#ffffff",
      },
      emphasis: {
        label: {
          color: "#ffffff",
        },
      },
    },
  });
});
