import type { StatCardData } from "@/pages/index/types/analytics";
import goldSvg from "@/assets/svg/gold.svg";
import pointerSvg from "@/assets/svg/pointer.svg";
import messageSvg from "@/assets/svg/message.svg";
import onlineSvg from "@/assets/svg/online.svg";

export const totalItem: StatCardData[] = [
  {
    id: 1,
    title: "总销售额",
    icon: goldSvg,
    iconAlt: "金币",
    iconBgColor: "#6236FF",
    subtitle: "日均销售额",
    comparisons: [
      {
        label: "周同比",
        trend: "up",
      },
      {
        label: "日同比",
        trend: "down",
      },
    ],
  },
  {
    id: 2,
    title: "访问量",
    icon: pointerSvg,
    iconAlt: "指针",
    iconBgColor: "#B620E0",
    subtitle: "日访问量",
    comparisons: [
      {
        label: "周同比",
        trend: "up",
      },
      {
        label: "日同比",
        trend: "up",
      },
    ],
  },
  {
    id: 3,
    title: "支付笔数",
    icon: messageSvg,
    iconAlt: "消息",
    iconBgColor: "#4AB8FF",
    subtitle: "转化率",
    comparisons: [
      {
        label: "周同比",
        trend: "down",
      },
      {
        label: "日同比",
        trend: "up",
      },
    ],
  },
  {
    id: 4,
    title: "线上购物转化率",
    icon: onlineSvg,
    iconAlt: "在线",
    iconBgColor: "#20E0A5",
    subtitle: "日均销售额",
    comparisons: [
      {
        label: "周同比",
        trend: "up",
      },
      {
        label: "日同比",
        trend: "up",
      },
    ],
  },
];
