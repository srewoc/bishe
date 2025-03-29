<template>
  <div class="c">
    <el-cascader-panel class="panel" :options="options" :props="{ checkStrictly: true, emitPath: false,expandTrigger: 'hover'}" @change="select" >
    </el-cascader-panel >
    <div class="bt">
      <el-button
          v-for="(question, index) in questions"
          :key="question.uid"
          :class="{
              'answered': question.answered,
              'current': currentQuestionIndex === index
            }"
          @click="goToQuestion(question.uid)"
      >
        {{ question.uid }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import {ref} from "vue";
import {useRouter} from "vue-router";
const router = useRouter();

let options = ref([]);

let currentQuestionIndex = ref(-1);

axios.get('/api/chapterselect').then((response) => {
  options.value = response.data.data;
});

let questions = ref([]);

const select = (val) => {
  axios.get('/api/chapter' + val).then((response) => {
    questions.value = response.data;
  })
  sessionStorage.setItem('selectchapter', JSON.stringify(val));
};

const goToQuestion = (uid) => {
  router.push({
    path: `/problems`
  })
  sessionStorage.setItem('selectprob', JSON.stringify(uid));

}


</script>


<style scoped>
.panel {
  width: fit-content;
  height: fit-content;
}


.bt {
  display: grid;
  grid-template-columns: repeat(19, 0fr);
  grid-gap: 10px;
  .el-button{
    margin-left: 0;
  }
}

.answered {
  background-color: #6CC747;
  color: #fff;
}

.current {
  background-color: #58AAFB;
  color: #fff;
}


</style>