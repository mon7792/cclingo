import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "@/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
    try {
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

        await db.insert(schema.courses).values([
            {id: 1, title: "Spanish", imageSrc: "/es.svg"},
            {id: 2, title: "Italian", imageSrc: "/it.svg"},
            {id: 3, title: "French", imageSrc: "/fr.svg"},
            {id: 4, title: "Croatian", imageSrc: "/hr.svg"},
        ]);

        await db.insert(schema.units).values([
            {id: 1,  courseId: 1, title: "Unit 1", description: "Learn the basics of Spanish", order: 1},
        ]);

        await db.insert(schema.lessons).values([
            {id: 1, unitId: 1, title: "Nouns", order: 1},
            {id: 2, unitId: 1, title: "Verbs", order: 2},
            {id: 3, unitId: 1, title: "Action", order: 3},
            {id: 4, unitId: 1, title: "Subs", order: 4},
            {id: 5, unitId: 1, title: "Conclude", order: 5},
        ]);

        await db.insert(schema.challenges).values([
            {id: 1, lessonId: 1, type: "SELECT", question: 'Which one of these is the "the man"?', order: 1},
        ]);

        await db.insert(schema.challengeOptions).values([
            {id: 1, challengeId: 1, text: "el hombre", imageSrc: "/man.svg", audioSrc: "/es_man.mp3",correct: true},
            {id: 2, challengeId: 1, text: "la mujer", imageSrc: "/woman.svg", audioSrc: "/es_woman.mp3", correct: false},
            {id: 3, challengeId: 1, text: "el niño", imageSrc: "/boy.svg", audioSrc: "/es_boy.mp3", correct: false},
            {id: 4, challengeId: 1, text: "la niña", imageSrc: "/girl.svg", audioSrc: "/es_girl.mp3", correct: false},
        ]);

        console.log("Seeding database finished...");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed database");
    }
};

main();