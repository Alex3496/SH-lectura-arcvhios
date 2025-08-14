import type { ApiUploadResponse, Data } from "../type"
import { API_URL } from "../../config"

/**
 * Sube un archivo CSV al servidor usando una petición HTTP POST.
 *
 * @param file El archivo que se va a subir (de tipo File, propio de JavaScript para archivos).
 * @returns Una promesa que resuelve a un arreglo: [Error | null, Data | null].
 *          Si la subida fue exitosa, el primer elemento es null y el segundo es la respuesta del servidor (tipo Data).
 *          Si hubo un error, el primer elemento es el error y el segundo es null.
 *
 * El tipo Data representa la estructura de los datos recibidos desde el backend tras procesar el archivo.
 *
 */
export const uploadFile = async (file: File): Promise<[Error | null, Data | null]> => {
  // Creamos un objeto FormData para enviar el archivo como parte de un formulario
  const formData = new FormData()
  // Agregamos el archivo al formulario bajo el nombre 'file'
  formData.append('file', file)

  try {
    // Enviamos la petición al backend usando fetch
    const response = await fetch(`${API_URL}/api/files`, {
      method: 'POST', // Usamos el método POST para enviar datos
      body: formData, // Enviamos el formulario con el archivo
    })

    // Si la respuesta no es exitosa (código diferente de 200-299)
    if (!response.ok) {
      // Obtenemos el mensaje de error del servidor
      const errorData = await response.json()
      // Lanzamos un error con el mensaje recibido o uno genérico
      throw new Error(errorData.message || 'Error uploading file api')
    }

    // Si todo salió bien, devolvemos la respuesta del servidor
    const json = await response.json() as ApiUploadResponse

    return [null, json.data]
  } catch (error) {
    // Si ocurre cualquier error, lo devolvemos en el primer elemento
    return [error as Error, null]
  }
}

/**
 * Busca usuarios en el backend según el término de búsqueda proporcionado.
 *
 * @param query Término de búsqueda (string) que se usará para filtrar usuarios.
 * @returns Una promesa que resuelve a un arreglo: [Error | null, Data | null].
 *          Si la búsqueda fue exitosa, el primer elemento es null y el segundo es la lista de usuarios (tipo Data).
 *          Si hubo un error, el primer elemento es el error y el segundo es null.
 */
export const getUsers = async (query: string): Promise<[Error | null, Data | null]> => {
  try {
    // Validar que se proporcione un término de búsqueda
    if(!query) {
      return [new Error('Debes proporcionar un término de búsqueda'), []]
    }

    // Realizar la petición al backend
    const response = await fetch(`${API_URL}/api/users?q=${query}`)
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Error al buscar usuarios')
    }
    // Procesar la respuesta y devolver los datos
    const json = await response.json() as ApiUploadResponse
    return [null, json.data]
  } catch (error) {
    // Si ocurre cualquier error, lo devolvemos en el primer elemento
    return [error as Error, null]
  }
}
