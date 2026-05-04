// 0001 | import { DBHandle } from "@henrygraesberg/portfolio-db";
// 0002 | import { CreateEducation, Education } from "./education-types";
// 0003 | 
// 0004 | export interface EducationRepository {
// 0005 | 	findMany(handle: DBHandle): Promise<Education[]>
// 0006 | 	create(handle: DBHandle, education: CreateEducation): Promise<Education>
// 0007 | }
// 0008 | 
// 0009 | export const getEducationRepository = (): EducationRepository => {
// 0010 | 	return {
// 0011 | 		async findMany(handle) {
// 0012 | 			const education = await handle.education.findMany({
// 0013 | 				include: { school: true },
// 0014 | 				orderBy: [
// 0015 | 					{ endTime: "desc" },
// 0016 | 					{ startTime: "desc" }
// 0017 | 				]
// 0018 | 			})
// 0019 | 
// 0020 | 			return education
// 0021 | 		},
// 0022 | 		async create(handle, education) {
// 0023 | 			const createdEducation = await handle.education.create({
// 0024 | 				data: education,
// 0025 | 				include: { school: true },
// 0026 | 			})
// 0027 | 
// 0028 | 			return createdEducation
// 0029 | 		}
// 0030 | 	}
// 0031 | }
