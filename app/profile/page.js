"use client";

import SignInReminder from "@/components/SignInReminder";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import Result from "@/components/quiz/Result";
import { Dela_Gothic_One } from "next/font/google";

const dela_gothic_one = Dela_Gothic_One({
	subsets: ["latin"],
	weight: ["400"],
});

function Profile() {
	const { data: session } = useSession();
	const [userData, setUserData] = useState(null);
	const [allQuizzes, setAllQuizzes] = useState([]);

	const [accSettingsVisible, setAccSettingsVisible] = useState(false);

	const accSettingsRef = useRef(null);
	const confirmationDialogRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!accSettingsRef.current.contains(event.target)) {
				setAccSettingsVisible(false);
			}
		};
		if (accSettingsVisible) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [accSettingsVisible]);

	useEffect(() => {
		const getCurrentUser = async () => {
			try {
				const res = await fetch(
					`api/users/user?useremail=${session.user.email}`,
					{
						cache: "no-store",
					}
				);
				const data = await res.json();
				data && setUserData(data.user);
			} catch (error) {
				console.log("Loading data...");
			}
		};
		getCurrentUser();
	}, [session]);

	useEffect(() => {
		const getQuizSubmissions = async () => {
			try {
				const res = await fetch(`api/quiz-submissions?id=${userData._id}`, {
					cache: "no-store",
				});
				const data = await res.json();
				setAllQuizzes(data.submittedQuizzes);
			} catch (error) {
				console.error(error);
			}
		};
		userData && getQuizSubmissions();
	}, [userData]);

	const deleteProfile = async () => {
		try {
			const res = await fetch(`/api/quiz-submissions?id=${userData._id}`, {
				method: "DELETE",
			});
			if (res.ok) {
				await fetch(`/api/users/user?id=${userData._id}`, {
					method: "DELETE",
				});
			}
			signOut();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			{session ? (
				<>
					<dialog
						ref={confirmationDialogRef}
						className="p-4 bg-gray-800 text-neutral-200 rounded border border-gray-950"
					>
						<p className="text-center text-xl font-bold">Delete Profile?</p>
						<p className="text-sm max-w-md text-center my-4">
							All quiz data will be deleted. Once deleted, feel free to create a
							new profile by signing in with your google account.
						</p>
						<div className="flex flex-row items-center justify-center gap-2">
							<button
								onClick={deleteProfile}
								className="p-2 bg-gray-900 rounded hover:bg-sky-500 active:bg-sky-600"
							>
								Confirm
							</button>
							<button
								onClick={() => {
									confirmationDialogRef.current.close();
								}}
								className="p-2 bg-gray-900 rounded hover:bg-rose-500 active:bg-rose-600"
							>
								Cancel
							</button>
						</div>
					</dialog>
					<div className="flex flex-row gap-2 justify-between items-center">
						<p
							className={`${dela_gothic_one.className} font-bold text-xl sm:text-2xl my-8`}
						>
							Welcome {userData && userData.username}!
						</p>
						<div
							className="relative"
							ref={accSettingsRef}
						>
							<button
								className={`my-8 ${
									accSettingsVisible ? "text-emerald-500" : "text-emerald-800"
								}  hover:text-emerald-500`}
								onClick={() => {
									setAccSettingsVisible((prevState) => !prevState);
								}}
							>
								<span className="material-symbols-outlined wght-600 size-24 align-bottom">
									manage_accounts
								</span>
							</button>
							<div
								className={`${
									accSettingsVisible ? "block" : "hidden"
								} absolute p-4  right-0 bg-gray-800 rounded`}
							>
								<button
									onClick={() => {
										confirmationDialogRef.current.showModal();
										setAccSettingsVisible(false);
									}}
									className="bg-gray-900 p-2 rounded w-40 hover:bg-rose-500 active:bg-rose-600"
								>
									Delete Profile
									<span className="material-symbols-outlined wght-400 size-24 ml-1 align-bottom">
										delete_forever
									</span>
								</button>
							</div>
						</div>
					</div>

					<hr className="border-t-2 border-gray-900" />
					<p className="my-8">
						Retaking a quiz will replace the previous result.
					</p>
					{allQuizzes &&
						allQuizzes.map((q) => {
							const { quiz, result } = q;
							return (
								<div
									className="p-4 my-4 bg-gray-900"
									key={q._id}
								>
									<div className="font-bold text-lg flex flex-row gap-2 justify-between mb-2">
										<p>{quiz.title}</p>
										<p>
											{q.result.filter(Boolean).length} / {q.result.length}
										</p>
									</div>
									<Result
										quiz={quiz}
										result={result}
									/>
								</div>
							);
						})}
				</>
			) : (
				<SignInReminder />
			)}
		</>
	);
}

export default Profile;
