/* 实验课申请登记  列出当前学期的自己的所有申请(申请状态有：已排课、未排课) 
新增申请，填写新的申请，新申请的状态为“未排课” 
修改申请，对处于“未排课”状态的申请可以修改内容 
申请内容包括：上课学期(默认当前学期)、申请教师(默认登录教师)、课程名称、需要的实验室类型、学生班级、学生人数、起始周、结
束周、节次。 */
<template>
  <div>
    <a-button type="primary" @click="showAddCourseModal"
      >新增实验课申请</a-button
    >
    <h3>已有的实验课申请：</h3>
    <a-table :columns="columns" :data="applyData" row-key="id">
      <template #action="{ record }">
        <a-button type="success" @click="editApplication(record)"
          >编辑</a-button
        >
        <a-button status="danger" @click="deleteApplication(record)"
          >删除</a-button
        >
      </template>
    </a-table>

    <a-modal
      title="实验课申请登记"
      :closable="false"
      v-model:visible="addCourseModalVisible"
      @ok="handleAddCourse"
      @cancel="cancelAddCourse"
    >
      <a-form ref="addSemForm" :model="newCourse">
        <a-form-item
          label="课程名称"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="newCourse.name" />
        </a-form-item>
        <a-form-item
          label="所需实验室"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-select v-model="newCourse.type">
            <a-option value="0">软件实验室</a-option>
            <a-option value="1">硬件实验室</a-option>
            <a-option value="2">网络实验室</a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="起始周数"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input-number v-model="newCourse.startingWeek" :min="1" :max="17" />
        </a-form-item>
        <a-form-item
          label="结束周数"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input-number v-model="newCourse.endingWeek" :min="1" :max="17" />
        </a-form-item>
        <a-form-item
          label="节次"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-select v-model="newCourse.session">
            <a-option
              v-for="session in sessions"
              :key="session"
              :value="session"
              >{{ session }}
            </a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="专业"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="newCourse.major" />
        </a-form-item>
        <a-form-item
          label="班级"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="newCourse.clazz" />
        </a-form-item>
        <a-form-item
          label="学生数量"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="newCourse.studentNum" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      title="编辑课程申请"
      :closable="false"
      v-model:visible="editCourseModalVisible"
      @ok="handleEditCourse"
      @cancel="cancelEditCourse"
    >
      <a-form ref="editSemForm" :model="currentCourse">
        <a-form-item
          label="课程名称"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="currentCourse.name" />
        </a-form-item>
        <a-form-item
          label="所需实验室"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-select v-model="currentCourse.type">
            <a-option value="0">软件实验室</a-option>
            <a-option value="1">硬件实验室</a-option>
            <a-option value="2">网络实验室</a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="起始周数"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input-number
            v-model="currentCourse.startingWeek"
            :min="1"
            :max="17"
          />
        </a-form-item>
        <a-form-item
          label="结束周数"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input-number
            v-model="currentCourse.endingWeek"
            :min="1"
            :max="17"
          />
        </a-form-item>
        <a-form-item
          label="节次"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-select v-model="currentCourse.session">
            <a-option
              v-for="session in sessions"
              :key="session"
              :value="session"
              >{{ session }}
            </a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="专业"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="currentCourse.major" />
        </a-form-item>
        <a-form-item
          label="班级"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="currentCourse.clazz" />
        </a-form-item>
        <a-form-item
          label="学生数量"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="currentCourse.studentNum" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import store from "@/store";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  CourseControllerService,
  SemesterControllerService,
  SessionControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";

export default {
  name: "CourseApply",
  setup() {
    const newCourse = ref({
      semester: " ",
      teacherId: store.state.user.loginUser.id,
      name: " ",
      type: " ",
      major: " ",
      clazz: " ",
      studentNum: " ",
      startingWeek: " ",
      endingWeek: " ",
      session: " ",
    });
    const currentCourse = ref({
      id: 0,
      teacherId: 0,
      type: 0,
      name: " ",
      semester: " ",
      startingWeek: " ",
      endingWeek: " ",
      session: " ",
      studentNum: 0,
      major: " ",
      clazz: " ",
    });
    const applyData = ref([]);
    const editCourseModalVisible = ref(false);
    const getSem = async () => {
      const res = await SemesterControllerService.getCurrentSemester(
        localStorage.getItem("token")
      );
      newCourse.value.semester = res.data.semester;
      console.log("当前学期：" + res.data.semester);
    };
    const addCourseModalVisible = ref(false);
    const getApplyData = async () => {
      try {
        const res = await CourseControllerService.getCoursesByTeacherId(
          store.state.user.loginUser.id,
          localStorage.getItem("token")
        );
        if (res.status === 100) {
          applyData.value = res.data;
        } else {
          console.log(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const showAddCourseModal = () => {
      addCourseModalVisible.value = true;
      console.log(newCourse.value);
    };

    const handleAddCourse = async () => {
      // 处理新增申请逻辑
      try {
        //newCourse.value.semester = sem.data.semester;
        console.log(newCourse.value);
        const res = await CourseControllerService.importCourse(
          newCourse.value,
          localStorage.getItem("token")
        );
        if (res.status === 100) {
          alert("添加成功！");
          resetNewCourse();
          addCourseModalVisible.value = false;
        } else {
          message.error("提交失败! " + res.message + " " + res.description);
        }
      } catch (e) {
        console.log(e);
      }
      console.log("新增申请", newCourse.value);
    };

    const cancelAddCourse = () => {
      addCourseModalVisible.value = false;
      resetNewCourse();
    };
    const resetNewCourse = () => {
      newCourse.value = {
        semester: "",
        teacherId: store.state.user.loginUser.id,
        name: "",
        type: "",
        major: "",
        clazz: "",
        studentNum: "",
        startingWeek: "",
        endingWeek: "",
        session: "",
      };
    };
    const columns = [
      { title: "学期", dataIndex: "semester", key: "semester" },
      { title: "课程名称", dataIndex: "name", key: "name" },
      { title: "实验室类型", dataIndex: "type", key: "type" },
      { title: "起始周", dataIndex: "startingWeek", key: "startingWeek" },
      { title: "结束周", dataIndex: "endingWeek", key: "endingWeek" },
      { title: "节次", dataIndex: "session", key: "session" },
      { title: "学生数量", dataIndex: "studentNum", key: "studentNum" },
      { title: "专业", dataIndex: "major", key: "major" },
      { title: "班级", dataIndex: "clazz", key: "clazz" },
      { title: "状态", dataIndex: "status", key: "status" },
      {
        title: "操作",
        key: "action",
        slotName: "action",
      },
    ];

    const editApplication = (record) => {
      if (record.status === 0) {
        console.log("行数据" + record.value);
        currentCourse.value = { ...record };
        editCourseModalVisible.value = true;
        console.log("编辑申请", record);
      } else {
        alert("已排课的申请无法编辑");
      }
    };
    const handleEditCourse = async () => {
      try {
        const res = await CourseControllerService.alterCourse(
          currentCourse.value,
          localStorage.getItem("token")
        );
        console.log(currentCourse.value);
        if (res.status === 100) {
          alert("修改成功");
        } else {
          message.error("提交失败! " + res.message + " " + res.description);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const cancelEditCourse = async () => {
      editCourseModalVisible.value = false;
      currentCourse.value = {
        semester: " ",
        teacherId: store.state.user.loginUser.id,
        name: " ",
        type: " ",
        major: " ",
        clazz: " ",
        studentNum: " ",
        startingWeek: " ",
        endingWeek: " ",
        session: " ",
      };
    };

    const deleteApplication = (application) => {
      if (application.status === 0) {
        console.log("删除申请", application);
      } else {
        alert("已排课的申请无法删除");
      }
    };
    const sessions = ref();
    const getSessions = async () => {
      const res = await SessionControllerService.getAllSessions(
        localStorage.getItem("token")
      );
      const sessionRes = res.data.map((item) => item.session);
      sessions.value = sessionRes;
    };
    onMounted(() => {
      getSem();
      getApplyData();
      getSessions();
    });
    return {
      newCourse,
      addCourseModalVisible,
      editCourseModalVisible,
      showAddCourseModal,
      handleAddCourse,
      cancelAddCourse,
      currentCourse,
      columns,
      sessions,
      applyData,
      editApplication,
      deleteApplication,
      handleEditCourse,
      cancelEditCourse,
    };
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
