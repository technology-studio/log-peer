/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2017-12-28T08:25:08+01:00
 * @Copyright: Technology Studio
**/

import { ConfigManager } from '@txo/config-manager'

import type {
  WriteLog,
  Payload,
} from '../Model/Types'
import {
  Level,
} from '../Model/Types'

import {
  payloadProcessor,
} from './Utils'

type LoggerConfig = {
  writeLog: WriteLog,
  nodeEnvironmentList: string[],
}

type LoggerConfigMap = Record<string, LoggerConfig>

export type Config = {
  loggerConfigMap?: LoggerConfigMap,
  defaultLevelForNodeEnvironmentMap?: Record<string, Level>,
  defaultLevelForUnknownNodeEnvironment: Level,
  levelOverride?: {
    level: Level,
    namespacePatternList: string[],
  },

  payloadProcessor: (payload?: Payload) => Payload,
}

export const configManager = new ConfigManager<Config>({
  levelOverride: undefined,
  loggerConfigMap: undefined,
  defaultLevelForNodeEnvironmentMap: undefined,
  defaultLevelForUnknownNodeEnvironment: Level.NONE,
  payloadProcessor: () => payloadProcessor,
})

export const isNodeEnvironmentEnabled = (loggerConfig?: LoggerConfig): boolean => (
  !!(loggerConfig && process.env.NODE_ENV && loggerConfig.nodeEnvironmentList.includes(process.env.NODE_ENV))
)
