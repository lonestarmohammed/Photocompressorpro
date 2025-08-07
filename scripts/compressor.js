document.getElementById('qualitySlider').addEventListener('input', function() {
  document.getElementById('qualityValue').textContent = this.value;
});

document.getElementById('compressBtn').addEventListener('click', function() {
  const files = document.getElementById('fileInput').files;
  const quality = document.getElementById('qualitySlider').value;
  const output = document.getElementById('output');
  output.innerHTML = "";

  if (!files.length) {
    alert("Please select some images first.");
    return;
  }

  [...files].forEach(file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      const img = new Image();
      img.src = e.target.result;
      img.onload = function() {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const downloadLink = document.createElement("a");
          downloadLink.href = url;
          downloadLink.download = "compressed-" + file.name;
          downloadLink.innerHTML = "<img src='" + url + "' alt='Compressed Image' />";
          output.appendChild(downloadLink);
        }, "image/jpeg", quality / 100);
      };
    };
  });
});
