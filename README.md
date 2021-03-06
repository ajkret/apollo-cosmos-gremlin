# Demo Function in Azure
Check example from https://github.com/Azure-Samples/js-e2e-graphql-cosmosdb-static-web-app


First, login

    az login

Create Storage

    az storage account create --name storagedemocosmosf --location westus --resource-group knowledge_base --sku Standard_LRS demo-cosmos-function

Create Function

    az functionapp create --resource-group knowledge_base --name demo-cosmos-function --consumption-plan-location westus --runtime node --functions-version 4 --storage-account storagedemocosmosf

Publish the function

    func azure functionapp publish demo-cosmos-function

The CLI will return something like:

    Setting Functions site property 'netFrameworkVersion' to 'v6.0'
    Getting site publishing info...
    Creating archive for current directory...
    Uploading 15.07 MB [##############################################################################]
    Upload completed successfully.
    Deployment completed successfully.
    Syncing triggers...
    Functions in demo-cosmos-function:
        graphql - [httpTrigger]
            Invoke url: https://demo-cosmos-function.azurewebsites.net/api/graphql

Reference: https://www.apollographql.com/docs/apollo-server/deployment/azure-functions/

# Configuration

First, create a CosmosDB Graph endpoint. Check (here)[https://docs.microsoft.com/en-us/azure/cosmos-db/sql/create-cosmosdb-resources-portal]

After you create the instance, copy the *Primary Key* and add an* Application Settings* entry for COSMOS_PRIMARY_KEY in the Azure Portal.

To run locally, just set a new Environment Variable. 

Powershell:

    $Env:COSMOS_PRIMARY_KEY="<YOUR_PRIMARY_KEY>"


sh

    export COSMOS_PRIMARY_KEY="<YOUR_PRIMARY_KEY>"

# Running on local

First, build

    npm run build

Then run

   func host start

