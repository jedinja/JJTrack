module JJTrackApi.MemberController

open System
open EasySerJson
open Models
open Suave
open EasyWebServer
open EasyWebServer.RouteController

type NewMember = {
    Name: string
}

type MemberForUpdate = {
    Name: string
    Active: Boolean
}

let private initMember (create: NewMember) = {
    Name = create.Name
    Active = true
    Added = DateTime.UtcNow
}

let private transformMember (mem: Carrier.Carrier<MemberModel>, (update: MemberForUpdate)) = 
    mem.Id, { mem.Record with
                Name = update.Name
                Active = update.Active
    }

let private deleteCompetitionRecords memberId =
    ModelServices.deleteRecords (fun record -> record.MemberId = memberId)

let private createMember =
    Mid.requestBody >>
    Serializer.deserialize<NewMember> >>
    initMember >>
    Member.create >>
    Mid.JSON

let private getAllMembers =
    Mid.noFilter >>
    Member.all >>
    Mid.JSON
    
let private updateMember = // id * body -> WebPart
    Mid.tupleTrack (Member.get, Serializer.deserialize<MemberForUpdate>) >>
    transformMember >>
    Mid.tupleToParams Member.update >>
    Mid.JSON
    
let private deleteMember =
    Mid.pass (deleteCompetitionRecords) >>
    Member.delete >>
    Mid.fromUnit (Successful.OK "OK")
    
let definition = (getAllMembers, NOT_ALLOWED, updateMember, createMember, deleteMember)