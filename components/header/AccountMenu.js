"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";

function AccountMenu() {
	const { data: session } = useSession();
	const router = useRouter();
	const [accMenuVisible, setAccMenuVisible] = useState(false);

	const viewProfileHandle = () => {
		router.push("/profile");
		setAccMenuVisible(false);
	};
	const signoutHandle = () => {
		signOut();
		setAccMenuVisible(false);
	};
	const accMenuButton = (e) => {
		setAccMenuVisible((prevState) => !prevState);
	};

	const accMenuRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!accMenuRef.current.contains(event.target)) {
				setAccMenuVisible(false);
			}
		};
		if (accMenuVisible) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [accMenuVisible]);

	return (
		<>
			<div
				className="relative z-50"
				ref={accMenuRef}
			>
				<button
					className="block"
					onClick={accMenuButton}
				>
					<Image
						src={session.user.image}
						alt="sunflower"
						height={40}
						width={40}
						className="rounded-full block border-2 border-gray-900 active:border-sky-600"
					/>
				</button>
				<div
					className={`${
						accMenuVisible ? "block" : "hidden"
					} absolute right-0 p-3 rounded border border-gray-950 bg-gray-800 mt-4 w-32 z-20`}
				>
					<button
						onClick={viewProfileHandle}
						className="p-2 bg-gray-900 text-neutral-200 text-sm rounded block w-full mb-2 hover:bg-sky-500 active:bg-sky-600"
					>
						Profile
						<span className="material-symbols-outlined size-20 wght-400 align-bottom ml-1">
							account_circle
						</span>
					</button>
					<button
						onClick={signoutHandle}
						className="p-2 bg-gray-900 text-neutral-200 text-sm rounded block w-full hover:bg-rose-500 active:bg-rose-600"
					>
						Sign Out
						<span className="material-symbols-outlined size-20 wght-400 align-bottom ml-1">
							logout
						</span>
					</button>
				</div>
			</div>
		</>
	);
}

export default AccountMenu;
