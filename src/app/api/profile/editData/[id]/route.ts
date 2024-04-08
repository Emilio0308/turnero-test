import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

// Definimos la interfaz para los parámetros de las rutas
interface Params {
  params: { id: string }
}
// Función para manejar la solicitud GET
export async function GET(request: Request, { params }: Params) {
  // Buscamos el usuario correspondiente al ID proporcionado en los parámetros
  const user = await prisma.user.findFirst({
    where: {
      id: (params.id)
    }
  });

  // Retornamos la respuesta
  return NextResponse.json(user);
}

// Función para manejar la solicitud PUT
export async function PUT(request: Request, { params }: Params) {
  // Extraemos los datos enviados en la solicitud
  const data = await request.json();
  
  try {
    // Actualizamos el perfil del usuario con el ID proporcionado
    const updatedUser = await prisma.user.update({
      where: {
        id: (params.id)
      },
      data
    });

    // Retornamos la respuesta con el perfil actualizado
    return NextResponse.json(updatedUser);
  } catch (error) {
    // Si ocurre un error, retornamos un mensaje de error
    return NextResponse.error(
           // { status: 500,
               // body: "Error al actualizar el perfil del usuario."}
    );
  }
}