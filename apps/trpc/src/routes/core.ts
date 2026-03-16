import { createPrisma } from "../../../db/src"
import type { Configuration } from "../configuration"
import { getEducationRepository } from "./education/education-repository"
import { getEducationService } from "./education/education-service"
import { getEmployerRepository } from "./employer/employer-repository"
import { getEmployerService } from "./employer/employer-service"
import { getExperienceRepository } from "./experience/experience-repository"
import { getExperienceService } from "./experience/experience-service"
import { getProjectRepository } from "./project/project-repository"
import { getProjectService } from "./project/project-service"
import { getSchoolRepository } from "./school/school-repository"
import { getSchoolService } from "./school/school-service"

export type ServiceLayer = Awaited<ReturnType<typeof createServiceLayer>>

export function createThirdPartyClients(configuration: Configuration) {
  const prisma = createPrisma(configuration.DATABASE_URL)
  return { prisma }
}

export async function createServiceLayer(clients: ReturnType<typeof createThirdPartyClients>) {
	const experienceRepository = getExperienceRepository()
  const projectRepository = getProjectRepository()
  const educationRepository = getEducationRepository()
	const employerRepository = getEmployerRepository()
	const schoolRepository = getSchoolRepository()
	const experienceService = getExperienceService(experienceRepository)
  const projectService = getProjectService(projectRepository)
  const educationService = getEducationService(educationRepository)
	const employerService = getEmployerService(employerRepository)
	const schoolService = getSchoolService(schoolRepository)

  return {
		experienceService,
    projectService,
    educationService,
		employerService,
		schoolService,
    executeTransaction: clients.prisma.$transaction.bind(clients.prisma),
    prisma: clients.prisma,
  }
}
