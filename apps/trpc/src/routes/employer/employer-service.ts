// 0001 | import { DBHandle } from "@henrygraesberg/portfolio-db";
// 0002 | import { CreateEmployer, Employer } from "./employer-types";
// 0003 | import { EmployerRepository } from "./employer-repository";
// 0004 | 
// 0005 | export interface EmployerService {
// 0006 | 	findMany(handle: DBHandle): Promise<Employer[]>
// 0007 | 	create(handle: DBHandle, employer: CreateEmployer): Promise<Employer>
// 0008 | }
// 0009 | 
// 0010 | export const getEmployerService = (employerRepository: EmployerRepository): EmployerService => {
// 0011 | 	return {
// 0012 | 		async findMany(handle) {
// 0013 | 			return employerRepository.findMany(handle)
// 0014 | 		},
// 0015 | 		async create(handle, employer) {
// 0016 | 			return employerRepository.create(handle, employer)
// 0017 | 		}
// 0018 | 	}
// 0019 | }
