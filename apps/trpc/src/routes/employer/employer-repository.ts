// 0001 | import { DBHandle } from "@henrygraesberg/portfolio-db";
// 0002 | import type { CreateEmployer, Employer } from "./employer-types";
// 0003 | 
// 0004 | export interface EmployerRepository {
// 0005 | 	findMany(handle: DBHandle): Promise<Employer[]>
// 0006 | 	create(handle: DBHandle, employer: CreateEmployer): Promise<Employer>
// 0007 | }
// 0008 | 
// 0009 | export const getEmployerRepository = (): EmployerRepository => {
// 0010 | 	return {
// 0011 | 		async findMany(handle) {
// 0012 | 			const employers = await handle.employer.findMany({
// 0013 | 				orderBy: [{ name: "asc" }],
// 0014 | 			})
// 0015 | 
// 0016 | 			return employers
// 0017 | 		},
// 0018 | 		async create(handle, employer) {
// 0019 | 			const createdEmployer = await handle.employer.create({ data: employer })
// 0020 | 
// 0021 | 			return createdEmployer
// 0022 | 		}
// 0023 | 	}
// 0024 | }
