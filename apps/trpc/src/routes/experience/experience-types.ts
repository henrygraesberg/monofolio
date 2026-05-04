// 0001 | import { schemas } from "@henrygraesberg/portfolio-db/schemas"
// 0002 | import { EmployerSchema } from "../employer/employer-types"
// 0003 | import * as z from "zod"
// 0004 | 
// 0005 | export const ExperienceSchema = schemas.ExperienceSchema.extend({
// 0006 | 	employer: EmployerSchema
// 0007 | })
// 0008 | export const CreateExperienceSchema = schemas.ExperienceSchema.omit({ id: true })
// 0009 | 
// 0010 | export type Experience = z.infer<typeof ExperienceSchema>
// 0011 | export type CreateExperience = z.infer<typeof CreateExperienceSchema>
