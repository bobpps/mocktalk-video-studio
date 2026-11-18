$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")
if (!(Test-Path "out/demo.mp4")) { throw "First run npm run render or .\\scripts\\benchmark.ps1" }
Write-Host "Re-encode existing output using Intel Arc H.264 QSV..."
$timer = [System.Diagnostics.Stopwatch]::StartNew()
& ffmpeg -hide_banner -i out/demo.mp4 -c:v h264_qsv -global_quality 23 -c:a copy -y out/demo-qsv.mp4
$code = $LASTEXITCODE
$timer.Stop()
if ($code -ne 0) { throw "FFmpeg exited with $code" }
Write-Host ("QSV re-encode took {0:N1}s for 60s" -f $timer.Elapsed.TotalSeconds)
Write-Host "Note: This converts an existing MP4. It does NOT accelerate Remotion frame generation."
