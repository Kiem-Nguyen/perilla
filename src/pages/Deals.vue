<template>
  <b-container fluid>
    <h1 class="head">Deals</h1>

    <b-row>
      <b-col lg="6" class="my-1">
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

      <b-col lg="6" class="my-1"> </b-col>

      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0 h-auto"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              class="h-auto"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''" class="h-auto"
                >Clear</b-button
              >
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1"> </b-col>

      <b-col sm="5" md="6" class="my-1">
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

      <b-col sm="7" md="6" class="my-1 h-100">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      responsive
      show-empty
      small
      ref="table"
      @filtered="onFiltered"
      class="mt-3"
    >
      <template #thead-top="">
        <b-tr>
          <b-th class="text-center" colspan="10">
            <b-button size="sm" class="mr-1" @click="openEdit()">
              <i class="tim-icons icon-simple-add"></i>
            </b-button>
          </b-th>
        </b-tr>
      </template>
      <template #cell(actions)="row">
        <b-button size="sm" class="mr-1" @click="openEdit(row)">
          Edit
        </b-button>
        <b-button
          size="sm"
          variant="danger"
          @click="deletePopup(row.item, $event.target)"
          class="mr-1"
        >
          Delete
        </b-button>
      </template>
    </b-table>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" @ok="deleteOkbutton">
      <label>{{ infoModal.content }}</label>
    </b-modal>

    <div v-if="isShowFormGroup">
      <b-card bg-variant="light">
        <b-form-group
          label-cols-lg="3"
          label="Add/Edit Size"
          label-size="lg"
          label-class="font-weight-bold pt-0"
          class="mb-0"
        >
          <b-form-group
            label="Id:"
            label-for="size-id"
            label-cols-sm="3"
            label-align-sm="right"
            class="color-black"
          >
            <b-form-input
              id="size-id"
              v-model="itemsEdit.Id"
              disabled
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Title:"
            label-for="size-Title"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="size-Title"
              v-model="itemsEdit.Title"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Description:"
            label-for="size-Description"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="size-Description"
              v-model="itemsEdit.Description"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="TypeId:"
            label-for="size-TypeId"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-select
              id="size-TypeId"
              class="form-control"
              v-model="itemsEdit.TypeId"
              :options="optionsTypeName"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            label="UnitId:"
            label-for="size-UnitId"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-select
              id="size-UnitId"
              class="form-control"
              v-model="itemsEdit.UnitId"
              :options="optionsUnitName"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            label="StartDate:"
            label-for="size-StartDate"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-input-group>
              <b-form-input
                id="size-StartDate"
                v-model="itemsEdit.StartDate"
                type="text"
                placeholder="YYYY-MM-DD"
                autocomplete="off"
              ></b-form-input>
              <b-input-group-append>
                <b-form-datepicker
                  v-model="itemsEdit.StartDate"
                  button-only
                  right
                  locale="en"
                  :date-format-options="{
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  }"
                  aria-controls="size-StartDate"
                ></b-form-datepicker>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>

          <b-form-group
            label="ExpirationDate:"
            label-for="size-ExpirationDate"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-input-group>
              <b-form-input
                id="size-ExpirationDate"
                v-model="itemsEdit.ExpirationDate"
                type="text"
                placeholder="YYYY-MM-DD"
                autocomplete="off"
              ></b-form-input>
              <b-input-group-append>
                <b-form-datepicker
                  v-model="itemsEdit.ExpirationDate"
                  button-only
                  right
                  locale="en"
                  :date-format-options="{
                    day: 'numeric',
                    month: 'numeric',
                    year: 'numeric',
                  }"
                  aria-controls="size-ExpirationDate"
                ></b-form-datepicker>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>

          <b-form-group
            label="MaximumNumberDiscount:"
            label-for="size-MaximumNumberDiscount"
            label-cols-sm="3"
            label-align-sm="right"
            class="color-black"
          >
            <b-form-input
              id="size-MaximumNumberDiscount"
              v-model="itemsEdit.MaximumNumberDiscount"
              type="number"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="MinimumNumberPrice:"
            label-for="size-MinimumNumberPrice"
            label-cols-sm="3"
            label-align-sm="right"
            class="color-black"
          >
            <b-form-input
              id="size-MinimumNumberPrice"
              v-model="itemsEdit.MinimumNumberPrice"
              type="number"
            ></b-form-input>
          </b-form-group>

          <div class="float-right">
            <b-button
              pill
              variant="success"
              class="mr-3"
              @click="saveEditSize()"
              >Save</b-button
            >
            <b-button pill variant="danger" @click="isShowFormGroup = false"
              >Cancel</b-button
            >
          </div>
        </b-form-group>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import NotificationTemplate from "./Notifications/NotificationTemplate";
import { BaseAlert } from "@/components";

export default {
  data() {
    return {
      items: [],
      itemsEdit: {},
      fields: [
        {
          key: "Id",
          label: "Id",
          sortable: true,
          sortDirection: "desc",
          class: "text-center",
        },
        {
          key: "Title",
          label: "Title",
          sortable: true,
          class: "text-center",
        },
        {
          key: "Description",
          label: "Description",
          sortable: true,
          class: "text-center",
        },
        {
          key: "TypeName",
          label: "TypeName",
          sortable: true,
          class: "text-center",
        },
        {
          key: "UnitName",
          label: "UnitName",
          sortable: true,
          class: "text-center",
        },
        {
          key: "StartDate",
          label: "StartDate",
          sortable: true,
          class: "text-center",
          formatter: (value) => {
            return new Date(value)
              .toLocaleDateString("en-GB", {
                day: "numeric",
                month: "numeric",
                year: "numeric",
              })
              .replace(/ /g, "-");
          },
        },
        {
          key: "ExpirationDate",
          label: "ExpirationDate",
          sortable: true,
          class: "text-center",
          formatter: (value) => {
            return new Date(value)
              .toLocaleDateString("en-GB", {
                day: "numeric",
                year: "numeric",
                month: "numeric",
              })
              .replace(/ /g, "-");
          },
        },
        {
          key: "MaximumNumberDiscount",
          label: "MaximumNumberDiscount",
          sortable: true,
          class: "text-center",
        },
        {
          key: "MinimumNumberPrice",
          label: "MinimumNumberPrice",
          sortable: true,
          class: "text-center",
        },
        { key: "actions", label: "Actions", class: "text-center" },
      ],
      optionsTypeName: [],
      optionsUnitName: [],
      isShowFormGroup: false,
      deleteItemId: 0,
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      urlDefault: "/deals",
    };
  },
  components: {
    BaseAlert,
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
  },
  created() {
    this.getSizesList();
    this.getDealTypesList();
    this.getUnitsList();
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getSizesList() {
      this.queryUrl = this.urlDefault;
      this.setByProp({
        queryUrl: this.queryUrl,
      });
      this.loadState = "loading";
      this.getApi()
        .then((response) => {
          this.items = response;
          this.totalRows = this.items.length;
        })
        .catch((err) => this.notifyVue(err, "danger"));
    },

    deletePopup(item, button) {
      this.infoModal.title = `Impotant`;
      this.infoModal.content = `Are you sure to delete this colum with id= ${item.Id}`;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
      this.deleteItemId = item.Id;
    },

    deleteOkbutton() {
      this.queryUrl = this.urlDefault + `/${this.deleteItemId}`;
      this.setByProp({
        queryUrl: this.queryUrl,
      });
      this.deleteApi()
        .then((response) => {
          var indexOf = this.items.findIndex((x) => x.Id == this.deleteItemId);
          this.items.splice(indexOf, 1);
          this.totalRows = this.items.length;
          this.notifyVue("Deleted Success!!!", "success");
        })
        .catch((err) => this.notifyVue(err, "danger"));
    },

    openEdit(row) {
      if (row) {
        this.itemsEdit = Object.assign({}, row.item);
        this.itemsEdit.StartDate = this.dateFormat(this.itemsEdit.StartDate);
        this.itemsEdit.ExpirationDate = this.dateFormat(this.itemsEdit.ExpirationDate);
        this.isShowFormGroup = true;
      } else {
        this.itemsEdit.Id = 0;
        this.itemsEdit.Name = "";
        this.itemsEdit.DealId = "";
        this.isShowFormGroup = true;
      }
    },

    saveEditSize() {
      this.queryUrl = this.itemsEdit.Id
        ? this.urlDefault + `/${this.itemsEdit.Id}`
        : this.urlDefault;
      this.setByProp({
        queryUrl: this.queryUrl,
        payload: this.itemsEdit,
      });
      if (this.itemsEdit.Id) {
        this.putApi()
          .then((response) => {
            var indexOf = this.items.findIndex((x) => x.Id == response.Id);
            this.items[indexOf] = Object.assign({}, response);
            this.$refs.table.refresh();
            this.isShowFormGroup = false;
            this.notifyVue("Save Success!!!", "success");
          })
          .catch((err) => this.notifyVue(err, "danger"));
      } else {
        this.postApi()
          .then((response) => {
            this.items.push(response);
            this.totalRows = this.items.length;
            this.isShowFormGroup = false;
            this.notifyVue("Add Success!!!", "success");
          })
          .catch((err) => this.notifyVue(err, "danger"));
      }
    },

    getDealTypesList() {
      this.setByProp({
        queryUrl: "/dealtypes",
      });
      this.getApi()
        .then((response) => {
          this.optionsTypeName = response.map((elem) => ({
            value: elem.Id,
            text: elem.Name,
          }));
        })
        .catch((err) => this.notifyVue(err, "danger"));
    },

    getUnitsList() {
      this.setByProp({
        queryUrl: "/units",
      });
      this.getApi()
        .then((response) => {
          this.optionsUnitName = response.map((elem) => ({
            value: elem.Id,
            text: elem.Name,
          }));
        })
        .catch((err) => this.notifyVue(err, "danger"));
    },

    dateFormat(value) {
      var d = new Date(value),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },

    notifyVue(message, color) {
      this.$notify({
        component: NotificationTemplate,
        message: message,
        icon: "tim-icons icon-bell-55",
        horizontalAlign: "right",
        verticalAlign: "bottom",
        type: color,
        timeout: 3000,
      });
    },
  },
};
</script>

<style scoped>
.form-group .form-control,
.input-group .form-control {
  padding: 0.375rem 0.75rem !important;
}

.container-fluid .row {
  color: aliceblue;
}

.color-black,
.color-black label {
  color: #1e1e2f !important;
}

ul li,
.filter-block select {
  color: aliceblue;
  background-color: #1e1e2f;
}

.custom-select-sm,
.h-auto {
  height: auto !important;
  font-size: 100%;
}

.custom-control-label::before {
  background-color: #e14eca;
}

li.page-item.flex-fill {
  max-width: 40px;
}

.dropdown-toggle .b-icon.bi {
  height: 15px;
  width: 15px;
  vertical-align: top;
}
</style>