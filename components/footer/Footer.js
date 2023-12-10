import Link from "next/link";
import {
	AiFillTwitterSquare,
	AiFillFacebook,
	AiFillGithub,
} from "react-icons/ai";

function Footer() {
	return (
		<footer className="p-3 bg-gray-950 text-neutral-200">
			<nav className="flex flex-row gap-2 p-2 justify-between items-center">
				<div className="flex flex-col gap-2 text-xs sm:flex-row sm:text-sm sm:gap-4 sm:items-center">
					<Link
						className="hover:text-emerald-500 active:text-emerald-600"
						href={"/privacy"}
					>
						Privacy
					</Link>
					<Link
						className="hover:text-emerald-500 active:text-emerald-600"
						href={"/terms-of-use"}
					>
						Terms of Use
					</Link>
					<Link
						className="hover:text-emerald-500 active:text-emerald-600"
						href={"/about"}
					>
						About
					</Link>
				</div>
				<div className="flex flex-col sm:flex-row items-center sm:gap-4">
					<h2 className="text-xs sm:text-sm">Contacts:</h2>
					<ul className="flex flex-row gap-2 text-xl sm:text-2xl sm:my-0 my-2">
						<li>
							<Link
								className="hover:text-sky-600 active:text-sky-700 "
								prefetch={false}
								href={"/https://github.com/Gelianthus"}
								title="Github profile"
							>
								<AiFillGithub />
							</Link>
						</li>
						<li>
							<Link
								className="hover:text-sky-600 active:text-sky-700"
								prefetch={false}
								href={"https://twitter.com/gelianthus"}
								title="Twitter profile"
							>
								<AiFillTwitterSquare />
							</Link>
						</li>
						<li>
							<Link
								className="hover:text-sky-600 active:text-sky-700"
								prefetch={false}
								href={"https://www.facebook.com/profile.php?id=61550232111521"}
								title="Facebook profile"
							>
								<AiFillFacebook />
							</Link>
						</li>
					</ul>
				</div>
			</nav>
		</footer>
	);
}

export default Footer;
