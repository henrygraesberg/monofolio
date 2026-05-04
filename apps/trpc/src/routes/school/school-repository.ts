// 0001 | import { DBHandle } from "@henrygraesberg/portfolio-db";
// 0002 | import type { CreateSchool, School } from "./school-types";
// 0003 | 
// 0004 | export interface SchoolRepository {
// 0005 | 	findMany(handle: DBHandle): Promise<School[]>
// 0006 | 	create(handle: DBHandle, school: CreateSchool): Promise<School>
// 0007 | }
// 0008 | 
// 0009 | export const getSchoolRepository = (): SchoolRepository => {
// 0010 | 	return {
// 0011 | 		async findMany(handle) {
// 0012 | 			const schools = await handle.school.findMany({
// 0013 | 				orderBy: [{ schoolName: "asc" }],
// 0014 | 			})
// 0015 | 
// 0016 | 			return schools
// 0017 | 		},
// 0018 | 		async create(handle, school) {
// 0019 | 			const createdSchool = await handle.school.create({ data: school })
// 0020 | 
// 0021 | 			return createdSchool
// 0022 | 		}
// 0023 | 	}
// 0024 | }
