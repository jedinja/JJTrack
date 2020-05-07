module JJTrackApi.RecordController

open EasySerJson
open Models
open Suave
open RouteController
open Carrier

let private deserialize = Serializer.deserialize<CompetitionRecordModel>

type ToUpdate = {
    Points: int
}

let private transform (record: Carrier<CompetitionRecordModel>, toUpdate) =
    record.Id, { record.Record with
                    Points = toUpdate.Points }
    
let private createRecord =
    Mid.requestBody >>
    deserialize >>
    CompetitionRecord.create >>
    Mid.JSON
    
let private getAllRecords =
    Mid.noFilter >>
    CompetitionRecord.all >>
    Mid.JSON

let private updateRecord =
    Mid.tupleTrack (CompetitionRecord.get, Serializer.deserialize<ToUpdate>) >>
    transform >>
    Mid.tupleToParams CompetitionRecord.update >>
    Mid.JSON
    
let private deleteRecord =
    CompetitionRecord.delete >>
    Mid.fromUnit (Successful.OK "OK")
    
let definition = (getAllRecords, NOT_ALLOWED, updateRecord, createRecord, deleteRecord)