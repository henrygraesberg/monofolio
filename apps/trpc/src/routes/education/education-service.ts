import { DBHandle } from "@henrygraesberg/portfolio-db";
import { CreateEducation, Education } from "./education-types";
import { EducationRepository } from "./education-repository";

export interface EducationService {
	findMany(handle: DBHandle): Promise<Education[]>
	create(handle: DBHandle, education: CreateEducation): Promise<Education>
}

export const getEducationService = (educationRepository: EducationRepository): EducationService => {
	return {
		async findMany(handle) {
			return educationRepository.findMany(handle)
		},
		async create(handle, education) {
			return educationRepository.create(handle, education)
		}
	}
}
