import "@/styles/globals.css";
import { NavBar, Footer } from "../components/index";
import { CrowdFundingProvider } from "../context/CrowdFunding";

export default function App({ Component, pageProps }) {
	return (
		<>
			<CrowdFundingProvider>
				<NavBar />
				<Component {...pageProps} />
				<Footer />
			</CrowdFundingProvider>
		</>
	);
}
