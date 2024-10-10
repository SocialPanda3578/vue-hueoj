<template>
    <div style="width: 60%">
      <span style="margin-top: 30px;font-size: 19px;font-weight: 600">活跃度</span>
      <a-row>
        <a-col :span="1" :offset="19">
          <div style="height: 13px;"></div>
        </a-col>
        <a-col :span="2">
          <div>
            <ul class="graph" style="border: 0;grid-template-rows: repeat(1, 15px)">
              <li :data-level="level0"  class="li-day"></li>
              <li :data-level="level1"  class="li-day"></li>
              <li :data-level="level2"  class="li-day"></li>
              <li :data-level="level3"  class="li-day"></li>
            </ul>
          </div>
        </a-col>
        <a-col :span="1">
          <div style="height: 13px;"></div>
        </a-col>
      </a-row>
      <div class="container-card">
        <a-row>
          <a-col :span="2">
            <ul style="list-style: none;margin: 20px 0px 5px 0px;line-height: 15px">
              <li style="font-size: 13px">周日</li>
              <li>&nbsp;</li>
              <li>&nbsp;</li>
              <li style="font-size: 13px">周三</li>
              <li>&nbsp;</li>
              <li>&nbsp;</li>
              <li style="font-size: 13px">周六</li>
            </ul>
          </a-col>
          <a-col :span="22">
            <ul class="graph">
              <li v-for="n in today" style="background-color: white;list-style: none;margin: 1.5px;">&nbsp;</li>
  
              <a-popover class="item"
                         placement="top" v-for="(item, index) in infos" :key="index" >
                <template #content>
                  {{item.year + '-' + item.month + '-' + item.date}}
                </template>
                <li :data-level="item.level"  class="li-day" ></li>
              </a-popover>
            </ul>
            <ul class="months">
              <li class="li-month" v-for="(item,index) in monthBar" :key="index">{{item}}</li>
            </ul><br>
          </a-col>
        </a-row>
      </div>
    </div>
  </template>
  
  <script>
  
  import {reactive, toRefs} from "vue";
  
  export default {
    name: 'activeNum',
    setup(){
      const state = reactive({
        infos: [],  //存放365天每一天的数据（year，month，date，状态数量，isToday标记）
        current: {  //存放今天的年月日
          year: "",
          month: "",
          date: "",
        },
        level0: 0,     //等级1
        level1: 1,     //等级2
        level2: 2,     //等级3
        level3: 3,     //等级4
        today: 0,
        monthBar: ["", "", "", "", "", "", "", "", "","",
          "", "", "", "", "", "", "", "", "","",
          "", "", "", "", "", "", "", "", "","",
          "", "", "", "", "", "", "", "", "","",
          "", "", "", "", "", "", "", "", "","",
          "","",
        ],
      })
  
      const activeNumber = function (){
        let d = new Date();                    //
  
        let day = d.getDay();           //获取今天所在星期，以进行后续计算    5
        let today = d.getDate();        //获取今天的日数                   3
        // console.log(day)
  
        state.today = day
  
        state.current.year = d.getFullYear();   //初始化今日的年月日    2022
        state.current.month = d.getMonth();     //   8
        state.current.date = d.getDate();
  
        const dataLists =[                  //模拟后端接收到的数据
          {day: '2021-10-20',number: 200},
          {day: "2022-9-20",number: 300},
          {day: "2022-9-21",number: 100},
          {day: '2022-8-10',number: 150},
          {day: "2022-9-2",number: 50},
          {day: "2022-9-23",number: 150},
        ]
  
        let info = {};         //用来存放某一天的数据对象（年月日、isToday、level）
        let month = "";        //后续计算某月第一天在哪一列用，表示第几月
        let weekOfMonth = ""   //后续计算某月第一天在哪一列用，表示第几列
  
        for (let i = 0; i < 365; i++) {
          d.setFullYear(state.current.year);  //每次循环要重置年月日为今天否则会以上次循环结尾的年月日计算而计算错误
          d.setMonth(state.current.month);
          d.setDate(state.current.date);
          d.setDate(today - 364 + i);
  
          info = {
            year: d.getFullYear(),
            month: d.getMonth() + 1,
            date: d.getDate(),
            number: 0,
            level: 0,
            isToday: false,
          };
          state.infos.push(info);      //渲染上365天的空数据
  
          for(let j = 0;j < dataLists.length;j++){
            //判断遍历到的天数是否和后端传回的数据对应（0-9月份）
            if (d.getMonth()+1 == dataLists[j].day.substr(5,1)&&d.getDate() == dataLists[j].day.substr(7,2)){
              state.infos[i] = {                      //每个格子（天）的info对象
                year: d.getFullYear(),      //年月日
                month: d.getMonth() + 1,
                date: d.getDate(),
                number: dataLists[j].number,    //今日的数据量
                level: judgeLevel(dataLists[j].number),  //今日数据量对应的等级
                isToday: false, //是否是今天
              };
              //判断遍历到的天数是否和后端传回的数据对应（10-12月份）
            }else if(d.getMonth()+1 == dataLists[j].day.substr(5,2)&&d.getDate() == dataLists[j].day.substr(8,2)){
              state.infos[i] = {                      //每个格子（天）的info对象
                year: d.getFullYear(),      //年月日
                month: d.getMonth() + 1,
                date: d.getDate(),
                number: dataLists[j].number,    //今日的数据量
                level: judgeLevel(dataLists[j].number),  //今日数据量对应的等级
                isToday: false, //是否是今天
              };
            }
          }
  
          // // 判断每月第一天在12列种的哪一列
          if (d.getDate() === 1) { //date为1的肯定是某月第一天
            month = d.getMonth() + 1  //获取这一天对应的月份（0-11，所以还要+1）
            weekOfMonth = parseInt((i + 1) / 7)  //这个月的第一天的index（84天的第几天）除以7获得所在列的index（12列的第几列），作为下面monthBar的index，并把原来空的内容用替换为xx月
            state.monthBar[weekOfMonth] = month + "月"
          }
        }
      };
      const judgeLevel = function (num){
        if (num === 0){
          return "0"
        }
        if (num>0&&num<=100){
          return "1"
        }
        if (num>100&&num<=200){
          return "2"
        }
        if (num>200&&num<=300){
          return "3"
        }
      }
  
      activeNumber()
  
      return{
        ...toRefs(state)
      }
    }
  }
  
  </script>
  
  <style scoped>
  .graphExample{
    display: grid;
    grid-template-columns: repeat(3, 15px);  /*竖向12列，21px宽*/
    grid-template-rows: repeat(0, 15px);     /*横向7列，21px宽*/
    padding-inline-start: 0px;
    grid-auto-flow: row;               /*生成7*12的格子后，设置为竖向排布*/
    margin: 20px 0px 5px 0px;
  }
  
  .graph {
    display: grid;
    grid-template-columns: repeat(53, 15px);  /*竖向12列，21px宽*/
    grid-template-rows: repeat(7, 15px);     /*横向7列，21px宽*/
    padding-inline-start: 0px;
    grid-auto-flow: column;               /*生成7*12的格子后，设置为竖向排布*/
    margin: 20px 0px 5px 0px;
  }
  
  .months {
    display: grid;
    grid-template-columns: repeat(52, 15px);
    grid-template-rows: 21px;
    font-size: 8px;
    color: #aaa;
    padding-inline-start: 0px;
    margin: 5px 20px 5px 0px;
  }
  
  .li-month {
    display: inline-block;
  }
  
  .li-day {
    background-color: #eaeaea;
    list-style: none;             /*记得把list的圆点效果去掉*/
    margin: 1.5px;
    border-radius: 3px;
  }
  
  .li-day:hover {               /*添加hover强调效果*/
    box-shadow: 0px 0px 5px rgb(57, 120, 255);
  }
  .graph li[data-level="1"],.level1 {
    background-color: #d9ecff;
  }
  
  .graph li[data-level="2"],.level2 {
    background-color: #8cc5ff;
  }
  
  .graph li[data-level="3"],.level3 {
    background-color: #409eff;
  }
  </style>