import { Logo } from "@/components/Logo.tsx";
import LanguageSelect from "@/islands/LanguageSelect.tsx";
import ThemeToggle from "@/islands/ThemeToggle.tsx";
import { translations } from "@/utils/locales.ts";
import { define } from "@/utils/utils.ts";
import { Partial } from "fresh/runtime";

export default define.page(function App({ Component, ...ctx }) {
	const { locale } = ctx.state;
	const text = translations[locale];

	return (
		<html lang={locale}>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="stylesheet" href="/view-transitions.css" />
				<title>recettes</title>
			</head>

			<body
				f-client-nav
				f-view-transition
				class="min-w-[320px] bg-white font-sans text-gray-800 transition-colors duration-300 dark:bg-gray-950 dark:text-gray-50 flex min-h-screen flex-col px-[5vw] py-7 max-[600px]:px-5 max-[600px]:py-5.5"
			>
				<header class="flex w-full items-center justify-between">
					<Logo locale={locale} />
					<div class="flex items-center gap-2">
						<ThemeToggle />
						<LanguageSelect locale={locale} />
					</div>
				</header>

				<Partial name="body">
					<Component />
				</Partial>

				<footer class="flex items-center justify-between text-[.7rem] text-gray-500 dark:text-gray-400 max-[600px]:flex-wrap max-[600px]:items-start max-[600px]:gap-3.5">
					<p class="m-0">{text.everydayCooking}</p>
					<div class="flex gap-6 max-[600px]:gap-3.5">
						<a
							class="hover:text-gray-800 dark:hover:text-gray-50"
							href="/search"
						>
							{text.recipes}
						</a>
						<a
							class="hover:text-gray-800 dark:hover:text-gray-50"
							href="/providers"
						>
							{text.providers}
						</a>
					</div>
				</footer>
			</body>
		</html>
	);
});
