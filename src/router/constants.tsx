import { Home, Investors, Onboarding } from "../pages";

export interface IRoute {
  component: () => JSX.Element;
  path: string;
  name: string;
  onNavBar: boolean;
}

export const routes: IRoute[] = [
  /* this must be the last */
  {
    component: Home,
    path: "/",
    name: "Community Directory",
    onNavBar: true,
  },
  {
    component: Onboarding,
    path: "/onboarding",
    name: "Onboarding",
    onNavBar: false,
  },
  {
    component: Investors,
    path: "/investors",
    name: "Investors",
    onNavBar: true,
  },
];
