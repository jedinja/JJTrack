open System.IO
open Suave
open Suave.RequestErrors
open Suave.Filters
open Suave.Operators
open JJTrackApi
open RouteController
open FSharp.Data
open Suave.Logging

type Config = JsonProvider<""" { "port":1, "domain":"http://localhost:8082", "ip":"127.0.0.1", "verbose":true } """>
let config = Config.Parse """ { "port":3000, "domain":"http://localhost:8082", "ip":"127.0.0.1", "verbose": true } """

let getConfigFile configFile =
    match File.Exists configFile with
    | false -> config
    | true -> File.ReadAllText configFile |> Config.Parse

let getCfg (configFile: Config.Root) =
    { defaultConfig with
        bindings = [ HttpBinding.createSimple HTTP configFile.Ip configFile.Port ] }

let addCors (conf: Config.Root) =
    Writers.addHeader "Access-Control-Allow-Origin" conf.Domain
    >=> Writers.addHeader "Access-Control-Allow-Headers" "Origin, X-Requested-With, Content-Type, Accept"
    >=> Writers.addHeader "Access-Control-Allow-Credentials" "true"
    >=> Writers.addHeader "Access-Control-Allow-Methods" "POST, GET, PUT, DELETE, PATCH, OPTIONS"

let logLevel =
    match config.Verbose with
    | true -> Verbose
    | _ -> Error

let logger = Targets.create logLevel [||]

let app configFile =
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
    ] >=> logStructured logger logFormatStructured >=> (addCors configFile)

[<EntryPoint>]
let main argv =
    let confFile = getConfigFile "./config.json"
    printfn "%A" confFile
    startWebServer (getCfg confFile) (app confFile)
    0
