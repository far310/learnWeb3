<template>
  <!-- 头部 -->
  <v-app-bar
    class="position-absolute cursor-pointer border-dashed w-auto nav-header"
    v-slide-y-transition
    color="#135947"
    style="
      top: 2rem;
      left: 50%;
      transform: translate(-50%, 0%);
      padding: 5px 10px;
      overflow: visible !important;
    "
    :density="'compact'"
    rounded="pill"
    :elevation="1"
    height="50"
    flat
  >
    <!-- tabs 菜单项  -->
    <v-tabs
      color="grey-darken-2 border-dashed"
      :hide-slider="true"
      slider-color="red"
      align-tabs="center"
      density="comfortable"
      bg-color="#135947"
      centered
      :elevation="4"
    >
      <!-- <v-tab-transition> -->
      <template v-for="link in links" :key="link">
        <v-tab
          v-if="link != '钱包'"
          :stacked="true"
          variant="flat"
          base-color="transparent"
          :ripple="false"
          color="red"
          rounded="pill"
          :text="link"
        ></v-tab>
        <v-tab
          v-else
          class="btn-center"
          :stacked="true"
          variant="text"
          rounded="pill"
          base-color="transparent"
          :ripple="false"
          color="red"
        >
          <template #default>
            <!--   content-class="nav-header" -->
            <KeepAlive>
              <v-menu
                content-class="menu-user"
                :persistent="true"
                :attach="true"
                v-model="menu"
                :close-on-content-click="false"
                location="bottom center"
              >
                <template v-slot:activator="{ props }">
                  <v-avatar color="info" v-bind="props">
                    <v-icon icon="mdi-wallet"></v-icon>
                  </v-avatar>
                </template>

                <v-card hover min-width="300">
                  <v-list class="list-item-current-user">
                    <v-list-item>
                      <template #prepend>
                        <VueBlockies
                          class="rounded-circle border"
                          seed="0x5bccc4d5fe7020696eebda02777769f4583c75fa"
                          :color="'#0x5bcc'"
                          :bgcolor="'#f3f'"
                          :size="16"
                          :scale="2"
                          spot-color="#000"
                        />
                      </template>
                      <template #title>
                        <span class="text-overline" style="line-height: 2">
                          {{
                            extractString(
                              "0x5bccc4d5fe7020696eebda02777769f4583c75fa"
                            )
                          }}
                          <v-tooltip activator="parent" location="top"
                            ><span class="text-caption"
                              >点击复制</span
                            ></v-tooltip
                          >
                        </span>
                      </template>
                      <template #subtitle>
                        <div
                          style="padding-top: 0px"
                          class="text-success text-caption"
                        >
                          <v-scroll-y-reverse-transition mode="out-in">
                            <v-chip class="text-caption" color="pink" label>
                              {{ "$" + ethAmount }}
                              / USDT
                            </v-chip>
                          </v-scroll-y-reverse-transition>
                        </div>
                      </template>
                      <template #append>
                        <!-- <v-btn
                          class="d-"
                          size="small"
                          variant="text"
                          @click="fav = !fav"
                          >复制</v-btn
                        > -->
                        <v-btn
                          size="small"
                          variant="outlined"
                          @click="fav = !fav"
                          >断开链接</v-btn
                        >
                      </template>
                    </v-list-item>
                  </v-list>

                  <v-divider></v-divider>

                  <v-list rounded="shaped" class="list-my-wallet—list">
                    <v-list-item class="text-left" prepend="">
                      <template #prepend>
                        <v-icon icon="mdi-bank" />
                        <div class="text-caption">我的钱包</div>
                      </template>
                      <template #append>
                        <v-btn
                          class=""
                          size="small"
                          variant="plain"
                          @click="fav = !fav"
                        >
                          <template #prepend>
                            <v-icon icon="mdi-wallet-plus" size="x-small" />
                          </template>
                          创建或导入</v-btn
                        >
                        <v-btn size="small" variant="plain" @click="fav = !fav"
                          ><template #prepend>
                            <v-icon
                              icon="mdi-export"
                              size="x-small"
                            /> </template
                          >导出</v-btn
                        >
                      </template>
                    </v-list-item>
                    <!-- <v-divider></v-divider> -->
                    <v-list-item
                      value="1"
                      class="text-left"
                      color="primary"
                      rounded="shaped"
                    >
                      <template #prepend>
                        <VueBlockies
                          class="rounded-circle border"
                          style="margin-right: 10px"
                          seed="0x5bccc4d5fe7020696eebda02777769f4583c75fa"
                          :color="'#0x5bcc'"
                          :bgcolor="'#f3f'"
                          :size="16"
                          :scale="2"
                          spot-color="#000"
                        />
                      </template>
                      <template #title>
                        <span
                          title="0x5bccc4d5fe7020696eebda02777769f4583c75fa"
                          class="text-body-2"
                          style="letter-spacing: 0.1666666667em !important"
                        >
                          {{
                            extractString(
                              "0x5bccc4d5fe7020696eebda02777769f4583c75fa"
                            )
                          }}
                          <v-tooltip activator="parent" location="top"
                            ><span class="text-caption"
                              >点击复制</span
                            ></v-tooltip
                          >
                        </span>
                      </template>
                      <template #subtitle>
                        <span class="text-caption">
                          <v-scroll-y-reverse-transition mode="out-in">
                            {{ "$" + ethAmount }}
                          </v-scroll-y-reverse-transition>
                        </span>
                      </template>
                      <template #append>
                        <!-- <span>
                          <v-fade-transition mode="out-in">  mdi-account-key-outline-->
                        <v-btn
                          variant="plain"
                          size="x-small"
                          icon="mdi-eye"
                        ></v-btn>
                        <v-btn
                          variant="plain"
                          size="x-small"
                          icon="mdi-checkbox-multiple-blank-outline"
                        ></v-btn>
                        <v-btn
                          variant="plain"
                          size="x-small"
                          icon="mdi-pencil"
                        ></v-btn>
                        <!-- </v-fade-transition>
                        </span> -->
                      </template>
                    </v-list-item>
                  </v-list>
                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn variant="text" @click="menu = false"> Cancel </v-btn>
                    <v-btn color="primary" variant="text" @click="menu = false">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </KeepAlive>
          </template>
          <!-- <v-avatar color="info">
            <v-icon icon="mdi-account-circle"></v-icon>
          </v-avatar> -->
        </v-tab>
      </template>

      <!-- </v-tab-transition> -->
    </v-tabs>
  </v-app-bar>
</template>
  
<script setup>
import VueBlockies from "vue-blockies";

const links = ["首页", "交易", "钱包", "行情", "跨桥"];
const fav = ref(true);
const menu = ref(false);
const message = ref(false);
const hints = ref(true);
const ethAmount = ref(1.2);
const increment = () => {
  ethAmount.value += 1;
};
function extractString(str) {
  const first6 = str.substring(0, 6);
  const last4 = str.substring(str.length - 4);
  return first6 + "..." + last4;
}
</script>
<style scoped lang="sass">
.nav-header
  background: #2a2836 //$nav-bg-tabs-color
  .v-tab.v-tab.v-btn
    min-width: 60px
    margin: 0 5px
:deep(.v-toolbar__content)
  overflow: visible !important
:deep(.v-slide-group__container)
  contain: none
  overflow: visible !important
:deep(.v-slide-group__content)
  overflow: visible !important
  align-items: center
  position: initial
.v-toolbar__content,.v-slide-group,.v-slide-group__container,.v-slide-group__content
  overflow: visible !important
  position: initial
  height: 100%
  :deep(v-btn)
    overflow: visible !important
  .btn-center
    z-index: 9999999
    background: #135947
    // top: 0px
    // left: 50%
    // transform: translate(-50%, 0%)
    height: 60px !important
    border-radius: 50% !important
:deep(.menu-user)
  padding-top: 10px
  &::before
    content: ""
    position: relative
    top: 0
    left: 50%
    transform: translateX(-50%) rotate(180deg)
    width: 0
    height: 0
    border-left: 10px solid transparent
    border-right: 10px solid transparent
    border-top: 10px solid #333
    transition: opacity 0.15s
.list-item-current-user .v-list-item:first-child
  padding-top: 0px
  padding-bottom: 0px
.list-my-wallet—list
  padding: 0
.v-btn :deep(.v-btn__prepend)
  margin-bottom: 0
</style>

  