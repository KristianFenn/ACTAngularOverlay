param(
    [switch]$WhatIf
)

Write-Host "Running Tests";
$testOutput = & ng test 2>&1;
$errors = $testOutput -match "Error";
if ($errors.Length -gt 0) {
    Write-Host "Tests build failed - aborting deployment.";
    $errors;
    exit;
}

Write-Host $testOutput[-1];
if ($testOutput[-1] -match "FAILED") {
    Write-Host "Tests failed - aborting deployment.";
    exit;
}

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
Get-ChildItem $dest | Remove-Item -Recurse -Force -WhatIf:$WhatIf

Write-Host "Copying new files";
Get-ChildItem '.\dist' | Copy-Item -Destination $dest -Recurse -WhatIf:$WhatIf

Write-Host "Published!";