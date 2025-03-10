<template>
  <el-row style="width: 100%" class="first">
    <div class="question-container">
      <h3 v-if="question" >{{ question.title }}</h3>
      <el-radio-group class="optiongroup" v-model="select" v-if="question">
        <el-radio
            label="A"
        >
          {{question.opa}}
        </el-radio>
        <el-radio
            label="B"
        >
          {{question.opb}}
        </el-radio>
        <el-radio
            label="C"
        >
          {{question.opc}}
        </el-radio>
        <el-radio
            label="D"
        >
          {{question.opd}}
        </el-radio>
      </el-radio-group>
    </div>
  </el-row>

</template>

<script setup>
import {defineProps, ref} from 'vue'

let select = ref();

// let currentQuestionIndex = 0;
defineProps({
  question: {
    type: Object,
    required: true
  }
});

</script>


<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    return {-->
<!--      // 题库数据-->
<!--      questions: [-->
<!--        { title: "问题 1: 选择正确的选项", type: "single", options: ["A", "B", "C", "D"], answered: 'A', answer: 'null' },-->
<!--        { title: "问题 2: 选择多个选项", type: "multiple", options: ["A", "B", "C", "D"], answered: false, answer: [] },-->
<!--        { title: "问题 3: 选择正确的选项", type: "single", options: ["A", "B", "C", "D"], answered: false, answer: null },-->
<!--        { title: "问题 4: 选择多个选项", type: "multiple", options: ["A", "B", "C", "D"], answered: false, answer: [] },-->
<!--        { title: "问题 5: 选择正确的选项", type: "single", options: ["A", "B", "C", "D"], answered: false, answer: null },-->
<!--        { title: "问题 6: 选择多个选项", type: "multiple", options: ["A", "B", "C", "D"], answered: false, answer: [] },-->
<!--        { title: "问题 7: 选择正确的选项", type: "single", options: ["A", "B", "C", "D"], answered: false, answer: null },-->
<!--        { title: "问题 8: 选择多个选项", type: "multiple", options: ["A", "B", "C", "D"], answered: false, answer: [] },-->
<!--        { title: "问题 9: 选择正确的选项", type: "single", options: ["A", "B", "C", "D"], answered: false, answer: null },-->
<!--        { title: "问题 10: 选择多个选项", type: "multiple", options: ["A", "B", "C", "D"], answered: false, answer: [] },-->
<!--      ],-->
<!--      currentQuestionIndex: 0, // 当前题目索引-->
<!--      currentAnswer: [], // 当前题目的答案-->
<!--    };-->
<!--  },-->
<!--  computed: {-->
<!--    // 获取当前显示的题目-->
<!--    currentQuestion() {-->
<!--      return this.questions[this.currentQuestionIndex];-->
<!--    },-->
<!--    // 是否禁用提交按钮-->
<!--    isSubmitDisabled() {-->
<!--      // 如果有任何题目未答，则禁用提交按钮-->
<!--      return this.questions.some(question => !question.answered);-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    // 跳转到指定题目-->
<!--    goToQuestion(index) {-->
<!--      this.currentQuestionIndex = index;-->
<!--      const currentQuestion = this.questions[index];-->

<!--      // 如果题目已答过，恢复答案-->
<!--      if (currentQuestion.answered) {-->
<!--        this.currentAnswer = Array.isArray(currentQuestion.answer) ? [...currentQuestion.answer] : currentQuestion.answer;-->
<!--      } else {-->
<!--        // 否则，不显示任何答案（保持空白状态）-->
<!--        this.currentAnswer = Array.isArray(currentQuestion.answer) ? [] : null;-->
<!--      }-->
<!--    },-->
<!--    // 下一题-->
<!--    nextQuestion() {-->
<!--      if (this.currentQuestionIndex < this.questions.length - 1) {-->
<!--        this.autoSaveAnswer(); // 自动保存答案-->
<!--        this.currentQuestionIndex++; // 跳转到下一题-->
<!--        this.restoreAnswerIfNeeded(); // 恢复下一个题目的答案（如果有）-->
<!--      }-->
<!--    },-->
<!--    // 上一题-->
<!--    previousQuestion() {-->
<!--      if (this.currentQuestionIndex > 0) {-->
<!--        this.autoSaveAnswer(); // 自动保存答案-->
<!--        this.currentQuestionIndex&#45;&#45;; // 跳转到上一题-->
<!--        this.restoreAnswerIfNeeded(); // 恢复上一个题目的答案（如果有）-->
<!--      }-->
<!--    },-->
<!--    // 自动保存答案-->
<!--    autoSaveAnswer() {-->
<!--      const currentQuestion = this.questions[this.currentQuestionIndex];-->
<!--      // 只有在当前题目有答案时才保存-->
<!--      if (this.currentAnswer !== null && this.currentAnswer.length > 0) {-->
<!--        currentQuestion.answer = this.currentAnswer; // 保存答案-->
<!--        currentQuestion.answered = true; // 标记为已答-->
<!--      }-->
<!--    },-->
<!--    // 恢复答案，如果已经答过-->
<!--    restoreAnswerIfNeeded() {-->
<!--      const currentQuestion = this.questions[this.currentQuestionIndex];-->
<!--      if (currentQuestion.answered) {-->
<!--        this.currentAnswer = Array.isArray(currentQuestion.answer) ? [...currentQuestion.answer] : currentQuestion.answer;-->
<!--      } else {-->
<!--        this.currentAnswer = Array.isArray(currentQuestion.answer) ? [] : null;-->
<!--      }-->
<!--    },-->
<!--    // 回答选项变化时，自动保存-->
<!--    onAnswerChange() {-->
<!--      this.autoSaveAnswer();-->
<!--      // 移除自动跳转的逻辑，完全由用户控制-->
<!--    },-->
<!--    // 提交答案-->
<!--    submit() {-->
<!--      if (this.isSubmitDisabled) {-->
<!--        this.$message.warning("请完成所有题目后再提交！");-->
<!--      } else {-->
<!--        alert("已提交答案！");-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<style scoped>
/* 左侧题目 */
.question-container {
  padding: 20px;
  background-color: #fff;

}

.navigation-buttons {
  margin-top: 20px;
}

.question-grid {
  width: 200px;
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 每行 5 个题目 */
  grid-gap: 10px;

  .el-button {
    margin-left: 0;
  }
}

.question-grid .el-button {
  width: 40px; /* 使按钮宽度自适应 */
  height: 40px; /* 统一按钮高度 */
  padding: 0;
}

.first {
  display: flex;
  justify-content: center;
}

.second {
  display: flex;
  justify-content: center;
}

.optiongroup {
  display: grid;

}

</style>

