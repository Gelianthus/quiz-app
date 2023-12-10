import mongoose, { Schema } from "mongoose";

const submittedQuizSchema = new Schema({
	result: [Boolean],
	quiz: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Quiz",
	},
	submitted_by: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const SubmittedQuiz =
	mongoose.models.SubmittedQuiz ||
	mongoose.model("SubmittedQuiz", submittedQuizSchema, "submitted_quizzes");

export default SubmittedQuiz;
