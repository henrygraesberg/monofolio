// 0001 | import { DBHandle } from "@henrygraesberg/portfolio-db";
// 0002 | import { CreateExperience, Experience } from "./experience-types";
// 0003 | 
// 0004 | export interface ExperienceRepository {
// 0005 | 	findMany(handle: DBHandle): Promise<Experience[]>
// 0006 | 	create(handle: DBHandle, experience: CreateExperience): Promise<Experience>
// 0007 | }
// 0008 | 
// 0009 | export const getExperienceRepository = (): ExperienceRepository => {
// 0010 | 	return {
// 0011 | 		async findMany(handle) {
// 0012 | 			const experience = await handle.experience.findMany({
// 0013 | 				include: { employer: true },
// 0014 | 				orderBy: [
// 0015 | 					{ endTime: "desc" },
// 0016 | 					{ employerId: "asc" },
// 0017 | 					{ startTime: "desc" }
// 0018 | 				]
// 0019 | 			})
// 0020 | 
// 0021 | 			return experience
// 0022 | 		},
// 0023 | 		async create(handle, experience) {
// 0024 | 			const createdExperience = await handle.experience.create({
// 0025 | 				data: experience,
// 0026 | 				include: { employer: true },
// 0027 | 			})
// 0028 | 
// 0029 | 			return createdExperience
// 0030 | 		}
// 0031 | 	}
// 0032 | }
