import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { RowDataPacket } from 'mysql2'
import dbController from '../dbController.js'
import OK from '../answers/OK.js'
import NotFound from '../answers/NotFound.js'
import errorHandler from '../errorHandler.js'

const extend = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { postId, categoryId } = JSON.parse(event.body)

  const result = await dbController
    .query('SELECT name, description FROM Category WHERE id = ? LIMIT 1', [categoryId]) as RowDataPacket[][]

  if (result[0].length === 0) return NotFound

  const { name, description } = (result[0] as [ { name: string, description: string }])[0]

  await dbController
    .query('INSERT INTO Category (name, description, Post_id, Category_id) VALUES (?, ?, ?, ?)',
      [name, description, postId, categoryId])

  return OK
}

export const handler = errorHandler(extend)
