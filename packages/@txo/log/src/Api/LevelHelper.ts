/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2018-01-22T19:55:58+01:00
 * @Copyright: Technology Studio
**/

import {
  configManager,
  Level,
} from '@txo-peer-dep/log'

const breakableReduce = <ACCUMULATOR, VALUE> (
  array: VALUE[],
  callback: (accumulator: ACCUMULATOR | undefined, value: VALUE) => { break: boolean, accumulator?: ACCUMULATOR | undefined },
  initial?: ACCUMULATOR,
): ACCUMULATOR | undefined => {
  let current: {
    break: boolean,
    accumulator?: ACCUMULATOR,
  } = {
    break: false,
    accumulator: initial,
  }
  for (let index = 0; index < array.length && !current.break; ++index) {
    current = callback(current.accumulator, array[index])
  }
  return current.accumulator
}

export const getLevelOverride = (namespace: string): Level | undefined => {
  const levelOverride = configManager.config.levelOverride

  return levelOverride && breakableReduce<Level, string>(levelOverride.namespacePatternList, (level, namespacePattern) => {
    return namespace.startsWith(namespacePattern)
      ? { break: true, accumulator: levelOverride.level }
      : { break: false }
  })
}
