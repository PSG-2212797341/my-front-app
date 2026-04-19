import React from "react";
import { Card, message } from "antd";
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
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card
          title="创建表单"
          className="w-full"
          styles={{
            body: {
              padding: "16px 20px",
            },
          }}
        >
          <DynamicForm
            {...projectFormConfig}
            onSubmit={handleSubmit}
            onValuesChange={handleValuesChange}
            onReset={handleReset}
            className="responsive-form"
          />
        </Card>
      </div>
    </div>
  );
};

export default BasicForm;
