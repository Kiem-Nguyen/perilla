<template>
  <b-container fluid>
    <h1 class="head">Products</h1>

    <b-row class="filter-block">
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
      ref="table"
      responsive
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
      class="mt-3"
    >
      <template #thead-top="">
        <b-tr>
          <b-th class="text-center" :colspan="fields.length + 1">
            <b-button size="sm" class="mr-1" @click="openEdit()">
              <i class="tim-icons icon-simple-add"></i>
            </b-button>
          </b-th>
        </b-tr>
      </template>

      <template #cell(Avata)="row">
        <img :src="row.item.Avata" alt="" />
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
          label="Add/Edit Product"
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
            label="Name:"
            label-for="size-Name"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="size-Name"
              v-model="itemsEdit.Name"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="TradeName:"
            label-for="size-TradeName"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="size-TradeName"
              v-model="itemsEdit.TradeName"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Avata:"
            label-for="size-Avata"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-file
              id="size-Avata"
              class="color-black"
              v-model="itemsEdit.AvataEdit"
              accept="image/*"
              :state="Boolean(itemsEdit.AvataEdit)"
              @change="onFileChange"
              placeholder="Choose a file or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <div v-if="image">
              <img :src="image" />
              <b-button size="sm" class="mt-1" @click="removeImage"
                >Remove image</b-button
              >
            </div>
          </b-form-group>

          <b-form-group
            label="ColorName:"
            label-for="size-ColorName"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-select
              id="size-ColorName"
              class="form-control"
              v-model="itemsEdit.IdColor"
              :options="optionsColor"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            label="SexName:"
            label-for="size-SexName"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-select
              id="size-SexName"
              class="form-control"
              v-model="itemsEdit.SexId"
              :options="optionsSexName"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            label="DealSaleName:"
            label-for="size-DealSaleName"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-select
              id="size-DealSaleName"
              class="form-control"
              v-model="itemsEdit.IdDealSale"
              :options="optionsDealSaleName"
            ></b-form-select>
          </b-form-group>

          <b-form-group
            label="Origin:"
            label-for="size-Origin"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="size-Origin"
              v-model="itemsEdit.Origin"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Meterial:"
            label-for="size-Meterial"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="size-Meterial"
              v-model="itemsEdit.Meterial"
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
            label="SumIventory:"
            label-for="size-SumIventory"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="size-SumIventory"
              type="number"
              v-model="itemsEdit.SumIventory"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Points:"
            label-for="size-Points"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="size-Points"
              type="number"
              v-model="itemsEdit.Points"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Price:"
            label-for="size-Price"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="size-Price"
              type="number"
              v-model="itemsEdit.Price"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="BasePrice:"
            label-for="size-BasePrice"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="size-BasePrice"
              type="number"
              v-model="itemsEdit.BasePrice"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="LinkMarketingProduct:"
            label-for="size-LinkMarketingProduct"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="size-LinkMarketingProduct"
              v-model="itemsEdit.LinkMarketingProduct"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="IconUrl:"
            label-for="size-IconUrl"
            label-cols-sm="3"
            label-align-sm="right"
          >
            <b-form-input
              id="size-IconUrl"
              v-model="itemsEdit.IconUrl"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-cols-sm="3" label-align-sm="right">
            <b-form-checkbox v-model="itemsEdit.IsNewOfMonth"
              >IsNewOfMonth</b-form-checkbox
            >
            <b-form-checkbox v-model="itemsEdit.IsHotSale"
              >IsHotSale</b-form-checkbox
            >
            <b-form-checkbox v-model="itemsEdit.IsHotTrading"
              >IsHotTrading</b-form-checkbox
            >
            <b-form-checkbox v-model="itemsEdit.IsFreeShip"
              >IsFreeShip</b-form-checkbox
            >
            <b-form-checkbox v-model="itemsEdit.IsMarketinProduct"
              >IsMarketinProduct</b-form-checkbox
            >
          </b-form-group>

          <div class="float-right">
            <b-button
              pill
              variant="success"
              class="mr-3"
              @click="saveEditCategorie()"
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
import axios from "@/api";

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
          key: "Name",
          label: "Name",
          sortable: true,
          class: "text-center",
        },
        {
          key: "TradeName",
          label: "TradeName",
          sortable: true,
          class: "text-center",
        },
        {
          key: "ColorName",
          label: "Color Name",
          sortable: true,
          class: "text-center",
        },
        {
          key: "SexName",
          label: "SexName",
          sortable: true,
          class: "text-center",
        },
        {
          key: "DealSaleName",
          label: "DealSaleName",
          sortable: true,
          class: "text-center",
        },
        {
          key: "Avata",
          label: "Avata",
          class: "text-center",
        },
        {
          key: "Origin",
          label: "Origin",
          sortable: true,
          class: "text-center",
        },
        {
          key: "Meterial",
          label: "Meterial",
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
          key: "DealSaleName",
          label: "DealSaleName",
          sortable: true,
          class: "text-center",
        },
        {
          key: "BuyCount",
          label: "BuyCount",
          sortable: true,
          class: "text-center",
        },
        {
          key: "SumIventory",
          label: "SumIventory",
          sortable: true,
          class: "text-center",
        },
        {
          key: "Points",
          label: "Points",
          sortable: true,
          class: "text-center",
        },
        {
          key: "Price",
          label: "Price",
          sortable: true,
          class: "text-center",
        },
        {
          key: "BasePrice",
          label: "BasePrice",
          sortable: true,
          class: "text-center",
        },
        {
          key: "LinkMarketingProduct",
          label: "LinkMarketingProduct",
          sortable: true,
          class: "text-center",
        },
        {
          key: "IconUrl",
          label: "IconUrl",
          sortable: true,
          class: "text-center",
        },
        {
          key: "IsNewOfMonth",
          label: "IsNewOfMonth",
          sortable: true,
          class: "text-center",
          formatter: (value, key, item) => {
            return value ? "Yes" : "No";
          },
        },
        {
          key: "IsHotSale",
          label: "IsHotSale",
          sortable: true,
          class: "text-center",
          formatter: (value, key, item) => {
            return value ? "Yes" : "No";
          },
        },
        {
          key: "IsHotTrading",
          label: "IsHotTrading",
          sortable: true,
          class: "text-center",
          formatter: (value, key, item) => {
            return value ? "Yes" : "No";
          },
        },
        {
          key: "IsFreeShip",
          label: "IsFreeShip",
          sortable: true,
          class: "text-center",
          formatter: (value, key, item) => {
            return value ? "Yes" : "No";
          },
        },
        {
          key: "IsMarketinProduct",
          label: "IsMarketinProduct",
          sortable: true,
          class: "text-center",
          formatter: (value, key, item) => {
            return value ? "Yes" : "No";
          },
        },
        { key: "actions", label: "Actions" },
      ],
      optionsColor: [],
      optionsSexName: [],
      optionsDealSaleName: [],
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
      urlDefault: "/products",
      image: "",
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
    this.getCategoriesList();
    this.getColorsList();
    this.getSexsList();
  },
  methods: {
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    getCategoriesList() {
      this.queryUrl = this.urlDefault;
      this.setByProp({
        queryUrl: this.queryUrl,
      });
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
        this.isShowFormGroup = true;
      } else {
        this.itemsEdit.Id = 0;
        this.itemsEdit.Name = "";
        this.itemsEdit.IsShowMenu = false;
        this.isShowFormGroup = true;
      }
    },
    saveEditCategorie() {
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
            this.uploadAvatar(response.Id);
          })
          .catch((err) => this.notifyVue(err, "danger"));
      } else {
        this.postApi()
          .then((response) => {
            this.items.push(response);
            this.totalRows = this.items.length;
            this.isShowFormGroup = false;
            this.notifyVue("Add Success!!!", "success");
            this.uploadAvatar(response.Id);
          })
          .catch((err) => this.notifyVue(err, "danger"));
      }
    },

    getColorsList() {
      this.setByProp({
        queryUrl: "/colors",
      });
      this.getApi()
        .then((response) => {
          this.optionsColor = response.map((elem) => ({
            value: elem.IdColor,
            text: elem.Name + "-" + elem.Color1,
          }));
        })
        .catch((err) => this.notifyVue(err, "danger"));
    },

    getSexsList() {
      this.setByProp({
        queryUrl: "/sexes",
      });
      this.getApi()
        .then((response) => {
          this.optionsSexName = response.map((elem) => ({
            value: elem.SexId,
            text: elem.Name,
          }));
        })
        .catch((err) => this.notifyVue(err, "danger"));
    },

    getDealSaleList() {
      this.setByProp({
        queryUrl: "/sexes",
      });
      this.getApi()
        .then((response) => {
          this.optionsDealSaleName = response.map((elem) => ({
            value: elem.SexId,
            text: elem.Name,
          }));
        })
        .catch((err) => this.notifyVue(err, "danger"));
    },

    uploadAvatar(idProduct) {
      if (this.itemsEdit.AvataEdit) {
        let img = this.itemsEdit.AvataEdit;
        let fd = new FormData();
        fd.append("image", img);

        axios
          .post("/Products/UploadAvata/" + idProduct, fd)
          .then((res) => {
            const data = res.data;
            var indexOf = this.items.findIndex((x) => x.Id == idProduct);
            this.items[indexOf].Avata = data;
            
          })
          .catch((err) => this.notifyVue(err, "danger"));
      }
    },

    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.itemsEdit.Avata = null;
      this.image = "";
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
</style>

<style>
label.custom-file-label {
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-color: #ced4da !important;
}

label.custom-file-label::after {
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
}
</style>