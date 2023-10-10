export const pageList = {
  home: "Home",
  counter: "Counter",
  navbar: "Navbar"
} as const

type keys = keyof typeof pageList;
export type PageName = typeof pageList[keys];