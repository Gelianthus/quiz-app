import mongoConnection from "@/lib/mongoConnection";
import SubmittedQuiz from "@/lib/models/SubmittedQuiz";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const userid = searchParams.get("userid");
	const quizid = searchParams.get("quizid");
	const submittedQuiz = await SubmittedQuiz.find({
		quiz: quizid,
		submitted_by: userid,
	});
	return NextResponse.json({ submittedQuiz });
}
