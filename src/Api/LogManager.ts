/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2017-12-27T11:07:00+01:00
 * @Copyright: Technology Studio
**/

import type {
  Level,
  Options,
  WriteLog,
  Payload,
} from '../Model/Types'

import type { Config } from './Config'
import {
  configManager,
  isNodeEnvironmentEnabled,
} from './Config'

class LogManager {
  _writeLogList!: WriteLog[]

  constructor () {
    this.syncFromConfig(configManager.config)
    configManager.subscribe(this.onConfigChange)
  }

  onConfigChange = (config: Config): void => {
    this.syncFromConfig(config)
  }

  syncFromConfig (config: Config): void {
    this._writeLogList = []
    if (config.loggerConfigMap != null) {
      const loggerConfigMap = config.loggerConfigMap
      Object.keys(loggerConfigMap).forEach(loggerKey => {
        const loggerConfig = loggerConfigMap[loggerKey]
        if (isNodeEnvironmentEnabled(loggerConfig)) {
          this.registerWriteLog(loggerConfig.writeLog)
        }
      })
    }
  }

  writeLog (level: Level, name: string, namespace: string, message: string, payload?: Payload, options?: Options): void {
    this._writeLogList.forEach(writeLog => { writeLog(level, name, namespace, message, payload, options) })
  }

  registerWriteLog (writeLog: WriteLog): () => void {
    this._writeLogList.push(writeLog)
    return () => { this._writeLogList = this._writeLogList.filter(_writeLog => _writeLog !== writeLog) }
  }
}

export const logManager = new LogManager()
