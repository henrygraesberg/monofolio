import { schemas } from "@henrygraesberg/portfolio-db/schemas"
import * as z from "zod"

export const EmployerSchema = schemas.EmployerSchema.extend({})
export const CreateEmployerSchema = EmployerSchema.omit({ id: true })

export type Employer = z.infer<typeof EmployerSchema>
export type CreateEmployer = z.infer<typeof CreateEmployerSchema>
