#! /usr/bin/pwsh

$sonarqubeToken = $env:BCT_SONARQUBE_TOKEN
$eventname = $env:BCT_EVENT_NAME
$isPublishing = $([System.Convert]::ToBoolean($env:BCT_IS_PUBLISHING))
$src = $env:SRC
$workspace = $env:GITHUB_WORKSPACE

if ($isPublishing -or ($eventname -like "pull_request")) {
  Write-Output "Stop sonarqube."
  Set-Location -Path $workspace
  Push-Location $src 
     if ( $null -ne $sonarqubeToken) {
        Write-Output "Stopping sonarqube scanning."
        dotnet sonarscanner end /d:sonar.login=$sonarqubeToken
        Exit $LASTEXITCODE
     }
  Pop-Location
}
Exit $LASTEXITCODE
