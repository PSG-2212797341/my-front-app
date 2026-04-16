import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { Form, Row, Col, Button, Space } from "antd";
import type { Rule } from "antd/es/form";
import type { DynamicFormConfig, DynamicFormRef, DynamicField, FormValues } from "./types";
import FieldRenderer from "./FieldRenderer";

const { useForm } = Form;

interface DynamicFormProps extends DynamicFormConfig {
  /** 初始值 */
  initialValues?: FormValues;

  /** 表单引用 */
  formRef?: React.Ref<DynamicFormRef>;

  /** 自定义样式 */
  className?: string;

  /** 是否显示字段标签 */
  showLabel?: boolean;
}

const DynamicForm = forwardRef<DynamicFormRef, DynamicFormProps>((props, ref) => {
  const {
    fields,
    layout = "horizontal",
    labelAlign = "left",
    labelCol = { span: 6 },
    wrapperCol = { span: 18 },
    disabled = false,
    submitButton = { text: "提交", type: "primary" },
    resetButton = { text: "重置", type: "default" },
    customButtons = [],
    buttonLayout = "center",
    showButtons = true,
    onValuesChange,
    onSubmit,
    onReset,
    initialValues = {},
    className = "",
    showLabel = true,
  } = props;

  const [form] = useForm<FormValues>();
  const formValues = Form.useWatch([], form);

  // 计算应该显示的字段
  const visibleFields = useMemo(() => {
    return fields.filter(field => {
      // 如果字段明确隐藏，则不显示
      if (field.hidden) return false;

      // 如果有visible函数，根据函数结果决定是否显示
      if (field.visible) {
        return field.visible(formValues || {});
      }

      return true;
    });
  }, [fields, formValues]);

  // 计算字段的验证规则
  const getFieldRules = (field: DynamicField): Rule[] => {
    const rules: Rule[] = [...(field.rules || [])];

    // 如果字段有requiredIf函数，根据函数结果决定是否必填
    if (field.requiredIf) {
      const isRequired = field.requiredIf(formValues || {});
      if (isRequired) {
        rules.push({ required: true, message: `请输入${field.label}` });
      }
    } else if (field.required) {
      rules.push({ required: true, message: `请输入${field.label}` });
    }

    return rules;
  };

  // 计算字段是否禁用
  const isFieldDisabled = (field: DynamicField): boolean => {
    if (disabled) return true;
    if (field.disabled) return true;

    // 如果有disabledIf函数，根据函数结果决定是否禁用
    if (field.disabledIf) {
      return field.disabledIf(formValues || {});
    }

    return false;
  };

  // 处理表单提交
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (onSubmit) {
        onSubmit(values);
      }
      return values;
    } catch (error) {
      console.error("表单验证失败:", error);
      throw error;
    }
  };

  // 处理表单重置
  const handleReset = () => {
    form.resetFields();
    if (onReset) {
      onReset();
    }
  };

  // 暴露给父组件的方法
  useImperativeHandle(ref, () => ({
    getForm: () => form,
    getValues: () => form.getFieldsValue(),
    setValues: (values: FormValues) => {
      // @ts-expect-error - antd的setFieldsValue期望Record<string, any>，但我们需要保持类型安全
      form.setFieldsValue(values);
    },
    reset: () => {
      form.resetFields();
    },
    submit: handleSubmit,
    validate: async () => {
      return await form.validateFields();
    },
  }));

  // 渲染单个表单字段
  const renderField = (field: DynamicField) => {
    const fieldDisabled = isFieldDisabled(field);
    const fieldRules = getFieldRules(field);
    const span = field.span || 24;

    return (
      <Col key={field.name} span={span}>
        <Form.Item
          name={field.name}
          label={showLabel ? field.label : undefined}
          rules={fieldRules}
          dependencies={field.dependencies}
          extra={field.description}
          labelCol={showLabel ? labelCol : undefined}
          wrapperCol={showLabel ? wrapperCol : undefined}
        >
          <FieldRenderer field={field} disabled={fieldDisabled} />
        </Form.Item>
      </Col>
    );
  };

  // 渲染按钮区域
  const renderButtons = () => {
    if (!showButtons) return null;

    const buttons = [];

    // 添加提交按钮
    if (submitButton) {
      buttons.push(
        <Button
          key="submit"
          type={submitButton.type || "primary"}
          size={submitButton.size}
          disabled={submitButton.disabled || disabled}
          loading={submitButton.loading}
          icon={submitButton.icon}
          danger={submitButton.danger}
          ghost={submitButton.ghost}
          style={submitButton.style}
          className={submitButton.className}
          onClick={async () => {
            if (submitButton.onClick) {
              await submitButton.onClick(form.getFieldsValue());
            }
            await handleSubmit();
          }}
        >
          {submitButton.text}
        </Button>
      );
    }

    // 添加重置按钮
    if (resetButton) {
      buttons.push(
        <Button
          key="reset"
          type={resetButton.type || "default"}
          size={resetButton.size}
          disabled={resetButton.disabled || disabled}
          loading={resetButton.loading}
          icon={resetButton.icon}
          danger={resetButton.danger}
          ghost={resetButton.ghost}
          style={resetButton.style}
          className={resetButton.className}
          onClick={async () => {
            if (resetButton.onClick) {
              await resetButton.onClick(form.getFieldsValue());
            }
            handleReset();
          }}
        >
          {resetButton.text}
        </Button>
      );
    }

    // 添加自定义按钮
    customButtons.forEach((buttonConfig, index) => {
      buttons.push(
        <Button
          key={`custom-${index}`}
          type={buttonConfig.type || "default"}
          size={buttonConfig.size}
          disabled={buttonConfig.disabled || disabled}
          loading={buttonConfig.loading}
          icon={buttonConfig.icon}
          danger={buttonConfig.danger}
          ghost={buttonConfig.ghost}
          style={buttonConfig.style}
          className={buttonConfig.className}
          onClick={async () => {
            if (buttonConfig.onClick) {
              await buttonConfig.onClick(form.getFieldsValue());
            }
          }}
        >
          {buttonConfig.text}
        </Button>
      );
    });

    // 根据布局设置按钮容器的样式
    const containerStyle: React.CSSProperties = {
      display: "flex",
      gap: "8px",
      width: "100%", // 占满整行
    };

    switch (buttonLayout) {
      case "left":
        containerStyle.justifyContent = "flex-start";
        break;
      case "center":
        containerStyle.justifyContent = "center";
        break;
      case "right":
        containerStyle.justifyContent = "flex-end";
        break;
    }

    // 找到按钮组最合适的宽度
    const spanArray = fields.map(element => (element.span ? element.span : 0));
    const fitSpan = spanArray ? Math.max(...spanArray) : 24;

    return (
      <Form.Item style={{ marginBottom: 0 }} wrapperCol={{ span: fitSpan }}>
        <div style={containerStyle}>
          <Space>{buttons}</Space>
        </div>
      </Form.Item>
    );
  };

  return (
    <Form
      form={form}
      layout={layout}
      labelAlign={labelAlign}
      labelCol={showLabel ? labelCol : undefined}
      wrapperCol={showLabel ? wrapperCol : undefined}
      disabled={disabled}
      initialValues={initialValues}
      onValuesChange={onValuesChange}
      className={className}
    >
      <Row gutter={[16, 16]}>{visibleFields.map(renderField)}</Row>
      {renderButtons()}
    </Form>
  );
});

DynamicForm.displayName = "DynamicForm";

export default DynamicForm;
