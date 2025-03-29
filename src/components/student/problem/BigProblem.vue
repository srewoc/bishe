<template>
  <el-row style="width: 100%" class="first">
    <div class="question-container">
      <h3 v-if="question" class="title">{{ question.title }}</h3>
<!--            <el-image-->
<!--                style="width: 300px; height: 300px"-->
<!--                :src="srcList[0]"-->
<!--                :zoom-rate="1.2"-->
<!--                :max-scale="7"-->
<!--                :min-scale="0.2"-->
<!--                :preview-src-list="srcList"-->
<!--                show-progress-->
<!--                :initial-index="0"-->
<!--                fit="contian"-->
<!--            />-->
      <div class="gap-container">
        <el-input
            v-model="gap"
            class="gap"
            :autosize="{minRows: 5}"
            type="textarea"
        />
      </div>
    </div>
  </el-row>
</template>

<script setup>
import {defineProps, ref, defineExpose} from 'vue'

const gap = ref('');

defineProps({
//传过来的题目
  question: {
    type: Object,
    required: true
  },
});

defineExpose({
  gap
});

</script>

<style>
.question-container {
  padding: 20px;
  background-color: #ffffff;
}


.question-grid .el-button {
  width: 40px;
  height: 40px;
  padding: 0;
}

.first {
  display: flex;
  justify-content: center;
}

.gap-container {
  display: grid;
}

.gap{
  width: 650px;
  padding: 10px;
}

.title{
  width:700px;
  overflow-wrap: break-word;
}

</style>