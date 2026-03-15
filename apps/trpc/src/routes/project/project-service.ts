import { DBHandle } from "@henrygraesberg/portfolio-db";
import { Project } from "./project-types";
import { ProjectRepository } from "./project-repository";

export interface ProjectService {
	findMany(handle: DBHandle): Promise<Project[]>
}

export const getProjectService = (projectRepository: ProjectRepository): ProjectService => {
	return {
		async findMany(handle) {
			return projectRepository.findMany(handle)
		}
	}
}
