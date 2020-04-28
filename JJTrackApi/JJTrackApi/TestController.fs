module JJTrackApi.TestController

open EasySerJson
open Models

let private _createTest =
    Test.create >>
    Mid.JSON

let createTest =
    Mid.requestBody >>
    Serializer.deserialize<TestModel> >>
    _createTest

let getAllTests =
    Mid.noFilter >>
    Test.all >>
    Mid.JSON