import React, { useRef } from "react";
import { Card, message, Space } from "antd";
import type { DynamicFormRef } from "@/components/dynamic-form";
import { DynamicForm } from "@/components/dynamic-form";
import { projectFormConfig } from "./config/formConfig";

const BasicForm: React.FC = () => {
  const formRef = useRef<DynamicFormRef>(null);

  // 处理表单提交
  const handleSubmit = (values: unknown) => {
    console.log("表单提交数据:", values);
    message.success("表单提交成功！");

    // 可以通过formRef操作表单
    if (formRef.current) {
      console.log("当前表单值:", formRef.current.getValues());
    }
  };

  // 处理表单值变化
  const handleValuesChange = (changedValues: unknown, allValues: unknown) => {
    console.log("表单值变化:", changedValues);
    console.log("所有表单值:", allValues);
  };

  // 处理表单重置
  const handleReset = () => {
    message.info("表单已重置");
  };

  return (
    <div>
      <Space size="large" style={{ width: "100%" }}>
        <Card title="基础表单">
          <DynamicForm
            {...projectFormConfig}
            onSubmit={handleSubmit}
            onValuesChange={handleValuesChange}
            onReset={handleReset}
          />
        </Card>
      </Space>
    </div>
  );
};

export default BasicForm;
