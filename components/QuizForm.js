"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dela_Gothic_One } from "next/font/google";
import LoadingScreen from "./LoadingScreen";

const dela_gothic_one = Dela_Gothic_One({
	subsets: ["latin"],
	weight: ["400"],
});

function QuizForm({ id, email }) {
	const router = useRouter();
	const [quiz, setQuiz] = useState(null);
	const [user, setuser] = useState(null);
	const [compareIndex, setCompareIndex] = useState(-1);
	const [questionIndex, setQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState("");
	const [providedAnswers, setProvidedAnswers] = useState([]);
	const [highlightedOption, setHighlightedOption] = useState(0);
	const [switchButton, setSwtichButton] = useState(false);
	const [result, setResult] = useState([]);

	const resultDialogRef = useRef(null);

	const selectHandle = (str, num) => {
		setSelectedAnswer(str);
		setHighlightedOption(num);
	};
	const nextHandle = () => {
		if (questionIndex === quiz.questions.length - 1 && selectedAnswer !== "") {
			setSwtichButton(true);
			setCompareIndex((prevIndex) => prevIndex + 1);
			setProvidedAnswers([...providedAnswers, selectedAnswer]);
		} else if (
			questionIndex !== quiz.questions.length - 1 &&
			selectedAnswer !== ""
		) {
			setQuestionIndex((prevIndex) => prevIndex + 1);
			setCompareIndex((prevIndex) => prevIndex + 1);
			setProvidedAnswers([...providedAnswers, selectedAnswer]);
		}
		setHighlightedOption(0);
	};

	const newSubmission = async () => {
		try {
			await fetch(`api/quiz-submissions`, {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({
					result: result,
					quiz: quiz._id,
					submitted_by: user._id,
				}),
			});
		} catch (error) {
			console.log(error);
		}
	};

	const updateSubmission = async (submittedQuizId) => {
		try {
			await fetch(`api/quiz-submissions`, {
				method: "PUT",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify({
					newResult: result,
					submittedQuizId: submittedQuizId,
				}),
			});
		} catch (error) {
			console.log(error);
		}
	};

	const submitHandle = async () => {
		try {
			const res = await fetch(
				`/api/quiz-submissions/quiz-submission?userid=${user._id}&quizid=${id}`
			);
			const data = await res.json();

			if (data.submittedQuiz.length > 0) {
				resultDialogRef.current.showModal();
				updateSubmission(data.submittedQuiz[0]._id);
			} else {
				resultDialogRef.current.showModal();
				newSubmission();
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		async function getQuiz() {
			const res = await fetch(`/api/quizzes/quiz?id=${id}`);
			const data = await res.json();
			const { quiz } = data;
			setQuiz(quiz);
		}
		getQuiz();
		async function getUser() {
			const res = await fetch(`api/users/user?useremail=${email}`, {
				cache: "no-store",
			});
			const data = await res.json();
			data && setuser(data.user);
		}
		getUser();
	}, []);

	useEffect(() => {
		setSelectedAnswer("");
		if (providedAnswers.length > 0) {
			return providedAnswers[compareIndex] ===
				quiz.questions[compareIndex].answer
				? setResult([...result, true])
				: setResult([...result, false]);
		}
	}, [providedAnswers]);

	if (quiz) {
		return (
			<>
				<h1
					className={`${dela_gothic_one.className} text-center font-bold text-xl mt-8 mb-4`}
				>
					{quiz.title}
				</h1>
				<p className="text-center">{quiz.about_quiz}</p>
				<div className="px-2 py-4 my-8 bg-gray-800">
					{switchButton ? (
						<p className="text-center">
							Check and save your result by submitting.
						</p>
					) : (
						<>
							<p className="p-1 text-end text-xs font-bold w-fit bg-gray-900">{`${
								questionIndex + 1
							} / ${quiz.questions.length}`}</p>
							<p className="my-4">{quiz.questions[questionIndex].question}</p>
							<hr className="my-4 border-gray-900 border-t-2" />
							<ul>
								{quiz.questions[questionIndex].options.map((option, index) => {
									const optionNum = index + 1;
									return (
										<li key={index}>
											<button
												onClick={() => selectHandle(option, optionNum)}
												className={`${
													highlightedOption === optionNum
														? "bg-emerald-600"
														: "bg-gray-950"
												} break-all block w-full p-2  my-2`}
											>
												{option}
											</button>
										</li>
									);
								})}
							</ul>
						</>
					)}

					<hr className="my-4 border-gray-900 border-t-2" />
					{switchButton ? (
						<button
							onClick={submitHandle}
							className="block w-full p-2 bg-gray-900 text-emerald-500 hover:text-emerald-400 active:text-emerald-600 font-bold text-sm rounded"
						>
							Submit
						</button>
					) : (
						<button
							className="block w-full p-2 bg-gray-900 text-emerald-500 hover:text-emerald-400 active:text-emerald-600 font-bold text-sm rounded"
							onClick={nextHandle}
						>
							Next
						</button>
					)}
				</div>
				<dialog
					ref={resultDialogRef}
					className="p-2 bg-gray-900 border border-black"
				>
					<p className="text-neutral-200 font-bold my-4">{quiz.title}</p>
					<p className="font-bold text-neutral-200 my-4">{`${
						result.filter(Boolean).length
					} / ${quiz.questions.length}`}</p>
					<ul className="my-4">
						{quiz.questions.map((q, index) => {
							return (
								<li
									key={index}
									className={`${
										result[index] ? "bg-emerald-600" : "bg-rose-600"
									} p-2 my-2 text-neutral-800`}
								>
									{q.question}
								</li>
							);
						})}
					</ul>
					<p className="text-neutral-200 text-xs my-4">
						You will be redirected to the home page once you close this modal.
						Go to your{" "}
						<Link
							href={"/profile"}
							className="text-emerald-500 underline"
						>
							Profile
						</Link>{" "}
						if you want to view your results again.
					</p>
					<button
						className=" w-full p-2 bg-gray-950 rounded mx-auto block text-neutral-200 my-4"
						onClick={() => {
							resultDialogRef.current.close();
							router.push("/");
						}}
					>
						Close
					</button>
				</dialog>
			</>
		);
	} else {
		return (
			<>
				<LoadingScreen />
			</>
		);
	}
}

export default QuizForm;
