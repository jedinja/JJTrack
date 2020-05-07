open Suave
open Suave.RequestErrors
open Suave.Filters
open Suave.Operators
open JJTrackApi
open RouteController
open FSharp.Data
open Suave.Logging

type Config = JsonProvider<""" { "port":1, "domain":"http://localhost:8082", "verbose":true } """>
let config = Config.Parse """ { "port":3000, "domain":"http://localhost:8082", "verbose": true } """

printfn "%A" config

let myCfg =
    { defaultConfig with
        bindings = [ HttpBinding.createSimple HTTP "127.0.0.1" config.Port ] }

let addCors =
    Writers.addHeader "Access-Control-Allow-Origin" config.Domain
    >=> Writers.addHeader "Access-Control-Allow-Headers" "Origin, X-Requested-With, Content-Type, Accept"
    >=> Writers.addHeader "Access-Control-Allow-Credentials" "true"
    >=> Writers.addHeader "Access-Control-Allow-Methods" "POST, GET, PUT, DELETE, PATCH, OPTIONS"

let logLevel =
    match config.Verbose with
    | true -> Verbose
    | _ -> Error

let logger = Targets.create logLevel [||]

let app =
    choose [
        OPTIONS >=> Successful.OK ""
        pathStarts "/ok" >=> choose [
            GET >=> (Successful.OK """ { "ok": "OK2" } """)
        ]
        choose [
            pathStarts "/tests" >=> choose [
                GET >=> context TestController.getAllTests
                POST >=> request TestController.createTest
            ]
            fullController "/members" MemberController.definition
            fullController "/comp" CompetitionController.definition
            fullController "/points" RecordController.definition
        ] >=> Writers.setMimeType "application/json; charset=utf-8"
        NOT_FOUND "NOT FOUND"
    ] >=> logStructured logger logFormatStructured >=> addCors

[<EntryPoint>]
let main argv =

    startWebServer myCfg app
    0
