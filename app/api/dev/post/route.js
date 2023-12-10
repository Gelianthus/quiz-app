import mongoConnection from "@/lib/mongoConnection";
import { NextResponse } from "next/server";
import Quiz from "@/lib/models/Quiz";

export async function POST(req, res) {
	await mongoConnection();
	const newQuiz = {};

	await Quiz.create(newQuiz);
	return NextResponse.json({ message: "Added a new quiz" });
}
