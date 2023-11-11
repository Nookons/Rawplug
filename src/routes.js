import {ADD_ITEM, HOME_ROUTE, ITEM_PAGE, MIXING_DEPARTMENT, SELECT_DEPARTMENT, STORE_ROUTE} from "./utils/consts";
import Home from "./pages/Home/Home";
import WareHouse from "./pages/WareHouse/WareHouse"
import ItemPage from "./pages/ItemPage/ItemPage";
import AddItem from "./pages/AddItem/AddItem";
import SelectedDepartment from "./pages/SelectedDepartament/SelectedDepartament";
import Mixing from "./pages/Mixing/Mixing";


// Department routes
export const departmentRoutes = [
    {
        path:MIXING_DEPARTMENT,
        Component: Mixing,
        label: 'Mixing department'
    },
    {
        path:MIXING_DEPARTMENT,
        Component: Mixing,
        label: 'Mixing department'
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



