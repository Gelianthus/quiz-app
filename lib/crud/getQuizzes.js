import mongoConnection from "@/lib/mongoConnection";
import Quiz from "@/lib/models/Quiz";

async function getQuizzes() {
	try {
		await mongoConnection();
		const res = await Quiz.find();
		return res;
	} catch (error) {
		console.log(error);
	}
}

export default getQuizzes;
