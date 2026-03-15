import { createPrisma } from "@henrygraesberg/portfolio-db"
import type { Configuration } from "../configuration"
import { getExperienceRepository } from "./experience/experience-repository"
import { getExperienceService } from "./experience/experience-service"

export type ServiceLayer = Awaited<ReturnType<typeof createServiceLayer>>

export function createThirdPartyClients(configuration: Configuration) {
  const prisma = createPrisma(configuration.DATABASE_URL)
  return { prisma }
}

export async function createServiceLayer(clients: ReturnType<typeof createThirdPartyClients>) {
	const experienceRepository = getExperienceRepository()
	const ExperienceService = getExperienceService(experienceRepository)

  return {
		ExperienceService,
    executeTransaction: clients.prisma.$transaction.bind(clients.prisma),
    prisma: clients.prisma,
  }
}
