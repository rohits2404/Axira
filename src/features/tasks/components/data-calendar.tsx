"use client";

import { addMonths, format, subMonths } from "date-fns";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import type { Task } from "@/features/tasks/types";
import { EventCard } from "./event-card";
import { DayProps } from "react-day-picker";

interface DataCalendarProps {
    data: Task[];
}

interface CustomToolbarProps {
    date: Date;
    onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

type TaskDayProps = DayProps & {
    tasksByDate: Map<string, Task[]>;
};

function TaskDay({ day, modifiers, tasksByDate }: TaskDayProps) {
    const date = day.date;
    const key = format(date, "yyyy-MM-dd");
    const tasks = tasksByDate.get(key) || [];

    return (
        <td className="relative h-24 w-full border border-border p-0 align-top">
            <div className="flex h-full w-full flex-col gap-1 p-1">
                {/* day number */}
                <span className="text-xs text-muted-foreground">
                    {format(date, "d")}
                </span>
                {/* tasks */}
                <div className="flex flex-col gap-1">
                    {tasks.slice(0, 2).map((task) => (
                        <EventCard
                            key={task.$id}
                            id={task.$id}
                            title={task.name}
                            assignee={task.assignee}
                            project={task.project}
                            status={task.status}
                        />
                    ))}
                    {tasks.length > 2 && (
                        <span className="text-[10px] text-muted-foreground">
                            +{tasks.length - 2} more
                        </span>
                    )}
                </div>
            </div>
        </td>
    );
}

const CustomToolbar = ({ date, onNavigate }: CustomToolbarProps) => {
    return (
        <div className="mb-4 flex items-center justify-between">
            <div className="flex gap-2">
                <Button
                title="Previous Month"
                onClick={() => onNavigate("PREV")}
                variant="secondary"
                size="icon"
                >
                    <ChevronLeft className="size-4" />
                </Button>
                <Button
                title="Next Month"
                onClick={() => onNavigate("NEXT")}
                variant="secondary"
                size="icon"
                >
                    <ChevronRight className="size-4" />
                </Button>
            </div>
            <div className="flex items-center gap-2 rounded-md border px-3 py-2">
                <CalendarIcon className="size-4" />
                <p className="text-sm font-medium">{format(date, "MMMM yyyy")}</p>
            </div>
        </div>
    );
};

export const DataCalendar = ({ data }: DataCalendarProps) => {

    const [value, setValue] = useState(
        data.length > 0 ? new Date(data[0].dueDate) : new Date()
    );

    const tasksByDate = useMemo(() => {
        const map = new Map<string, Task[]>();
        data.forEach((task) => {
            const key = format(new Date(task.dueDate), "yyyy-MM-dd");
            if (!map.has(key)) map.set(key, []);
            map.get(key)?.push(task);
        });
        return map;
    }, [data]);

    const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
        if (action === "PREV") setValue(subMonths(value, 1));
        if (action === "NEXT") setValue(addMonths(value, 1));
        if (action === "TODAY") setValue(new Date());
    };

    return (
        <div className="rounded-xl border bg-background p-4 shadow-sm">
            <CustomToolbar date={value} onNavigate={handleNavigate} />
            <Calendar
            month={value}
            onMonthChange={setValue}
            className="w-full"
            components={{
                Day: (props) => (
                    <TaskDay {...props} tasksByDate={tasksByDate} />
                )
            }}
            />
        </div>
    );
};