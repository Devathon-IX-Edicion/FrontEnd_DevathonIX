import {
    createBrowserRouter
} from "react-router";
import Layout from "./components/Layout";


const router = createBrowserRouter([
    {
        path: "/",
        Component: Layout,
        children:[
            {
                path: "/",
                lazy: async () => {
                    const Component = (await import("./pages/Login")).default
                    return { Component }
                },
            },
            {
                path: "MagicKitchen",
                lazy: async () => {
                    const Component = (await import("./pages/MagicKitchen")).default
                    return { Component }
                },
            }
        ]
  }
]);


export default router