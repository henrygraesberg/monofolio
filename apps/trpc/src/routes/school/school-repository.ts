import { DBHandle } from "@henrygraesberg/portfolio-db";
import type { CreateSchool, School } from "./school-types";

export interface SchoolRepository {
	findMany(handle: DBHandle): Promise<School[]>
	create(handle: DBHandle, school: CreateSchool): Promise<School>
}

export const getSchoolRepository = (): SchoolRepository => {
	return {
		async findMany(handle) {
			const schools = await handle.school.findMany({
				orderBy: [{ schoolName: "asc" }],
			})

			return schools
		},
		async create(handle, school) {
			const createdSchool = await handle.school.create({ data: school })

			return createdSchool
		}
	}
}
