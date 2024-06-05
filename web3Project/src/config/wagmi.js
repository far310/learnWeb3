import { http, createConfig } from '@wagmi/vue';
import { mainnet, sepolia } from '@wagmi/vue/chains';
import { injected, walletConnect } from '@wagmi/vue/connectors';

const projectId = '2cbe14a31c73b269982eb921b41144ba';

export const config = createConfig({
  chains: [sepolia, mainnet],
  connectors: [injected(), walletConnect({ projectId })],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});