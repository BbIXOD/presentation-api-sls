import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import dbController from "../dbController.js"
import OK from '../answers/OK.js'
import NotFound from "../answers/NotFound.js"
import { ResultSetHeader } from "mysql2"
import errorHandler from "../errorHandler.js"

const del = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id

  const [result] = await dbController.query('DELETE FROM Category WHERE Category_id = ?', [id]) as ResultSetHeader[]

  if (result[0].affectedRows === 0) return NotFound

  return OK
}

export const handler = errorHandler(del)