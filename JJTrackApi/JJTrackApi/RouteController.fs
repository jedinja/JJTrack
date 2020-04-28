module JJTrackApi.RouteController

open Suave
open Suave.Filters
open Suave.Operators
open JJTrackApi
open Combinators
open Response

let private withParam path =
    PrintfFormat<_,_,_,_,int>(path + "/%i")

let fullController path (getAll, get, put, post, delete) =
    let pathWithId = withParam path
    
    pathStarts path >=> choose [
        GET >=> choose [
            pathScan pathWithId get
            context getAll
        ]
        POST >=> request post
        PUT >=> pathScanWithBody pathWithId put
        DELETE >=> pathScan pathWithId delete
    ]

let private not_allowed message = response HTTP_405 (UTF8.bytes message) 
let NOT_ALLOWED _ = not_allowed ""

