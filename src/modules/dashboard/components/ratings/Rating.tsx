import type { ReactNode } from "react";

import Skeleton from "@/components/ui/skeleton/Skeleton";

import styles from "./Rating.module.css";

interface RatingProps<T> {
  title: string;
  data: T[];
  renderItem: (item: T) => ReactNode;
  isLoading: boolean;
  isError: boolean;
}

const Rating = <T,>({
  title,
  data,
  renderItem,
  isLoading,
  isError,
}: RatingProps<T>) => {
  if (isLoading) return <Skeleton />;
  if (isError) {
    return (
      <div className={styles.container}>
        Не удалось загрузить необходимые данные...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <ol className={styles.list}>
        {data &&
          data.map((item, index) => <li key={index}>{renderItem(item)}</li>)}
      </ol>
    </div>
  );
};

export default Rating;
