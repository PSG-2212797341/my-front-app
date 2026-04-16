import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { generateBarChartData } from "@/mock/analytics";

interface BarChartProps {
  dataType: "sales" | "visits";
  timeRange: "days" | "weeks" | "months" | "years";
}

const BarChart = ({ dataType, timeRange }: BarChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // 初始化echarts实例
    const chart = echarts.init(chartRef.current);

    // 生成mock数据（10w+条数据）
    const chartData = generateBarChartData(dataType, timeRange);

    // 配置项
    const option: echarts.EChartsOption = {
      title: {
        text: dataType === "sales" ? "销售额趋势" : "访问量趋势",
        textStyle: {
          color: "rgba(32, 37, 58, 1)",
          fontSize: "0.875rem",
        },
      },
      xAxis: {
        type: "category",
        data: chartData.labels,
        axisLine: {
          lineStyle: {
            color: "#E5E7EB",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#6B7280",
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#6B7280",
        },
        splitLine: {
          lineStyle: {
            color: "#F3F4F6",
            type: "dashed",
          },
        },
      },
      series: [
        {
          data: chartData.data,
          type: "bar",
          itemStyle: {
            color: dataType === "sales" ? "rgba(98, 54, 255, 1)" : "rgba(32, 224, 165, 1)",
            borderRadius: [4, 4, 0, 0],
          },
          barWidth: "40%",
        },
      ],
      grid: {
        left: "3%",
        right: "4%",
        bottom: timeRange === "days" ? "15%" : "3%",
        top: "13%",
        containLabel: true,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
        formatter: function (params: unknown) {
          // 安全地处理参数
          if (!Array.isArray(params) || params.length === 0) {
            return "";
          }

          const param = params[0];
          if (!param || typeof param !== "object") {
            return "";
          }

          // 类型安全的属性访问
          const paramObj = param as Record<string, unknown>;
          const name = typeof paramObj.name === "string" ? paramObj.name : "";
          const color = typeof paramObj.color === "string" ? paramObj.color : "#6236FF";

          // 获取值
          let value: string | number = "";
          if (Array.isArray(paramObj.value)) {
            value =
              typeof paramObj.value[1] === "number"
                ? paramObj.value[1]
                : typeof paramObj.value[1] === "string"
                  ? paramObj.value[1]
                  : "";
          } else if (typeof paramObj.value === "number") {
            value = paramObj.value;
          } else if (typeof paramObj.value === "string") {
            value = paramObj.value;
          }

          return `
            <div style="font-size: 12px; color: #666;">
              <div>${name}</div>
              <div style="margin-top: 4px;">
                <span style="display: inline-block; width: 10px; height: 10px; background: ${color}; border-radius: 2px; margin-right: 4px;"></span>
                ${dataType === "sales" ? "销售额" : "访问量"}: <strong>${value}</strong>
              </div>
            </div>
          `;
        },
      },
      // 数据缩放功能（特别是对于大量数据）
      dataZoom:
        timeRange === "days"
          ? [
              {
                type: "inside",
                xAxisIndex: 0,
                start: 0,
                end: 20, // 默认显示20%的数据
              },
              {
                show: true,
                xAxisIndex: 0,
                type: "slider",
                bottom: "5%",
                start: 0,
                end: 20,
                height: 20,
              },
            ]
          : undefined,
    };

    // 设置配置项
    chart.setOption(option);

    // 响应窗口大小变化
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener("resize", handleResize);

    // 清理函数
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, [dataType, timeRange]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* 图表 */}
      <div ref={chartRef} style={{ width: "100%", height: "400px" }} />
    </div>
  );
};

export default BarChart;
