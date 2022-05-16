import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from "../utils/dynamodbClient"
import { uuid } from 'uuidv4';

interface IRegisterEmail {
  id: string;
  name: string;
  email: string;
}

const TABLE_NAME = "email-list";

export const handler: APIGatewayProxyHandler = async (event) => {

  const { name, email } = JSON.parse(event.body) as IRegisterEmail

  const id = uuid()
  const createdAt = new Date().getTime()

  try {
    await document.put({
      TableName: TABLE_NAME,
      Item: {
          id,
          name,
          email,
          createdAt
      },
      ConditionExpression: "attribute_not_exists(Email)"
    }).promise();

    return {
      statusCode: 201,
      body: JSON.stringify({
          message: "Email registered successfully!",
      })
    }
  } catch (error) {
    console.error(error)
    
    return {
      statusCode: 500,
      body: JSON.stringify({
          message: "Error the email was not registered!",
      })
    }
  }
 
}
