// 0001 | import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
// 0002 | import { appRouter } from './app-router';
// 0003 | import { createConfiguration } from './configuration';
// 0004 | import { createServiceLayer, createThirdPartyClients } from './routes/core';
// 0005 | import { createTrpcContext } from './trpc';
// 0006 | 
// 0007 | const parseAllowedOrigins = (raw: string | undefined) =>
// 0008 |   (raw ?? "")
// 0009 |     .split(",")
// 0010 |     .map((origin) => origin.trim())
// 0011 |     .filter((origin) => origin.length > 0)
// 0012 | 
// 0013 | const resolveAllowedOrigin = (requestOrigin: string | null, configuredOrigins: string[]) => {
// 0014 |   if (configuredOrigins.includes("*")) {
// 0015 |     return "*"
// 0016 |   }
// 0017 | 
// 0018 |   if (!requestOrigin) {
// 0019 |     return null
// 0020 |   }
// 0021 | 
// 0022 |   if (configuredOrigins.length === 0) {
// 0023 |     return requestOrigin
// 0024 |   }
// 0025 | 
// 0026 |   if (configuredOrigins.includes(requestOrigin)) {
// 0027 |     return requestOrigin
// 0028 |   }
// 0029 | 
// 0030 |   return null
// 0031 | }
// 0032 | 
// 0033 | const appendCorsHeaders = (headers: Headers, allowedOrigin: string | null) => {
// 0034 |   if (!allowedOrigin) {
// 0035 |     return
// 0036 |   }
// 0037 | 
// 0038 |   headers.set("Access-Control-Allow-Origin", allowedOrigin)
// 0039 |   headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
// 0040 |   headers.set("Access-Control-Allow-Headers", "Authorization,Content-Type,trpc-batch-mode,x-trpc-source")
// 0041 |   headers.set("Access-Control-Max-Age", "86400")
// 0042 |   headers.set("Vary", "Origin")
// 0043 | }
// 0044 | 
// 0045 | export default {
// 0046 |   async fetch(
// 0047 |     request: Request,
// 0048 |     env: {
// 0049 |       ALLOWED_ORIGINS?: string
// 0050 |       DATABASE_URL?: string
// 0051 |       AUTH0_ISSUER_BASE_URL?: string
// 0052 |       AUTH0_AUDIENCE?: string
// 0053 |       AUTH0_ADMIN_SUBJECTS?: string
// 0054 |     }
// 0055 |   ): Promise<Response> {
// 0056 |     const configuration = createConfiguration(env);
// 0057 |     const configuredOrigins = parseAllowedOrigins(configuration.ALLOWED_ORIGINS);
// 0058 |     const allowedOrigin = resolveAllowedOrigin(request.headers.get("origin"), configuredOrigins);
// 0059 | 
// 0060 |     if (request.method === "OPTIONS") {
// 0061 |       const headers = new Headers()
// 0062 |       appendCorsHeaders(headers, allowedOrigin)
// 0063 |       return new Response(null, { status: 204, headers })
// 0064 |     }
// 0065 | 
// 0066 |     const clients = createThirdPartyClients(configuration);
// 0067 |     const serviceLayer = await createServiceLayer(clients);
// 0068 | 
// 0069 |     const response = await fetchRequestHandler({
// 0070 |       endpoint: '/trpc',
// 0071 |       req: request,
// 0072 |       router: appRouter,
// 0073 |       createContext: (opts) => createTrpcContext(opts, serviceLayer, configuration),
// 0074 |     });
// 0075 | 
// 0076 |     const headers = new Headers(response.headers)
// 0077 |     appendCorsHeaders(headers, allowedOrigin)
// 0078 | 
// 0079 |     return new Response(response.body, {
// 0080 |       status: response.status,
// 0081 |       statusText: response.statusText,
// 0082 |       headers,
// 0083 |     })
// 0084 |   },
// 0085 | };
