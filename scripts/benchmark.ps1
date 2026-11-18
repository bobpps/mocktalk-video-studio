$ErrorActionPreference = "Stop"
Set-Location (Join-Path $PSScriptRoot "..")
New-Item -ItemType Directory -Force -Path "out" | Out-Null
Write-Host "Timeline validation..."
node scripts/ensure-demo-audio.mjs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
node scripts/validate-timeline.mjs
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
Write-Host "Rendering 60s, 1080p, 30fps with Remotion (CPU/Chromium-based composition)..."
$timer = [System.Diagnostics.Stopwatch]::StartNew()
& npx remotion render src/index.ts MockTalkDemo out/demo.mp4 --codec=h264
$code = $LASTEXITCODE
$timer.Stop()
if ($code -ne 0) { throw "Remotion exited with $code" }
$bytes = (Get-Item out/demo.mp4).Length
$secs = $timer.Elapsed.TotalSeconds
Write-Host ("Render took {0:N1}s for 60s of video; speed {1:N2}x real time; size {2:N1}MB" -f $secs, (60 / $secs), ($bytes / 1MB))
Write-Host "To test Intel QSV re-encoding, run: .\\scripts\\encode-qsv.ps1"
