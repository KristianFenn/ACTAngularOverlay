$targets = @(
    '.\icons',
    '.\js',
    '.\assets',
    '.\handle.png',
    '.\index.html',
    '.\overlay.css',
    '.\package.json',
    '.\systemjs.config.js'
);

$output = '.\publish.zip'

if (Test-Path $output) {
    Remove-Item $output;
}

foreach ($target in $targets) {
    7z a $output $target;
}