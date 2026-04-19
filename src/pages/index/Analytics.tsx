import { useEffect, useState, useRef } from "react";
import { Select, Tabs, type TabsProps } from "antd";
import StatCard from "./components/StatCard";
import BarChart from "./components/BarChart";
import { createTotalItem, deleteAllTotal, getAllTotal } from "@/api/index.api";
import type { GetAllTotalReturn } from "@/api/types/index.api.type";
import { totalItem } from "@/config/analytics.config";

type DataType = "sales" | "visits";
type TimeRange = "days" | "weeks" | "months" | "years";

// 主组件
const Analytics = () => {
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

  // 使用mock数据生成统计数据

  // 保存初始化数据
  const [initData, setInitData] = useState<GetAllTotalReturn>();

  const hasFetched = useRef(false);
  useEffect(() => {
    // 使用ref来避免在Strict Mode下执行两次
    if (!hasFetched.current) {
      hasFetched.current = true;

      // 直接在useEffect中执行数据获取逻辑
      const fetchData = async () => {
        const totalFlag = await deleteAllTotal();
        if (totalFlag.success) {
          const allRequest = ["总销售额", "访问量", "支付笔数", "线上购物转换率"].map(
            (name, index) => {
              // 为每个项目生成不同的随机值
              const baseRandom = Math.random();
              const itemRandom = Math.random();

              // 根据项目类型调整数值范围
              let totalMultiplier = 100000;
              let dailyAveMultiplier = 100000;
              const dayOnDayRange = 100;
              const weakOnWeakRange = 100;

              // 根据不同项目类型调整数值
              switch (index) {
                case 0: // 总销售额
                  totalMultiplier = 200000;
                  dailyAveMultiplier = 50000;
                  break;
                case 1: // 访问量
                  totalMultiplier = 150000;
                  dailyAveMultiplier = 30000;
                  break;
                case 2: // 支付笔数
                  totalMultiplier = 80000;
                  dailyAveMultiplier = 20000;
                  break;
                case 3: // 线上购物转换率
                  totalMultiplier = 50000;
                  dailyAveMultiplier = 10000;
                  break;
              }

              return createTotalItem({
                name: name,
                total: Math.floor(baseRandom * totalMultiplier),
                dailyAve: Math.floor(itemRandom * dailyAveMultiplier),
                dayOnDay: Math.floor((baseRandom - 0.5) * 2 * dayOnDayRange), // 允许正负值
                weakOnWeak: Math.floor((itemRandom - 0.5) * 2 * weakOnWeakRange), // 允许正负值
              });
            }
          );
          // 使用Promise.all等待所有的createTotalItem调用完成
          await Promise.all(allRequest);
          // 所有Promise完成后，继续执行下一步
          const initData = await getAllTotal();
          setInitData(initData);
        } else {
          throw Error("初始化数据失败");
        }
      };

      fetchData();
    }
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        {/* 统计卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {initData?.data.map((stat, index) => (
            <StatCard key={stat.name} data={stat} configItem={totalItem[index]} />
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
