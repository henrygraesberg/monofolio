// 0001 | import { DBHandle } from "@henrygraesberg/portfolio-db";
// 0002 | import { CreateEducation, Education } from "./education-types";
// 0003 | import { EducationRepository } from "./education-repository";
// 0004 | 
// 0005 | export interface EducationService {
// 0006 | 	findMany(handle: DBHandle): Promise<Education[]>
// 0007 | 	create(handle: DBHandle, education: CreateEducation): Promise<Education>
// 0008 | }
// 0009 | 
// 0010 | export const getEducationService = (educationRepository: EducationRepository): EducationService => {
// 0011 | 	return {
// 0012 | 		async findMany(handle) {
// 0013 | 			return educationRepository.findMany(handle)
// 0014 | 		},
// 0015 | 		async create(handle, education) {
// 0016 | 			return educationRepository.create(handle, education)
// 0017 | 		}
// 0018 | 	}
// 0019 | }
