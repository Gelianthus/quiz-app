import QuizCard from "./QuizCard";
import getQuizzes from "@/lib/crud/getQuizzes";

async function Quizzes() {
	const quizzes = await getQuizzes();

	return (
		<>
			<h2 className="text-lg font-bold text-emerald-500">Quizzes</h2>
			<section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 my-4">
				{quizzes.map((quiz) => {
					const { _id, title, thumbnail_img } = quiz;
					return (
						<QuizCard
							key={_id}
							_id={_id}
							title={title}
							thumbnail_img={thumbnail_img}
						/>
					);
				})}
			</section>
		</>
	);
}

export default Quizzes;
