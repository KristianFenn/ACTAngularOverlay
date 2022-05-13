param(
    [switch]$Deploy
)

if ($Deploy) {
    Write-Host "Script is running in deploy mode; live files will be overwritten." -ForegroundColor Red
} elseif (-not $Deploy) {
    Write-Host "Script run without deploy switch; running in What-If mode" -ForegroundColor Yellow;
}

Write-Host "Linting";
$lintOutput = ng lint
$errors = $lintOutput -match "error";
if ($errors.Length -gt 0) {
    Write-Host "Linting failed - aborting deployment";
    $lintOutput;
    exit;
}

Write-Host "Running Tests";
$testOutput = & ng test 2>&1;
$errors = $testOutput -match "Error";
if ($errors.Length -gt 0) {
    Write-Host "Tests failed - aborting deployment.";
    $errors;
    exit;
}

if ($testOutput[-1] -match "FAILED") {
    $testOutput;
    Write-Host "Tests failed - aborting deployment.";
    exit;
}
Write-Host $testOutput[-1];

Write-Host "Compiling";
$buildOutput = & ng build 2>&1;
$errors = $buildOutput -match "Error";
if ($errors.Length -gt 0) {
    Write-Host "Build failed - aborting deployment.";
    $errors;
    exit;
}

$dest = "\\SERVER\Sites\McParser";

Write-Host "Deleting old files";
Get-ChildItem $dest | Remove-Item -Recurse -Force -WhatIf:(-not $Deploy)

Write-Host "Copying new files";
Get-ChildItem '.\dist' | Copy-Item -Destination $dest -Recurse -WhatIf:(-not $Deploy)

Write-Host "Published!";