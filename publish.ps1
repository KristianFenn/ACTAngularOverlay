Write-Host "Compiling";
ng build;

$dest = "\\SERVER\Sites\McParser";

Write-Host "Deleting old files";
Get-ChildItem $dest | Remove-Item -Recurse -Force

foreach ($target in Get-ChildItem ".\dist") {
    Write-Host "Copying ${target}";
    Copy-Item $target.FullName -Destination $dest -Recurse
}

Write-Host "Published!";