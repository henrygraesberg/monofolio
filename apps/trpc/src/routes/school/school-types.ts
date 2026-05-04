// 0001 | import { schemas } from "@henrygraesberg/portfolio-db/schemas"
// 0002 | import * as z from "zod"
// 0003 | 
// 0004 | export const SchoolSchema = schemas.SchoolSchema.extend({})
// 0005 | export const CreateSchoolSchema = SchoolSchema.omit({ id: true })
// 0006 | 
// 0007 | export type School = z.infer<typeof SchoolSchema>
// 0008 | export type CreateSchool = z.infer<typeof CreateSchoolSchema>
