import { APIGatewayProxyHandler } from "aws-lambda"

interface IRegisterEmail {
  id: string;
  name: string;
  email: string;
}

export const handler: APIGatewayProxyHandler = async (event) => {

  const { id, name, email } = JSON.parse(event.body) as IRegisterEmail

  console.log(email, id, name)
  
  return {
      statusCode: 201,
      body: JSON.stringify({
          message: "Email registered successfully!",
      })
  }
}
