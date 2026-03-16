import { DBHandle } from "@henrygraesberg/portfolio-db";
import { CreateEducation, Education } from "./education-types";

export interface EducationRepository {
	findMany(handle: DBHandle): Promise<Education[]>
	create(handle: DBHandle, education: CreateEducation): Promise<Education>
}

export const getEducationRepository = (): EducationRepository => {
	return {
		async findMany(handle) {
			const education = await handle.education.findMany({
				include: { school: true },
				orderBy: [
					{ endTime: "desc" },
					{ startTime: "desc" }
				]
			})

			return education
		},
		async create(handle, education) {
			const createdEducation = await handle.education.create({
				data: education,
				include: { school: true },
			})

			return createdEducation
		}
	}
}
