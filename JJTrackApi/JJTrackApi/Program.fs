open Suave
open Suave.RequestErrors
open Suave.Filters
open Suave.Operators
open JJTrackApi

let myCfg =
    { defaultConfig with
        bindings = [ HttpBinding.createSimple HTTP "127.0.0.1" 3000 ] }

let app =
    choose [
        path "/ok" >=> (Successful.OK "OK2")
        choose [
            path "/tests" >=> choose [
                GET >=> context TestController.getAllTests
                POST >=> request TestController.createTest
            ]
//            path "/ingredients" >=> choose [
//                GET >=> context IngredientController.getAllIngredients
//                POST >=> request IngredientController.createIngredient
//            ]
//            pathStarts "/recipes" >=> choose [
//                GET >=> choose [
//                    pathScan "/recipes/%i" RecipeController.getRecipe
//                    pathScan "/recipes/page/%i" RecipeController.getRecipesFromPage
//                ]
//                POST >=> request RecipeController.createRecipe
//            ]

        ] >=> Writers.setMimeType "application/json; charset=utf-8"
        NOT_FOUND "NOT FOUND"
    ]

[<EntryPoint>]
let main argv =

    startWebServer myCfg app
    0
