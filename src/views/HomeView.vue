<template>
  <div class="home">欢迎来到计算机系实验管理平台</div>
  <div>
    <h3>课程表</h3>
    <a-form ref="classScheduleForm" :model="classScheduleData">
      <a-form-item
        label="学期"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 22 }"
      >
        <a-input v-model="classScheduleData.semester" />
      </a-form-item>
      <a-form-item
        label="星期"
        :label-col="{ span: 2 }"
        :wrapper-col="{ span: 22 }"
      >
        <a-input-number v-model="classScheduleData.week" :min="1" :max="17" />
      </a-form-item>
      <a-button type="primary" @click="generateSchedule()">
        生成课程表
      </a-button>
    </a-form>
    <br />
    <a-table
      id="scheduleTable"
      column-resizable
      :bordered="{ cell: true }"
      :columns="columns"
      :data="scheduleData"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ComplexQueryController } from "../../generated/services/ComplexQueryController";
import { SemesterControllerService } from "../../generated";

export default defineComponent({
  name: "HomeView",
  setup() {
    const classScheduleData = ref({
      semester: "",
      week: "",
    });
    const getSem = async () => {
      const res = await SemesterControllerService.getCurrentSemester(
        localStorage.getItem("token") || " "
      );
      classScheduleData.value.semester = res.data?.semester;
    };
    const scheduleData = ref();
    const generateSchedule = async () => {
      const week = classScheduleData.value.week;
      const semester = classScheduleData.value.semester;
      const tempData = [];
      // 初始化课程表格
      // for (let i = 1; i <= 15; i++) {
      //   const row = {
      //     session: `${i}节`,
      //   };
      //   tempData.push(row);
      // }
      //scheduleData.value = tempData;
      // 获取这个星期的课程
      const courses = await getCoursesForDay(semester, week);
      console.log(courses);
      scheduleData.value = courses;
      // courses.forEach(
      //   (course: {
      //     session: string;
      //     name: string;
      //     clazz: any;
      //     labName: any;
      //     labId: any;
      //   }) => {
      //     console.log(course);
      //     const section = course.session.split(" ")[1];
      //     const date = parseInt(course.session.split(" ")[0]);
      //     const startSession = parseInt(section.split("-")[0]);
      //     const endSession = parseInt(section.split("-")[1]);
      // for (let i = startSession; i <= endSession; i++) {
      //   scheduleData[date - 1].value[course.labId][
      //     i - 1
      //   ] = `${course.name}(${course.clazz})${course.labName}`;
      // }
      // }
      // );
    };
    const queryCourse = ref({
      semester: "",
      week: "",
    });
    const getCoursesForDay = async (semester: string, week: string) => {
      // 后端返回数据
      queryCourse.value.semester = semester;
      queryCourse.value.week = week;
      const res = await ComplexQueryController.getCourseLabSession(
        queryCourse.value,
        localStorage.getItem("token") || " "
      );
      return res.data;
      // const courses = ref([]);
      // courses.value = res.data?.filter((course: { session: string }) => {
      //   const day = parseInt(course.session.split(" ")[0]);
      //   return day === week;
      // });
      // return courses.value;
    };

    const columns = [
      {
        title: "星期--节次",
        dataIndex: "session",
        sortable: {
          sortDirections: ["ascend", "descend"],
        },
      },
      {
        title: "课程名",
        dataIndex: "name",
      },
      {
        title: "班级",
        dataIndex: "clazz",
      },
      {
        title: "实验室",
        dataIndex: "labName",
      },
      {
        title: "实验室位置",
        dataIndex: "number",
      },
    ];
    onMounted(getSem);
    return {
      classScheduleData,
      scheduleData,
      generateSchedule,
      columns,
    };
  },
  methods: { ref },
});
</script>
<style>
.home {
  margin-left: 20px;
  font-size: 30px;
}

a-calendar {
  max-width: 1600px;
}
</style>
