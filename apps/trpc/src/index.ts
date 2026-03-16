import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from './app-router';
import { createConfiguration } from './configuration';
import { createServiceLayer, createThirdPartyClients } from './routes/core';
import { createTrpcContext } from './trpc';

const parseAllowedOrigins = (raw: string | undefined) =>
  (raw ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0)

const resolveAllowedOrigin = (requestOrigin: string | null, configuredOrigins: string[]) => {
  if (configuredOrigins.includes("*")) {
    return "*"
  }

  if (!requestOrigin) {
    return null
  }

  if (configuredOrigins.length === 0) {
    return requestOrigin
  }

  if (configuredOrigins.includes(requestOrigin)) {
    return requestOrigin
  }

  return null
}

const appendCorsHeaders = (headers: Headers, allowedOrigin: string | null) => {
  if (!allowedOrigin) {
    return
  }

  headers.set("Access-Control-Allow-Origin", allowedOrigin)
  headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
  headers.set("Access-Control-Allow-Headers", "Authorization,Content-Type,trpc-batch-mode,x-trpc-source")
  headers.set("Access-Control-Max-Age", "86400")
  headers.set("Vary", "Origin")
}

export default {
  async fetch(
    request: Request,
    env: {
      ALLOWED_ORIGINS?: string
      DATABASE_URL?: string
      AUTH0_ISSUER_BASE_URL?: string
      AUTH0_AUDIENCE?: string
      AUTH0_ADMIN_SUBJECTS?: string
    }
  ): Promise<Response> {
    const configuration = createConfiguration(env);
    const configuredOrigins = parseAllowedOrigins(configuration.ALLOWED_ORIGINS);
    const allowedOrigin = resolveAllowedOrigin(request.headers.get("origin"), configuredOrigins);

    if (request.method === "OPTIONS") {
      const headers = new Headers()
      appendCorsHeaders(headers, allowedOrigin)
      return new Response(null, { status: 204, headers })
    }

    const clients = createThirdPartyClients(configuration);
    const serviceLayer = await createServiceLayer(clients);

    const response = await fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      createContext: (opts) => createTrpcContext(opts, serviceLayer, configuration),
    });

    const headers = new Headers(response.headers)
    appendCorsHeaders(headers, allowedOrigin)

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    })
  },
};
