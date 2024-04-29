<template>
  <div>
    <a-button @click="addSem">新建学期</a-button>
    <a-table :columns="semColumns" :data="semData" />
    <a-modal
      title="添加新学期"
      v-model:visible="addSemModalVisible"
      @ok="handleAddSem"
      @cancel="cancelAddSem"
    >
      <a-form ref="addSemForm" :model="newSemester">
        <a-form-item
          label="学期"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input v-model="newSemester.semester" />
        </a-form-item>
        <a-form-item
          label="教学周数"
          :label-col="{ span: 4 }"
          :wrapper-col="{ span: 18 }"
        >
          <a-input-number v-model="newSemester.week" :min="1" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { SemesterControllerService } from "../../../generated";

export default {
  name: "SemesterAdmin",

  setup() {
    let semData = ref([]);
    const addSemModalVisible = ref(false);
    const newSemester = ref({
      semester: "",
      week: 0,
    });

    const getSem = async () => {
      try {
        const res = await SemesterControllerService.getAllSemesters(
          localStorage.getItem("token")
        );
        semData.value = res.data;
        console.log("allSem:", res);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    };

    const semColumns = [
      {
        title: "学期",
        dataIndex: "semester",
        key: "semester",
      },
      {
        title: "教学周数",
        dataIndex: "week",
        key: "week",
      },
    ];

    const addSem = () => {
      addSemModalVisible.value = true;
    };

    const handleAddSem = async () => {
      try {
        const res = await SemesterControllerService.importSemester(
          newSemester.value,
          localStorage.getItem("token")
        );
        if (res.status === 100) {
          alert("设置成功!");
        } else {
          alert(res.description);
        }
        getSem();
        addSemModalVisible.value = false;
      } catch (error) {
        console.error("Error adding semester:", error);
      }
    };

    const cancelAddSem = () => {
      addSemModalVisible.value = false;
      resetAddSemForm();
    };

    const resetAddSemForm = () => {
      newSemester.value.semester = "";
      newSemester.value.week = 0;
    };

    onMounted(() => {
      getSem();
    });

    return {
      semData,
      semColumns,
      addSem,
      addSemModalVisible,
      newSemester,
      handleAddSem,
      cancelAddSem,
    };
  },
};
</script>

<style scoped>
.title {
}
</style>
