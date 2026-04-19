// 统计卡片组件数据类型
export interface StatCardData {
  id: number;
  title: string;
  icon: string;
  iconAlt: string;
  iconBgColor: string;
  subtitle: string;
  comparisons: Array<{
    label: string;
    trend: "up" | "down";
  }>;
}
