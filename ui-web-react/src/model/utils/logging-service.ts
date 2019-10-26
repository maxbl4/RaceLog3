import Optional from "optional-js";
import { UserInfo } from "../types/datatypes";
import log from "loglevel";
import remote from "loglevel-plugin-remote";
import { AnyAction } from "redux";

export type LoggingServiceProps = {
  sendLogsToServer: boolean;
  url?: string;
};

export class LoggingService {
  private static instance: LoggingService;

  public static getInstance(): LoggingService {
    if (!LoggingService.instance) {
      LoggingService.instance = new LoggingService();
    }

    return LoggingService.instance;
  }

  private userInfo: Optional<UserInfo>;

  private constructor() {
    this.userInfo = Optional.empty<UserInfo>();
  }

  public init(props: LoggingServiceProps): void {
    log.enableAll();
    if (props.sendLogsToServer) {
      remote.apply(log, {
        url: props.url,
        level: "info"
      });
    }
  }

  public setUserInfo(info: Optional<UserInfo>): void {
    this.userInfo = info;
  }

  public debug(...msg: any[]): void {
    log.debug(this.prefix(), ...msg);
  }

  public error(...msg: any[]): void {
    log.error(this.prefix(), ...msg);
  }

  public warn(...msg: any[]): void {
    log.warn(this.prefix(), ...msg);
  }

  private prefix(): string {
    return `[User UUID: ${this.userInfo.map(info => info.uuid).orElse("")}]`;
  }

  public logReducer(action: AnyAction, state: any): void {
    this.debug(
      `action='${JSON.stringify(action)}', state='${JSON.stringify(state)}'`
    );
  }

  public logSagaError(error: Error, action?: AnyAction): void {
    this.error(
      `action='${JSON.stringify(action)}', error='${JSON.stringify(error)}'`
    );
  }
}
