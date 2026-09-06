param([switch]$Lan)
$ErrorActionPreference = 'Stop'
$taskPython = (Get-Command python -ErrorAction SilentlyContinue).Source
if (-not $taskPython) { $taskPython = (Get-Command py -ErrorAction SilentlyContinue).Source }
if (-not $taskPython) { throw 'Python is required. Install Python or run serve.py with your existing Python executable.' }
$taskArgs = @((Join-Path $PSScriptRoot 'serve.py'))
if ($Lan) { $taskArgs += '--lan' }
& $taskPython @taskArgs
