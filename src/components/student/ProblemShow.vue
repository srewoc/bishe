<template>
  <div>

    <elcontain class="contian">
      <el-main class="main">
        <SingleChoice :question="question" v-if="qtype === 1" ref="singlechildRef"></SingleChoice>
        <GapFilling :question="question" v-if="qtype === 2" ref="gapchildRef"></GapFilling>
        <JudGe :question="question" v-if="qtype === 3" ref="judgechildRef"></JudGe>
        <BigProblem :question="question" v-if="qtype >= 4" ref="bigchildRef"></BigProblem>
        <div v-if="show" class="answer">
          <el-icon v-if="flag === 1">
            <SuccessFilled/>
          </el-icon>
          <el-icon v-if="flag === 0">
            <CircleCloseFilled/>
          </el-icon>
          正确答案:{{ realans }}
          <el-image
              v-for="(item,index) in anspics"
              :key="index"
              style="width: 300px; height: 300px"
              :src="item"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              show-progress
              :initial-index="0"
              fit="contian"
          />
        </div>
      </el-main>
      <el-footer class="footer">
        <div class="navigation-buttons">
          <el-button @click="previousQuestion">
            上一题
          </el-button>
          <el-button @click="nextQuestion">
            下一题
          </el-button>
          <el-button
              @click="submit"
              type="primary"
              :disabled="isdis"
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
// import {useRouter} from "vue-router";
import {SuccessFilled, CircleCloseFilled} from '@element-plus/icons-vue'
import BigProblem from "@/components/student/problem/BigProblem.vue";
import GapFilling from "@/components/student/problem/GapFilling.vue";
import JudGe from "@/components/student/problem/JudGe.vue";

// const route = useRouter();

// let questions = ref([]);

// const SingleChoice = ref(null);

let question = ref();
let qtype = ref();
const currentchapter = ref(JSON.parse(sessionStorage.getItem("selectchapter")));
const currentuid = ref(JSON.parse(sessionStorage.getItem("selectprob")));

axios.get("/api/problems/" + currentuid.value).then((response) => {
  question.value = response.data.data;
  qtype.value = response.data.type;
});

// let probId = Number(route.currentRoute.value.params.id);
// const questions = JSON.parse(sessionStorage.getItem("questions"));
// let ind;
// for (let i = 0; i < questions.length; i++) {
//   if (questions[i].uid === probId) {
//     ind = i;
//   }
// }

const singlechildRef = ref(null);
const gapchildRef = ref(null);
const judgechildRef = ref(null);
const bigchildRef = ref(null);
const show = ref(false);
const flag = ref(1);
const realans = ref('');
const isdis = ref(false);
const anspics = ref(Array);

const previousQuestion = () => {
  axios.get("/api/preprob/" + currentchapter.value + "/" + currentuid.value).then((response) => {
    if(response.data.data != null) {
      question.value = response.data.data;
      qtype.value = response.data.type;
      show.value = false;
      isdis.value = false;
      singlechildRef.value.select = '';
      //TODO 还要更新localstorage里面的东西
    }
  })
  show.value = false; //展示答案
  isdis.value = false; //提交按钮可用
  singlechildRef.value.select = ''; //选择返回
  gapchildRef.value.gaps = []; //填空返回
  judgechildRef.value.select = ''; //判断返回
  bigchildRef.value.gap = ''; //大题返回
  anspics.value = []; //答案图片
  // if (ind > 0) {
  //   ind -= 1;
  //   probId = questions[ind].uid
  //   route.push({
  //     path: `/problems/${probId}`
  //   })
  //   axios.get("/api" + `/problems/${probId}`).then((response) => {
  //     question.value = response.data.data;
  //     qtype.value = response.data.type;
  //   });
  // }
};

const nextQuestion = () => {
  // axios.get("/api/nextprob/" + currentchapter.value + "/" + currentuid.value).then((response) => {
  //   if(response.data.data != null) {
  //     question.value = response.data.data;
  //     qtype.value = response.data.type;
  //     show.value = false;
  //     isdis.value = false;
  //     singlechildRef.value.select = '';
  //     //TODO 还要更新localstorage里面的东西
  //   }
  // })
  show.value = false;
  isdis.value = false;
  singlechildRef.value.select = '';
  gapchildRef.value.gaps = [];
  judgechildRef.value.select = '';
  bigchildRef.value.gap = '';
  anspics.value = [];
  // if (ind < questions.length- 1) {
  //   ind += 1;
  //   probId = questions[ind].uid
  //   route.push({
  //     path: `/problems/${probId}`
  //   });
  //   axios.get("/api" + `/problems/${probId}`).then((response) => {
  //     question.value = response.data.data;
  //     qtype.value = response.data.type;
  //   });
  // }
}


const submit = () => {
  if (qtype.value === 1) {
    const select = singlechildRef.value.select;
    if (select !== '') {
      isdis.value = true;
      axios.post("/api/submitsinglechoice", {
        select: select,
        uid: currentuid.value,
      }).then((response) => {
        flag.value = Number(!!response.data.flag);
        show.value = true;
        realans.value = response.data.ans;
        // TODO 图片数组传过来
      })
    }
  } else if (qtype.value === 2) {
    const gaps = gapchildRef.value.gaps;
    //TODO 未验证这种写法的可行性
    if (!gaps.includes('')) {
      isdis.value = true;
      axios.post("/api/submitgapfilling", {
        gaps: gaps,
        uid: currentuid.value,
      }).then((response) => {
        flag.value = Number(!!response.data.flag);
        show.value = true;
        realans.value = response.data.ans;
        // TODO 图片数组传过来
      })
    }
  } else if (qtype.value === 3) {
    const select = judgechildRef.value.select;
    if (select !== '') {
      isdis.value = true;
      axios.post("/api/submitjudge", {
        select: select,
        uid: currentuid.value,
      }).then((response) => {
        flag.value = Number(!!response.data.flag);
        show.value = true;
        realans.value = response.data.ans;
        // TODO 图片数组传过来
      })
    }
  } else {
    const gap = bigchildRef.value.gap;
    if(gap !== ''){
      isdis.value = true;
      axios.post("api/submitbigproblem", {
        gap: gap,
        uid: currentuid.value,
      }).then((response) => {
        flag.value = 2;
        show.value = true;
        realans.value = response.data.ans;
        // TODO 图片数组传过来
      })
    }
  }
}

</script>


<style>
.main {
  display: flex;
  justify-self: center;
  flex-direction: column;
}

.footer {
  display: flex;
  justify-self: center;
  align-items: flex-end;
  height: 40vh;

}

.answer {
  display: grid;
}
</style>