import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import dbController from '../dbController.js'
import { RowDataPacket } from 'mysql2'
import errorHandler from '../errorHandler.js'

const getAll = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const [rows] = await dbController.query('SELECT * FROM Category;') as RowDataPacket[][]

  return {
    statusCode: 200,
    body: JSON.stringify(rows)
  }
}

export const handler = errorHandler(getAll)
