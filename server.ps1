$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "Server started on http://localhost:8080/"
try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        $path = $request.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }
        $localFile = Join-Path (Get-Location) $path
        if (Test-Path $localFile) {
            $content = [System.IO.File]::ReadAllBytes($localFile)
            $response.ContentLength64 = $content.Length
            if ($path -match "\.css$") { $response.ContentType = "text/css" }
            elseif ($path -match "\.js$") { $response.ContentType = "application/javascript" }
            elseif ($path -match "\.png$") { $response.ContentType = "image/png" }
            else { $response.ContentType = "text/html; charset=utf-8" }
            $response.OutputStream.Write($content, 0, $content.Length)
        } else {
            $response.StatusCode = 404
        }
        $response.Close()
    }
} finally {
    $listener.Stop()
}
