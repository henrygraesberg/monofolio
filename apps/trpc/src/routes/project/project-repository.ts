import { DBHandle } from "@henrygraesberg/portfolio-db";
import { Project } from "./project-types";

export interface ProjectRepository {
	findMany(handle: DBHandle): Promise<Project[]>
}

export const getProjectRepository = (): ProjectRepository => {
	return {
		async findMany(handle) {
			const projects = await handle.project.findMany()

			return projects
		}
	}
}
