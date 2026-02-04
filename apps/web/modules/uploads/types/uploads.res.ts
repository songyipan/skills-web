export interface UploadResponseDto {
  /** 成功消息 */
  message?: string;
  /** 可访问的文件 URL */
  url?: string;
  /** 错误信息 */
  error?: string;
}
