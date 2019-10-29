import Optional from "optional-js";
import { UserInfo } from "../types/datatypes";
import log, { LogLevelDesc } from "loglevel";
import remote from "loglevel-plugin-remote";
import { AnyAction } from "redux";

export type LoggingServiceProps = {
  sendLogsToServer: boolean;
  url?: string;
  level: string;
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
    log.setLevel(props.level as LogLevelDesc);
    if (props.sendLogsToServer) {
      remote.apply(log, {
        url: props.url,
        level: props.level
      });
    }
  }

  public setUserInfo(info: Optional<UserInfo>): void {
    this.userInfo = info;
  }

  public info(...msg: any[]): void {
    log.info(this.prefix(), ...msg);
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
      `action type='${JSON.stringify(action.type)}', state='${JSON.stringify(state)}'`
    );
  }

  public logSagaError(error: Error, action?: AnyAction): void {
    this.error(
      `action type='${JSON.stringify(action ? action.type : "unknown action")}', error='${JSON.stringify(error)}'`
    );
  }
}
