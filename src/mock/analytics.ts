import Mock from "mockjs";
import type { StatCardData } from "@/pages/index/types/analytics";
import goldSvg from "@/assets/svg/gold.svg";
import pointerSvg from "@/assets/svg/pointer.svg";
import onlineSvg from "@/assets/svg/online.svg";
import messageSvg from "@/assets/svg/message.svg";

// 生成统计卡片mock数据
export const generateStatsData = (): StatCardData[] => {
  const Random = Mock.Random;

  // 保持原有的4个数据项
  const titles = ["总销售额", "访问量", "支付笔数", "线上购物转化率"];
  const icons = [goldSvg, pointerSvg, messageSvg, onlineSvg];
  const iconAlts = ["金币", "指针", "消息", "在线"];
  const iconBgColors = ["#6236FF", "#B620E0", "#4AB8FF", "#20E0A5"];
  const subtitles = ["日均销售额", "日访问量", "转化率", "日均销售额"];
  const subtitleUnits = ["￥", "", "%", "￥"];

  return titles.map((title, index) => {
    // 生成随机数值
    const mainValue = Random.integer(50000, 200000);
    const subtitleValue = Random.integer(50, 200);
    const comparisonValue1 = Random.float(1, 20, 1, 1);
    const comparisonValue2 = Random.float(1, 15, 1, 1);

    // 格式化数值
    const formattedMainValue = mainValue.toLocaleString();
    let formattedSubtitleValue = subtitleValue.toString();

    // 添加单位
    if (subtitleUnits[index] === "￥") {
      formattedSubtitleValue = `${subtitleUnits[index]}${subtitleValue}`;
    } else if (subtitleUnits[index] === "%") {
      formattedSubtitleValue = `${subtitleValue}${subtitleUnits[index]}`;
    } else {
      formattedSubtitleValue = subtitleValue.toString();
    }

    // 随机生成趋势（up或down）
    const trend1: "up" | "down" = Random.pick(["up", "down"]);
    const trend2: "up" | "down" = Random.pick(["up", "down"]);

    return {
      id: index + 1,
      title,
      value: formattedMainValue,
      icon: icons[index],
      iconAlt: iconAlts[index],
      iconBgColor: iconBgColors[index],
      subtitle: subtitles[index],
      subtitleValue: formattedSubtitleValue,
      comparisons: [
        {
          label: "周同比",
          value: `${trend1 === "up" ? "+" : "-"}${comparisonValue1}%`,
          trend: trend1,
        },
        {
          label: "日同比",
          value: `${trend2 === "up" ? "+" : "-"}${comparisonValue2}%`,
          trend: trend2,
        },
      ],
    };
  });
};

// 生成柱形图mock数据
export const generateBarChartData = (
  type: "sales" | "visits" = "sales",
  timeRange: "days" | "weeks" | "months" | "years" = "weeks",
  dataCount: number = 100000
) => {
  const Random = Mock.Random;

  // 根据时间范围确定数据点数量和标签
  let pointCount: number;
  let labels: string[];

  switch (timeRange) {
    case "days":
      // 一天的数据点（每5分钟一个点，共288个点）
      pointCount = 288;
      labels = Array.from({ length: 288 }, (_, i) => {
        const hour = Math.floor(i / 12);
        const minute = (i % 12) * 5;
        return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
      });
      break;
    case "weeks":
      // 今年的所有周（假设52周）
      pointCount = 52;
      labels = Array.from({ length: 52 }, (_, i) => `第${i + 1}周`);
      break;
    case "months":
      // 今年的所有月（12个月）
      pointCount = 12;
      labels = [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ];
      break;
    case "years": {
      // 最近10年
      pointCount = 10;
      const currentYear = new Date().getFullYear();
      labels = Array.from({ length: 10 }, (_, i) => `${currentYear - 9 + i}年`);
      break;
    }
    default:
      pointCount = 52;
      labels = Array.from({ length: 52 }, (_, i) => `第${i + 1}周`);
  }

  // 根据数据类型确定数值范围
  let minValue: number, maxValue: number;
  if (type === "sales") {
    // 销售量数据范围（根据时间范围调整）
    switch (timeRange) {
      case "days":
        minValue = 100;
        maxValue = 1000;
        break;
      case "weeks":
        minValue = 5000;
        maxValue = 30000;
        break;
      case "months":
        minValue = 20000;
        maxValue = 100000;
        break;
      case "years":
        minValue = 100000;
        maxValue = 500000;
        break;
      default:
        minValue = 5000;
        maxValue = 30000;
    }
  } else {
    // 访问量数据范围（根据时间范围调整）
    switch (timeRange) {
      case "days":
        minValue = 50;
        maxValue = 500;
        break;
      case "weeks":
        minValue = 2000;
        maxValue = 15000;
        break;
      case "months":
        minValue = 10000;
        maxValue = 50000;
        break;
      case "years":
        minValue = 50000;
        maxValue = 200000;
        break;
      default:
        minValue = 2000;
        maxValue = 15000;
    }
  }

  // 生成数据（添加一些趋势变化，使数据更真实）
  const data = Array.from({ length: pointCount }, (_, index) => {
    const baseValue = Random.integer(minValue, maxValue);
    // 添加一些趋势：前1/3上升，中间1/3平稳，后1/3下降
    let trendFactor = 1;
    if (index < pointCount / 3) {
      // 上升趋势
      trendFactor = 0.8 + (index / (pointCount / 3)) * 0.4;
    } else if (index < (2 * pointCount) / 3) {
      // 平稳
      trendFactor = 1.0 + Random.float(-0.1, 0.1);
    } else {
      // 下降趋势
      trendFactor = 1.2 - ((index - (2 * pointCount) / 3) / (pointCount / 3)) * 0.4;
    }
    return Math.round(baseValue * trendFactor);
  });

  // 生成总条数10w+的完整数据集（用于统计，不全部显示）
  const totalDataCount = Math.max(dataCount, 100000);
  const totalData = Array.from({ length: totalDataCount }, () =>
    Random.integer(minValue, maxValue)
  );

  return {
    type,
    timeRange,
    labels,
    data,
    totalDataCount: totalData.length,
    summary: {
      total: totalData.reduce((sum, val) => sum + val, 0),
      average: Math.round(totalData.reduce((sum, val) => sum + val, 0) / totalData.length),
      max: Math.max(...totalData),
      min: Math.min(...totalData),
    },
  };
};

// 默认导出所有mock数据生成函数
export default {
  generateStatsData,
  generateBarChartData,
};
