import Link from "next/link";

function TermsOfUse() {
	return (
		<div className="p-2">
			<h1 className="text-center text-emerald-500 text-2xl font-bold my-8">
				Terms of Use
			</h1>
			<div className="p-2 bg-gray-900 rounded">
				<p className="my-8 text-lg">
					A user is required to sign in with a google account to participate in
					quizzes. Signing in will automatically create an account using the
					google account.
				</p>
				<p className="my-8 text-lg">
					Check out the{" "}
					<Link
						className="underline hover:text-emerald-500 active:text-emerald-600"
						href={"/privacy"}
					>
						Privacy
					</Link>{" "}
					page to learn what your email is being used for.
				</p>
			</div>
		</div>
	);
}

export default TermsOfUse;
