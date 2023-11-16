import {
    ADD_ITEM,
    ADD_MIXING, BARREL_ROUTE,
    HOME_ROUTE,
    ITEM_PAGE,
    MIXING_DEPARTMENT,
    SELECT_DEPARTMENT,
    STORE_ROUTE, WAREHOUSE_DEPARTMENT
} from "./utils/consts";
import Home from "./pages/Home/Home";
import WareHouse from "./pages/WareHouse/WareHouse"
import ItemPage from "./pages/ItemPage/ItemPage";
import AddItem from "./pages/AddItem/AddItem";
import SelectedDepartment from "./pages/SelectedDepartament/SelectedDepartament";
import Mixing from "./pages/Mixing/Mixing";
import AddMixing from "./pages/Mixing/depends/AddMixing";
import BarrelWarehouse from "./pages/WareHouse/items/BarrelWarehouse";


// Department routes
export const departmentRoutes = [
    {
        path:MIXING_DEPARTMENT,
        Component: Mixing,
        label: 'Mixing department'
    },
    {
        path:ADD_MIXING,
        Component: AddMixing,
        label: 'Add mixing'
    },
    {
        path:WAREHOUSE_DEPARTMENT,
        Component: WareHouse,
        label: 'WAREHOUSE_DEPARTMENT'
    },
    {
        path:BARREL_ROUTE,
        Component: BarrelWarehouse,
        label: 'WAREHOUSE_DEPARTMENT'
    },
]

// routes for users
export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home,
        label: 'Home',
    },
    {
        path: STORE_ROUTE,
        Component: WareHouse,
        label: 'Home',
    },
    {
        path: ITEM_PAGE,
        Component: ItemPage,
        label: 'Item',
    },
    {
        path: ADD_ITEM,
        Component: AddItem,
        label: 'Add item',
    },
    {
        path: SELECT_DEPARTMENT,
        Component: SelectedDepartment,
        label: 'Add item',
    },
]



