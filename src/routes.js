import {ADD_ITEM, HOME_ROUTE, ITEM_PAGE, STORE_ROUTE} from "./utils/consts";
import Home from "./pages/Home/Home";
import WareHouse from "./pages/WareHouse/WareHouse"
import ItemPage from "./pages/ItemPage/ItemPage";
import AddItem from "./pages/AddItem/AddItem";

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
]



