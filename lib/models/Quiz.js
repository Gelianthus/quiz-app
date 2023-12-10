import mongoose, { Schema } from "mongoose";

const quizSchema = new Schema({
	title: String,
	about_quiz: String,
	questions: [
		{
			question: String,
			options: [String],
			answer: String,
		},
	],
	thumbnail_img: {
		img_src: String,
		img_alt: String,
	},
});

const Quiz =
	mongoose.models.Quiz || mongoose.model("Quiz", quizSchema, "quizzes");

export default Quiz;
