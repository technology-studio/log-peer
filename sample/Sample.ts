/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2018-11-12T15:46:02+01:00
 * @Copyright: Technology Studio
**/

import { Log } from '@txo/log/src'

const log = new Log('namespace.namespace.namespace.Sample')

const sampleGetValue = (): number => 1

const sampleGetValueComplexCalculation = (): number => {
  let result = 0
  for (let index = 0; index < 1_000_000_000; index++) {
    result += index
  }
  return result
}

export const sampleRoutine = (): number => {
  // simple use
  log.debug('SampleRoutine', {
    sampleData: 1,
  })

  // lazy use when payload is computed only when logger level is applicable
  log.debugLazy('SampleRoutine', () => ({
    result: sampleGetValueComplexCalculation(),
  }))

  // used when return value should be logged
  return log.debugProxy('SampleRoutine', sampleGetValue())
}
