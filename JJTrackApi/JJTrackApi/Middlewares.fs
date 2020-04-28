module JJTrackApi.Middlewares

open EasySerJson.Serializer
open Suave

type JsonWebPart = obj -> WebPart

let JSON:JsonWebPart = serialize >> Successful.OK

let requestBody (req : HttpRequest) =
    let getString (rawForm: byte []) = System.Text.Encoding.UTF8.GetString(rawForm)
    req.rawForm
    |> getString

let noFilter (a: HttpContext) = None