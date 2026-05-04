// 0001 | import { Auth0Provider } from "@auth0/auth0-react"
// 0002 | import { MantineProvider } from "@mantine/core"
// 0003 | import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// 0004 | import type { PropsWithChildren } from "react"
// 0005 | import { env } from "@/lib/env"
// 0006 | 
// 0007 | const queryClient = new QueryClient()
// 0008 | 
// 0009 | export const AppProviders = ({ children }: PropsWithChildren) => (
// 0010 |   <Auth0Provider
// 0011 |     domain={env.auth0Domain}
// 0012 |     clientId={env.auth0ClientId}
// 0013 |     authorizationParams={{
// 0014 |       redirect_uri: window.location.origin,
// 0015 |       audience: env.auth0Audience,
// 0016 |       scope: "openid profile email",
// 0017 |     }}
// 0018 |     cacheLocation="localstorage"
// 0019 |   >
// 0020 |     <MantineProvider>
// 0021 |       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
// 0022 |     </MantineProvider>
// 0023 |   </Auth0Provider>
// 0024 | )
