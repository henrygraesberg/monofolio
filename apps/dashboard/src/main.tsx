import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@mantine/core/styles.css"
import "@mantine/tiptap/styles.css"
import { AppProviders } from "./providers"
import { AppRouter } from "./router"
import "./styles.css"

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>
)
