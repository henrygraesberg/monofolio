// 0001 | import { createPrisma } from "../../../db/src"
// 0002 | import type { Configuration } from "../configuration"
// 0003 | import { getEducationRepository } from "./education/education-repository"
// 0004 | import { getEducationService } from "./education/education-service"
// 0005 | import { getEmployerRepository } from "./employer/employer-repository"
// 0006 | import { getEmployerService } from "./employer/employer-service"
// 0007 | import { getExperienceRepository } from "./experience/experience-repository"
// 0008 | import { getExperienceService } from "./experience/experience-service"
// 0009 | import { getProjectRepository } from "./project/project-repository"
// 0010 | import { getProjectService } from "./project/project-service"
// 0011 | import { getSchoolRepository } from "./school/school-repository"
// 0012 | import { getSchoolService } from "./school/school-service"
// 0013 | 
// 0014 | export type ServiceLayer = Awaited<ReturnType<typeof createServiceLayer>>
// 0015 | 
// 0016 | export function createThirdPartyClients(configuration: Configuration) {
// 0017 |   const prisma = createPrisma(configuration.DATABASE_URL)
// 0018 |   return { prisma }
// 0019 | }
// 0020 | 
// 0021 | export async function createServiceLayer(clients: ReturnType<typeof createThirdPartyClients>) {
// 0022 | 	const experienceRepository = getExperienceRepository()
// 0023 |   const projectRepository = getProjectRepository()
// 0024 |   const educationRepository = getEducationRepository()
// 0025 | 	const employerRepository = getEmployerRepository()
// 0026 | 	const schoolRepository = getSchoolRepository()
// 0027 | 	const experienceService = getExperienceService(experienceRepository)
// 0028 |   const projectService = getProjectService(projectRepository)
// 0029 |   const educationService = getEducationService(educationRepository)
// 0030 | 	const employerService = getEmployerService(employerRepository)
// 0031 | 	const schoolService = getSchoolService(schoolRepository)
// 0032 | 
// 0033 |   return {
// 0034 | 		experienceService,
// 0035 |     projectService,
// 0036 |     educationService,
// 0037 | 		employerService,
// 0038 | 		schoolService,
// 0039 |     executeTransaction: clients.prisma.$transaction.bind(clients.prisma),
// 0040 |     prisma: clients.prisma,
// 0041 |   }
// 0042 | }
