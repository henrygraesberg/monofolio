// 0001 | import { DBHandle } from "@henrygraesberg/portfolio-db";
// 0002 | import type { Project, CreateProject } from "./project-types";
// 0003 | 
// 0004 | export interface ProjectRepository {
// 0005 | 	findMany(handle: DBHandle): Promise<Project[]>
// 0006 | 	create(handle: DBHandle, project: CreateProject): Promise<Project>
// 0007 | }
// 0008 | 
// 0009 | export const getProjectRepository = (): ProjectRepository => {
// 0010 | 	return {
// 0011 | 		async findMany(handle) {
// 0012 | 			const projects = await handle.project.findMany()
// 0013 | 
// 0014 | 			return projects
// 0015 | 		},
// 0016 | 		async create(handle, project) {
// 0017 | 			const createdProject = handle.project.create({ data: project })
// 0018 | 
// 0019 | 			return createdProject
// 0020 | 		}
// 0021 | 	}
// 0022 | }
