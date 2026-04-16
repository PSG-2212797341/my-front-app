import { Dropdown, type MenuProps } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import type { StatCardData } from "../types/analytics";

interface StatCardProps {
  data: StatCardData;
}

const StatCard = ({ data }: StatCardProps) => {
  const dropdownItems: MenuProps["items"] = [
    {
      key: "1",
      label: "查看详情",
    },
    {
      key: "2",
      label: "编辑",
    },
    {
      key: "3",
      label: "刷新数据",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow duration-300">
      {/* 卡片头部 */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-600">{data.title}</h3>
        <Dropdown menu={{ items: dropdownItems }} placement="bottomRight" trigger={["click"]}>
          <EllipsisOutlined className="text-gray-400 hover:text-gray-700 cursor-pointer text-lg" />
        </Dropdown>
      </div>

      {/* 主要内容 */}
      <div className="flex items-center mb-5">
        {/* 图标 */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mr-4"
          style={{ backgroundColor: data.iconBgColor }}
        >
          <img
            src={data.icon}
            alt={data.iconAlt}
            className="w-6 h-6"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>

        {/* 数值 */}
        <div>
          <div className="text-2xl font-bold text-gray-800">{data.value}</div>
          <div className="text-xs text-gray-500 mt-1">
            {data.subtitle}: <span className="font-medium">{data.subtitleValue}</span>
          </div>
        </div>
      </div>

      {/* 趋势比较 */}
      <div className="pt-4 border-t border-gray-100">
        {data.comparisons.map((comparison, index) => (
          <div key={index} className="flex justify-between items-center mb-2 last:mb-0">
            <span className="text-sm text-gray-500">{comparison.label}</span>
            <div className="flex items-center">
              {comparison.trend === "up" ? (
                <span className="text-green-500 text-sm font-medium flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {comparison.value}
                </span>
              ) : (
                <span className="text-red-500 text-sm font-medium flex items-center">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {comparison.value}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatCard;
