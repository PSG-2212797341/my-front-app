import Mock from "mockjs";

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
  generateBarChartData,
};
