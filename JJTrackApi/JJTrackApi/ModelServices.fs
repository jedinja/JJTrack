module JJTrackApi.ModelServices

open JJTrackApi
open Models

let deleteRecords predicate =
    CompetitionRecord.all (Some predicate)
    |> List.iter (fun carier -> CompetitionRecord.delete carier.Id)