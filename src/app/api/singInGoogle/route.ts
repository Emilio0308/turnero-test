import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    console.log(request.credentials)
    console.log(request.headers.get('cookies'))
    console.log(cookies().toString())
    // const url =
    //   "https://4x3sn0wkaf.execute-api.us-east-2.amazonaws.com/api//auth/users/logIn";

    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     tenant: "client-test",
    //   },
    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // });

    // const rst = await response.json();
    // const { body } = rst;

    // if (response.status != 200) {
    //   return null;
    // }
    // return {
    //   id: String(body.id),
    //   name: body.name,
    //   lastName: body.lastName,
    //   email: body.email,
    //   picture: body.image,
    //   accessToken: body.id_token,
    //   role: body.role,
    // };

    return NextResponse.json({});
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
