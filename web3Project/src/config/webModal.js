// 引入web3modal
import {
    useWeb3Modal,
    createWeb3Modal,
    defaultWagmiConfig,
    useWalletInfo,
    useWeb3ModalEvents,
    useWeb3ModalState
  } from "@web3modal/wagmi/vue";
  import { mainnet, arbitrum } from "viem/chains";
  // 上面方法不知道可不可以替换成 import { mainnet, arbitrum } from "@wagmi/vue/connectors";
  import { reconnect } from "@wagmi/core";
  // 1. walletconnect 上面注册获取ID
  const projectId = "2cbe14a31c73b269982eb921b41144ba";
  
  // 2. wagmi 配置参数
  const metadata = {
    name: "Web3Modal",
    description: "Web3Modal Example",
    url: "*", // origin must match your domain & subdomain
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  };
  
  const chains = [mainnet, arbitrum];
  const config = defaultWagmiConfig({
    chains,
    projectId,
    metadata,
    //...wagmiOptions // Optional - Override createConfig parameters
  });
  reconnect(config);
  const initWebModal = createWeb3Modal({
    wagmiConfig: config,
    projectId,
    enableAnalytics: true, // Optional - defaults to your Cloud configuration
    enableOnramp: true, // Optional - false as default
  });

  export {
    initWebModal,
    useWeb3Modal,
    useWalletInfo,
    useWeb3ModalEvents,
    // useDisconnect,
    useWeb3ModalState,
    config,
  }