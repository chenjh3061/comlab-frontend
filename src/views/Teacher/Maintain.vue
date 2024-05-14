/* 实验室设备报修  列出教师的所有设备报修(报修状态有：已维修、未维修、维修中) 
新增报修，填写新的报修，新报修的状态为“未维修” 
报修的内容包括：报修教师、实验室编号、故障描述(文本)、报修日 期 */
<template>
  <div>
    <a-button type="primary" @click="showAddRepairModal">新增报修申请</a-button>
    <h3>已有报修项目</h3>
    <a-table
      :columns="applyColumns"
      :data="applyData"
      column-resizable
      row-key="id"
      @change="handleChange"
    >
      <template #action="{ record }">
        <!-- 自定义操作按钮，可以是编辑、删除等 -->
        <a-button @click="editRepair(record)">编辑</a-button>
        <a-button @click="deleteRepair(record.id)">删除</a-button>
      </template>
    </a-table>

    <!-- 新增报修模态框 -->
    <a-modal
      title="新增报修"
      v-model:visible="addRepairModalVisible"
      @ok="handleAddRepair"
      @cancel="cancelAddRepair"
    >
      <a-form ref="addRepairForm" :model="newRepair">
        <a-form-item
          label="实验室编号"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-select placeholder="请选择实验室编号" v-model="newRepair.labId">
            <a-option v-for="lab in labs" :key="lab.id" :value="lab.id"
              >{{ lab.name }}({{ lab.id }})</a-option
            >
          </a-select>
        </a-form-item>
        <a-form-item
          label="故障描述"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-textarea v-model="newRepair.faultDescription" />
        </a-form-item>
      </a-form>
    </a-modal>

    <!-- 编辑报修模态框 -->
    <a-modal
      title="编辑报修"
      v-model:visible="editRepairModalVisible"
      @ok="handleEditRepair"
      @cancel="cancelEditRepair"
    >
      <a-form v-if="currentRepair" ref="editRepairForm" :model="currentRepair">
        <a-form-item
          label="实验室编号"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="currentRepair.labId" />
        </a-form-item>
        <a-form-item
          label="故障描述"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-textarea v-model="currentRepair.faultDescription" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import store from "@/store";
import {
  LabControllerService,
  MaintainControllerService,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";

export default {
  name: "MaintainView",
  setup() {
    let applyData = ref([]);
    const labs = ref([]);
    const addRepairModalVisible = ref(false);
    const editRepairModalVisible = ref(false);
    const newRepair = ref({
      teacherId: store.state.user.loginUser.id,
      teacherName: store.state.user.loginUser.name,
      labId: "",
      faultDescription: "",
      repairDate: new Date().toISOString().split("T")[0], // 当前日期
      status: "0",
    });
    const currentRepair = ref(null);

    const applyColumns = [
      {
        title: "报修ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "报修教师",
        dataIndex: "teacherId",
        key: "teacherId",
      },
      {
        title: "实验室编号",
        dataIndex: "labId",
        key: "labId",
      },
      {
        title: "故障描述",
        dataIndex: "faultDescription",
        key: "faultDescription",
      },
      {
        title: "报修日期",
        dataIndex: "createTime",
        key: "createTime",
      },
      {
        title: "状态",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "操作",
        key: "action",
        slotName: "action",
      },
    ];
    const handleChange = (data, extra, currentDataSource) => {
      console.log("change", data, extra, currentDataSource);
    };
    const getMaintain = async () => {
      try {
        const res = await MaintainControllerService.getMaintainsByTeacherId(
          store.state.user.loginUser.id,
          localStorage.getItem("token")
        );
        if (res.status === 100) {
          applyData.value = res.data.map((item) => ({
            id: item.id,
            teacherId: item.teacherId,
            labId: item.labId,
            faultDescription: item.faultDescription,
            createTime: item.createTime,
            status: item.status,
          }));
          console.log("Maintains fetched:", applyData.value); // 打印处理后的数据
        } else {
          console.error("Failed to fetch maintains:", res.message);
        }
        //console.log("Maintains fetched:", applyData.value);
      } catch (e) {
        console.log("Error fetching maintains:", e);
      }
    };
    const getLabs = async () => {
      try {
        const res = await LabControllerService.getAllLabs(
          localStorage.getItem("token")
        );
        labs.value = res.data || [];
        console.log("Labs fetched:", labs.value);
      } catch (e) {
        console.log("Error fetching labs:", e);
      }
    };
    const showAddRepairModal = () => {
      addRepairModalVisible.value = true;
    };

    const handleAddRepair = async () => {
      try {
        const res = await MaintainControllerService.importMaintain(
          newRepair.value,
          localStorage.getItem("token")
        );
        console.log(newRepair.value);
        if (res.status === 100) {
          message.success("报修添加成功！");
          await getMaintain();
          addRepairModalVisible.value = false;
        } else {
          message.error("报修添加失败！" + res.message + " " + res.description);
        }
      } catch (e) {
        console.log("Error adding repair:", e);
      }
    };

    const cancelAddRepair = () => {
      addRepairModalVisible.value = false;
    };

    const editRepair = (record) => {
      currentRepair.value = { ...record };
      editRepairModalVisible.value = true;
    };

    const handleEditRepair = async () => {
      try {
        currentRepair.value.id = store.state.user.loginUser.id;
        const res = await MaintainControllerService.alterMaintain(
          currentRepair.value,
          localStorage.getItem("token")
        );
        if (res.status === 100) {
          message.success("报修编辑成功！");
          await getMaintain();
          editRepairModalVisible.value = false;
        } else {
          message.error("报修编辑失败！" + res.message + " " + res.description);
        }
      } catch (e) {
        console.log("Error editing repair:", e);
      }
    };

    const cancelEditRepair = () => {
      editRepairModalVisible.value = false;
    };

    const deleteRepair = async (id) => {
      try {
        const res = await MaintainControllerService.removeMaintain(
          id,
          localStorage.getItem("token")
        );
        if (res.status === 100) {
          message.success("报修删除成功！");
          await getMaintain();
        } else {
          message.error("报修删除失败！" + res.message + " " + res.description);
        }
      } catch (e) {
        console.log("Error deleting repair:", e);
      }
    };

    onMounted(() => {
      getMaintain();
      getLabs();
      //console.log("applyData:" + applyData.value); // 检查 applyData 是否有数据
    });

    return {
      labs,
      applyData,
      applyColumns,
      addRepairModalVisible,
      editRepairModalVisible,
      newRepair,
      currentRepair,
      handleChange,
      showAddRepairModal,
      handleAddRepair,
      cancelAddRepair,
      editRepair,
      handleEditRepair,
      cancelEditRepair,
      deleteRepair,
    };
  },
};
</script>

<style scoped>
/* 添加你的样式 */
</style>
