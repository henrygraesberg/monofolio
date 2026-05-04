// 0001 | import { DBHandle } from "@henrygraesberg/portfolio-db";
// 0002 | import { CreateSchool, School } from "./school-types";
// 0003 | import { SchoolRepository } from "./school-repository";
// 0004 | 
// 0005 | export interface SchoolService {
// 0006 | 	findMany(handle: DBHandle): Promise<School[]>
// 0007 | 	create(handle: DBHandle, school: CreateSchool): Promise<School>
// 0008 | }
// 0009 | 
// 0010 | export const getSchoolService = (schoolRepository: SchoolRepository): SchoolService => {
// 0011 | 	return {
// 0012 | 		async findMany(handle) {
// 0013 | 			return schoolRepository.findMany(handle)
// 0014 | 		},
// 0015 | 		async create(handle, school) {
// 0016 | 			return schoolRepository.create(handle, school)
// 0017 | 		}
// 0018 | 	}
// 0019 | }
