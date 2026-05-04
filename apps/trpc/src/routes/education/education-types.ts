// 0001 | import { schemas } from "@henrygraesberg/portfolio-db/schemas"
// 0002 | import * as z from "zod"
// 0003 | 
// 0004 | export const SchoolSchema = schemas.SchoolSchema.extend({})
// 0005 | 
// 0006 | export const EducationSchema = schemas.EducationSchema.extend({
// 0007 | 	school: SchoolSchema
// 0008 | })
// 0009 | export const CreateEducationSchema = schemas.EducationSchema.omit({ id: true })
// 0010 | 
// 0011 | export type Education = z.infer<typeof EducationSchema>
// 0012 | export type CreateEducation = z.infer<typeof CreateEducationSchema>
