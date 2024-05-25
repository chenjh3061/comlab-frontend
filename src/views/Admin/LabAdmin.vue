/* 实验室借用审批  查看“学生”填报的“实验室借用申请” 
审批“实验室借用申请”，通过或不通过*/
<template>
  <h2>实验室借用审批</h2>
  <a-table
    id="labTable"
    column-resizable
    :bordered="{ cell: true }"
    :columns="columns"
    :data="dataSource"
  >
    <template #status="{ record }">
      {{ formatStatus(record.status) }}
    </template>
    <template #action="{ record }">
      <a-button type="primary" @click="approve(record)">通过</a-button>
      <a-button type="warning" @click="reject(record)">不通过</a-button>
    </template>
  </a-table>
</template>

<script>
import { onMounted, ref } from "vue";
import async from "async";
import { BorrowControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";

export default {
  name: "LabAdmin",
  setup() {
    const columns = [
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
        dataIndex: "updateTime",
      },
      {
        title: "申请状态",
        dataIndex: "status",
        slotName: "status",
      },
      {
        title: "审批操作",
        dataIndex: "action",
        key: "action",
        slotName: "action",
      },
    ];
    const dataSource = ref();
    const getBorrow = async () => {
      try {
        const res = await BorrowControllerService.getAllBorrows(
          localStorage.getItem("token")
        );
        dataSource.value = res.data;
        console.log("allBorrow:" + dataSource.value);
      } catch (e) {
        console.log(e);
      }
    };
    const admitForm = ref({
      id: "",
      status: "",
    });
    const approve = async (record) => {
      try {
        admitForm.value.id = record.id;
        admitForm.value.status = 1;
        console.log(admitForm.value);
        const res = await BorrowControllerService.admitBorrow(
          admitForm.value,
          localStorage.getItem("token")
        );
        if (res.status === 100) {
          alert("审批通过成功");
        } else {
          message.error("操作失败!  " + res.message + "  " + res.description);
        }
      } catch (e) {
        console.log(e);
      }
    };
    const reject = async (record) => {
      try {
        admitForm.value.id = record.id;
        admitForm.value.status = 2;
        const res = await BorrowControllerService.admitBorrow(
          admitForm.value,
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
    const formatStatus = (status) => {
      return status == 0
        ? "未审核"
        : status == 1
        ? "通过"
        : status == 2
        ? "驳回"
        : "使用完毕";
    };
    onMounted(getBorrow);
    return {
      columns,
      dataSource,
      approve,
      reject,
      formatStatus,
    };
  },
};
</script>

<style scoped>
#labTable {
  max-width: 1700px;
}
</style>
