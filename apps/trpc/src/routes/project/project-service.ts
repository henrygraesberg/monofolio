import { DBHandle } from "@henrygraesberg/portfolio-db";
import { CreateProject, Project } from "./project-types";
import { ProjectRepository } from "./project-repository";

export interface ProjectService {
	findMany(handle: DBHandle): Promise<Project[]>
	create(handle: DBHandle, project: CreateProject): Promise<Project>
}

export const getProjectService = (projectRepository: ProjectRepository): ProjectService => {
	return {
		async findMany(handle) {
			return projectRepository.findMany(handle)
		},
		async create(handle, project) {
			return projectRepository.create(handle, project)
		}
	}
}
