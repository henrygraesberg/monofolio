import { DBHandle } from "@henrygraesberg/portfolio-db";
import { CreateExperience, Experience } from "./experience-types";

export interface ExperienceRepository {
	findMany(handle: DBHandle): Promise<Experience[]>
	create(handle: DBHandle, experience: CreateExperience): Promise<Experience>
}

export const getExperienceRepository = (): ExperienceRepository => {
	return {
		async findMany(handle) {
			const experience = await handle.experience.findMany({
				include: { employer: true },
				orderBy: [
					{ endTime: "desc" },
					{ employerId: "asc" },
					{ startTime: "desc" }
				]
			})

			return experience
		},
		async create(handle, experience) {
			const createdExperience = await handle.experience.create({
				data: experience,
				include: { employer: true },
			})

			return createdExperience
		}
	}
}
