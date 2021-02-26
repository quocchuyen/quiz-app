<template>
  <b-container fluid>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="12">
        <b-icon
          v-b-modal.add-modal
          icon="file-earmark-diff-fill"
          variant="success"
          class="h1 mt-3 mb-5"
          role="button"
        >
        </b-icon>
        <b-modal
          id="add-modal"
          title="Thêm nhóm câu hỏi"
          @hide="resetInfoModal"
          @ok="addItem(),makeToast('success', 'Thêm'),update()"
        >
          <form ref="form">
            <b-form-group
              label="Mã nhóm câu hỏi"
              label-for="code-input"
              invalid-feedback="Code không được để trống!"
            >
              <b-form-input
                id="code-input"
                v-model="infoModal.code"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              label="Tên nhóm câu hỏi"
              label-for="name-input"
              invalid-feedback="Name không được để trống!"
            >
              <b-form-input
                id="name-input"
                v-model="infoModal.name"
                required
              ></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
      </b-col>
      <b-col lg="4" class="my-1">
        <b-form-group
          label="Sort"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="4" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col>
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      :items="listItems"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      show-empty
      small
    >
      <template #cell(STT)="row">
        {{ row.index + 1 }}
      </template>

      <template #cell(name)="row">
        {{ row.value }}
      </template>

      <template #cell(actions)="row">
        <b-button
          class="p-0 mr-1"
          variant="default"
          size="sm"
          @click="
            info(row.item, $event.target, 'info-modal', 'Cập nhật câu hỏi')
          "
        >
          <b-icon-pencil-square
            font-scale="2"
            class="border-info rounded"
            variant="info"
          ></b-icon-pencil-square>
        </b-button>
        <b-button
          variant="default"
          size="sm"
          @click="row.toggleDetails"
          class="mr-1 p-0"
        >
          <b-icon
            icon="exclamation-circle-fill"
            font-scale="2"
            class="border-secondary rounded-circle"
          >
            {{ row ? "Hide" : "Show" }} Details
          </b-icon>
        </b-button>
        <b-button
          class="p-0"
          variant="default"
          size="sm"
          v-b-modal.my-modal
          @click="
            info(row.item, $event.target, 'my-modal', 'Xoá câu hỏi'), deleteItem
          "
        >
          <b-icon-trash
            font-scale="2"
            class="border-danger rounded m-0"
            variant="danger"
          ></b-icon-trash>
        </b-button>
      </template>

      <template #row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <!-- Info modal -->
    <b-modal
      id="info-modal"
      :title="infoModal.title"
      @hide="resetInfoModal"
      @ok="editItem(), makeToast('success', 'Sửa'), update()"
    >
      <form ref="form">
        <b-form-group
          label="Mã nhóm câu hỏi"
          label-for="code-input"
          invalid-feedback="Code không được để trống!"
        >
          <b-form-input
            id="code-input"
            v-model="infoModal.code"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Tên nhóm câu hỏi"
          label-for="name-input"
          invalid-feedback="Name không được để trống!"
        >
          <b-form-input
            id="name-input"
            v-model="infoModal.name"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>

    <b-modal
      id="my-modal"
      :title="infoModal.title"
      @ok="deleteItem(), makeToast('success', 'Xóa'), update()"
      @hide="resetInfoModal"
      cancel
    >
      <pre>{{ infoModal }}</pre>
    </b-modal>

    <b-col class="my-1">
      <b-pagination
        v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        aria-controls="my-table"
      ></b-pagination>
    </b-col>
    
  </b-container>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      listItems: [],
      fields: [
        "STT",

        { key: "code", label: "Mã nhóm", sortable: true, class: "text-center" },
        {
          key: "name",
          label: "Tên nhóm",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "updated_at",
          label: "Ngày cập nhật",
          sortable: true,
          formatter: (value) => {
            return moment(value).format("DD/MM/YYYY");
          },
        },
        { key: "actions", label: "Tùy chọn" },
      ],
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
      infoModal: {
        idModal: "",
        id: 0,
        title: "",
        code: "",
        name: "",
        date: "",
      },
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  rows() {
        return this.listItems.length
      }
  },
  created() {
    this.fetchData();
  },
  mounted() {
    //this.totalRows = this.listItems.length;
  },


  methods: {
    fetchData() {
      axios
        .get(`https://localhost:44300/question-group?size=100`, {})
        .then((response) => {
          this.listItems = response.data.data.items;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    info(item, button, idModal, title) {
      this.infoModal.title = title;
      this.infoModal.id = item.id;
      this.infoModal.code = item.code;
      this.infoModal.name = item.name;
      this.infoModal.date = item.updated_at;
      this.$root.$emit("bv::show::modal", idModal, button);
    },
    async update() {
      await this.fetchData();
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.id = 0;
      this.infoModal.code = "";
      this.infoModal.name = "";
      this.infoModal.date = "";
    },

    addItem() {
      const data = JSON.parse(JSON.stringify(this.infoModal));
      axios
        .post(`https://localhost:44300/question-group`, {
          created_by: "quocchuyen",
          created_at: new Date(),
          updated_by: "quocchuyen",
          updated_at: new Date(),
          name: data.name,
          parent_id: 0,
          code: data.code,
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    },
    editItem() {
      const data = JSON.parse(JSON.stringify(this.infoModal));
      axios
        .put(`https://localhost:44300/question-group/${data.id}`, {
          code: data.code,
          name: data.name,
          updated_at: new Date(),
        })
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
    },

    deleteItem() {
      const data = JSON.parse(JSON.stringify(this.infoModal));
      axios
        .delete(`https://localhost:44300/question-group/${data.id}`)
        .then((res) => console.log(res))
        .catch((err) => console.error(err));
    },
    makeToast(variant = null, action) {
      this.$bvToast.toast(`${action} thành công! `, {
        title: `${action}`,
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>