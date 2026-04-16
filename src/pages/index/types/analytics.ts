// 统计卡片组件数据类型
export interface StatCardData {
  id: number;
  title: string;
  value: string;
  icon: string;
  iconAlt: string;
  iconBgColor: string;
  subtitle: string;
  subtitleValue: string;
  comparisons: Array<{
    label: string;
    value: string;
    trend: "up" | "down";
  }>;
}
