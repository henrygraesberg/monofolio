import { DBHandle } from "@henrygraesberg/portfolio-db";
import { CreateExperience, Experience } from "./experience-types";
import { ExperienceRepository } from "./experience-repository";

export interface ExperienceService {
	findMany(handle: DBHandle): Promise<Experience[]>
	create(handle: DBHandle, experience: CreateExperience): Promise<Experience>
}

export const getExperienceService = (experienceRepository: ExperienceRepository): ExperienceService => {
	return {
		async findMany(handle) {
			return experienceRepository.findMany(handle)
		},
		async create(handle, experience) {
			return experienceRepository.create(handle, experience)
		}
	}
}
