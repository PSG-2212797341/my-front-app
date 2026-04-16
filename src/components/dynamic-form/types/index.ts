import type { Rule } from "antd/es/form";
import type { NamePath } from "antd/es/form/interface";
import type { FormInstance } from "antd";

/**
 * 支持的字段类型
 */
export type FieldType =
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "date"
  | "date-range"
  | "number"
  | "password"
  | "switch"
  | "slider"
  | "time"
  | "cascader"
  | "tree-select"
  | "upload";

/**
 * 字段选项
 */
export interface FieldOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  children?: FieldOption[];
}

/**
 * 表单值类型
 * 使用更具体的类型以保持类型安全
 */
export type FormValues = Record<string, unknown>;

/**
 * 动态表单字段配置
 */
export interface DynamicField {
  /** 字段名称 */
  name: string;

  /** 字段标签 */
  label: string;

  /** 字段类型 */
  type: FieldType;

  /** 字段占位符 */
  placeholder?: string;

  /** 字段描述 */
  description?: string;

  /** 是否必填 */
  required?: boolean;

  /** 验证规则 */
  rules?: Rule[];

  /** 字段选项（用于select、radio、checkbox等） */
  options?: FieldOption[];

  /** 是否禁用 */
  disabled?: boolean;

  /** 默认值 */
  defaultValue?: unknown;

  /** 是否隐藏 */
  hidden?: boolean;

  /** 条件显示函数 */
  visible?: (values: FormValues) => boolean;

  /** 条件禁用函数 */
  disabledIf?: (values: FormValues) => boolean;

  /** 条件必填函数 */
  requiredIf?: (values: FormValues) => boolean;

  /** 设置表单每一行的栅格数（24栅格） */
  span?: number;

  /** 额外属性 */
  extraProps?: Record<string, unknown>;

  /** 依赖字段 */
  dependencies?: NamePath[];

  /** 字段变化时的回调 */
  onChange?: (value: unknown, values: FormValues) => void;
}

/**
 * 按钮类型
 */
export type ButtonType = "primary" | "default" | "dashed" | "link" | "text";

/**
 * 按钮大小
 */
export type ButtonSize = "large" | "middle" | "small";

/**
 * 按钮配置
 */
export interface ButtonConfig {
  /** 按钮文本 */
  text: string;

  /** 按钮类型 */
  type?: ButtonType;

  /** 按钮大小 */
  size?: ButtonSize;

  /** 是否禁用 */
  disabled?: boolean;

  /** 自定义样式 */
  style?: React.CSSProperties;

  /** 自定义类名 */
  className?: string;

  /** 点击回调 */
  onClick?: (values: FormValues) => void | Promise<void>;

  /** 是否显示加载状态 */
  loading?: boolean;

  /** 图标 */
  icon?: React.ReactNode;

  /** 危险按钮 */
  danger?: boolean;

  /** 幽灵按钮 */
  ghost?: boolean;
}

/**
 * 动态表单配置
 */
export interface DynamicFormConfig {
  /** 表单字段配置 */
  fields: DynamicField[];

  /** 表单布局 */
  layout?: "horizontal" | "vertical" | "inline";

  /** 标签对齐方式 */
  labelAlign?: "left" | "right";

  /** 表单每一行label标签的宽度 */
  labelCol?: { span: number };

  /** 表单每一行label标签后面的控件宽度 */
  wrapperCol?: { span: number };

  /** 是否禁用整个表单 */
  disabled?: boolean;

  /** 提交按钮配置 */
  submitButton?: ButtonConfig;

  /** 重置按钮配置 */
  resetButton?: ButtonConfig;

  /** 自定义按钮列表 */
  customButtons?: ButtonConfig[];

  /** 按钮布局 */
  buttonLayout?: "left" | "center" | "right";

  /** 是否显示按钮区域 */
  showButtons?: boolean;

  /** 表单值变化回调 */
  onValuesChange?: (changedValues: FormValues, allValues: FormValues) => void;

  /** 表单提交回调 */
  onSubmit?: (values: FormValues) => void;

  /** 表单重置回调 */
  onReset?: () => void;
}

/**
 * 动态表单引用
 */
export interface DynamicFormRef {
  /** 获取表单实例 */
  getForm: () => FormInstance<FormValues>;

  /** 获取表单值 */
  getValues: () => FormValues;

  /** 设置表单值 */
  setValues: (values: FormValues) => void;

  /** 重置表单 */
  reset: () => void;

  /** 提交表单 */
  submit: () => Promise<FormValues>;

  /** 验证表单 */
  validate: () => Promise<FormValues>;
}
