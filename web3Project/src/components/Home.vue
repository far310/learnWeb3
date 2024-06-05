<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto">
      <v-img class="mb-4" height="150" src="@/assets/logo.png" />

      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

        <h1 class="text-h2 font-weight-bold">Vuetify</h1>
      </div>

      <div class="py-4" />
      <div class="test_demo">
        <div>
          使用webModal链接钱包
          <v-btn variant="outlined" @click="connectWallet"
            >打开 web3 Modal</v-btn
          >
          <!-- <v-btn variant="outlined" @click="disconnectWallet">断开链接</v-btn> -->
          <!-- open 方法不同打开方式 
            Connect	模态的主要视图 - 断开连接时的默认视图
            Account	用户配置文件 - 连接时的默认视图
            AllWallets 显示所有可用钱包的列表
            Networks 可用网络列表 - 您可以在连接之前选择和定位特定网络
            WhatIsANetwork “什么是网络”载入视图
            WhatIsAWallet	“什么是钱包”入职视图
            OnRampProviders	"OnRamp main view “OnRamp 主视图
           -->
          <v-btn variant="outlined" @click="modal.open({ view: 'Connect' })">
            打开链接
          </v-btn>
          <v-btn variant="outlined" @click="modal.open({ view: 'Account' })">
            账户信息
          </v-btn>
          <v-btn variant="outlined" @click="modal.open({ view: 'AllWallets' })">
            打开显示可选钱包
          </v-btn>
          <v-btn variant="outlined" @click="modal.open({ view: 'Networks' })">
            选择网络
          </v-btn>
          <v-btn
            variant="outlined"
            @click="modal.open({ view: 'WhatIsANetwork' })"
          >
            WhatIsANetwork
          </v-btn>
          <v-btn
            variant="outlined"
            @click="modal.open({ view: 'WhatIsAWallet' })"
          >
            WhatIsAWallet
          </v-btn>
          <v-btn
            variant="outlined"
            @click="modal.open({ view: 'OnRampProviders' })"
          >
            OnRampProviders
          </v-btn>
        </div>
        <div>
          使用webModal 组件方式链接钱包
          <!-- 按钮和账户信息 -->
          <w3m-button
            class="v-btn"
            label="组件方式打开"
            balance="show"
          ></w3m-button>
          <!-- 链接钱包按钮 -->
          <w3m-connect-button class="v-btn" />
          <!-- 账户信息 -->
          <w3m-account-button class="v-btn" />
          <!-- 选择网络 -->
          <w3m-network-button class="v-btn" />
        </div>
        <div>
          使用webModal 获取选择钱包信息
          <v-btn variant="outlined" @click="getUseWalletInfo">
            getUseWalletInfo
          </v-btn>
          <div v-if="walletInfo">
            <p>Name: {{ walletInfo.name }}</p>
            <img :src="walletInfo.icon" alt="Wallet Icon" />
          </div>
        </div>
        <div>
          使用webModal 获取状态
          <v-btn variant="outlined" @click="getUseWeb3ModalState">
            getUseWeb3ModalState
          </v-btn>
          <div v-if="web3ModalState">
            <p>open: {{ web3ModalState.open }}</p>
            <p>selectedNetworkId : {{ web3ModalState.selectedNetworkId }}</p>
          </div>
        </div>
        <v-divider></v-divider>
        <div>
          使用wagmi/vue 链接钱包
          <v-btn
            variant="outlined"
            :key="connector.name"
            class="btn"
            v-for="connector in connectors"
            @click="connect({ connector, chainId })"
          >
            {{ connector.name }}
          </v-btn>
          <v-btn variant="outlined" class="btn" @click="disconnect">
            断开链接 断开链接好像是通用的
          </v-btn>
        </div>
        <div>
          使用wagmi/vue 钱包信息
          <div>
            <p>address: {{ account.address }}</p>
            <p>是否链接：{{ account.isConnected }}</p>
            <p>链接状态：{{ account.status }}</p>
          </div>
        </div>
        <div>
          使用wagmi/core 钱包信息 好像不是响应式的
          <v-btn variant="outlined" class="btn" @click="getUseAccountCore">
            获取用户信息
          </v-btn>
          <div v-if="useAccountCore">
            <p>address: {{ useAccountCore.address }}</p>
            <p>是否链接：{{ useAccountCore.isConnected }}</p>
            <p>链接状态：{{ useAccountCore.status }}</p>
          </div>
        </div>
        <v-divider></v-divider>
        <div>
          使用viem 钱包操作
          <v-btn variant="outlined" class="btn" @click="getGeneratePrivateKey">
            生成私钥
          </v-btn>
          <v-btn variant="outlined" class="btn" @click="getGenerateMnemonic">
            生成助记词
          </v-btn>
          <div>
            <p v-if="generatePrve">密钥：{{ generatePrve }}</p>
            <p v-if="mnemonic">
              助记词：{{ mnemonic }}
              <v-btn
                variant="outlined"
                class="btn"
                @click="getMnemonicToAccount"
              >
                助记词生成账户
              </v-btn>
            </p>
            <p v-if="mnemonicToKey" style="line-break: anywhere">
              助记词生成账户：地址[{{ mnemonicToKey.address }}]，私钥「{{
                toHex(mnemonicToKey.getHdKey().privateKey)
              }}」
            </p>
            <p>
              ps:vime不支持导出keystore文件
              需要使用ethereumjs-wallet或者web3-utils
            </p>
          </div>
        </div>
        <div></div>
      </div>
    </v-responsive>
  </v-container>
</template>
 
<script setup>
import {
  useWeb3Modal,
  initWebModal,
  useWalletInfo,
  useWeb3ModalEvents,
  useWeb3ModalState,
  config,
  // useDisconnect as webuseDisconnect,
} from "@/config/webModal";
import { useConnect, useChainId, useDisconnect, useAccount } from "@wagmi/vue";
import {
  english,
  generatePrivateKey,
  generateMnemonic,
  mnemonicToAccount,
  hdKeyToAccount,
  HDKey,
} from "viem/accounts";
import { toHex } from "viem";
import {
  getAccount,
  readContract,
  getWalletClient,
  writeContract,
} from "@wagmi/core";
import { ref } from "vue";
// wagmi 方法
const chainId = useChainId();
const { connectors, connect } = useConnect();
const { disconnect } = useDisconnect();
const account = useAccount();
// wagmi core 方法
const useAccountCore = ref(null);
// const { webDisconnect } = webuseDisconnect();
const modal = ref(null);
// web3Modal 状态
const web3ModalState = ref(null);
// web3Modal 事件监听
const events = useWeb3ModalEvents();
// web3Modal 选择钱包信息
const walletInfo = ref(null);
// viem
const generatePrve = ref(null);
const mnemonic = ref(null);
const mnemonicToKey = ref(null);
onMounted(async () => {
  // 4. Use modal composable
  modal.value = useWeb3Modal();
  console.log("initWebModal", initWebModal);
  console.log("Web3Modal", modal.value);

  console.log("useWeb3ModalEvents", events);
});
const connectWallet = async () => {
  if (modal.value) {
    await modal.value.open();
    // webmodal 获取用户信息
    //modal.subscribeWalletInfo(getUseWalletInfo);
  } else {
    console.error("Web3Modal instance is not initialized");
  }
};
function getUseWalletInfo() {
  walletInfo.value = useWalletInfo();
  console.log("===========================");
  console.log(walletInfo.value.name, walletInfo.value.icon);
}
function getUseWeb3ModalState() {
  web3ModalState.value = useWeb3ModalState();
}
function getUseAccountCore() {
  useAccountCore.value = getAccount(config);
}
function getGeneratePrivateKey() {
  generatePrve.value = generatePrivateKey();
}
function getGenerateMnemonic() {
  mnemonic.value = generateMnemonic(english);
}
function getMnemonicToAccount() {
  //mnemonicToKey.value = mnemonicToAccount(mnemonic.value);
  let mnemonicTo = mnemonicToAccount(mnemonic.value);
  mnemonicToKey.value = hdKeyToAccount(mnemonicTo.getHdKey());
  console.log("地址 数组", mnemonicTo.getHdKey().publicKey);
  console.log("地址 私钥", toHex(mnemonicTo.getHdKey().privateKey));
  console.log("地址 数组", mnemonicToKey.value.getHdKey().publicKey);
  console.log("地址 私钥", toHex(mnemonicToKey.value.getHdKey().privateKey));
  console.log("地址对象", mnemonicToKey.value);
  console.log("地址对象", mnemonicTo);
  console.log("地址对象", mnemonicToKey.value.getHdKey());
  console.log("地址对象", mnemonicTo.getHdKey());
  console.log(mnemonicToKey.value == mnemonicTo);
}
watch(
  events,
  async (oldVal, newVal) => {
    console.log("events", JSON.stringify(events));
    console.log("oldVal", JSON.stringify(oldVal));
    console.log("newVal", JSON.stringify(newVal));
    // 获取钱包余额
    // console.log("callDta", callData);
    //const account = await getAccount();
    //console.log("account", account);
  }
  // {
  //   deep: true,
  // }
);
// function disconnectWallet() {
//   if (modal.value) {
//     initWebModal.disconnect();
//   } else {
//     console.error("Web3Modal instance is not initialized");
//   }
// }
</script>
<style scoped>
.test_demo {
  div {
    padding: 10px;
  }
  .v-btn {
    margin: 3px 10px;
  }
}
</style>