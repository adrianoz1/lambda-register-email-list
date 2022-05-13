import { APIGatewayProxyHandler } from "aws-lambda"
import { document } from "../utils/dynamodbClient"

interface IRegisterEmail {
  id: string;
  name: string;
  email: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {

  const { id, name, email } = JSON.parse(event.body) as IRegisterEmail

  const response = await document.query({
    TableName: "email_list",
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
        ":id": id
    }
  }).promise();

  const emailAlreadyExists = response.Items[0];

  if (!emailAlreadyExists) {
    await document.put({
        TableName: "email_list",
        Item: {
            id,
            name,
            email,
            created_at: new Date().getTime()
        }
    }).promise();
  }
  
  return {
      statusCode: 201,
      body: JSON.stringify({
          message: "Email registered successfully!",
      })
  }
}
