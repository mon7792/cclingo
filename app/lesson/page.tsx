import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

import { Quiz } from "./quiz";
const Page = async () => {
    const lessonData = getLesson();
    const userProgressData = getUserProgress();

    const [lesson, userProgress] = await Promise.all([lessonData, userProgressData])

    if (!lesson || !userProgress){
        redirect('/learn');
    }

    const initalPercentage = lesson.challenges.filter(challenge => challenge.completed).length / lesson.challenges.length * 100;


    return (
        <div>
            <Quiz 
                initalLessonId={lesson.id}
                initalLessonChallenges={lesson.challenges}
                initalHearts={userProgress.hearts}
                initalPercentage={initalPercentage}
                userSubscription={undefined}
            />
        </div>
    );
}

export default Page;