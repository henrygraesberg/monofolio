import { DBHandle } from "@henrygraesberg/portfolio-db";
import { Education } from "./education-types";

export interface EducationRepository {
	findMany(handle: DBHandle): Promise<Education[]>
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
		}
	}
}
