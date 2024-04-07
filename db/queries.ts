import { cache } from "react";

import db from "@/db/drizzle";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { courses, userProgress, units, challengeProgress } from "./schema";

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();
    return data;
});

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId)
        // TODO: Populate units and lessons
    });
    return data;
})

export const getUserProgress = cache(async () => {
    const { userId } = auth();
    if (!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        }
    });
    return data;
});

export const getUnits = cache(async () => {

    const { userId } = auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourseId) {
        return [];
    }


    // TODO: confirm whether the order is needed
    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                with: {
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId)},
                        }
                    }
                },
            }
        }
    });


    const normalizeData = data.map((unit) => {
        const lessonWithCompletedStatus = unit.lessons.map((lesson) => {
            const completed = lesson.challenges.every((challenge) => {
                
                return challenge.challengeProgress && challenge.challengeProgress.length > 0 && challenge.challengeProgress.every((progress) => progress.completed);
            });
            return {
                ...lesson,
                completed,
            };
        });
        return {...unit, lessons: lessonWithCompletedStatus};
});       

    return normalizeData;
});