"use client";

import { useState } from "react";
import {
	BiSolidChevronUpSquare,
	BiSolidChevronDownSquare,
} from "react-icons/bi";

function Result({ quiz, result }) {
	const [expanded, setExpanded] = useState(false);

	if (expanded) {
		return (
			<>
				<button
					className="bg-gray-700 rounded text-2xl block hover:text-emerald-500 active:text-emerald-600"
					onClick={() => setExpanded(false)}
				>
					<BiSolidChevronUpSquare />
				</button>
				<ul>
					{quiz.questions.map((question, index) => {
						return (
							<li
								key={index}
								className={`p-2 my-2 ${
									result[index] ? "bg-emerald-500" : "bg-rose-500"
								}`}
							>
								{question.question}
							</li>
						);
					})}
				</ul>
			</>
		);
	} else {
		return (
			<button
				className="bg-gray-700 rounded text-2xl block hover:text-emerald-500 active:text-emerald-600"
				onClick={() => setExpanded(true)}
			>
				<BiSolidChevronDownSquare />
			</button>
		);
	}
}

export default Result;
