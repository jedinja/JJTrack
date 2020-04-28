module JJTrackApi.Combinators

open JJTrackApi
open Mid
open Suave
open Suave.Sscanf

let private combinator condition result =
    let F context =
        match condition context with
        | Some res ->
            result res context
        | None ->
            fail
    F

let pathScanWithBody format func =
    let scan url =
        try
            let scanRes = sscanf format url
            Some scanRes
        with _ -> None

    combinator
        (fun context -> scan context.request.path)
        (fun res context -> func (res, (contextBody context)) context)