$targets = @(
    '.\js',
    '.\assets',
    '.\index.html',
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