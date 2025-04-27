import { useCallback } from "react";
import { create } from "zustand";

const initialFilterData = {
  filterType: null,
  inputValue: "",
  sort: "all",
  startDate: null,
  endDate: null,
};

const initialBurgerData = {
  menuItems: [{ id: "", label: "", href: "" }],
};

const initialDataMap = {
  filters: initialFilterData,
  burger: initialBurgerData,
};

// Стор для управления всеми сайдбарами
export const useSidebarStore = create((set, get) => ({
  sidebars: {},

  initializeSidebar: (id) => {
    if (get().sidebars[id]) return;

    const initialData = initialDataMap[id] || {};

    set((state) => ({
      sidebars: {
        ...state.sidebars,
        [id]: {
          isShow: false,
          data: initialData,

          toggleShow: () =>
            set((state) => ({
              sidebars: {
                ...state.sidebars,
                [id]: {
                  ...state.sidebars[id],
                  isShow: !state.sidebars[id].isShow,
                },
              },
            })),

          setIsShow: (value) =>
            set((state) => ({
              sidebars: {
                ...state.sidebars,
                [id]: { ...state.sidebars[id], isShow: value },
              },
            })),

          setData: (data) =>
            set((state) => ({
              sidebars: {
                ...state.sidebars,
                [id]: {
                  ...state.sidebars[id],
                  data: { ...state.sidebars[id].data, ...data },
                },
              },
            })),

          resetData: () =>
            set((state) => ({
              sidebars: {
                ...state.sidebars,
                [id]: { ...state.sidebars[id], data: initialData },
              },
            })),
        },
      },
    }));
  },

  getSidebar: (id) => {
    let sidebar = get().sidebars[id];
    if (!sidebar) {
      get().initializeSidebar(id);
      sidebar = get().sidebars[id];
    }

    return sidebar;
  },
}));

// Хук для управления конкретным сайдбаром
export const useSidebar = (id) => {
  const getSidebar = useSidebarStore((state) => state.getSidebar);
  const sidebar = getSidebar(id);

  return {
    isShow: sidebar.isShow,
    data: sidebar.data,
    toggle: useCallback(() => sidebar.toggleShow(), [sidebar]),
    open: useCallback(() => sidebar.setIsShow(true), [sidebar]),
    close: useCallback(() => sidebar.setIsShow(false), [sidebar]),
    setData: useCallback((data) => sidebar.setData(data), [sidebar]),
    resetData: useCallback(() => sidebar.resetData(), [sidebar]),
  };
};
