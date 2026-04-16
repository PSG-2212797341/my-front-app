import React from "react";
import {
  Input,
  InputNumber,
  Select,
  DatePicker,
  TimePicker,
  Cascader,
  TreeSelect,
  Switch,
  Slider,
  Radio,
  Checkbox,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import type { DynamicField } from "./types";
import type { Dayjs } from "dayjs";

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Dragger } = Upload;

interface FieldRendererProps {
  field: DynamicField;
  value?: unknown;
  onChange?: (value: unknown) => void;
  disabled?: boolean;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  value,
  onChange,
  disabled: globalDisabled,
}) => {
  const { type, options, placeholder, extraProps = {} } = field;

  // 计算字段是否禁用
  const isDisabled = globalDisabled || field.disabled;

  // 处理值变化
  const handleChange = (newValue: unknown) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  // 根据字段类型渲染对应的组件
  switch (type) {
    case "input":
      return (
        <Input
          placeholder={placeholder}
          value={value as string}
          onChange={e => handleChange(e.target.value)}
          disabled={isDisabled}
          {...extraProps}
        />
      );

    case "textarea":
      return (
        <TextArea
          placeholder={placeholder}
          value={value as string}
          onChange={e => handleChange(e.target.value)}
          disabled={isDisabled}
          rows={4}
          {...extraProps}
        />
      );

    case "number":
      return (
        <InputNumber
          placeholder={placeholder}
          value={value as number}
          onChange={handleChange}
          disabled={isDisabled}
          style={{ width: "100%" }}
          {...extraProps}
        />
      );

    case "password":
      return (
        <Input.Password
          placeholder={placeholder}
          value={value as string}
          onChange={e => handleChange(e.target.value)}
          disabled={isDisabled}
          {...extraProps}
        />
      );

    case "select":
      return (
        <Select
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={isDisabled}
          options={options}
          style={{ width: "100%" }}
          {...extraProps}
        />
      );

    case "checkbox":
      return (
        <Checkbox.Group
          value={value as string[]}
          onChange={handleChange}
          disabled={isDisabled}
          options={options}
          {...extraProps}
        />
      );

    case "radio":
      return (
        <Radio.Group
          value={value}
          onChange={e => handleChange(e.target.value)}
          disabled={isDisabled}
          options={options}
          {...extraProps}
        />
      );

    case "date":
      return (
        <DatePicker
          placeholder={placeholder}
          value={value as Dayjs}
          onChange={handleChange}
          disabled={isDisabled}
          style={{ width: "100%" }}
          {...extraProps}
        />
      );

    case "date-range":
      return (
        <RangePicker
          value={value as [Dayjs, Dayjs]}
          onChange={handleChange}
          disabled={isDisabled}
          style={{ width: "100%" }}
          {...extraProps}
        />
      );

    case "time":
      return (
        <TimePicker
          placeholder={placeholder}
          value={value as Dayjs}
          onChange={handleChange}
          disabled={isDisabled}
          style={{ width: "100%" }}
          {...extraProps}
        />
      );

    case "switch":
      return (
        <Switch
          checked={value as boolean}
          onChange={handleChange}
          disabled={isDisabled}
          {...extraProps}
        />
      );

    case "slider":
      return (
        <Slider
          value={value as number}
          onChange={handleChange}
          disabled={isDisabled}
          {...extraProps}
        />
      );

    case "cascader":
      return (
        <Cascader
          placeholder={placeholder}
          value={value as (string | number)[]}
          onChange={handleChange}
          disabled={isDisabled}
          options={options}
          style={{ width: "100%" }}
          {...extraProps}
        />
      );

    case "tree-select":
      return (
        <TreeSelect
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={isDisabled}
          treeData={options}
          style={{ width: "100%" }}
          {...extraProps}
        />
      );

    case "upload": {
      const uploadProps: UploadProps = {
        name: "file",
        multiple: true,
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        onChange: info => {
          if (info.file.status === "done") {
            handleChange(info.file.response);
          }
        },
        ...extraProps,
      };

      return (
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
          <p className="ant-upload-hint">支持单个或批量上传</p>
        </Dragger>
      );
    }

    default:
      return (
        <Input
          placeholder={placeholder}
          value={value as string}
          onChange={e => handleChange(e.target.value)}
          disabled={isDisabled}
          {...extraProps}
        />
      );
  }
};

export default FieldRenderer;
