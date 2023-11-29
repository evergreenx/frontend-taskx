import React, { useEffect, useState } from "react";

import { format, parseISO, startOfDay } from "date-fns";
import { CaptionProps, DayPicker, useNavigation } from "react-day-picker";
import { Box, Button, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { expandIcon, expandLessIcon } from "@/assets";
import Image from "next/image";
import { isBefore, startOfMonth, endOfMonth } from "date-fns";
function CustomCaption(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const [selected, setSelected] = useState<Date | undefined>();

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, "PP")}.</p>;
  }
  return (
    <Flex alignItems={"center"} justifyContent={"space-between"}>
      <Button
        w={"0"}
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        bg={"none"}
        _hover={{
          background: "none",
        }}
      >
        <IconLeft />
      </Button>

      <Text fontWeight={"600"} fontSize={"13.481px"} color={"brand.100"}>
        {format(props.displayMonth, "MMMM yyy")}
      </Text>
      <Button
        w={"0"}
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        bg={"none"}
        _hover={{
          background: "none",
        }}
      >
        <IconRight />
      </Button>
    </Flex>
  );
}

interface CustomDatePickerProps {
  resetFilters: boolean;

  onResetComplete: () => void;
  filterValues: string;

  onSelectionChange: (selectedValue: string) => void;
  selectedStartDate: string;
  selectedEndDate: string;
}

export default function DatePicker({
  onSelectionChange,
  filterValues,
  resetFilters,
  onResetComplete,
  selectedStartDate,
  selectedEndDate,
}: CustomDatePickerProps) {
  const { isOpen, onClose, onToggle } = useDisclosure();

  useEffect(() => {
    if (filterValues) {
      setSelected(parseISO(filterValues));
    }
  }, [filterValues]);

  const handleDateSelect = (date: Date) => {
    setSelected(date);
    onSelectionChange(format(date, "yyyy-MM-dd")); // Pass the selected date to the parent component
    onClose(); // Close the date picker
  };

  useEffect(() => {
    if (resetFilters) {
      setSelected(undefined);
      onResetComplete();
    }
  }, [resetFilters, onResetComplete]);

  const [selected, setSelected] = useState<Date | undefined>(undefined);

  const isDateDisabled = (date: Date) => {
    const convertedStartDate = parseISO(selectedStartDate);
    const startOfToday = startOfDay(convertedStartDate);

    // Disable dates from before the selected start day
    return isBefore(date, startOfToday);
  };

  return (
    <Box>
      <Box
        style={{
          border: isOpen ? "3px solid #131316" : "0px",
          backgroundColor: isOpen ? "#fff" : "#EFF1F6",
        }}
        cursor="pointer"
        w={["100%", "203px"]}
        p="14px 16px"
        borderRadius="12px"
        onClick={onToggle}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text color="#brand.300" fontSize="14px" fontWeight="500">
          {}
          {selected ? format(selected, "PP") : "Select date"}
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
          as="div"
          zIndex={999}
          position="absolute"
          left={["0", "20px"]}
          w={["100%", "412px"]}
          bg="#fff"
          p="8px"
          borderRadius="12px"
          boxShadow="0px 6px 12px 0px rgba(92, 115, 131, 0.08), 0px 4px 8px 0px rgba(92, 115, 131, 0.08);"
        >
          <DayPicker
            mode="single"
            toDate={new Date()}
            components={{
              Caption: CustomCaption,
            }}
            styles={{
              table: {
                padding: "20px",
              },
              head_cell: {
                color: "#56616B",
                fontSize: "14px",
                textTransform: "capitalize",
                fontWeight: "600",
                padding: "7px 5px",
                width: "41.284px",
              },
              cell: {
                color: "#131316",
                fontSize: "14px",
                padding: "7px 5px",

                fontWeight: "600",
                width: "32.016px",
              },
            }}
            style={{}}
            modifiersStyles={{
              today: {
                fontSize: "14px",
                fontWeight: "600",
                backgroundColor: "#131316",
                color: "#fff",
                width: "32.016px",
                height: "32.016px",
              },
              selected: {
                fontSize: "14px",
                fontWeight: "600",
                backgroundColor: "#131316",
                color: "#fff",
                width: "32.016px",
                height: "32.016px",
              },
            }}
            selected={selected}
            disabled={isDateDisabled}
            onSelect={(date: Date | any) => handleDateSelect(date)}
          />
        </Box>
      )}
    </Box>
  );
}

const IconLeft = () => (
  <Icon
    width="10"
    height="10"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_1_1947"
      maskUnits="userSpaceOnUse"
      x="4"
      y="4"
      width="21"
      height="21"
    >
      <rect
        x="4.07153"
        y="4.07156"
        width="20.2209"
        height="20.2209"
        fill="#D9D9D9"
      />
    </mask>
    <g mask="url(#mask0_1_1947)">
      <path
        d="M15.5721 18.3525L11.865 14.6664C11.7948 14.5822 11.7456 14.5013 11.7175 14.4238C11.6895 14.3468 11.6754 14.2662 11.6754 14.182C11.6754 14.0977 11.6895 14.0168 11.7175 13.9393C11.7456 13.8624 11.7948 13.7818 11.865 13.6975L15.5721 10.0114C15.6564 9.91313 15.7547 9.86398 15.867 9.86398C15.9794 9.86398 16.0777 9.91313 16.1619 10.0114C16.2602 10.0957 16.3094 10.194 16.3094 10.3063C16.3094 10.4187 16.2602 10.5169 16.1619 10.6012L12.5811 14.182L16.1619 17.7628C16.2602 17.847 16.3094 17.9453 16.3094 18.0576C16.3094 18.17 16.2602 18.2683 16.1619 18.3525C16.0777 18.4508 15.9794 18.5 15.867 18.5C15.7547 18.5 15.6564 18.4508 15.5721 18.3525Z"
        fill="#131316"
      />
    </g>
  </Icon>
);

const IconRight = () => (
  <Icon
    width="10"
    height="10"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_1_1949"
      maskUnits="userSpaceOnUse"
      x="3"
      y="4"
      width="21"
      height="21"
    >
      <rect
        width="20.2209"
        height="20.2209"
        transform="matrix(-1 0 0 1 23.9285 4.07156)"
        fill="#D9D9D9"
      />
    </mask>
    <g mask="url(#mask0_1_1949)">
      <path
        d="M12.4279 18.3525L16.135 14.6664C16.2052 14.5822 16.2544 14.5013 16.2825 14.4238C16.3105 14.3468 16.3246 14.2662 16.3246 14.182C16.3246 14.0977 16.3105 14.0168 16.2825 13.9393C16.2544 13.8624 16.2052 13.7818 16.135 13.6975L12.4279 10.0114C12.3436 9.91313 12.2453 9.86398 12.133 9.86398C12.0206 9.86398 11.9223 9.91313 11.8381 10.0114C11.7398 10.0957 11.6906 10.194 11.6906 10.3063C11.6906 10.4187 11.7398 10.5169 11.8381 10.6012L15.4189 14.182L11.8381 17.7628C11.7398 17.847 11.6906 17.9453 11.6906 18.0576C11.6906 18.17 11.7398 18.2683 11.8381 18.3525C11.9223 18.4508 12.0206 18.5 12.133 18.5C12.2453 18.5 12.3436 18.4508 12.4279 18.3525Z"
        fill="#131316"
      />
    </g>
  </Icon>
);
