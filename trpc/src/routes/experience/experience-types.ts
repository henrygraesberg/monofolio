import { schemas } from "@henrygraesberg/portfolio-db/schemas"
import * as z from "zod"

export const ExperienceSchema = schemas.ExperienceSchema.extend({})

export type Experience = z.infer<typeof ExperienceSchema>
