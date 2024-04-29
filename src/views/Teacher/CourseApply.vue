/* 实验课申请登记  列出当前学期的自己的所有申请(申请状态有：已排课、未排课) 
新增申请，填写新的申请，新申请的状态为“未排课” 
修改申请，对处于“未排课”状态的申请可以修改内容 
申请内容包括：上课学期(默认当前学期)、申请教师(默认登录教师)、课程名称、需要的实验室类型、学生班级、学生人数、起始周、结
束周、节次。 */
<template>
  <span>已有的实验课申请：</span>
  <a-table></a-table>
</template>

<script>
export default {
  name: "CourseApply",
  data() {
    return {
      applications: [
        { id: 1, courseName: "计算机实验", status: "未排课" },
        { id: 2, courseName: "物理实验", status: "已排课" },
        { id: 3, courseName: "化学实验", status: "未排课" },
      ],
      newApplication: {
        courseName: "",
        // 其他申请内容在这里添加
      },
    };
  },
  methods: {
    // 新增申请
    addApplication() {
      // 设置默认值，例如学期、教师等
      this.newApplication.status = "未排课";
      this.applications.push({ ...this.newApplication, id: Date.now() });
      this.newApplication = {};
    },
    // 编辑申请
    editApplication(application) {
      // 只能编辑未排课的申请
      if (application.status === "未排课") {
        // 弹出编辑框，或者跳转到编辑页面，具体实现根据需求
        console.log("编辑申请", application);
      } else {
        alert("已排课的申请无法编辑");
      }
    },
  },
};
</script>

<style scoped>
.course-apply {
  max-width: 600px;
  margin: 0 auto;
}

.new-application input {
  margin-bottom: 10px;
}
</style>
