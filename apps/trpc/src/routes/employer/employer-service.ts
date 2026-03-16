import { DBHandle } from "@henrygraesberg/portfolio-db";
import { CreateEmployer, Employer } from "./employer-types";
import { EmployerRepository } from "./employer-repository";

export interface EmployerService {
	findMany(handle: DBHandle): Promise<Employer[]>
	create(handle: DBHandle, employer: CreateEmployer): Promise<Employer>
}

export const getEmployerService = (employerRepository: EmployerRepository): EmployerService => {
	return {
		async findMany(handle) {
			return employerRepository.findMany(handle)
		},
		async create(handle, employer) {
			return employerRepository.create(handle, employer)
		}
	}
}
