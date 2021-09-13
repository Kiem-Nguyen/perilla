<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" :name="$t('sidebar.dashboard')" icon="tim-icons icon-chart-pie-36"/>
        <sidebar-link to="/icons" :name="$t('sidebar.icons')" icon="tim-icons icon-atom"/>
        <sidebar-link to="/maps" :name="$t('sidebar.maps')" icon="tim-icons icon-pin"/>
        <sidebar-link to="/products" :name="$t('sidebar.products')" icon="tim-icons icon-money-coins"/>
        <sidebar-link to="/sizes" :name="$t('sidebar.sizes')" icon="tim-icons icon-caps-small"/>
        <sidebar-link to="/sexs" :name="$t('sidebar.sexs')" icon="tim-icons icon-tie-bow"/>
        <sidebar-link to="/colors" :name="$t('sidebar.colors')" icon="tim-icons icon-molecule-40"/>
        <sidebar-link to="/categories" :name="$t('sidebar.categories')" icon="tim-icons icon-bullet-list-67"/>
        <sidebar-link to="/brands" :name="$t('sidebar.brands')" icon="tim-icons icon-square-pin"/>
        <sidebar-link to="/deals" :name="$t('sidebar.deals')" icon="tim-icons icon-shape-star"/>
        <sidebar-link to="/units" :name="$t('sidebar.units')" icon="tim-icons icon-map-big"/>
        <sidebar-link to="/notifications" :name="$t('sidebar.notifications')" icon="tim-icons icon-bell-55"/>
        <sidebar-link to="/profile" :name="$t('sidebar.userProfile')" icon="tim-icons icon-single-02"/>
        <sidebar-link to="/table-list" :name="$t('sidebar.tableList')" icon="tim-icons icon-puzzle-10"/>
        <sidebar-link to="/typography" :name="$t('sidebar.typography')" icon="tim-icons icon-align-center"/>
        <sidebar-link to="/dashboard?enableRTL=true" :name="$t('sidebar.rtlSupport')" icon="tim-icons icon-world"/>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  }
};
</script>
