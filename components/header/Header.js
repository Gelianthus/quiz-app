"use client";

import Link from "next/link";
import SignIn from "./SignIn";
import AccountMenu from "./AccountMenu";
import { useSession } from "next-auth/react";
import { Dela_Gothic_One } from "next/font/google";

const dela_gothic_one = Dela_Gothic_One({
	subsets: ["latin"],
	weight: ["400"],
});

function Header() {
	const { data: session } = useSession();

	return (
		<header className="p-3 flex flex-row justify-between items-center gap-2 bg-gray-900 text-neutral-200 sticky top-0">
			<Link
				title="Home Page"
				href="/"
				className={`${dela_gothic_one.className} font-bold text-emerald-500 text-xl hover:bg-gray-700`}
			>
				10Q
			</Link>
			{session ? <AccountMenu /> : <SignIn />}
		</header>
	);
}

export default Header;
