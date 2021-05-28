#! /usr/bin/pwsh

$sonarqubeToken = $env:BCT_SONARQUBE_TOKEN
$eventname = $env:BCT_EVENT_NAME
$isPublishing = $([System.Convert]::ToBoolean($env:BCT_IS_PUBLISHING))
$src = $env:SRC
$workspace = $env:GITHUB_WORKSPACE

Set-PSDebug -Trace 2

if ($isPublishing -or ($eventname -like "pull_request")) {
  Write-Output "Stop sonarqube."
  Set-Location -Path $workspace/ci
  $CurrentDir = $(get-location).Path;
  Write-Output $CurrentDir
  Push-Location $src 
     if ( $null -ne $sonarqubeToken) {
        Write-Output "Stopping sonarqube scanning."
        Get-Location
        dotnet sonarscanner end /d:sonar.login=$sonarqubeToken
        Exit $LASTEXITCODE
     }
  Pop-Location
}
Exit $LASTEXITCODE
