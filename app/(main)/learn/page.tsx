import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Unit } from "./unit";


export default async function LearnPage() {

  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitData = getUnits();

  const [userProgress, units, courseProgress, lessonPercentage] = await Promise.all([userProgressData, unitData, courseProgressData, lessonPercentageData]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress activeCourse={userProgress.activeCourse} points={userProgress.points} hearts={userProgress.hearts} hasActiveSubscription={false} />
      </StickyWrapper>
      <FeedWrapper>
        <Header title={userProgress.activeCourse.title} />

        {units.map((unit) => (
          <Unit key={unit.id}
            id={unit.id}
            order={unit.order}
            title={unit.title}
            description={unit.description}
            lessons={unit.lessons}
            activeLesson={courseProgress.activeLesson}
            activeLessonPercentage={lessonPercentage}
          />
        ))}

      </FeedWrapper>
    </div>
  );
}
