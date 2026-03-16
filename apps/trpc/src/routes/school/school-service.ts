import { DBHandle } from "@henrygraesberg/portfolio-db";
import { CreateSchool, School } from "./school-types";
import { SchoolRepository } from "./school-repository";

export interface SchoolService {
	findMany(handle: DBHandle): Promise<School[]>
	create(handle: DBHandle, school: CreateSchool): Promise<School>
}

export const getSchoolService = (schoolRepository: SchoolRepository): SchoolService => {
	return {
		async findMany(handle) {
			return schoolRepository.findMany(handle)
		},
		async create(handle, school) {
			return schoolRepository.create(handle, school)
		}
	}
}
