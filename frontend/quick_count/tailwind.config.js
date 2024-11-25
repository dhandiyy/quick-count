/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				"header": ["Inter", "sans-serif"],
				"sans": ["Open Sans", "sans-serif"]
			},
			colors: {
				"background": "#F5F5F5",
				"custom-white": "#FBFBFB",
				"outline": "#D7D6D6",
				"custom-black": "#222222",
				"main": "#14822B",
				"main2": "#ccfaeb",
				"main3": "#FF4545"
			}
		},
	},
	plugins: [],
}