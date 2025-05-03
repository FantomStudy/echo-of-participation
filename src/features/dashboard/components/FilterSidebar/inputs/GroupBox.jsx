import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { useGroups } from "@dashboard/hooks/queries/useGroups";
import styles from "@dashboard/styles/FilterSidebar.module.css";

const GroupBox = ({ selectedGroup, setSelectedGroup, handleFilterChange }) => {
  const [query, setQuery] = useState("");

  const groups = useGroups();
  const groupsList = groups.data;

  const filteredGroups =
    query === ""
      ? groupsList
      : groupsList.filter((group) =>
          group.groupeName.toLowerCase().includes(query.toLowerCase())
        );

  const handleComboboxChange = (group) => {
    setSelectedGroup(group);
    handleFilterChange({
      filterType: "journal",
      groupId: group.id,
      filterLabel: group.groupeName,
    });
  };

  return (
    <Combobox value={selectedGroup} onChange={handleComboboxChange}>
      <div className={styles.combobox_wrapper}>
        <ComboboxInput
          className={styles.input}
          placeholder="Студенты по группе"
          displayValue={(group) => group?.groupeName}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
        />
        <ComboboxOptions className={styles.combobox_list} transition>
          {groups.isLoading ? (
            <div className={styles.combobox_item}>Загрузка...</div>
          ) : groups.error ? (
            <div className={styles.combobox_item}>Ошибка загрузки групп</div>
          ) : filteredGroups?.length === 0 && query !== "" ? (
            <div className={styles.combobox_item}>Ничего не найдено</div>
          ) : (
            filteredGroups?.map((group) => (
              <ComboboxOption key={group.id} value={group}>
                {({ active }) => (
                  <div
                    className={`${styles.combobox_item} ${
                      active ? styles.focus : ""
                    }`}
                  >
                    {group.groupeName}
                  </div>
                )}
              </ComboboxOption>
            ))
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
};

export default GroupBox;
