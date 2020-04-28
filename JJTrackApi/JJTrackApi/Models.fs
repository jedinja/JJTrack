module JJTrackApi.Models

open System

type TestModel = {
    Name: string
}

type MemberModel = {
    Name: string
    Added: DateTime
    Active: Boolean
}

type CompetitionModel = {
    Name: string
    EventDate: DateTime
    Duration: int
}

type CompetitionRecordModel = {
    CompetitionId: int
    MemberId: int
    Points: int
}

open EasySer.EntityFactory

let private fac = Factory(defaultFileControllerConfig)

let TEST_COLLECTION = "Test"
let Test = fac.CreateEntity<TestModel> TEST_COLLECTION

let MEMBER_COLLECTION = "Member"
let Member = fac.CreateEntity<MemberModel> MEMBER_COLLECTION

let COMPETITION_COLLECTION = "Competition"
let Competition = fac.CreateEntity<CompetitionModel> COMPETITION_COLLECTION

let COMPETITION_RECORD_COLLECTION = "CompetitionRecord"
let CompetitionRecord = fac.CreateEntity<CompetitionRecordModel> COMPETITION_RECORD_COLLECTION