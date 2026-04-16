import Mock from "mockjs";

// 表格数据项接口
export interface TableDataItem {
  id: number;
  code: string; // 编号
  description: string; // 描述
  callCount: number; // 调用次数
  updateTime: string; // 更新时间
  status: "active" | "inactive" | "pending"; // 状态
  category: string; // 分类
}

// 生成单个表格数据项
const generateTableItem = (id: number): TableDataItem => {
  const Random = Mock.Random;

  // 生成编号：格式如 "API-001", "SVC-202501", "TASK-1001"
  const codePrefixes = ["API", "SVC", "TASK", "JOB", "FUNC", "MODULE"];
  const prefix = Random.pick(codePrefixes);
  const codeNumber = Random.integer(1, 9999).toString().padStart(4, "0");
  const code = `${prefix}-${codeNumber}`;

  // 生成描述
  const descriptions = [
    "用户信息查询接口",
    "订单处理服务",
    "支付网关调用",
    "数据同步任务",
    "日志分析函数",
    "报表生成模块",
    "消息推送服务",
    "缓存更新任务",
    "权限验证接口",
    "文件上传处理",
  ];
  const description = `${Random.pick(descriptions)} v${Random.float(1, 3, 1, 1)}`;

  // 生成调用次数（模拟真实分布：有些服务调用频繁，有些较少）
  let callCount: number;
  const distribution = Random.float(0, 1);
  if (distribution < 0.1) {
    // 10% 高频调用：10万-100万次
    callCount = Random.integer(100000, 1000000);
  } else if (distribution < 0.4) {
    // 30% 中频调用：1万-10万次
    callCount = Random.integer(10000, 100000);
  } else {
    // 60% 低频调用：1-1万次
    callCount = Random.integer(1, 10000);
  }

  // 生成更新时间（最近30天内）
  const updateTime = Random.datetime("yyyy-MM-dd HH:mm:ss");

  // 状态
  const statuses: ("active" | "inactive" | "pending")[] = ["active", "inactive", "pending"];
  const status = Random.pick(statuses);

  // 分类
  const categories = ["接口服务", "后台任务", "定时作业", "数据处理", "系统监控"];
  const category = Random.pick(categories);

  return {
    id,
    code,
    description,
    callCount,
    updateTime,
    status,
    category,
  };
};

// 生成表格数据
export const generateTableData = (count: number): TableDataItem[] => {
  console.log(`开始生成 ${count.toLocaleString()} 条表格数据...`);

  const data: TableDataItem[] = [];
  const batchSize = 10000; // 分批生成，避免内存问题

  for (let batch = 0; batch < Math.ceil(count / batchSize); batch++) {
    const start = batch * batchSize;
    const end = Math.min(start + batchSize, count);

    for (let i = start; i < end; i++) {
      data.push(generateTableItem(i + 1));
    }

    // 每生成一批数据输出进度
    if ((batch + 1) * batchSize <= count) {
      console.log(`已生成 ${((batch + 1) * batchSize).toLocaleString()} 条数据...`);
    }
  }

  console.log(`表格数据生成完成，共 ${data.length.toLocaleString()} 条`);
  return data;
};

// 获取分页数据（用于演示，实际大数据量应该使用虚拟滚动）
export const getPaginatedData = (
  data: TableDataItem[],
  page: number,
  pageSize: number
): TableDataItem[] => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return data.slice(start, end);
};

// 根据条件筛选数据
export const filterTableData = (
  data: TableDataItem[],
  filters: {
    status?: string;
    category?: string;
    minCallCount?: number;
    maxCallCount?: number;
    searchText?: string;
  }
): TableDataItem[] => {
  return data.filter(item => {
    // 状态筛选
    if (filters.status && item.status !== filters.status) {
      return false;
    }

    // 分类筛选
    if (filters.category && item.category !== filters.category) {
      return false;
    }

    // 调用次数范围筛选
    if (filters.minCallCount && item.callCount < filters.minCallCount) {
      return false;
    }
    if (filters.maxCallCount && item.callCount > filters.maxCallCount) {
      return false;
    }

    // 文本搜索（编号或描述）
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      const matchesCode = item.code.toLowerCase().includes(searchLower);
      const matchesDescription = item.description.toLowerCase().includes(searchLower);
      if (!matchesCode && !matchesDescription) {
        return false;
      }
    }

    return true;
  });
};

// 统计数据信息
export const getTableStats = (data: TableDataItem[]) => {
  if (data.length === 0) {
    return {
      total: 0,
      active: 0,
      inactive: 0,
      pending: 0,
      totalCalls: 0,
      avgCalls: 0,
      maxCalls: 0,
      minCalls: 0,
    };
  }

  const calls = data.map(item => item.callCount);
  const totalCalls = calls.reduce((sum, count) => sum + count, 0);

  return {
    total: data.length,
    active: data.filter(item => item.status === "active").length,
    inactive: data.filter(item => item.status === "inactive").length,
    pending: data.filter(item => item.status === "pending").length,
    totalCalls,
    avgCalls: Math.round(totalCalls / data.length),
    maxCalls: Math.max(...calls),
    minCalls: Math.min(...calls),
  };
};

export default {
  generateTableData,
  getPaginatedData,
  filterTableData,
  getTableStats,
};
