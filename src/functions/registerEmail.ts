import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from "../utils/dynamodbClient"
import { uuid } from 'uuidv4';

interface IRegisterEmail {
  id: string;
  name: string;
  email: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {

  const { name, email } = JSON.parse(event.body) as IRegisterEmail

  await document.put({
      TableName: "email-list",
      Item: {
          id: uuid(),
          name,
          email,
          createdAt: new Date().getTime()
      },
      ConditionExpression: "attribute_not_exists(Email)"
  }).promise();
  
  return {
      statusCode: 201,
      body: JSON.stringify({
          message: "Email registered successfully!",
      })
  }
}
