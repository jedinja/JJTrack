module JJTrackApi.CompetitionController

open EasySerJson
open Models
open Suave
open EasyWebServer
open EasyWebServer.RouteController

let private deserialize = Serializer.deserialize<CompetitionModel>

let private deleteCompetitionRecords competitionId =
    ModelServices.deleteRecords (fun record -> record.CompetitionId = competitionId)

let private createCompetition =
    Mid.requestBody >>
    deserialize >>
    Competition.create >>
    Mid.JSON
    
let private getAllCompetitions = 
    Mid.noFilter >>
    Competition.all >>
    Mid.JSON
    
let private updateCompetition =
    Mid.tupleTrack (Competition.get, deserialize) >>
    (fun (carr, update) -> (carr.Id, update)) >>
    Mid.tupleToParams Competition.update >>
    Mid.JSON
    
let private deleteCompetition =
    Mid.pass deleteCompetitionRecords >>
    Competition.delete >>
    Mid.fromUnit (Successful.OK "OK")
    
let definition = (getAllCompetitions, NOT_ALLOWED, updateCompetition, createCompetition, deleteCompetition)
    