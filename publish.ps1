$targets = @(
    '.\js',
    '.\assets',
    '.\index.html',
    '.\favicon.ico'
);

$dest = "\\SERVER\Sites\McParser";

Get-ChildItem $dest | Remove-Item -Recurse -Force

foreach ($target in $targets) {
    Copy-Item $target -Destination $dest -Recurse
}