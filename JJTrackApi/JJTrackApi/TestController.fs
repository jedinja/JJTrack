module JJTrackApi.TestController

open EasySerJson
open Models

let private _createTest =
    Test.create >>
    Middlewares.JSON

let createTest =
    Middlewares.requestBody >>
    Serializer.deserialize<TestModel> >>
    _createTest

let getAllTests =
    Middlewares.noFilter >>
    Test.all >>
    Middlewares.JSON