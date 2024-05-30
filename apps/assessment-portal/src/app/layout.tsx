import { Flowbite, ThemeModeScript } from "flowbite-react";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import "@styles/globals.css";
import { flowbiteTheme } from "@styles/flowbit-theme";

const inter = Inter({ subsets: ["latin"] });

const theme = { theme: flowbiteTheme };
const RootLayout: React.FC<React.PropsWithChildren> = function ({ children }) {
	return (
		<html lang="en">
			<head>
				<ThemeModeScript />
			</head>
			<body
				className={twMerge(
					"bg-gray-50 dark:bg-gray-900",
					inter.className,
				)}
			>
				<Flowbite theme={theme}>{children}</Flowbite>
			</body>
		</html>
	);
};

export default RootLayout;
