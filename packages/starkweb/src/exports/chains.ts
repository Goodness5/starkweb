export type { Chain } from '../types/chain.js'

export { mainnet } from '../chains/definitions/mainnet.js'
export { sepolia } from '../chains/definitions/sepolia.js'

// biome-ignore lint/performance/noBarrelFile: entrypoint module
export {
    type AssertCurrentChainErrorType,
    type AssertCurrentChainParameters,
    assertCurrentChain,
  } from '../utils/chain/assertCurrentChain.js'
  export { defineChain } from '../utils/chain/defineChain.js'
  export {
    type ExtractChainErrorType,
    type ExtractChainParameters,
    type ExtractChainReturnType,
    extractChain,
  } from '../utils/chain/extractChain.js'
  export {
    type GetChainContractAddressErrorType,
    getChainContractAddress,
} from '../utils/chain/getChainContractAddress.js'
export { type AddStarknetChainParameters } from '../utils/chain/addStarknetChainParameters.js'
