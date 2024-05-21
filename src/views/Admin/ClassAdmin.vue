/* 实验排课  根据“教师”填报的“实验课申请登记”，将实验课安排到实验室。
根据“实验课申请登记”的“实验室类型”确定可以选择的实验室范围
根据“实验课申请登记”的“学生人数”和实验室设备数决定分配哪几间实验室
根据“实验课申请登记”的“起始周”、“结束周”和已经排课的情况避免实验室冲突
提示：可以创建一个“实验室排课”表来记录实验室排课的情况，该 表的主要数据包括：
排课学期：是哪个学期的课  实验室名称：  实验室编号：  周次：第几周
节次：第几节课  课程名：  任课教师：  学生班级： */
<template>
  <div>
    <h3>实验课申请</h3>
    <!-- 申请登记表格 -->
    <a-table :columns="experimentColumns" :data="experimentData">
      <template #action="{ record }">
        <a-button type="primary" @click="arrangeExperiment(record)"
          >安排实验课</a-button
        >
        <a-button status="danger" @click="reject(record)">退回申请</a-button>
      </template>
    </a-table>

    <!-- 实验室排课表格 -->
    <h3>实验室排课表</h3>
    <a-table
      column-resizable
      :columns="labScheduleColumns"
      :data="labScheduleData"
    ></a-table>

    <a-modal
      title="实验排课"
      v-model:visible="arrangeModalVisible"
      closable:false
      @ok="handelArrange"
      @cancel="cancelArrange"
    >
      <a-form ref="arrangeForm" :model="arrangeForm">
        <a-form-item
          label="可选实验室"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-select v-model="arrangeFormLabId">
            <a-option v-for="lab in availableLab" :key="lab.id" :value="lab.id"
              >{{ lab.name }}
            </a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      title="退回申请"
      v-model:visible="rejectModelVisible"
      @ok="handelReject"
      @cancel="cancelReject"
    >
      <div class="center-text"><h2>确定退回申请？</h2></div>
    </a-modal>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import {
  CourseControllerService,
  LabControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";

export default {
  name: "ExperimentScheduling",
  setup() {
    // 实验课申请登记数据
    const experimentData = ref([]);
    // 实验室排课数据
    const labScheduleData = ref([]);
    // 实验课申请登记表格列配置
    const experimentColumns = [
      {
        title: "排课学期",
        dataIndex: "semester",
      },
      {
        title: "所需实验室类型",
        dataIndex: "type",
      },
      {
        title: "开始周次",
        dataIndex: "startingWeek",
      },
      {
        title: "结束周次",
        dataIndex: "endingWeek",
      },
      {
        title: "节次",
        dataIndex: "session",
      },
      {
        title: "课程名",
        dataIndex: "name",
      },
      {
        title: "任课教师",
        dataIndex: "teacherId",
      },
      {
        title: "学生班级",
        dataIndex: "clazz",
      },
      {
        title: "学生数量",
        dataIndex: "studentNum",
      },
      {
        title: "操作",
        dataIndex: "action",
        slotName: "action",
      },
    ];
    // 实验室排课表格列配置
    const labScheduleColumns = [
      {
        title: "排课学期",
        dataIndex: "semester",
      },
      {
        title: "实验室编号",
        dataIndex: "labId",
      },
      {
        title: "课程名称",
        dataIndex: "name",
      },
      {
        title: "开始周次",
        dataIndex: "startingWeek",
      },
      {
        title: "结束周次",
        dataIndex: "endingWeek",
      },
      {
        title: "节次",
        dataIndex: "session",
      },
      {
        title: "任课教师",
        dataIndex: "teacherId",
      },
      {
        title: "学生班级",
        dataIndex: "clazz",
      },
    ];
    const arrangeModalVisible = ref(false);
    const rejectModelVisible = ref(false);
    const availableLab = ref([]);
    const arrangeForm = {
      id: 0,
      labId: 0,
      status: 0,
    };
    const arrangeFormLabId = ref(null);
    const getData = async () => {
      try {
        const res1 = await CourseControllerService.getCoursesByStatus(
          0,
          localStorage.getItem("token")
        );
        const res2 = await CourseControllerService.getCoursesByStatus(
          1,
          localStorage.getItem("token")
        );
        experimentData.value = res1.data;
        labScheduleData.value = res2.data;
        // console.log(res1.data);
        // console.log(res2.data);
      } catch (e) {
        console.log(e);
      }
    };
    // 安排实验课
    const arrangeExperiment = async (record) => {
      try {
        arrangeModalVisible.value = true;
        const queryForm = {
          type: record.type,
          semester: record.semester,
          startingWeek: record.startingWeek,
          endingWeek: record.endingWeek,
          session: record.session,
          studentNum: record.studentNum,
        };
        const res = await LabControllerService.getAvailableLabs(
          queryForm,
          localStorage.getItem("token")
        );
        console.log(record);
        availableLab.value = res.data;
        // arrangeFormLabId.value = res.data[0].name;
        arrangeForm.value = { id: record.id, labId: 0, status: 1 };
        // arrangeForm.value.id = record.id;
        // arrangeForm.value.status = 1;
        // arrangeForm.value.labId = 0;
        console.log(arrangeForm.value);
      } catch (error) {
        console.error(error);
      }
    };
    const handelArrange = async () => {
      try {
        // console.log(arrangeForm.value);
        // console.log("arr", arrangeForm.value.id);
        // console.log("arr", arrangeForm.value.status);
        // console.log("arr", arrangeForm.value.labId);
        // console.log("arr", arrangeFormLabId.value);
        arrangeForm.value.labId = arrangeFormLabId.value;
        const res = await CourseControllerService.admitCourse(
          arrangeForm.value,
          localStorage.getItem("token")
        );
        if (res.status === 100) {
          alert("排课成功");
        } else {
          message.error("排课失败! " + res.message + " " + res.description);
        }
        arrangeModalVisible.value = false;
        await getData();
      } catch (e) {
        console.log(e);
      }
    };
    const cancelArrange = () => {
      arrangeForm.value = {
        id: 0,
        labId: 0,
        status: 0,
      };
      arrangeModalVisible.value = false;
    };

    const reject = (record) => {
      rejectModelVisible.value = true;
      arrangeForm.value = { id: record.id, labId: 0, status: 0 };
    };
    const handelReject = async () => {
      try {
        const res = await CourseControllerService.admitCourse(
          arrangeForm.value,
          localStorage.getItem("token")
        );
        if (res.status === 100) {
          alert("已拒绝");
        } else {
          message.error("操作失败! " + res.message + " " + res.description);
        }
        rejectModelVisible.value = false;
        await getData();
      } catch (e) {
        console.log(e);
      }
    };
    const cancelReject = () => {
      arrangeForm.value = {
        id: 0,
        labId: 0,
        status: 0,
      };
      rejectModelVisible.value = false;
    };
    onMounted(() => {
      getData();
    });
    return {
      experimentData,
      experimentColumns,
      labScheduleData,
      labScheduleColumns,
      arrangeExperiment,
      arrangeFormLabId,
      arrangeModalVisible,
      rejectModelVisible,
      handelArrange,
      cancelArrange,
      arrangeForm,
      availableLab,
      reject,
      handelReject,
      cancelReject,
    };
  },
};
</script>

<style scoped>
.center-text {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
