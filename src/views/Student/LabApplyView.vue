/* 实验室借用申请 
列出自己所有填报过的实验室借用申请(申请状态有：未审核、通过、驳回、使用完毕)。
新增申请，填写新的申请，新申请的状态为“未审核”。
修改申请，对处于“未审核”状态的申请可以修改内容
申请的内容包括：申请学期、申请学生、申请周次、申请节次、
申请实验室编号(应根据学期、周次、节次检查是否可用)、申请原因、填报日期。
对于通过的申请，在使用完成后进行确认(将申请状态设置为“使用完毕”) */
<template>
  <div>
    <h2>实验室借用申请</h2>
    <a-button type="primary" @click="addApply">新增申请</a-button>
    <!--    <a-button @click="check">check</a-button>-->
    <h3>已有的个人申请：</h3>
    <a-table id="apply" :columns="applyColumns" :data="applyData">
      <template #status="{ record }">
        {{ formatStatus(record.status) }}
      </template>
      <template #action="{ record }">
        <a-button type="second" @click="editApply(record)">修改申请</a-button>
        <a-button status="danger" @click="deleteApply(record)"
          >撤回申请</a-button
        >
        <a-button status="success" @click="completeApply(record)"
          >完成使用</a-button
        >
      </template>
    </a-table>
    <a-modal
      title="新增申请"
      v-model:visible="addApplyModalVisible"
      @ok="handleAddApply"
      @cancel="cancelAddApply"
    >
      <a-form ref="addApplyForm" :model="newApply">
        <a-form-item
          label="申请周次"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="newApply.week" />
        </a-form-item>
        <a-form-item
          label="节次"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-select v-model="newApply.session">
            <a-option
              v-for="session in sessions"
              :key="session"
              :value="session"
              >{{ session }}
            </a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="实验室编号"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-select v-model="newApply.labId">
            <a-option value="001">软件实验室1</a-option>
            <a-option value="002">软件实验室2</a-option>
            <a-option value="003">硬件实验室1</a-option>
            <a-option value="004">硬件实验室1</a-option>
            <a-option value="005">网络实验室1</a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="申请原因"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-textarea v-model="newApply.reason" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      title="修改申请"
      v-model:visible="editApplyModalVisible"
      @ok="handleEditApply"
      @cancel="cancelEditApply"
    >
      <a-form ref="editApplyForm" :model="editApplyData">
        <a-form-item
          label="申请周次"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="editApplyData.week" />
        </a-form-item>
        <a-form-item
          label="节次"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-select v-model="editApplyData.session">
            <a-option
              v-for="session in sessions"
              :key="session"
              :value="session"
              >{{ session }}
            </a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="实验室编号"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-select v-model="editApplyData.labId">
            <a-option value="001">软件实验室1</a-option>
            <a-option value="002">软件实验室2</a-option>
            <a-option value="003">硬件实验室1</a-option>
            <a-option value="004">硬件实验室1</a-option>
            <a-option value="005">网络实验室1</a-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="申请原因"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-textarea v-model="editApplyData.reason" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import {
  BorrowControllerService,
  SemesterControllerService,
  SessionControllerService,
} from "../../../generated";
import store from "@/store";
import message from "@arco-design/web-vue/es/message";
import a from "vuex-persistedstate";

export default {
  name: "LabApplyView",
  setup() {
    let applyData = ref();
    const addApplyModalVisible = ref(false);
    const newApply = ref({
      studentId: store.state.user.loginUser.id,
      labId: "",
      reason: "",
      semester: "",
      Week: "",
      session: "",
    });
    const editApplyModalVisible = ref(false);
    const editApplyData = ref({
      id: store.state.user.loginUser.id,
      week: " ",
      session: " ",
      semester: " ",
      labId: " ",
      reason: " ",
    });
    const getApply = async () => {
      try {
        const res = await BorrowControllerService.getBorrowsByTeacherId(
          store.state.user.loginUser.id,
          localStorage.getItem("token")
        );
        applyData.value = res.data;
        const sem = await SemesterControllerService.getCurrentSemester(
          localStorage.getItem("token")
        );
        newApply.value.semester = sem.data?.semester;
        console.log("applys:", res);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    const check = () => {
      console.log(newApply.value);
      console.log(store.state.user.loginUser.id);
    };
    const applyColumns = [
      {
        title: "申请学期",
        dataIndex: "semester",
      },
      {
        title: "申请学生",
        dataIndex: "studentId",
      },
      {
        title: "申请周次",
        dataIndex: "week",
      },
      {
        title: "申请节次",
        dataIndex: "session",
      },
      {
        title: "申请实验室编号",
        dataIndex: "labId",
      },
      {
        title: "申请原因",
        dataIndex: "reason",
      },
      {
        title: "填报日期",
        dataIndex: "createTime",
      },
      {
        title: "申请状态",
        dataIndex: "status",
        slotName: "status",
      },
      {
        title: "操作",
        dataIndex: "action",
        slotName: "action",
      },
    ];
    const addApply = () => {
      addApplyModalVisible.value = true;
      console.log(localStorage.getItem("token"));
    };
    const handleAddApply = async () => {
      try {
        await BorrowControllerService.importBorrow(
          newApply.value,
          localStorage.getItem("token")
        );
        console.log(newApply.value);
        await getApply();
        addApplyModalVisible.value = false;
      } catch (error) {
        console.error("Error adding Apply:", error);
      }
    };

    const cancelAddApply = () => {
      addApplyModalVisible.value = false;
      resetAddApplyForm();
    };

    const resetAddApplyForm = () => {
      newApply.value.name = " ";
      newApply.value.role = " ";
      newApply.value.password = " ";
    };
    const editApply = (record) => {
      if (record.status !== 0) {
        alert("申请已被处理，无法修改");
        return;
      }
      editApplyData.value = { ...record };
      editApplyModalVisible.value = true;
    };

    const handleEditApply = async () => {
      try {
        const sem = await SemesterControllerService.getCurrentSemester(
          localStorage.getItem("token")
        );
        editApplyData.value.semester = sem.data?.semester;
        const res = await BorrowControllerService.alterBorrow(
          editApplyData.value,
          localStorage.getItem("token")
        );
        if (res.status === 100) {
          alert("修改成功");
        } else {
          message.error("修改失败!  " + res.message + "  " + res.description);
        }
        await getApply();
        editApplyModalVisible.value = false;
      } catch (error) {
        console.error("Error editing Apply:", error);
      }
    };

    const cancelEditApply = () => {
      editApplyModalVisible.value = false;
      resetEditApplyForm();
    };

    const resetEditApplyForm = () => {
      editApplyData.value.id = " ";
      editApplyData.value.week = " ";
      editApplyData.value.session = " ";
      editApplyData.value.labId = " ";
      editApplyData.value.reason = " ";
    };

    const deleteApply = async (record) => {
      if (record.status !== 0) {
        alert("申请已被处理，无法修改");
        return;
      }
      try {
        await BorrowControllerService.removeBorrow(
          record.id,
          localStorage.getItem("token")
        );
        await getApply();
      } catch (error) {
        console.error("Error deleting Apply:", error);
      }
    };
    const applyForm = ref({
      id: " ",
      status: "",
    });
    const completeApply = async (record) => {
      try {
        if (record.status !== 1) {
          alert("尚未处理，无法完成");
        }
        applyForm.value.id = record.id;
        applyForm.value.status = 2;
        const res = await BorrowControllerService.admitBorrow(
          applyForm.value,
          localStorage.getItem("token")
        );
        if (res.status === 100) {
          alert("审批驳回成功");
        } else {
          message.error("操作失败!  " + res.message + "  " + res.description);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const sessions = ref();
    const getSessions = async () => {
      const res = await SessionControllerService.getAllSessions(
        localStorage.getItem("token")
      );
      const sessionRes = res.data.map((item) => item.session);
      sessions.value = sessionRes;
      console.log(sessions.value);
    };
    const formatStatus = (status) => {
      return status == 0
        ? "未审核"
        : status == 1
        ? "通过"
        : status == 2
        ? "驳回"
        : "使用完毕";
    };
    onMounted(() => {
      getApply();
      getSessions();
    });
    return {
      applyColumns,
      applyData,
      addApplyModalVisible,
      newApply,
      addApply,
      handleAddApply,
      cancelAddApply,
      editApply,
      check,
      sessions,
      editApplyData,
      deleteApply,
      editApplyModalVisible,
      handleEditApply,
      cancelEditApply,
      completeApply,
      formatStatus,
    };
  },
};
</script>

<style scoped>
#apply {
  max-width: 1200px;
}
</style>
