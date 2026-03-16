import { DBHandle } from "@henrygraesberg/portfolio-db";
import type { CreateEmployer, Employer } from "./employer-types";

export interface EmployerRepository {
	findMany(handle: DBHandle): Promise<Employer[]>
	create(handle: DBHandle, employer: CreateEmployer): Promise<Employer>
}

export const getEmployerRepository = (): EmployerRepository => {
	return {
		async findMany(handle) {
			const employers = await handle.employer.findMany({
				orderBy: [{ name: "asc" }],
			})

			return employers
		},
		async create(handle, employer) {
			const createdEmployer = await handle.employer.create({ data: employer })

			return createdEmployer
		}
	}
}
