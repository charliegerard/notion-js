import io from "socket.io-client";
import { Subscription } from "../../types/subscription";

/**
 * @hidden
 */
type WebsocketOptions = {
  deviceId: string;
  socketUrl?: string;
  secure?: boolean;
};

const defaultOptions = {
  secure: true
};

/**
 * @hidden
 */
export class WebsocketClient {
  static serverType: string = "websocket";
  private options: WebsocketOptions;
  protected socket;

  constructor(options: WebsocketOptions) {
    this.options = Object.freeze({
      ...defaultOptions,
      ...options
    });

    const path = `/${this.options.deviceId}`;

    if (this.options.socketUrl) {
      this.socket = io(this.options.socketUrl, { path });
    } else {
      this.socket = io({
        path,
        autoConnect: false
      });
    }
  }

  public setUrl(socketUrl: string): void {
    this.socket.connect(socketUrl);
    // this.socket = this.socket = io(this.options.socketUrl, {
    //   path: `/${this.options.deviceId}`,
    //   socketUrl
    // });
  }

  public onMetric(
    subscription: Subscription,
    callback: Function
  ): Function {
    return this.socket.on(`metrics/${subscription.id}`, callback);
  }

  public removeMetricListener(
    subscription: Subscription,
    listener: Function
  ): void {
    this.socket.off(`metrics/${subscription.id}`, listener);
  }

  public disconnect(): void {
    if (this.socket.connected) {
      this.socket.disconnect();
    }
  }
}
