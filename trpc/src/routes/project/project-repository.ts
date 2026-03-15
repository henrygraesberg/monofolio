import { DBHandle } from "@henrygraesberg/portfolio-db";
import { Experience } from "./experience-types";

export interface ExperienceRepository {
	findMany(handle: DBHandle): Promise<Experience[]>
}

export const getExperienceRepository = (): ExperienceRepository => {
	return {
		async findMany(handle) {
			const experience = await handle.experience.findMany()

			return experience
		}
	}
}
