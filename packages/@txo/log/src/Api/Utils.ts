/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2018-01-16T22:24:02+01:00
 * @Copyright: Technology Studio
**/

import {
  suppressFreezing,
  CYCLIC_ARRAY,
  CYCLIC_OBJECT,
  Payload,
} from '@txo-peer-dep/log'

const SUPPRESSED_ARRAY = '[SUPPRESSED]'
const SUPPRESSED_OBJECT = '{SUPPRESSED}'

export const suppressFreezingReact = (payload?: Payload, parents: unknown[] = []): Payload => {
  if (payload) {
    const _parents = [...parents, payload]
    if (Array.isArray(payload)) {
      if (parents.includes(payload)) {
        return CYCLIC_ARRAY
      }
      return payload.map(item => suppressFreezing(item, _parents))
    } else if (typeof payload === 'object') {
      if (parents.includes(payload)) {
        return CYCLIC_OBJECT
      }
      if (Object.prototype.hasOwnProperty.call(payload, 'refs')) {
        return SUPPRESSED_OBJECT
      }
      const { children, ...rest } = payload

      const restSuppressed = rest && Object.keys(rest).reduce((result: Record<string, unknown>, key) => {
        result[key] = suppressFreezing(rest[key], _parents)
        return result
      }, {})
      return children ? { children: SUPPRESSED_ARRAY, ...restSuppressed } : { ...restSuppressed }
    }
  }
  return payload
}

export const payloadProcessorReact = (payload?: Payload): Payload => suppressFreezingReact(payload)
