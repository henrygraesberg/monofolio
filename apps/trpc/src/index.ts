import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from './app-router';
import { createConfiguration } from './configuration';
import { createServiceLayer, createThirdPartyClients } from './routes/core';
import { createTrpcContext } from './trpc';

export default {
  async fetch(request: Request, env: { ALLOWED_ORIGINS?: string; DATABASE_URL?: string }): Promise<Response> {
    const configuration = createConfiguration(env);
    const clients = createThirdPartyClients(configuration);
    const serviceLayer = await createServiceLayer(clients);

    return fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      createContext: (opts) => createTrpcContext(opts, serviceLayer),
    });
  },
};
