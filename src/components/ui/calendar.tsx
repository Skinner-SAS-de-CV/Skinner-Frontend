// https://github.com/shadcn-ui/ui/pull/4421#issuecomment-2477597372
"use client"
import "react-day-picker/style.css";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
import {
  DayPicker,
  labelNext,
  labelPrevious,
  useDayPicker,
} from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectGroup } from '@/components/ui/select'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("py-2", className)}
      classNames={{
        months: "relative flex flex-col gap-y-4 sm:flex-row sm:gap-y-0",
        month_caption: "relative mx-10 flex h-7 items-center justify-center",
        // Cambie esto para que se viera bien los dias de semana
        weekdays: "grid grid-row grid-cols-7",
        weekday: "w-8 text-[0.8rem] font-normal text-muted-foreground",
        month: "w-full gap-y-4 overflow-x-hidden",
        caption: "relative flex items-center justify-center pt-1",
        caption_label: "truncate text-sm font-medium",
        button_next: cn(
          buttonVariants({
            variant: "outline",
            className:
              "absolute right-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          })
        ),
        button_previous: cn(
          buttonVariants({
            variant: "outline",
            className:
              "absolute left-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          })
        ),
        nav: "flex items-start",
        month_grid: "my-2 mx-2",
        // Cambie esto para que se viera bien los dias de semana
        week: "mt-2 grid grid-row grid-cols-7 w-full",
        day: "flex h-9 w-9 flex-1 items-center justify-center rounded-md p-0 text-sm [&:has(button)]:hover:!bg-accent [&:has(button)]:hover:text-accent-foreground [&:has(button)]:hover:aria-selected:!bg-primary [&:has(button)]:hover:aria-selected:text-primary-foreground",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal transition-none hover:bg-transparent hover:text-inherit aria-selected:opacity-100"
        ),
        range_start: "day-range-start rounded-s-md",
        range_end: "day-range-end rounded-e-md",
        selected:
          "bg-primary text-primary-foreground hover:!bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "rounded-none aria-selected:bg-accent aria-selected:text-accent-foreground hover:aria-selected:!bg-accent hover:aria-selected:text-accent-foreground",
        hidden: "invisible hidden",
        chevron: `inline-block fill-muted-foreground`,
        ...classNames,
      }}
      components={{
        Dropdown: ({ ...props }) => {
          const { options, className, disabled } = props;
          const { goToMonth, months } = useDayPicker();
          const currentShown = months[0].date;

          const currentSelection =
            className === "rdp-years_dropdown"
              ? currentShown.getFullYear().toString()
              : currentShown.getMonth().toString();

          const updateDayPickerState = (value: string) => {
            const newDate = new Date(currentShown);
            if (className === "rdp-years_dropdown") {
              newDate.setFullYear(parseInt(value));
            } else if (className === "rdp-months_dropdown") {
              newDate.setMonth(parseInt(value));
            }
            goToMonth(newDate);
          };

          return (
            <Select
              value={currentSelection}
              onValueChange={updateDayPickerState}
              disabled={disabled}
            >
              <SelectTrigger className="w-full border-0 ring-0 focus:ring-0 px-2 py-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options?.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>

            </Select>
          );
        },
        YearsDropdown: ({ ...props }) => {
          const { components } = useDayPicker()
          // sort years in descending order
          const sortedOptions = props.options?.sort((a, b) => b.value - a.value)
          return <components.Dropdown {...props} options={sortedOptions} />
        },
        PreviousMonthButton: ({ className, ...props }) => {
          const previousMonth = useDayPicker().previousMonth
          return (
            <Button
              variant="outline"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "absolute left-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 ml-2",
                className
              )}
              type="button"
              tabIndex={previousMonth ? -1 : undefined}
              disabled={!previousMonth}
              aria-label={labelPrevious(previousMonth)}
              onClick={(e) => {
                 return props.onClick && props.onClick(e)
              }}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
          )
        },
        NextMonthButton: ({ className, ...props }) => {
          const nextMonth = useDayPicker().nextMonth
          return (
            <Button
              variant="outline"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "absolute right-0 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 mr-2",
                className
              )}
              type="button"
              tabIndex={nextMonth ? -1 : undefined}
              disabled={!nextMonth}
              aria-label={labelNext(nextMonth)}
              onClick={(e) => {
                 return props.onClick && props.onClick(e)
              }}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          )
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }