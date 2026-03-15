import { schemas } from "../../../../db/src/schemas"
import * as z from "zod"

export const ExperienceSchema = schemas.ExperienceSchema.extend({})

export type Experience = z.infer<typeof ExperienceSchema>
