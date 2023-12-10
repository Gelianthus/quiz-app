"use client";

import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import SignInReminder from "@/components/SignInReminder";
import QuizForm from "@/components/QuizForm";

function Quiz() {
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const { data: session } = useSession();
	return (
		<>
			{session ? (
				<QuizForm
					id={id}
					email={session.user.email}
				/>
			) : (
				<SignInReminder />
			)}
		</>
	);
}

export default Quiz;
