import { createWebHistory, createRouter } from "vue-router";
import home from "@/apps/home.vue";
import page404 from "@/apps/404.vue";
import page403 from "@/apps/403.vue";
import page500 from "@/apps/500.vue";
import pageAbout from "@/apps/about.vue";
import pageSignin from "@/apps/signin.vue";
import pageSignup from "@/apps/signup.vue";
import pageProblem from "@/apps/problem.vue";
import pageStatusInfo from "@/apps/statusInfo.vue";
import pageContest from "@/apps/contest.vue";
import pageScoreboard from "@/apps/scoreboard.vue";
import pageUser from "@/apps/user.vue";
import pageStatusList from "@/apps/statusList.vue";
import pageProblemList from "@/apps/problemList.vue";
import pageContestList from "@/apps/contestList.vue";
import pageProblemInContest from "@/components/contest/problem/problem_page.vue";
import pageStatusListInContest from "@/components/contest/status/status_table_page.vue";
import pageStatusInfoInContest from "@/components/contest/status/status_info_page.vue"

const routes = [
  {path: "/", component: home},
  {path: "/status", component: pageStatusList},
  {path: "/signin", component: pageSignin},
  {path: "/signup", component: pageSignup},
  {path: "/problem" , component: pageProblemList},
  {path: "/status/:id", component: pageStatusInfo, name: 'StatusInfoPage', props: true},
  {path: '/scoreboard/:id', component: pageScoreboard, name: 'ScoreBoard', props: true},
  {path: '/problem/:id', component: pageProblem, name: 'ProblemPage', props: true},
  {path: '/user/:username', component: pageUser, props: true},

  {path: "/contest" , component: pageContestList},
  {path: '/contest/:id',  component: pageContest, name: 'ContestPage', props: true},
  {path: '/contest/:cid/:problem_index', component: pageProblemInContest, name: 'ContestProblemPage', props: true},
  {path: '/contest/status/:id', component: pageStatusInfoInContest, props: true},
  {path: '/contest/:contest_id/status/user/:user_id', component: pageStatusListInContest, props: true},
  
  {path: "/403", name:'Page403', component: page403},
  {path: "/404", name:'Page404', component: page404},
  {path: "/500", name:'Page500', component: page500},
  {path: "/about", component: pageAbout},
  {path: "/:catchAll(.*)", component: page404},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
