import { Skill } from "./skill";

export interface NotionOptions {
  deviceId: string;
  transport: "online" | "offline";
  timesync?: boolean;
  /**
   * @hidden
   */
  skill?: Skill;
  /**
   * @hidden
   */
  onDeviceSocketUrl?: string;
}
