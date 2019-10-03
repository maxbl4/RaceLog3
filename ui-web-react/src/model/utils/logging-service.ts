import Optional from "optional-js";
import { UserInfo } from "../types/datatypes";
import log from "loglevel";
import remote from "loglevel-plugin-remote";
import { DEFAULT_ID } from "./constants";
import { AnyAction } from "redux";

const logLevelNames = ["TRACE", "DEBUG", "INFO", "WARN", "ERROR", "SILENT"];

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
        timestamp: () => {}
      });
    }
  }

  public setUserInfo(info: Optional<UserInfo>): void {
    this.userInfo = info;
  }

  public debug(...msg: any[]): void {
    log.debug(this.prefix(log.levels.DEBUG), ...msg);
  }

  public error(...msg: any[]): void {
    log.error(this.prefix(log.levels.ERROR), ...msg);
  }

  public warn(...msg: any[]): void {
    log.warn(this.prefix(log.levels.WARN), ...msg);
  }

  private prefix(logLevel: number): string {
    return `${new Date().toISOString()} [${
      logLevelNames[logLevel]
    }] [User ID: ${this.userInfo.map(info => info.id).orElse(DEFAULT_ID)}]: `;
  }

  public logReducer(action: AnyAction, state: any): void {
    this.debug(
      `action='${JSON.stringify(action)}', state='${JSON.stringify(state)}'`
    );
  }
}
