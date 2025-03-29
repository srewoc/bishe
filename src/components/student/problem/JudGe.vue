<template>
  <el-row style="width: 100%" class="first">
    <div class="question-container">
      <h3 v-if="question" class="title">{{ question.title }}</h3>
<!--      <el-image-->
<!--          style="width: 300px; height: 300px"-->
<!--          :src="srcList[0]"-->
<!--          :zoom-rate="1.2"-->
<!--          :max-scale="7"-->
<!--          :min-scale="0.2"-->
<!--          :preview-src-list="srcList"-->
<!--          show-progress-->
<!--          :initial-index="0"-->
<!--          fit="contian"-->
<!--      />-->
      <el-radio-group class="optiongroup" v-model="select" v-if="question">
        <el-radio
            label="true"
        >
          对
        </el-radio>
        <el-radio
            label="false"
        >
          错
        </el-radio>
      </el-radio-group>
    </div>
  </el-row>
</template>

<script setup>
import {defineProps, ref, defineExpose} from 'vue'

//选择的选项，获取el-radio的label
const select = ref('');

// const question = {
//   title: 'sadfdasfdasfdasfsdaasdfsadfsdfasfassfasfasasfasfdasdasfadsfasdfdaasdfashflasdhflkasdhfsadfasdfasdasdsfdsafasfsadfasdfasd',
// };

defineProps({
//传过来的题目
  question: {
    type: Object,
    required: true
  }
});

defineExpose({
  select
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


.optiongroup {
  display: grid;

}

.title{
  width:700px;
  overflow-wrap: break-word;
}

</style>