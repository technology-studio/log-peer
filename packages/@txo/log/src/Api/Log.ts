/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2018-01-16T11:09:57+01:00
 * @Copyright: Technology Studio
**/

import {
  logManager,
  configManager,
  Options,
  Level,
  Payload,
} from '@txo-peer-dep/log'

import { getDefaultLevel } from './Config'
import { getLevelOverride } from './LevelHelper'

export class Log {
  static Level = Level
  ownLevel?: Level
  level!: Level
  name: string
  namespace: string

  constructor (namespace: string, level?: Level) {
    this.name = namespace.substr(namespace.lastIndexOf('.') + 1)
    this.namespace = namespace
    this.ownLevel = level
    this.syncFromConfig()
    configManager.subscribe(this.onConfigChange)
  }

  onConfigChange = (): void => {
    this.syncFromConfig()
  }

  syncFromConfig (): void {
    this.level = getLevelOverride(this.namespace) ?? this.ownLevel ?? getDefaultLevel()
  }

  error (message: string, payload?: Payload, options?: Options): void {
    this.level >= Level.ERROR && this._write(Level.ERROR, message, payload, options)
  }

  warning (message: string, payload?: Payload, options?: Options): void {
    this.level >= Level.WARNING && this._write(Level.WARNING, message, payload, options)
  }

  info (message: string, payload?: Payload, options?: Options): void {
    this.level >= Level.INFO && this._write(Level.INFO, message, payload, options)
  }

  debug (message: string, payload?: Payload, options?: Options): void {
    this.level >= Level.DEBUG && this._write(Level.DEBUG, message, payload, options)
  }

  errorProxy <RESULT> (message: string, result: RESULT, options?: Options): RESULT {
    this.level >= Level.ERROR && this._write(Level.ERROR, message, result, options)
    return result
  }

  warningProxy <RESULT> (message: string, result: RESULT, options?: Options): RESULT {
    this.level >= Level.WARNING && this._write(Level.WARNING, message, result, options)
    return result
  }

  infoProxy <RESULT> (message: string, result: RESULT, options?: Options): RESULT {
    this.level >= Level.INFO && this._write(Level.INFO, message, result, options)
    return result
  }

  debugProxy <RESULT> (message: string, result: RESULT, options?: Options): RESULT {
    this.level >= Level.DEBUG && this._write(Level.DEBUG, message, result, options)
    return result
  }

  errorLazy (message: string, payloadCallback: () => Payload, options?: Options): void {
    this.level >= Level.ERROR && this._write(Level.ERROR, message, payloadCallback(), options)
  }

  warningLazy (message: string, payloadCallback: () => Payload, options?: Options): void {
    this.level >= Level.WARNING && this._write(Level.WARNING, message, payloadCallback(), options)
  }

  infoLazy (message: string, payloadCallback: () => Payload, options?: Options): void {
    this.level >= Level.INFO && this._write(Level.INFO, message, payloadCallback(), options)
  }

  debugLazy (message: string, payloadCallback: () => Payload, options?: Options): void {
    this.level >= Level.DEBUG && this._write(Level.DEBUG, message, payloadCallback(), options)
  }

  _write (level: Level, message: string, payload?: Payload, options?: Options): void {
    logManager.writeLog(level, this.name, this.namespace, message, payload, options)
  }
}
