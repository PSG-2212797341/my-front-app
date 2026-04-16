import type { DynamicField, DynamicFormConfig } from "@/components/dynamic-form/types";

/**
 * 项目表单字段配置
 */
export const projectFormFields: DynamicField[] = [
  {
    name: "title",
    label: "标题",
    type: "input",
    placeholder: "请输入项目标题",
    required: true,
    rules: [
      { min: 2, message: "标题至少2个字符" },
      { max: 50, message: "标题最多50个字符" },
    ],
    span: 16,
  },
  {
    name: "dateRange",
    label: "起止时间",
    type: "date-range",
    placeholder: "请选择起止时间",
    required: true,
    span: 16,
    extraProps: {
      style: { width: "100%" },
    },
  },
  {
    name: "description",
    label: "项目描述",
    type: "textarea",
    placeholder: "请输入项目详细描述",
    required: true,
    span: 16,
    extraProps: {
      rows: 4,
      showCount: true,
      maxLength: 500,
    },
  },
  {
    name: "metrics",
    label: "衡量标准",
    type: "textarea",
    placeholder: "请输入项目衡量标准/KPI",
    required: true,
    span: 16,
    extraProps: {
      rows: 3,
      showCount: true,
      maxLength: 300,
    },
  },
  {
    name: "client",
    label: "客户",
    type: "select",
    placeholder: "请选择客户",
    required: true,
    options: [
      { label: "客户A", value: "client_a" },
      { label: "客户B", value: "client_b" },
      { label: "客户C", value: "client_c" },
      { label: "客户D", value: "client_d" },
      { label: "其他", value: "other" },
    ],
    span: 16,
  },
  {
    name: "inviter",
    label: "邀请人",
    type: "select",
    placeholder: "请选择邀请人",
    required: true,
    options: [
      { label: "张三", value: "zhangsan" },
      { label: "李四", value: "lisi" },
      { label: "王五", value: "wangwu" },
      { label: "赵六", value: "zhaoliu" },
      { label: "钱七", value: "qianqi" },
    ],
    span: 16,
  },
  {
    name: "weight",
    label: "权重",
    type: "number",
    placeholder: "请输入权重值（0-100）",
    required: true,
    span: 16,
    extraProps: {
      min: 0,
      max: 100,
      step: 1,
      style: { width: "200px" },
    },
    rules: [{ type: "number", min: 0, max: 100, message: "权重值必须在0-100之间" }],
  },
];

/**
 * 项目表单配置（默认显示标签）
 */
export const projectFormConfig: DynamicFormConfig = {
  fields: projectFormFields,
  layout: "horizontal",
  labelAlign: "right",
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
  submitButton: {
    text: "保存",
    type: "primary",
    size: "middle",
  },
  resetButton: {
    text: "重置",
    type: "default",
    size: "middle",
  },
  buttonLayout: "center",
  showButtons: true,
};
