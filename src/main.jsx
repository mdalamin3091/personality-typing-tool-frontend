import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from 'react-hot-toast';
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider>
				<Toaster 
					position="top-center"
					reverseOrder={false} 
					toastOptions={{
						duration:2000
					}}
					/>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);
