import {
  Router,
  Route,
  Outlet,
  ReactLocation,
  Link,
  useMatch,
} from "react-location";

const Product = () => {
  const params = useMatch().params;

  return (<div>Product page: {JSON.stringify(params)}</div>);
};

const routes: Route[] = [
  {
    path: "/",
    element: <div>Home Page</div>,
  },
  {
    path: "product",
    children: [
      {
        path: ":id",
        element: <Product />,
      },
    ],
  },
  {
    path: "cart",
    element: <div>Cart Page</div>,
  },
];