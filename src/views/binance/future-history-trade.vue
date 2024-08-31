<script setup lang="ts">
import { Search } from "@element-plus/icons-vue"
import { ref } from "vue"
import { HistoryTradeData, HistoryTradeRequest } from "@/api/binance/types/binance"
import { futureHistoryTradeApi } from "@/api/binance/index"
import type { FormRules } from "element-plus"
import moment from "moment"

const loading = ref<boolean>(false)

const searchData = ref<HistoryTradeRequest>({
  symbol: "",
  tradeId: "",
  forward: 50,
  behind: 50
})

const tableData = ref<HistoryTradeData[]>([])

const formRules: FormRules<HistoryTradeRequest> = {
  symbol: [{ required: true, trigger: "blur", message: "请输入 交易对" }],
  tradeId: [{ required: true, trigger: "blur", message: "请输入 tradeId" }],
  forward: [{ required: true, trigger: "blur", message: "请输入 向前查询数量" }],
  behind: [{ required: true, trigger: "blur", message: "请输入 向后查询数量" }]
}

const forwardPlus = () => {
  searchData.value.forward += 50
}
const behindPlus = () => {
  searchData.value.behind += 50
}

const handleSearch = () => {
  loading.value = true

  futureHistoryTradeApi(searchData.value)
    .then((res) => {
      tableData.value = res
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<template>
  <div class="app-container">
    合约
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :rules="formRules" :model="searchData">
        <el-form-item prop="symbol" label="交易对">
          <el-input v-model="searchData.symbol" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="tradeId" label="tradeId">
          <el-input v-model="searchData.tradeId" placeholder="以交易ID为中心" />
        </el-form-item>
        <el-form-item prop="forward" label="向前">
          <el-input v-model="searchData.forward" placeholder="50">
            <template #append>
              <el-button @click="forwardPlus">+50</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="behind" label="向后">
          <el-input v-model="searchData.behind" placeholder="50">
            <template #append>
              <el-button @click="behindPlus">+50</el-button>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column prop="time" label="unix-time" align="center" />
          <el-table-column label="北京时间" align="center">
            <template #default="{ row }">
              {{ moment(row.time).format("YYYY-MM-DD HH:mm:ss.SSS") }}
            </template>
          </el-table-column>
          <el-table-column prop="id" label="tradeId" align="center" />
          <el-table-column prop="price" label="单价" align="right" />
          <el-table-column prop="qty" label="数量" align="right" />
          <el-table-column prop="quoteQty" label="报价数量" align="right" />
          <el-table-column prop="isBuyerMaker" label="isBuyerMaker" align="center" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.search-wrapper {
  margin-bottom: 20px;

  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
