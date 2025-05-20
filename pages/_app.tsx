import type { AppProps } from "next/app"
import { ThemeProvider } from "@/components/theme-provider"
import { SidebarProvider } from "@/contexts/sidebar-context"
import "@/styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </ThemeProvider>
  )
}
