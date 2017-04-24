$targets = @(
    '.\icons',
    '.\js',
    '.\layouts',
    '.\bs-config.json',
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
    Compress-Archive -Path $target -Update -DestinationPath $output -CompressionLevel NoCompression
}