import {HOME_ROUTE, ITEM_PAGE, STORE_ROUTE} from "./utils/consts";
import Home from "./pages/Home/Home";
import Store from "./pages/Store/Store"
import ItemPage from "./pages/ItemPage/ItemPage";

// routes for users
export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home,
        label: 'Home',
    },
    {
        path: STORE_ROUTE,
        Component: Store,
        label: 'Home',
    },
    {
        path: ITEM_PAGE,
        Component: ItemPage,
        label: 'Item',
    },
]



