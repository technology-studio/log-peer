/**
 * @Author: Rostislav Simonik <rostislav.simonik@technologystudio.sk>
 * @Date:   2018-01-16T22:24:02+01:00
 * @Copyright: Technology Studio
**/

import type { Payload } from '../Model/Types'

export const CYCLIC_ARRAY = '[CYCLIC]'
export const CYCLIC_OBJECT = '{CYCLIC}'

export const suppressFreezing = (payload?: Payload, parents: unknown[] = [], level = 0): Payload => {
  if (level > 10) {
    return
  }
  if (payload != null) {
    const _parents = [...parents, payload]
    if (Array.isArray(payload)) {
      if (parents.includes(payload)) {
        return CYCLIC_ARRAY
      }
      return payload.map(item => suppressFreezing(item, _parents, level + 1))
    } else if (typeof payload === 'object') {
      const objectPayload = payload
      if (parents.includes(objectPayload)) {
        return CYCLIC_OBJECT
      }

      return Object.keys(objectPayload).reduce((result: Record<string, unknown>, key) => {
        result[key] = suppressFreezing(objectPayload[key as keyof typeof objectPayload], _parents, level + 1)
        return result
      }, {})
    }
  }
  return payload
}

export const payloadProcessor = (payload?: Payload): Payload => suppressFreezing(payload)
