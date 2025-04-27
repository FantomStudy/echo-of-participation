import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./ComboBox.module.css";
import { useShowUI } from "@hooks/ui/useShowUI";
import { useClickOutside } from "@hooks/ui/useClickOutside";


//TODO ПОРАБОТАТЬ НАД ОШИБКАМИ ПРИ ПОЛУЧЕНИИ ДАННЫХ
export default function ComboBox({
  value = "",
  placeholder = "",
  disabled = false,
  options = [],
  renderOption = (item) => item,
  getOptionValue = (item) => item,
  error = null,
}) {
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [inputValue, setInputValue] = useState(value);
  const { isShow, setIsShow } = useShowUI();
  const wrapperRef = useRef(null);

  const memoizedOptions = useMemo(
    () => (Array.isArray(options) ? options : []),
    [options]
  );

  useEffect(() => {
    let filtered = [];

    if (error && memoizedOptions.length === 0) {
      filtered = [
        {
          isError: true,
          message: error || "Не удалось загрузить подсказки",
        },
      ];
    } else {
      filtered = memoizedOptions.filter((option) =>
        getOptionValue(option).toLowerCase().includes(inputValue.toLowerCase())
      );
    }

    setFilteredOptions((prev) =>
      JSON.stringify(prev) !== JSON.stringify(filtered) ? filtered : prev
    );
  }, [memoizedOptions, inputValue, getOptionValue, filteredOptions, error]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useClickOutside(
    wrapperRef,
    () => {
      setIsShow(false);
    },
    isShow
  );

  const handleInputChange = useCallback(
    (e) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      setIsShow(true);
    },
    [setIsShow]
  );

  const handleOptionSelect = useCallback(
    (option) => {
      if (option.isError) {
        setIsShow(false);
        return;
      }
      const optionValue = getOptionValue(option);
      setInputValue(optionValue);
      setIsShow(false);
    },
    [getOptionValue, setIsShow]
  );

  const handleInputFocus = useCallback(() => {
    if (!disabled) {
      setIsShow(true);
    }
  }, [disabled, setIsShow]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        setIsShow(false);
      }
    },
    [setIsShow]
  );

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <input
        type="text"
        className={styles.input}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onClick={handleInputFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
      />
      {isShow && filteredOptions.length > 0 && (
        <ul className={styles.list}>
          {filteredOptions.map((option, index) => (
            <li
              key={option.isError ? "error" : index}
              className={styles.option}
              onClick={() => handleOptionSelect(option)}
            >
              {option.isError ? option.message : renderOption(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
