import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
const Dashboard = () => import(/* webpackChunkName: "dashboard" */"@/pages/Dashboard.vue");
const Profile = () => import(/* webpackChunkName: "common" */ "@/pages/Profile.vue");
const Notifications = () => import(/* webpackChunkName: "common" */"@/pages/Notifications.vue");
const Icons = () => import(/* webpackChunkName: "common" */ "@/pages/Icons.vue");
const Products = () => import(/* webpackChunkName: "common" */ "@/pages/Products.vue");
const Sizes = () => import(/* webpackChunkName: "common" */ "@/pages/Sizes.vue");
const Sexs = () => import(/* webpackChunkName: "common" */ "@/pages/Sexs.vue");
const Colors = () => import(/* webpackChunkName: "common" */ "@/pages/Colors.vue");
const Brands = () => import(/* webpackChunkName: "common" */ "@/pages/Brands.vue");
const Deals = () => import(/* webpackChunkName: "common" */ "@/pages/Deals.vue");
const Units = () => import(/* webpackChunkName: "common" */ "@/pages/Units.vue");
const Categories = () => import(/* webpackChunkName: "common" */ "@/pages/Categories.vue");
const Maps = () => import(/* webpackChunkName: "common" */ "@/pages/Maps.vue");
const Typography = () => import(/* webpackChunkName: "common" */ "@/pages/Typography.vue");
const TableList = () => import(/* webpackChunkName: "common" */ "@/pages/TableList.vue");

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "profile",
        name: "profile",
        component: Profile
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications
      },
      {
        path: "icons",
        name: "icons",
        component: Icons
      },
      {
        path: "products",
        name: "products",
        component: Products
      },
      {
        path: "maps",
        name: "maps",
        component: Maps
      },
      {
        path: "sizes",
        name: "sizes",
        component: Sizes
      },
      {
        path: "sexs",
        name: "sexs",
        component: Sexs
      },
      {
        path: "colors",
        name: "colors",
        component: Colors
      },
      {
        path: "categories",
        name: "categories",
        component: Categories
      },
      {
        path: "brands",
        name: "brands",
        component: Brands
      },
      {
        path: "deals",
        name: "deals",
        component: Deals
      },
      {
        path: "units",
        name: "units",
        component: Units
      },
      {
        path: "typography",
        name: "typography",
        component: Typography
      },
      {
        path: "table-list",
        name: "table-list",
        component: TableList
      }
    ]
  },
  { path: "*", component: NotFound },
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
