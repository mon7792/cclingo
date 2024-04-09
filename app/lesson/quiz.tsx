"use client";
import { useState } from "react";
import { challengeOptions, challenges } from "@/db/schema";

import { Header } from "./header";

type Props = {
    initalLessonId: number;
    initalHearts: number;
    initalPercentage: number;
    initalLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
    userSubscription: any; // todo: replace in future
};

export const Quiz = ({
    initalLessonId,
    initalHearts,
    initalPercentage,
    initalLessonChallenges,
    userSubscription,
}: Props) => {

    const [hearts, setHearts] = useState(initalHearts);
    const [percentage, setPercentage] = useState(initalPercentage);

    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
        </>
    );
}