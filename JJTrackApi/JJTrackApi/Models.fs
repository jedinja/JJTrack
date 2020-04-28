module JJTrackApi.Models

type TestModel = {
    Name: string
}

open EasySer.EntityFactory

let private fac = Factory(defaultFileControllerConfig)

let TEST_COLLECTION = "Test"
let Test = fac.CreateEntity<TestModel> TEST_COLLECTION