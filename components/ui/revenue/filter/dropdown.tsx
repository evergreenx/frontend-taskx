import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Checkbox, Box, Text, useDisclosure } from "@chakra-ui/react";
import { expandIcon, expandLessIcon } from "@/assets";
import Image from "next/image";

type Option = TransactionTypeInterface | TransactionStatusInterface;

interface CustomMultiSelectProps<T> {
  options: T[];
  label: string;
  displayProperty: keyof T;

  resetFilters: boolean;

  onResetComplete: () => void;
  filterValues: any;

  onSelectionChange: (selectedValues: T[]) => void;
}

const CustomMultiSelect = <T extends Option>({
  options,
  label,
  displayProperty,
  onSelectionChange,
  resetFilters,
  onResetComplete,
  filterValues,
}: CustomMultiSelectProps<T>) => {
  const [selectedOptions, setSelectedOptions] = useState<T[]>(filterValues);

  console.log(selectedOptions)

  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    if (resetFilters) {
      setSelectedOptions([]);
      onResetComplete();
    }
  }, [resetFilters, onResetComplete]);

  


  const handleOptionToggle = (option: T) => {
    let updatedOptions:any = [];
    if (selectedOptions.some((item) => item.id === option.id)) {
      updatedOptions = selectedOptions.filter((item) => item.id !== option.id);
    } else {
      updatedOptions = [...selectedOptions, option];
    }

    setSelectedOptions(updatedOptions);
    onSelectionChange(updatedOptions);

  };

  // useEffect(() => {
  //   onSelectionChange(selectedOptions);
  // }, [selectedOptions, onSelectionChange]);
  const selectedOptionsText = selectedOptions
    .map((option) => option[displayProperty])
    .join(", ");
  const displayText =
    selectedOptions.length > 0 ? selectedOptionsText : `Select ${label}`;

  // console.log(filterValues)
  return (
    <Box>
      <Box
        style={{
          border: isOpen ? "3px solid #131316 " : "0px",
          backgroundColor: isOpen ? "#fff" : "#EFF1F6",
        }}
        cursor={"pointer"}
        p={"14px 16px"}
        borderRadius={"12px"}
        onClick={onToggle}
        display="flex"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <Text color={"#131316"} fontSize={"14px"} fontWeight={"500"}>
          {displayText}
        </Text>
        <Text ml={2}>
          {!isOpen ? (
            <Image alt="expandmore" src={expandIcon} />
          ) : (
            <Image alt="expandless" src={expandLessIcon} />
          )}
        </Text>
      </Box>
      {isOpen && (
        <Box
          as={motion.div}
          position={"absolute"}
          //   initial={{ opacity: 0, scaleY: 0 }}
          //   animate={{ opacity: 1, scaleY: 1 }}
          //   exit={{ opacity: 0, scaleY: 0 }}
          w={["100%", "412px"]}
          bg={"#fff"}
          p={"8px"}
          borderRadius={"12px"}
          boxShadow={
            "0px 6px 12px 0px rgba(92, 115, 131, 0.08), 0px 4px 8px 0px rgba(92, 115, 131, 0.08);"
          }
        >
          {options.map((option) => (
            <Box
              mt={"10px"}
              p={"14px"}
              key={option.id}
              display="flex"
              alignItems="center"
            >
              <Checkbox
                borderColor={"#DBDEE5"}
                isChecked={selectedOptions.some(
                  (item) => item.id === option.id
                )}
                onChange={() => handleOptionToggle(option)}
              />
              <Text
                color={"#131316"}
                fontSize={"16px"}
                fontWeight={"600"}
                ml={"12px"}
              >
                {/* @ts-ignore */}
                {option[displayProperty]}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default CustomMultiSelect;
