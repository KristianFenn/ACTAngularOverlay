param(
    [switch]$Deploy
)

if ($Deploy) {
    Write-Host "Script is running in deploy mode; live files will be overwritten." -ForegroundColor Red;
} elseif (-not $Deploy) {
    Write-Host "Script run without deploy switch; running in What-If mode" -ForegroundColor Blue;
}

Write-Host "(1/5) Linting";
$lintOutput = ng lint
$errors = $lintOutput -match "error";
if ($errors.Length -gt 0) {
    Write-Host "Linting failed - aborting deployment" -ForegroundColor Red;
    $lintOutput;
    exit;
}
Write-Host $lintOutput[-2] -ForegroundColor DarkGreen;

Write-Host "(2/5) Running Tests";
$testOutput = & ng test 2>&1;
$errors = $testOutput -match "Error";
if ($errors.Length -gt 0) {
    Write-Host "Tests failed - aborting deployment." -ForegroundColor Red;
    $errors;
    exit;
}

if ($testOutput[-1] -match "FAILED") {
    $testOutput;
    Write-Host "Tests failed - aborting deployment." -ForegroundColor Red;
    exit;
}
Write-Host $testOutput[-1] -ForegroundColor DarkGreen;

Write-Host "(3/5) Compiling";
$buildOutput = & ng build 2>&1;
$errors = $buildOutput -match "Error";
if ($errors.Length -gt 0) {
    Write-Host "Build failed - aborting deployment.";
    $errors;
    exit;
}
Write-Host "Build Succeeded." -ForegroundColor DarkGreen;

$dest = "\\SERVER\Sites\McParser";

Write-Host "(4/5) Deleting old files";
Get-ChildItem $dest | Remove-Item -Recurse -Force -WhatIf:(-not $Deploy)

Write-Host "(5/5) Copying new files";
Get-ChildItem '.\dist' | Copy-Item -Destination $dest -Recurse -WhatIf:(-not $Deploy)

Write-Host "Published!" -ForegroundColor DarkGreen;