// 0001 | import { DBHandle } from "@henrygraesberg/portfolio-db";
// 0002 | import { CreateProject, Project } from "./project-types";
// 0003 | import { ProjectRepository } from "./project-repository";
// 0004 | 
// 0005 | export interface ProjectService {
// 0006 | 	findMany(handle: DBHandle): Promise<Project[]>
// 0007 | 	create(handle: DBHandle, project: CreateProject): Promise<Project>
// 0008 | }
// 0009 | 
// 0010 | export const getProjectService = (projectRepository: ProjectRepository): ProjectService => {
// 0011 | 	return {
// 0012 | 		async findMany(handle) {
// 0013 | 			return projectRepository.findMany(handle)
// 0014 | 		},
// 0015 | 		async create(handle, project) {
// 0016 | 			return projectRepository.create(handle, project)
// 0017 | 		}
// 0018 | 	}
// 0019 | }
