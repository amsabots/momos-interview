export interface AbstractDataEntity {
  createdAt?: Date;
  updateAt?: Date;
  id?: number;
}

export interface SystemUser {
  name?: string;
  email?: string;
  password?: string;
  pass_reset?: boolean;
  set_password?: boolean;
}

export interface ScraperOutput {
  url: string;
  type: "image" | "video";
}
