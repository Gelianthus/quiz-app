import mongoConnection from "@/lib/mongoConnection";
import SubmittedQuiz from "@/lib/models/SubmittedQuiz";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	const submittedQuizzes = await SubmittedQuiz.find({
		submitted_by: id,
	}).populate("quiz", "title questions");

	return NextResponse.json({ submittedQuizzes });
}

export async function POST(req, res) {
	await mongoConnection();
	const { result, quiz, submitted_by } = await req.json();
	await SubmittedQuiz.create({
		result: result,
		quiz: quiz,
		submitted_by: submitted_by,
	});
	return NextResponse.json({ message: "Quiz Submitted!" });
}

export async function PUT(req, res) {
	await mongoConnection();
	const { newResult, submittedQuizId } = await req.json();
	await SubmittedQuiz.findByIdAndUpdate(
		submittedQuizId,
		{ result: newResult },
		{
			new: true,
		}
	);
	return NextResponse.json({ message: "Result updated" });
}

export async function DELETE(req, res) {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	await SubmittedQuiz.deleteMany({ submitted_by: id });

	return NextResponse.json({ message: "Documents deleted" }, { status: 200 });
}
