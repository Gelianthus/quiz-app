function LoadingScreen() {
	return (
		<div className="my-8 flex flex-col items-center bg-gray-800 w-fit p-4 mx-auto rounded border-2 border-emerald-500">
			<p className="font-bold text-xl text-center mb-4">Loading data...</p>
			<span className="loader"></span>
		</div>
	);
}

export default LoadingScreen;
