/**
 * @Author: Erik Slovak <erik.slovak@technologystudio.sk>
 * @Date: 2023-07-24T12:07:63+02:00
 * @Copyright: Technology Studio
**/

import packageJson from '../../package.json'

test('should not contain txo dependencies to prevent release cycles', () => {
  const txoDependencies = Object.keys(packageJson.dependencies ?? {}).filter(key => key.startsWith('@txo')).sort()
  const txoPeerDependencies = Object.keys(packageJson.peerDependencies ?? {}).filter(key => key.startsWith('@txo')).sort()

  const allowedDependencies = [
    '@txo/config-manager',
  ].sort()
  // eslint-disable-next-line @typescript-eslint/require-array-sort-compare
  const allowedPeerDependencies = [
  ].sort()

  expect(txoDependencies).toEqual(allowedDependencies)
  expect(txoPeerDependencies).toEqual(allowedPeerDependencies)
})
