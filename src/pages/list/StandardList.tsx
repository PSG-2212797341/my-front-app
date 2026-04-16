import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Table, Button, Space, Card, Input, Form, Row, Col } from "antd";
import type { ColumnsType } from "antd/es/table";
import { generateTableData } from "@/mock/tableData";
import type { TableDataItem } from "@/mock/tableData";
import { SearchOutlined, ReloadOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";

const StandardList = () => {
  const [data, setData] = useState<TableDataItem[]>([]);
  const [filteredData, setFilteredData] = useState<TableDataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [form] = Form.useForm();

  // 初始化数据
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);

      try {
        const dataSize = 5000; // 减少数据量提高性能
        console.log(`生成 ${dataSize.toLocaleString()} 条数据...`);

        const tableData = generateTableData(dataSize);

        if (isMounted) {
          setData(tableData);
          setFilteredData(tableData); // 初始化筛选数据
          console.log(`数据加载完成，共 ${tableData.length.toLocaleString()} 条`);
          setLoading(false);
        }
      } catch (error) {
        console.error("数据加载失败:", error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // 定义筛选值类型
  interface FilterValues {
    code?: string;
    description?: string;
    callCountRange?: [number, number];
    status?: string;
    updateTimeRange?: [Dayjs, Dayjs];
  }

  // 处理筛选
  const handleFilter = useCallback(
    (values: FilterValues) => {
      console.log("筛选条件:", values);

      let filtered = [...data];

      // 按编号筛选
      if (values.code) {
        filtered = filtered.filter(item =>
          item.code.toLowerCase().includes(values.code!.toLowerCase())
        );
      }

      // 按描述筛选
      if (values.description) {
        filtered = filtered.filter(item =>
          item.description.toLowerCase().includes(values.description!.toLowerCase())
        );
      }

      // 按调用次数范围筛选
      if (values.callCountRange) {
        const [min, max] = values.callCountRange;
        filtered = filtered.filter(item => item.callCount >= min && item.callCount <= max);
      }

      // 按状态筛选
      if (values.status) {
        // 由于TableDataItem类型可能没有status字段，这里使用类型断言
        filtered = filtered.filter(item => {
          const itemWithStatus = item as TableDataItem & { status?: string };
          return itemWithStatus.status === values.status;
        });
      }

      // 按更新时间范围筛选
      if (values.updateTimeRange && values.updateTimeRange.length === 2) {
        const [start, end] = values.updateTimeRange;
        filtered = filtered.filter(item => {
          const updateTime = new Date(item.updateTime).getTime();
          return updateTime >= start.valueOf() && updateTime <= end.valueOf();
        });
      }

      setFilteredData(filtered);
    },
    [data]
  );

  // 重置筛选
  const handleReset = useCallback(() => {
    form.resetFields();
    setFilteredData(data);
  }, [form, data]);

  // 使用useRef创建防抖函数引用
  const selectTimeoutRef = useRef<number | null>(null);

  // 处理行选择变化 - 多选（使用防抖优化性能）
  const onSelectChange = useCallback((newSelectedRowKeys: React.Key[]) => {
    // 清除之前的定时器
    if (selectTimeoutRef.current) {
      clearTimeout(selectTimeoutRef.current);
    }

    // 设置新的定时器，延迟更新状态以减少渲染次数
    selectTimeoutRef.current = window.setTimeout(() => {
      setSelectedRowKeys(newSelectedRowKeys);
    }, 50); // 50ms防抖延迟
  }, []);

  // 处理配置操作（使用useCallback优化）
  const handleConfigure = useCallback((record: TableDataItem) => {
    alert(`配置项目: ${record.code}\n描述: ${record.description}`);
  }, []);

  // 处理订阅操作（使用useCallback优化）
  const handleSubscribe = useCallback((record: TableDataItem) => {
    alert(`订阅项目: ${record.code}\n您将收到该服务的状态更新通知`);
  }, []);

  // 表格列定义 - 使用useMemo优化
  const columns: ColumnsType<TableDataItem> = useMemo(
    () => [
      {
        title: "编号",
        dataIndex: "code",
        key: "code",
        width: 150,
      },
      {
        title: "描述",
        dataIndex: "description",
        key: "description",
        width: 300,
      },
      {
        title: "调用次数",
        dataIndex: "callCount",
        key: "callCount",
        width: 150,
        render: (count: number) => count.toLocaleString(),
      },
      {
        title: "更新时间",
        dataIndex: "updateTime",
        key: "updateTime",
        width: 180,
      },
      {
        title: "操作",
        key: "action",
        width: 200,
        render: (_, record) => (
          <Space size="small">
            <Button type="link" size="small" onClick={() => handleConfigure(record)}>
              配置
            </Button>
            <Button type="link" size="small" onClick={() => handleSubscribe(record)}>
              订阅
            </Button>
          </Space>
        ),
      },
    ],
    [handleConfigure, handleSubscribe]
  );

  // 使用useMemo优化rowSelection配置
  const rowSelectionConfig = useMemo(
    () => ({
      selectedRowKeys,
      onChange: onSelectChange,
      type: "checkbox" as const, // 多选模式
      columnWidth: 60, // 设置选择列的宽度为60px
      // 添加性能优化选项
      preserveSelectedRowKeys: true, // 保留已选行键，避免重新渲染时丢失
      fixed: true, // 固定选择列，提高渲染性能
      getCheckboxProps: () => ({
        // 可以在这里添加额外的checkbox属性
      }),
    }),
    [selectedRowKeys, onSelectChange]
  );

  return (
    <div className="bg-white">
      <Card title="数据列表">
        {/* 筛选表单 - 水平布局 */}
        <Form
          form={form}
          onFinish={handleFilter}
          layout="horizontal"
          className="mb-6"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="编号" name="code" labelAlign="right">
                <Input placeholder="请输入编号" allowClear prefix={<SearchOutlined />} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="描述" name="description" labelAlign="right">
                <Input placeholder="请输入描述关键词" allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item label="状态" name="description" labelAlign="right">
                <Input placeholder="请输入状态" allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <Form.Item label="操作" labelAlign="right" className="mb-0">
                <Space>
                  <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                    筛选
                  </Button>
                  <Button onClick={handleReset} icon={<ReloadOutlined />}>
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        {/* 数据表格 */}
        <div className="table-container">
          <Table
            rowSelection={rowSelectionConfig}
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            loading={loading}
            virtual // 启用虚拟滚动
            scroll={{ x: 1000, y: 500 }}
            size="middle"
            pagination={false} // 禁用分页，使用无限滚动
            bordered={true}
            showHeader={true}
            className="custom-table"
            // 样式优化
            rowClassName={() => "table-row"}
            onRow={record => ({
              onClick: () => {
                console.log("点击行:", record);
              },
            })}
          />
        </div>
      </Card>
    </div>
  );
};

export default StandardList;
