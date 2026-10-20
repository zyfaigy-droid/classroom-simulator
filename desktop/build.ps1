param([string]$OutputDirectory = "")
$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
if (-not $OutputDirectory) { $OutputDirectory = Join-Path $projectRoot 'dist\AnkunSimulator' }
$OutputDirectory = [IO.Path]::GetFullPath($OutputDirectory)
if (Test-Path -LiteralPath $OutputDirectory) { throw 'Output directory already exists; choose a new directory.' }
$compiler = Join-Path $env:WINDIR 'Microsoft.NET\Framework64\v4.0.30319\csc.exe'
if (-not (Test-Path -LiteralPath $compiler)) { throw '.NET Framework C# compiler is required.' }
# Create only a new output directory; package_web enforces the runtime file allowlist.
New-Item -ItemType Directory -Path $OutputDirectory | Out-Null
python (Join-Path $projectRoot 'tools\package_web.py') (Join-Path $OutputDirectory 'game')
if ($LASTEXITCODE -ne 0) { throw 'Web packaging failed.' }
& $compiler /nologo /target:winexe /optimize+ /platform:anycpu /r:System.Windows.Forms.dll "/out:$OutputDirectory\AnkunSimulator.exe" (Join-Path $PSScriptRoot 'Launcher.cs')
if ($LASTEXITCODE -ne 0) { throw 'Launcher compilation failed.' }
Copy-Item -LiteralPath (Join-Path $PSScriptRoot 'README.md') -Destination (Join-Path $OutputDirectory 'README.md')
Compress-Archive -LiteralPath $OutputDirectory -DestinationPath ($OutputDirectory + '.zip')
Write-Output ($OutputDirectory + '.zip')
