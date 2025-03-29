import {createRouter, createWebHashHistory} from 'vue-router';

import LoginForm from "@/components/LoginForm.vue";
import DashBoard from "@/components/student/DashBoard.vue";
// import TestOne from "@/components/test/TestOne.vue";
// import TestTwo from "@/components/test/TestTwo.vue";
// import TestThree from "@/components/test/TestThree.vue";
import SelfSetting from "@/components/student/SelfSetting.vue";
import ChapterSelect from "@/components/student/ChapterSelect.vue";
import SingleChoice from "@/components/student/problem/SingleChoice.vue";
import ProblemShow from "@/components/student/ProblemShow.vue";
import judGe from "@/components/student/problem/JudGe.vue";
import GapFilling from "@/components/student/problem/GapFilling.vue";
import TestTest from "@/components/TestTest.vue";
import BigProblem from "@/components/student/problem/BigProblem.vue";

const routes = [
    {
        path: "/",
        redirect: "/login",
    },
    {
        path: '/login',
        name: 'LoginForm',
        component: LoginForm
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashBoard,
        // redirect: '/test1',
        children:[
            {
                path: '/selfsetting',
                component: SelfSetting
            },
            {
                path: '/chapterselect',
                component: ChapterSelect
            },
            {
                path: '/problems',
                component: ProblemShow,
                props: true
            },
            {
                path: '/judge',
                component: judGe
            },
            {
                path: '/gapfilling',
                component: GapFilling
            },
            {
              path: '/bigproblem',
              component: BigProblem
            },
            {
                path: 'test',
                component: TestTest
            }
        ]
    },
    {
        path: '/singlechoice',
        component: SingleChoice
    },

    // {
    //     path: '/test1',
    //     component: TestOne
    // },
    // {
    //     path: '/test2',
    //     component: TestTwo
    // },
    // {
    //     path: '/test3',
    //     component: TestThree
    // },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;