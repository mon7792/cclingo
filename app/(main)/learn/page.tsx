import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { getUnits, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";


export default async function LearnPage() {

  const userProgressData = getUserProgress();
  const unitData = getUnits();

  const [userProgress, units] = await Promise.all([userProgressData, unitData]);

  if (!userProgress || !userProgress.activeCourse) {
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
          <div key={unit.id}>
            <h2>{unit.title}</h2>
            {unit.lessons.map((lesson) => (
              <div key={lesson.id}>
                <h3>{lesson.title}</h3>
                {lesson.challenges.map((challenge) => (
                  <div key={challenge.id}>
                    <h4>{challenge.question}</h4>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </FeedWrapper>
    </div>
  );
}
