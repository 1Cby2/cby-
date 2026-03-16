# Compress images script
param(
    [string]$sourcePath = ".",
    [int]$quality = 75,
    [int]$maxWidth = 1920
)

# Load System.Drawing namespace
Add-Type -AssemblyName System.Drawing

# Get all JPG images
$images = Get-ChildItem -Path $sourcePath -Filter "*.jpg" -Recurse

foreach ($image in $images) {
    try {
        # Create image object
        $bitmap = New-Object System.Drawing.Bitmap($image.FullName)
        
        # Calculate new size (maintain aspect ratio)
        $newWidth = $bitmap.Width
        $newHeight = $bitmap.Height
        
        if ($bitmap.Width -gt $maxWidth) {
            $newWidth = $maxWidth
            $newHeight = [int]($bitmap.Height * ($maxWidth / $bitmap.Width))
        }
        
        # Create new thumbnail
        $newBitmap = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($newBitmap)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.DrawImage($bitmap, 0, 0, $newWidth, $newHeight)
        
        # Save compressed image
        $encoder = [System.Drawing.Imaging.Encoder]::Quality
        $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter($encoder, $quality)
        $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }[0]
        
        $outputPath = Join-Path $sourcePath ("compressed_" + $image.Name)
        $newBitmap.Save($outputPath, $jpegCodec, $encoderParams)
        
        # Release resources
        $bitmap.Dispose()
        $newBitmap.Dispose()
        $graphics.Dispose()
        
        # Show compression results
        $originalSize = $image.Length
        $compressedSize = (Get-Item $outputPath).Length
        $reduction = [int](($originalSize - $compressedSize) / $originalSize * 100)
        
        Write-Host "Compressed $($image.Name): $originalSize -> $compressedSize ($reduction% reduction)"
        
    } catch {
        Write-Host "Failed to compress $($image.Name): $($_.Exception.Message)"
    }
}

Write-Host "Compression completed!"
