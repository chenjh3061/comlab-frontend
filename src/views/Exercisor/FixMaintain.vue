/* 设备报修处理  列出属于自己管理的实验室的报修
开始维修时，把报修申请的状态设置为“维修中”
维修结束后，把报修申请的状态设置为“已维修”，并填写维修情况 说明 */
<template>
  <div>
    <h3>设备报修处理：</h3>
    <a-table :columns="maintainColumns" :data="maintainData" bordered>
      <template #action="{ record }">
        <a-button type="primary" @click="startMaintenance(record)"
          >开始维修
        </a-button>
        <a-button type="danger" @click="finishMaintenance(record)"
          >维修完成
        </a-button>
        <a-button type="second" @click="checkMaintain(record)"
          >查看维修详情</a-button
        >
      </template>
    </a-table>
    <h4>负责实验室信息：</h4>
    <a-table :columns="labColumns" :data="labData" />

    <a-modal
      title="维修完成"
      v-model:visible="completeMaintainModalVisible"
      @ok="handleCompleteApply"
      @cancel="cancelCompleteApply"
    >
      <a-form ref="addApplyForm" :model="cMaintain">
        <a-form-item
          label="维修编号"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="cMaintain.id" />
        </a-form-item>
        <a-form-item
          label="维修描述"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-textarea v-model="cMaintain.maintenanceDescription" />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      title="维修详情"
      v-model:visible="maintainDetailModalVisible"
      @cancel="cancelMaintainDetail"
    >
      <p v-if="selectedMaintain">
        <strong>维修编号:</strong> {{ selectedMaintain.id }} <br />
        <strong>报修描述:</strong> {{ selectedMaintain.faultDescription }}
        <br />
        <strong>报修人:</strong> {{ selectedMaintain.teacherId }} <br />
        <strong>报修时间:</strong> {{ selectedMaintain.createTime }} <br />
        <strong>维修状态:</strong> {{ selectedMaintain.status }} <br />
      </p>
    </a-modal>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  LabControllerService,
  MaintainControllerService,
} from "../../../generated";
import store from "@/store";
import message from "@arco-design/web-vue/es/message";
import async from "async";

export default {
  name: "FixMaintain",
  setup() {
    const maintainColumns = [
      {
        title: "实验室编号",
        dataIndex: "id",
      },
      {
        title: "报修描述",
        dataIndex: "faultDescription",
      },
      {
        title: "报修人",
        dataIndex: "teacherId",
      },
      {
        title: "报修时间",
        dataIndex: "createTime",
      },
      {
        title: "维修状态",
        dataIndex: "status",
      },
      {
        title: "操作",
        dataIndex: "action",
        slotName: "action",
      },
    ];
    const maintainData = ref([]);
    const labColumns = [
      {
        title: "实验室编号",
        dataIndex: "number",
      },
      {
        title: "实验室名称",
        dataIndex: "name",
      },
      {
        title: "实验室类型",
        dataIndex: "type",
      },
      {
        title: "实验室设备数量",
        dataIndex: "equipmentNum",
      },
    ];
    const labData = ref([]);
    let isFetched = false;
    const getDatas = async () => {
      if (isFetched) return;
      try {
        const res1 = await MaintainControllerService.getMaintainsByLabAdminId(
          store.state.user.loginUser.id,
          localStorage.getItem("token")
        );
        const res2 = await LabControllerService.getLabsByLabAdminId(
          store.state.user.loginUser.id,
          localStorage.getItem("token")
        );
        maintainData.value = res1.data;
        console.log(
          "维修信息：" + store.state.user.loginUser.id,
          maintainData.value
        );
        labData.value = res2.data || [];
        isFetched = true;
        //console.log("id" + store.state.loginUser.id);
        console.log(labData.value);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const sMaintain = ref({
      id: " ",
      status: " ",
      //maintenanceDescription: " ",
    });
    const startMaintenance = async (record) => {
      try {
        sMaintain.value.id = record.id;
        sMaintain.value.status = 1;
        const res = await MaintainControllerService.startMaintain(
          sMaintain.value,
          localStorage.getItem("token")
        );
        console.log(sMaintain.value);
        if (res.status === 100) {
          alert("开始维修");
        } else {
          message.error("操作失败!  " + res.message + "  " + res.description);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const completeMaintainModalVisible = ref(false);
    const cMaintain = ref({
      id: "",
      status: "",
      maintenanceDescription: "",
    });
    const finishMaintenance = (record) => {
      if (record.status === 0) {
        alert("尚未开始维修：");
        return;
      } else if (record.status === 2) {
        alert("已经维修完成");
        return;
      } else {
        cMaintain.value.id = record.id;
        cMaintain.value.status = 2;
        completeMaintainModalVisible.value = true;
      }
    };
    const handleCompleteApply = async (record) => {
      try {
        const res = await MaintainControllerService.completeMaintain(
          cMaintain.value,
          localStorage.getItem("token")
        );
        if (res.status === 100) {
          alert("维修完成");
        } else {
          message.error("操作失败!  " + res.message + "  " + res.description);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    const cancelCompleteApply = () => {
      cMaintain.value.id = " ";
      cMaintain.value.status = " ";
      cMaintain.value.maintenanceDescription = " ";
      completeMaintainModalVisible.value = false;
    };

    const maintainDetailModalVisible = ref(false);
    const selectedMaintain = ref(null);

    const checkMaintain = async (record) => {
      try {
        // const res = await MaintainControllerService.getMaintainById(
        //   record.id,
        //   localStorage.getItem("token")
        // );
        // if (res.status === 100) {
        //   selectedMaintain.value = res.data;
        //   maintainDetailModalVisible.value = true;
        // } else {
        //   message.error(
        //     "获取维修详情失败! " + res.message + " " + res.description
        //   );
        // }
        selectedMaintain.value = {
          id: record.id,
          faultDescription: record.faultDescription,
          teacherId: record.teacherId,
          createTime: record.createTime,
          status: record.status,
        };
        maintainDetailModalVisible.value = true;
        console.log(selectedMaintain.value);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const cancelMaintainDetail = () => {
      maintainDetailModalVisible.value = false;
      selectedMaintain.value = null;
    };

    onMounted(getDatas);

    return {
      maintainColumns,
      maintainData,
      labColumns,
      labData,
      cMaintain,
      checkMaintain,
      startMaintenance,
      finishMaintenance,
      selectedMaintain,
      completeMaintainModalVisible,
      maintainDetailModalVisible,
      handleCompleteApply,
      cancelCompleteApply,
      cancelMaintainDetail,
    };
  },
};
</script>

<style scoped></style>
