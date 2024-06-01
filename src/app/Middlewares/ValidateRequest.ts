import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

const validateSchema = (schema: AnyZodObject) => {

    return async (req: Request, res: Response, next: NextFunction) => {


        try {
            await schema.parseAsync({
                body: req.body
            })

            return next()
        }

        catch (err) {
            return next(err)
        }
    }


}

export default validateSchema;