/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2017-12-28T08:39:28+01:00
 * @Copyright: Technology Studio
**/

export enum Level {
  NONE = 0,
  ERROR = 1,
  WARNING = 2,
  INFO = 3,
  DEBUG = 4,
}

export type Options = {
  important: boolean,
}

export type Payload = unknown

export type WriteLog = (level: Level, name: string, namespace: string, message: string, payload?: Payload, options?: Options) => void
