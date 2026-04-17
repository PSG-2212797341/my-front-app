/// <reference types="vite/client" />

interface ImportMetaEnv {
  /**
   * API基础URL
   * @example "http://localhost:3000/api/v1"
   */
  readonly VITE_API_URL: string;

  /**
   * axios拼接的基础URL
   * @example "/api"
   */
  readonly VITE_API_BASE_URL: string;

  /**
   * web[ack进行路劲转发所使用的URL
   * @example "/api"
   */
  readonly VITE_API_REPLACE_URL: string;

  /**
   * 应用标题
   * @example "开发环境"
   */
  readonly VITE_APP_TITLE: string;

  // 可以在这里添加其他环境变量
  // readonly VITE_ANOTHER_VAR: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
