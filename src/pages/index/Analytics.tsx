import { useEffect, useState } from "react";
import { Select, Tabs, type TabsProps } from "antd";
import type { StatCardData } from "./types/analytics";
import { generateStatsData } from "@/mock/analytics";
import StatCard from "./components/StatCard";
import BarChart from "./components/BarChart";
import { createTotalItem } from "@/api/index.api";

type DataType = "sales" | "visits";
type TimeRange = "days" | "weeks" | "months" | "years";

// 主组件
const Analytics = () => {
  // 使用mock数据生成统计数据
  const statsData: StatCardData[] = generateStatsData();

  // 分类状态
  const [dataType, setDataType] = useState<DataType>("sales");
  const [timeRange, setTimeRange] = useState<TimeRange>("weeks");

  const items: TabsProps["items"] = [
    {
      key: "sales",
      label: "销售量",
    },
    {
      key: "visits",
      label: "访问量",
    },
  ];

  const onChange = (key: string) => {
    setDataType(key as DataType);
  };

  const handleChange = (value: string) => {
    setTimeRange(value as TimeRange);
  };

  const getData = async () => {
    await createTotalItem({
      name: "2",
      total: 2,
      describeName: "2",
      dailyAve: 2,
      dayOnDay: 2,
      weakOnWeak: 2,
    }).then(res => {
      console.log(res);
    });
  };

  useEffect(() => {
    getData();
  });

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        {/* 统计卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map(stat => (
            <StatCard key={stat.id} data={stat} />
          ))}
        </div>
        <div className="mt-7.5 mb-7.5 bg-white rounded-xl h-17.5 flex justify-between items-center px-7.5">
          <Tabs
            defaultActiveKey="sales"
            items={items}
            onChange={onChange}
            tabBarStyle={{ borderBottom: "none" }}
          />
          <Select
            placeholder="分类依据"
            defaultValue="weeks"
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "days", label: "日" },
              { value: "weeks", label: "周" },
              { value: "months", label: "月" },
              { value: "years", label: "近10年" },
            ]}
          />
        </div>
        <BarChart dataType={dataType} timeRange={timeRange} />
      </div>
    </div>
  );
};

export default Analytics;
