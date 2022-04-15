$targets = @(
    '.\js',
    '.\assets',
    '.\index.html',
    '.\favicon.ico'
);

Write-Host "Compiling";
npx webpack;

$dest = "\\SERVER\Sites\McParser";

Write-Host "Deleting old files";
Get-ChildItem $dest | Remove-Item -Recurse -Force

foreach ($target in $targets) {
    Write-Host "Copying ${target}";
    Copy-Item $target -Destination $dest -Recurse
}

Write-Host "Published!";