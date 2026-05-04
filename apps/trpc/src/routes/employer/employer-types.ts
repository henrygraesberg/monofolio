// 0001 | import { schemas } from "@henrygraesberg/portfolio-db/schemas"
// 0002 | import * as z from "zod"
// 0003 | 
// 0004 | export const EmployerSchema = schemas.EmployerSchema.extend({})
// 0005 | export const CreateEmployerSchema = EmployerSchema.omit({ id: true })
// 0006 | 
// 0007 | export type Employer = z.infer<typeof EmployerSchema>
// 0008 | export type CreateEmployer = z.infer<typeof CreateEmployerSchema>
