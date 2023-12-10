"use client";

import { signIn } from "next-auth/react";

function SignInReminder() {
	return (
		<>
			<div className="p-8 my-8 mx-auto bg-gray-800 w-fit rounded">
				<p className="text-xl text-center">Must be signed in.</p>
				<p className="text-xl text-center">
					<button
						onClick={() => signIn("google")}
						className="underline cursor-pointer text-emerald-500 hover:text-emerald-600 active:text-neutral-200"
					>
						Sign in
					</button>{" "}
					with google.
				</p>
			</div>
		</>
	);
}

export default SignInReminder;
