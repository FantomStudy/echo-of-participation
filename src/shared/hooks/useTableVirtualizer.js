import { useVirtualizer } from "@tanstack/react-virtual";

export const useTableVirtualizer = ({
  entities,
  container,
  estimateSize = 47,
}) => {
  const virtualizer = useVirtualizer({
    count: entities?.length || 0,
    getScrollElement: () => container.current,
    estimateSize: () => estimateSize,
  });

  const vItems = virtualizer.getVirtualItems();

  return { virtualizer, vItems };
};
