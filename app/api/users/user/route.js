import mongoConnection from "@/lib/mongoConnection";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function GET(req, res) {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const useremail = searchParams.get("useremail");
	const user = await User.findOne({ email: useremail });

	return NextResponse.json({ user });
}

export async function DELETE(req, res) {
	await mongoConnection();
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");
	await User.findByIdAndDelete(id);

	return NextResponse.json({ message: "User deleted" });
}
