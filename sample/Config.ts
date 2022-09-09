/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2018-11-12T15:41:36+01:00
 * @Copyright: Technology Studio
**/

import {
  configManager,
  Level,
  WriteLog,
} from '@txo-peer-dep/log'

const sampleWriteLog: WriteLog = (level, name, namespace, message, payload, options) => {
  console.log(level, name, namespace, message, payload)
}

configManager.update({
  loggerConfigMap: {
    sampleLogger: {
      writeLog: sampleWriteLog,
      nodeEnvironmentList: ['production', 'development'],
    },
  },
  defaultLevelForUnknownNodeEnvironment: Level.NONE, // optional, configuration default
  defaultLevelForNodeEnvironmentMap: {
    production: Level.ERROR,
    development: Level.INFO,
  },
  levelOverride: {
    level: Level.DEBUG,
    namespacePatternList: [
      'namespace.namespace', // given pattern is compared as prefix, overrides logs with given prefix
      'namespace.namespace.namespace.Sample', // in this case, exact match
    ],
  },
})
