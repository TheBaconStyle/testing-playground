import { IConnection } from "sdk";

export const defaultConfig: IConnection & { options?: RequestInit } = {
  host: process.env.API_URL!,
};
