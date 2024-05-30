/* eslint-disable @typescript-eslint/no-var-requires */
const { createGlobPatternsForDependencies } = require("@nx/react/tailwind");
const { join } = require("path");
import flowbite from "flowbite/plugin";
import headlessui from "@headlessui/tailwindcss";

import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/flowbite-react/lib/**/*.js",
		"./public/**/*.html",
		"./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
		join(
			__dirname,
			"{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}",
		),
		"./node_modules/flowbite-react/lib/**/*.js",
		"./public/**/*.html",
		"./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
		...createGlobPatternsForDependencies(__dirname),
	],
	theme: {
		extend: {
			colors: {
				gray: {
					400: "#393A36",
					500: "#1f201e",
				},
				blue: {
					100: "#7c98aa0d",
					200: "#bdd3db33",
					400: "#f2f6f8",
				},
				yellow: {
					100: "#F6C42F",
				},
				dark: {
					100: "#48576A",
					200: "#29323D",
					300: "#8492A6",
					400: "#393939",
					500: "#3C4858",
				},
				light: {
					100: "#E5E5E5",
					200: "#F9FAFC",
					300: "#EFF2F7",
					400: "#D3DCE6",
					500: "#DDDDDD",
				},
				purple: {
					100: "#544EC7",
				},
				orange: {
					100: "#EA561F",
				},
				red: {
					100: "#a6192e",
					200: "#b20000",
					300: "#b200001a",
					400: "#b2000033",
					500: "#b200000d",
				},
				green: {
					100: "#096231",
				},
				"client-primary": {
					200: "#BDD3DB4D",
				},
				ascend: "#6962F9",
				facebook: "#4267B2",
				twitter: "#1D9BF0",
				linkedin: "#0077B5",
				slate: {
					100: "#F1F5F9",
					200: "#E2E8F0",
					300: "#CBD5E1",
					400: "#94a3b8",
					500: "#64748b",
					600: "#334155",
					800: "#1E293B",
				},
				client: {
					100: "#39375B",
					150: "#333152",
					200: "#F2F3F6",
					300: "#096231",
					400: "#2E1F62",
					primary: "#235B7B",
					alt: "#2B87A1",
				},
				rating: {
					100: "#D4D4D4",
					"100/50": "#AAAAAA",
					200: "#FF822D",
					"200/50": "#FFC096",
					300: "#FFC81B",
					"300/50": "#FFE38D",
					400: "#A0C728",
					"400/50": "#CFE394",
					500: "#09BD39",
					"500/50": "#84DE9C",
				},
				"banner-info": "#235B7B",
				"banner-error": "#B20000",
				"banner-success": "#096231",
				main: "#48576A",
				header: "#29323D",
				accent: "#EFF2F7",
				"accent-200": "#F9FAFC",
				border: "#D3DCE6",
				sidenav: "#48576A",
			},
			height: {
				7.5: "1.875rem",
				15: "3.75rem",
				16.5: "4.125rem",
				22: "5.5rem",
				25: "5.375rem",
				31: "7.875rem",
				43: "10.875rem",
				54: "13.5rem",
				55: "13.875rem",
				57: "14.375",
				68: "17rem",
				72: "18rem",
				86: "21.375rem",
				128: "32rem",
				130: "40rem",
				626: "39.125rem",
				800: "50rem",
				900: "56.25rem",
				1000: "62.5rem",
				1200: "75rem",
				"bg-xs": "23.8675rem",
				"bg-sm": "27.845rem",
				"bg-lg": "31.823125rem",
				"bg-xl": "35.80125rem",
				"bg-2xl": "39.77875rem",
				"client-banner": "25vw",
				"13/20": "65%",
			},
			width: {
				38: "9.5rem",
				42: "10.5rem",
				50: "12.5rem",
				54: "13.5rem",
				62: "15.5rem",
				68: "17rem",
				78: "19.688rem",
				94: "23.5rem",
				97: "24.688rem",
				128: "32rem",
				350: "22rem",
				408: "25.5rem",
				664: "41.5rem",
				688: "43rem",
				822: "51.375rem",
				900: "56.25rem",
				1078: "67.375rem",
				1248: "78rem",
				"18/25": "72%",
			},
			ringWidth: {
				DEFAULT: "0.01rem",
			},
			screens: {
				// xs: "365px",
				// => @media (min-width: 365px) { ... }
				xs: "365px",
				sm: "640px",
				md: "768px",
				lg: "1024px",
				xl: "1280px",
				"2xl": "1536px",
				"3xl": "1920px",
				"4xl": "2500px",
			},
			translate: {
				5.5: "1.375rem",
				6.5: "1.625rem",
			},
			minWidth: {
				54: "13.5rem",
			},
			minHeight: {
				64: "16rem",
			},
			maxWidth: {
				17: "17rem",
				48: "12rem",
				54: "13.5rem",
				88: "22.438rem",
				137: "34.25rem",
				822: "51.375rem",
				1078: "67.375rem",
				"2.75xl": "46.375rem",
				"4.25xl": "58.25rem",
				"client-promo-xs": "21.438rem",
				"client-searchbar": "51.375rem",
				"client-info-content": "77rem",
				"client-menu": "23.438rem",
				"client-content": "53.625rem",
				"client-profile-content": "77rem",
				"client-profile-detail-content": "80rem",
				"mortgage-calculator": "75rem",
			},
			maxHeight: {
				88: "22rem",
				140: "35rem",
			},
			opacity: {
				85: "0.85",
			},
			backgroundImage: {
				"more-listings":
					"linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 90.86%);",
			},
			boxShadow: {
				"bottom-inset": "inset 0 0 0 1px #E5E5E5",
				"top-inset": "inset 0 1px 0 0 #EFF2F7",
			},
			outline: {
				"menu-item": ["1px solid black", "0px"],
			},
			backdropBlur: {
				xs: "2px",
			},
			dropShadow: {
				banner: "0 0 8px black",
			},
			zIndex: {
				60: "60",
				70: "70",
			},
			fontSize: {
				xxs: "0.594rem",
			},
			spacing: {
				1.5: "0.375rem",
			},
			borderRadius: {
				"2.5xl": "1.25rem",
			},
			borderWidth: {
				3: "3px",
			},
		},
	},
	plugins: [flowbite, headlessui],
};

export default config;
