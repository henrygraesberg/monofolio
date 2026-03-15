import { DBHandle } from "@henrygraesberg/portfolio-db";
import { Education } from "./education-types";
import { EducationRepository } from "./education-repository";

export interface EducationService {
	findMany(handle: DBHandle): Promise<Education[]>
}

export const getEducationService = (educationRepository: EducationRepository): EducationService => {
	return {
		async findMany(handle) {
			return educationRepository.findMany(handle)
		}
	}
}
