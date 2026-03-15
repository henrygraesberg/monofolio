import { DBHandle } from "../../../../db/src";
import { Experience } from "./experience-types";
import { ExperienceRepository } from "./experience-repository";

export interface ExperienceService {
	findMany(handle: DBHandle): Promise<Experience[]>
}

export const getExperienceService = (experienceRepository: ExperienceRepository): ExperienceService => {
	return {
		async findMany(handle) {
			return experienceRepository.findMany(handle)
		}
	}
}
