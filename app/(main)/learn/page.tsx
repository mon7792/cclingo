import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";


export default async function LearnPage() {

  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([userProgressData]);

  if (!userProgress) {
    redirect("/courses");
  }

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress activeCourse={{ imageSrc: "/es.svg", title: "Spanish" }} points={100} hearts={5} hasActiveSubscription={false} />
      </StickyWrapper>
      <FeedWrapper>
        <Header title="Spanish" />
      </FeedWrapper>
    </div>
  );
}
