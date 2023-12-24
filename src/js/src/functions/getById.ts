import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import dbController from '../dbController.js'
import NotFound from '../answers/NotFound.js'
import { RowDataPacket } from 'mysql2'
import errorHandler from '../errorHandler.js'

const getById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id

  const [result] = await dbController.query('SELECT * FROM Category WHERE Category_id = ?', [id]) as RowDataPacket[][]

  if (result[0].length === 0) return NotFound

  return {
    statusCode: 200,
    body: JSON.stringify(result[0][0])
  }
}

export const handler = errorHandler(getById)
