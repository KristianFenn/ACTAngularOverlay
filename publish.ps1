Write-Host "Cleaning"
Get-ChildItem .\dist | Remove-Item -Recurse -Force
Get-Item ".\app\assets" | Copy-Item -Destination ".\dist\assets" -Recurse -Force
Copy-Item ".\app\favicon.ico" -Destination ".\dist\favicon.ico"

Write-Host "Compiling";
npx webpack;
npm run sass;

$dest = "\\SERVER\Sites\McParser";

Write-Host "Deleting old files";
Get-ChildItem $dest | Remove-Item -Recurse -Force

foreach ($target in Get-ChildItem .\dist) {
    Write-Host "Copying ${target}";
    Copy-Item $target.FullName -Destination $dest -Recurse
}

Write-Host "Published!";