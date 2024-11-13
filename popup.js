document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const selectedText = urlParams.get("text");

  if (selectedText) {
    document.getElementById("selectedText").innerText = selectedText;

    // Generate and display the first barcode using the selected text
    JsBarcode("#barcode", selectedText, { format: "CODE128", displayValue: false });
  }

  // Generate the second barcode based on user input
  const secondBarcodeField = document.getElementById("secondBarcodeField");
  const secondBarcodeText = document.getElementById("secondBarcodeText");
  secondBarcodeField.addEventListener("input", () => {
    const secondBarcodeValue = secondBarcodeField.value;
    secondBarcodeText.innerText = secondBarcodeValue; // Display the second barcode value in the popup
    if (secondBarcodeValue) {
      JsBarcode("#barcode2", secondBarcodeValue, { format: "CODE128", displayValue: false });
    }
  });

  // Handle the print button
  document.getElementById("printButton").addEventListener("click", () => {
    printBarcode(selectedText);
  });
});

function printBarcode(selectedText) {
  const memoText = document.getElementById("memoField").value;
  const secondBarcodeValue = document.getElementById("secondBarcodeField").value;
  const barcodeImage = document.getElementById("barcode").toDataURL();
  const secondBarcodeImage = secondBarcodeValue ? document.getElementById("barcode2").toDataURL() : null;

  const printWindow = window.open("", "_blank", "width=600,height=700");
  printWindow.document.write(`
    <html>
      <head>
        <title>Print Barcode</title>
        <style>
          body { text-align: center; font-family: Arial, sans-serif; }
          .content-container {
            margin: 10px;
            padding: 10px;
            page-break-inside: avoid;
          }
          #barcodeImage, #secondBarcodeImage { margin-top: 10px; }
          .barcode-text { font-size: 18px; margin-top: 5px; }
          #memo { font-size: 14px; margin-top: 10px; color: #333; }
        </style>
      </head>
      <body>
        <div class="content-container">
          <!-- First Barcode and Selected Text -->
          <img id="barcodeImage" src="${barcodeImage}" />
          <div class="barcode-text">${selectedText}</div>
        
          <!-- Memo Text below the first barcode and selected text -->
          <div id="memo">${memoText}</div>
        </div>

        <!-- Second Barcode (if entered) -->
        ${secondBarcodeImage ? `
          <div class="content-container">
            <img id="secondBarcodeImage" src="${secondBarcodeImage}" />
            <div class="barcode-text">${secondBarcodeValue}</div>
          </div>
        ` : ''}
      </body>
    </html>
  `);

  printWindow.document.close();

  // Trigger the print dialog after the content is fully loaded
  printWindow.onload = () => {
    printWindow.print();
  };
}
