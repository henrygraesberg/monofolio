// 0001 | import { DBHandle } from "@henrygraesberg/portfolio-db";
// 0002 | import { CreateExperience, Experience } from "./experience-types";
// 0003 | import { ExperienceRepository } from "./experience-repository";
// 0004 | 
// 0005 | export interface ExperienceService {
// 0006 | 	findMany(handle: DBHandle): Promise<Experience[]>
// 0007 | 	create(handle: DBHandle, experience: CreateExperience): Promise<Experience>
// 0008 | }
// 0009 | 
// 0010 | export const getExperienceService = (experienceRepository: ExperienceRepository): ExperienceService => {
// 0011 | 	return {
// 0012 | 		async findMany(handle) {
// 0013 | 			return experienceRepository.findMany(handle)
// 0014 | 		},
// 0015 | 		async create(handle, experience) {
// 0016 | 			return experienceRepository.create(handle, experience)
// 0017 | 		}
// 0018 | 	}
// 0019 | }
