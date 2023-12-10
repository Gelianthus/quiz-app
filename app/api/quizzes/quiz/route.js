import mongoConnection from "@/lib/mongoConnection";
import Quiz from "@/lib/models/Quiz";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	const quiz = await Quiz.findById(id);
	return NextResponse.json({ quiz });
}
