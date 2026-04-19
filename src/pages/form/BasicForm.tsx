import React from "react";
import { Card, message, Space } from "antd";
import { DynamicForm } from "@/components/dynamic-form";
import { projectFormConfig } from "./config/formConfig";
import { createDynamicForm } from "@/api/form.api";
import type { FormValues } from "@/components/dynamic-form/types";

const BasicForm: React.FC = () => {
  // 处理表单提交 - 使用类型安全的表单值
  const handleSubmit = async (values: unknown) => {
    const result = await createDynamicForm({
      formConfig: JSON.stringify(projectFormConfig),
      formData: JSON.stringify(values),
      name: "测试保存",
    });
    console.log(result);
  };

  // 处理表单值变化 - 使用类型安全的表单值
  const handleValuesChange = (changedValues: FormValues, allValues: FormValues) => {
    // 将FormValues转换为ProjectFormValues
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
        <Card title="创建表单">
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
