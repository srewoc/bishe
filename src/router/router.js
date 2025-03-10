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

const routes = [
    {
        path: "/",
        redirect: "/dashboard",
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
                path: '/problems/:id',
                component: ProblemShow,
                props: true
            }
        ]
    },
    {
        path: '/singlechoice',
        component: SingleChoice
    }
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