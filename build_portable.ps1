$html = Get-Content "index.html" -Raw -Encoding UTF8
$css = Get-Content "styles.css" -Raw -Encoding UTF8
$js = Get-Content "script.js" -Raw -Encoding UTF8

$html = $html.Replace('<link rel="stylesheet" href="styles.css">', "<style>$css</style>")
$html = $html.Replace('<script src="script.js"></script>', "<script>$js</script>")

if (Test-Path "hero_pasta.png") {
    $heroBytes = [System.IO.File]::ReadAllBytes("$(Get-Location)\hero_pasta.png")
    $heroB64 = [Convert]::ToBase64String($heroBytes)
    $html = $html.Replace("url('hero_pasta.png')", "url('data:image/png;base64,$heroB64')")
}

$regex = [regex]'src="(assets/[^"]+\.(jpg|jpeg))"'
$matches = $regex.Matches($html)
foreach ($match in $matches) {
    $imgPath = $match.Groups[1].Value
    $fullPath = Join-Path (Get-Location) $imgPath
    if (Test-Path $fullPath) {
        $imgBytes = [System.IO.File]::ReadAllBytes($fullPath)
        $imgB64 = [Convert]::ToBase64String($imgBytes)
        $ext = $match.Groups[2].Value
        $html = $html.Replace($imgPath, "data:image/$ext;base64,$imgB64")
    }
}

$html | Out-File -Encoding utf8 "Il_Castello_Proyecto.html"
Write-Host "Portable HTML created successfully."
