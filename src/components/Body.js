import Login from "./Login"
import Browse from "./Browse"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Demo from "./practice/demo"
import WatchPage from "./WatchPage"





const Body = () => {
    // always use hooks on top of components


    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <Login />,

        },
        {
            path: "/browse",
            element: <Browse />,

        },
        {
            path: "/watch",
            element: <WatchPage />
        },
        {
            path: "/demo",
            element: <Demo />
        },


    ])






    return (
        <div>
            <RouterProvider router={appRouter} />
        </div>


    )
}

export default Body
