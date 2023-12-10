import Quizzes from "@/components/main/Quizzes";
import { Dela_Gothic_One } from "next/font/google";

const dela_gothic_one = Dela_Gothic_One({
	subsets: ["latin"],
	weight: ["400"],
});

export default function Home() {
	return (
		<>
			<h1
				className={`${dela_gothic_one.className} text-emerald-500 mt-8 mb-2 font-bold text-xl text-center`}
			>
				Welcome to 10Q!
			</h1>
			<p className="mb-8 text-center font-bold">
				Unlimited access to 10 questions-short quizzes
			</p>
			<div>
				<h2 className="font-bold mb-2">Some helpful reminders:</h2>
				<ul className="list-disc pl-6">
					<li>Quizzes have no time limit, take your time</li>
					<li>Can be retaked as much as you can</li>
				</ul>
			</div>
			<hr className="border-t-2 border-gray-900 my-4" />
			<Quizzes />
		</>
	);
}
