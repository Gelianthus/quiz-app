"use client";

import { signIn } from "next-auth/react";

function SignIn() {
	return (
		<>
			<button
				onClick={() => signIn("google")}
				className="p-2 bg-gray-950 text-emerald-500 font-bold text-sm rounded hover:text-emerald-600 active:text-neutral-200"
			>
				Sign In{" "}
				<span className="material-symbols-outlined size-20 wght-600 align-bottom">
					login
				</span>
			</button>
		</>
	);
}

export default SignIn;
