import { publicActions } from '../../clients/decorators/public.js'
import type { PublicClient } from '../../clients/createPublicClient.js'
import type { Config } from '../createConfig.js'
import type { ChainIdParameter } from '../types/properties.js'
import { getClient } from './getClient.js'

export type GetPublicClientParameters = ChainIdParameter

export type GetPublicClientReturnType = PublicClient

export function getPublicClient(
  config: Config,
  parameters: GetPublicClientParameters = {},
): GetPublicClientReturnType {
  const client = getClient(config, parameters)
  return client.extend(publicActions) as GetPublicClientReturnType
}
