import Image from "next/image";
import Link from "next/link";

function QuizCard({ _id, title, thumbnail_img }) {
	const stringified_id = _id.toString();
	return (
		<>
			<Link
				className="p-2 bg-gray-900 rounded active:text-emerald-500 border border-gray-400 hover:border-emerald-500 active:border-emerald-600"
				href={{ pathname: "quiz", query: { id: stringified_id } }}
				title={title}
			>
				{thumbnail_img.img_src ? (
					<Image
						src={thumbnail_img.img_src}
						alt={thumbnail_img.img_alt}
						height={200}
						width={200}
						className="mx-auto"
						style={{
							width: "100%",
							aspectRatio: "1 / 1",
							objectFit: "cover",
							objectPosition: "center",
						}}
					/>
				) : (
					<Image
						src={"/sunflower.jpg"}
						alt={"sunflower"}
						height={200}
						width={200}
						className="mx-auto"
						style={{
							width: "100%",
							aspectRatio: "1 / 1",
							objectFit: "cover",
							objectPosition: "center",
						}}
					/>
				)}

				<p className="text-center text-sm mt-2 p-2 font-bold">
					{title ? title : "Loading..."}
				</p>
			</Link>
		</>
	);
}

export default QuizCard;
