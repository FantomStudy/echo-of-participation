import { useCallback } from "react";

import { create } from "zustand";
import { shallow } from "zustand/shallow";

const initialDataMap = {
  filters: { filterType: null, id: null, sort: "all", customRange: null },
  burger: { menuItems: [] },
};

const getInitialSidebarState = (id, initialData = {}) => {
  const defaultData = initialDataMap[id] || {};
  return {
    isShow: false,
    data: { ...defaultData, ...initialData },
  };
};

export const useSidebarStore = create((set, get) => ({
  sidebars: {},

  getSidebar: (id) => {
    const state = get();
    if (!state.sidebars[id]) {
      set((state) => ({
        sidebars: {
          ...state.sidebars,
          [id]: getInitialSidebarState(id),
        },
      }));
    }
    return get().sidebars[id];
  },

  toggleShow: (id) =>
    set((state) => ({
      sidebars: {
        ...state.sidebars,
        [id]: {
          ...(state.sidebars[id] || getInitialSidebarState(id)),
          isShow: !(state.sidebars[id] || getInitialSidebarState(id)).isShow,
        },
      },
    })),

  setIsShow: (id, value) =>
    set((state) => ({
      sidebars: {
        ...state.sidebars,
        [id]: {
          ...(state.sidebars[id] || getInitialSidebarState(id)),
          isShow: value,
        },
      },
    })),

  setData: (id, data) =>
    set((state) => ({
      sidebars: {
        ...state.sidebars,
        [id]: {
          ...(state.sidebars[id] || getInitialSidebarState(id)),
          data: {
            ...(state.sidebars[id] || getInitialSidebarState(id)).data,
            ...data,
          },
        },
      },
    })),

  resetData: (id) =>
    set((state) => ({
      sidebars: {
        ...state.sidebars,
        [id]: {
          ...(state.sidebars[id] || getInitialSidebarState(id)),
          data: initialDataMap[id] || {},
        },
      },
    })),
}));

export const useSidebar = (id) => {
  const sidebar = useSidebarStore((state) => state.getSidebar(id), shallow);

  const { isShow, data } = sidebar;
  const toggle = useCallback(
    () => useSidebarStore.getState().toggleShow(id),
    [id],
  );
  const open = useCallback(
    () => useSidebarStore.getState().setIsShow(id, true),
    [id],
  );
  const close = useCallback(
    () => useSidebarStore.getState().setIsShow(id, false),
    [id],
  );
  const setData = useCallback(
    (data) => useSidebarStore.getState().setData(id, data),
    [id],
  );
  const resetData = useCallback(
    () => useSidebarStore.getState().resetData(id),
    [id],
  );

  return { isShow, data, toggle, open, close, setData, resetData };
};
