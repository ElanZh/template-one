<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true">
        <el-form-item prop="time" label="输入任意格式时间">
          <el-input v-model="time" placeholder="请输入" />
        </el-form-item>
        <el-button type="primary" :icon="Refresh" @click="convert">转换</el-button>
      </el-form>
    </el-card>
    <el-card>
      <div class="table-wrapper">
        <el-table :data="cloneDeep(list).reverse()">
          <el-table-column prop="unixTime" label="unix-time" align="center" />
          <el-table-column prop="gmt8Time" label="北京时间" align="center" />
          <el-table-column prop="utcTime" label="国际时间" align="center" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { Refresh } from "@element-plus/icons-vue"
import moment from "moment"
import { cloneDeep } from "lodash-es"
defineOptions({
  // 命名当前组件
  name: "TimeConvert"
})
const time = ref<string>("")
const list = ref<timeItem[]>([])
const GMT8 = "YYYY-MM-DD HH:mm:ss.SSS"
const UTC = "YYYY-MM-DDTHH:mm:ss.SSS"
const convert = () => {
  let timeStr = time.value
  if (timeStr.includes("T")) {
    const momentInstance = moment(timeStr)
    const unixTime = momentInstance.valueOf()
    const gmt8Time = momentInstance.format(GMT8)
    const utcTime = momentInstance.format(UTC)
    list.value.push({ unixTime, gmt8Time, utcTime })
  } else if (timeStr.includes(" ")) {
    const unixTime = new Date(timeStr).getTime()
    const momentInstance = moment(unixTime)
    const gmt8Time = momentInstance.format(GMT8)
    const utcTime = momentInstance.utc().format(UTC)
    list.value.push({ unixTime, gmt8Time, utcTime })
  } else if (isNumeric(timeStr)) {
    timeStr = adjustStringLength(timeStr)
    const unixTime = new Date(Number(timeStr)).getTime()
    const momentInstance = moment(unixTime)
    const gmt8Time = momentInstance.format(GMT8)
    const utcTime = momentInstance.utc().format(UTC)
    list.value.push({ unixTime, gmt8Time, utcTime })
  } else {
    alert("无法转换 " + timeStr)
  }
}
function isNumeric(str: string): boolean {
  return /^\d+$/.test(str)
}
function adjustStringLength(str: string): string {
  if (str.length < 13) {
    return str.padEnd(13, "0")
  } else if (str.length > 13) {
    return str.slice(0, 13)
  }
  return str
}
interface timeItem {
  unixTime: number
  gmt8Time: string
  utcTime: string
}
</script>
