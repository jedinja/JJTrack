module JJTrackApi.Mid

open EasySerJson.Serializer
open Suave

type JsonWebPart = obj -> WebPart

let JSON:JsonWebPart = serialize >> Successful.OK

let requestBody (req : HttpRequest) =
    let getString (rawForm: byte []) = System.Text.Encoding.UTF8.GetString(rawForm)
    req.rawForm
    |> getString

let noFilter (a: HttpContext) = None

let contextBody (a: HttpContext) = a.request |> requestBody

let tupleTrack (funcA, funcB) (a,b) = (funcA a, funcB b)

let tupleToParams func (a,b) = 
    func a b

let fromUnit a = (fun _ -> a)

let pass act a =
    act a
    a