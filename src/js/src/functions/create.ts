import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import dbController from '../dbController.js'
import CreateNew from '../answers/CreateNew.js'
import errorHandler from '../errorHandler.js'

const create =  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const rowsFieldWithMaxId = 'MAX(Category_id)'

  const { name, description, Post_id: postId } = JSON.parse(event.body)

  const [rows] = await dbController.query(`SELECT ${rowsFieldWithMaxId} FROM Category`)
  const categoryId = (rows as [{ [rowsFieldWithMaxId]: number }])[0][rowsFieldWithMaxId] + 1
  await dbController
    .query('INSERT INTO category (name, description, Post_id, Category_id) VALUES (?, ?, ?, ?) ',
      [name, description, postId, categoryId])

  return CreateNew
}

export const handler = errorHandler(create)