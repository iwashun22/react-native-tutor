export const pageList = {
  home: "Home",
  counter: "Counter",
  navbar: "Navbar",
  flatlist: "Flatlist",
  todolist: "MyTodo",
} as const

type keys = keyof typeof pageList;
export type PageName = typeof pageList[keys];