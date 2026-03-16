import { Auth0Provider } from "@auth0/auth0-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import type { PropsWithChildren } from "react"
import { env } from "@/lib/env"

const queryClient = new QueryClient()

export const AppProviders = ({ children }: PropsWithChildren) => (
  <Auth0Provider
    domain={env.auth0Domain}
    clientId={env.auth0ClientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: env.auth0Audience,
      scope: "openid profile email",
    }}
    cacheLocation="localstorage"
  >
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </Auth0Provider>
)
