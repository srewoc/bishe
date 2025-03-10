<template>
  <div>

    <elcontain class="contian">
      <el-main class="main">
        <SingleChoice :question="question" v-if="qtype=== 1"></SingleChoice>
      </el-main>
      <el-footer class="footer">
        <div class="navigation-buttons">
          <el-button @click="previousQuestion">
            上一题
          </el-button>
          <el-button @click="nextQuestion" >
            下一题
          </el-button>
          <el-button
              @click="submit"
              type="primary"
          >
            提交
          </el-button>
        </div>
      </el-footer>
    </elcontain>
  </div>
</template>
<script setup>
import SingleChoice from "@/components/student/problem/SingleChoice.vue";
import {ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const route = useRouter();

// let questions = ref([]);



let question = ref();
let qtype = ref();

axios.get("/api" + route.currentRoute.value.path).then((response) => {
  question.value = response.data.data;
  qtype.value = response.data.type;
});

let probId = Number(route.currentRoute.value.params.id);
const questions = JSON.parse(sessionStorage.getItem("questions"));
let ind;
for(let i = 0; i < questions.length; i++){
  if(questions[i].uid === probId){
    ind = i;
  }
}

const previousQuestion = () => {
  if(ind > 0) {
    ind -= 1;
    probId = questions[ind].uid
    route.push({
      path: `/problems/${probId}`
    })
    axios.get("/api" + `/problems/${probId}`).then((response) => {
      question.value = response.data.data;
      qtype.value = response.data.type;
    });
  }
};

const nextQuestion = () => {
  if(ind < questions.length

      - 1) {
    ind += 1;
    probId = questions[ind].uid
    route.push({
      path: `/problems/${probId}`
    });
    axios.get("/api" + `/problems/${probId}`).then((response) => {
      question.value = response.data.data;
      qtype.value = response.data.type;
    });
  }
}

</script>


<style>
.main {
  display: flex;
  justify-self: center;
}

.footer {
  display: flex;
  justify-self: center;
  align-items: flex-end;
  height: 40vh;

}
</style>