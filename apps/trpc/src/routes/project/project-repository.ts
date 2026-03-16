import { DBHandle } from "@henrygraesberg/portfolio-db";
import type { Project, CreateProject } from "./project-types";

export interface ProjectRepository {
	findMany(handle: DBHandle): Promise<Project[]>
	create(handle: DBHandle, project: CreateProject): Promise<Project>
}

export const getProjectRepository = (): ProjectRepository => {
	return {
		async findMany(handle) {
			const projects = await handle.project.findMany()

			return projects
		},
		async create(handle, project) {
			const createdProject = handle.project.create({ data: project })

			return createdProject
		}
	}
}
