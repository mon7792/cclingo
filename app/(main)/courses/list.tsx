"use client";
import { useRouter } from "next/navigation";
import { courses, userProgress } from "@/db/schema";
import { Card } from "./card";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Course = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
}

export const List = async ({ courses, activeCourseId }: Course) => {
    const router = useRouter();

    const [pending, startTransition] = useTransition();

    const onClick = (id: number) => {
        if (pending) return;

        if (activeCourseId === id) {
            return router.push("/learn");
        }

        startTransition(() => {
            upsertUserProgress(id).catch(() => {
                toast.error("Failed to update your progress. Please try again later.");
            }
            );
        });


    };

    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4">
            {courses.map((course) => (
                <Card key={course.id} id={course.id} title={course.title} imageSrc={course.imageSrc} active={course.id === activeCourseId} disabled={pending} onClick={onClick} />
            ))}
        </div>
    );
}