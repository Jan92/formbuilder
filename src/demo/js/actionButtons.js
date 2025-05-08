import startCase from 'lodash/startCase'

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

import aceEditor, { config } from 'ace-builds/src-noconflict/ace'
import Json from 'ace-builds/src-noconflict/mode-json?url'
import githubTheme from 'ace-builds/src-noconflict/theme-github_light_default?url'

config.setModuleUrl('ace/mode/json', Json)
config.setModuleUrl('ace/theme/github_light_default', githubTheme)
const jsonEditor = aceEditor.edit('formData-editor')
jsonEditor.session.setOption('useWorker', false)

jsonEditor.setOptions({
  theme: 'ace/theme/github_light_default',
  mode: 'ace/mode/json',
})

// --- BEGIN MUSTER 10 DATA ---
const muster10InitialData = {
  "id": "muster10-form-root",
  "stages": {
    "stage-1": {
      "children": [
        // Define rows for Muster 10 here. Each child is a row ID.
        "row-header-1",
        "row-header-2",
        "row-header-3",
        "row-header-title",
        "row-header-checkboxes",
        "row-zusatzangaben-title",
        // Add new rows for BSNR, LANR, Datum
        "row-bsnr-lanr-datum",
        "row-line-after-bsnr",
        // ... more rows as we define them
      ],
      "id": "stage-1"
    }
  },
  "rows": {
    "row-header-1": {
      "children": ["col-krankenkasse-label", "col-krankenkasse-input"],
      "id": "row-header-1", "className": ["formeo-row"]
    },
    "row-header-2": {
      "children": ["col-name-label", "col-name-input", "col-gebam-label", "col-gebam-input"],
      "id": "row-header-2", "className": ["formeo-row"]
    },
    "row-header-3": {
      "children": [
        "col-kostentrager-label", "col-kostentrager-input", 
        "col-versnr-label", "col-versnr-input", 
        "col-status-label", "col-status-input"
      ],
      "id": "row-header-3", "className": ["formeo-row"]
    },
    "row-header-title": {
      "children": ["col-main-title"],
      "id": "row-header-title", "className": ["formeo-row", "main-title-row"]
    },
    "row-header-checkboxes": {
      "children": [
        "col-cb-kurativ", "col-cb-praeventiv", "col-cb-belegarzt", "col-cb-unfall"
      ],
      "id": "row-header-checkboxes", "className": ["formeo-row", "checkbox-row-header"]
    },
    "row-zusatzangaben-title": {
        "children": ["col-zusatzangaben-label"],
        "id": "row-zusatzangaben-title", "className": ["formeo-row"]
    },
    // New row for BSNR, LANR, Datum
    "row-bsnr-lanr-datum": {
      "children": [
        "col-bsnr-label", "col-bsnr-input",
        "col-lanr-label", "col-lanr-input",
        "col-datum-label", "col-datum-input"
      ],
      "id": "row-bsnr-lanr-datum", "className": ["formeo-row"]
    },
    "row-line-after-bsnr": { // conceptual row for a line
        "children": ["col-line-after-bsnr"],
        "id": "row-line-after-bsnr", "className": ["formeo-row", "line-row"]
    }
  },
  "columns": {
    // Row 1
    "col-krankenkasse-label": { "children": ["field-krankenkasse-label"], "id": "col-krankenkasse-label", "className": ["formeo-column", "label-column"], "config": {"width": "30%"} },
    "col-krankenkasse-input": { "children": ["field-krankenkasse-input"], "id": "col-krankenkasse-input", "className": ["formeo-column", "input-column"],"config": {"width": "70%"} },
    // Row 2
    "col-name-label": { "children": ["field-name-label"], "id": "col-name-label", "className": ["formeo-column", "label-column"], "config": {"width": "30%"} },
    "col-name-input": { "children": ["field-name-input"], "id": "col-name-input", "className": ["formeo-column", "input-column"], "config": {"width": "40%"} },
    "col-gebam-label": { "children": ["field-gebam-label"], "id": "col-gebam-label", "className": ["formeo-column", "label-column", "short-label"], "config": {"width": "10%"} },
    "col-gebam-input": { "children": ["field-gebam-input"], "id": "col-gebam-input", "className": ["formeo-column", "input-column", "short-input"], "config": {"width": "20%"} },
    // Row 3
    "col-kostentrager-label": { "children": ["field-kostentrager-label"], "id": "col-kostentrager-label", "className": ["formeo-column"], "config": {"width": "20%"} },
    "col-kostentrager-input": { "children": ["field-kostentrager-input"], "id": "col-kostentrager-input", "className": ["formeo-column"] , "config": {"width": "15%"}},     
    "col-versnr-label": { "children": ["field-versnr-label"], "id": "col-versnr-label", "className": ["formeo-column"], "config": {"width": "15%"} },
    "col-versnr-input": { "children": ["field-versnr-input"], "id": "col-versnr-input", "className": ["formeo-column"] , "config": {"width": "15%"}}, 
    "col-status-label": { "children": ["field-status-label"], "id": "col-status-label", "className": ["formeo-column"], "config": {"width": "10%"} },
    "col-status-input": { "children": ["field-status-input"], "id": "col-status-input", "className": ["formeo-column"] , "config": {"width": "15%"}},
    // Row Main Title
    "col-main-title": { "children": ["field-main-title"], "id": "col-main-title", "className": ["formeo-column"], "config": {"width": "100%"} },
    // Row Header Checkboxes
    "col-cb-kurativ": { "children": ["field-cb-kurativ"], "id": "col-cb-kurativ", "className": ["formeo-column", "checkbox-col"], "config": {"width": "20%"} },
    "col-cb-praeventiv": { "children": ["field-cb-praeventiv"], "id": "col-cb-praeventiv", "className": ["formeo-column", "checkbox-col"], "config": {"width": "20%"} },
    "col-cb-belegarzt": { "children": ["field-cb-belegarzt"], "id": "col-cb-belegarzt", "className": ["formeo-column", "checkbox-col"], "config": {"width": "30%"} },
    "col-cb-unfall": { "children": ["field-cb-unfall"], "id": "col-cb-unfall", "className": ["formeo-column", "checkbox-col"], "config": {"width": "30%"} },
    // Row Zusatzangaben Title
    "col-zusatzangaben-label": { "children": ["field-zusatzangaben-label"], "id": "col-zusatzangaben-label", "className": ["formeo-column"], "config": {"width": "100%"} },
    // Columns for BSNR, LANR, Datum row
    "col-bsnr-label": { "children": ["field-bsnr-label"], "id": "col-bsnr-label", "className": ["formeo-column"], "config": {"width": "25%"} },
    "col-bsnr-input": { "children": ["field-bsnr-input"], "id": "col-bsnr-input", "className": ["formeo-column"], "config": {"width": "15%"} },
    "col-lanr-label": { "children": ["field-lanr-label"], "id": "col-lanr-label", "className": ["formeo-column"], "config": {"width": "15%"} },
    "col-lanr-input": { "children": ["field-lanr-input"], "id": "col-lanr-input", "className": ["formeo-column"], "config": {"width": "15%"} },
    "col-datum-label": { "children": ["field-datum-label"], "id": "col-datum-label", "className": ["formeo-column"], "config": {"width": "10%"} },
    "col-datum-input": { "children": ["field-datum-input"], "id": "col-datum-input", "className": ["formeo-column"], "config": {"width": "20%"} },
    "col-line-after-bsnr": { "children": ["field-line-after-bsnr"], "id": "col-line-after-bsnr", "className": ["formeo-column"], "config": {"width": "100%"}}
  },
  "fields": {
    "field-krankenkasse-label": { "tag": "input", "attrs": { "type": "text", "value": "Krankenkasse bzw. Kostenträger" }, "config": { "label": "", "controlId": "static-text"}, "id": "field-krankenkasse-label" },
    "field-krankenkasse-input": { "tag": "input", "attrs": { "type": "text" }, "config": { "label": "", "placeholder": "", "controlId": "text-input"}, "id": "field-krankenkasse-input" },
    "field-name-label": { "tag": "input", "attrs": { "type": "text", "value": "Name, Vorname des Versicherten" }, "config": { "label": "", "controlId": "static-text" }, "id": "field-name-label" },
    "field-name-input": { "tag": "input", "attrs": { "type": "text" }, "config": { "label": "", "controlId": "text-input" }, "id": "field-name-input" },
    "field-gebam-label": { "tag": "input", "attrs": { "type": "text", "value": "geb. am" }, "config": { "label": "", "controlId": "static-text" }, "id": "field-gebam-label" },
    "field-gebam-input": { "tag": "input", "attrs": { "type": "text" }, "config": { "label": "", "controlId": "text-input" }, "id": "field-gebam-input" },

    "field-kostentrager-label": { "tag": "input", "attrs": { "type": "text", "value": "Kostenträgerkennung" }, "config": { "label": "", "controlId": "static-text" }, "id": "field-kostentrager-label" },
    "field-kostentrager-input": { "tag": "input", "attrs": { "type": "text"}, "config": { "label": "", "controlId": "text-input" }, "id": "field-kostentrager-input" },
    "field-versnr-label": { "tag": "input", "attrs": { "type": "text", "value": "Versicherten-Nr." }, "config": { "label": "", "controlId": "static-text" }, "id": "field-versnr-label" },
    "field-versnr-input": { "tag": "input", "attrs": { "type": "text"}, "config": { "label": "", "controlId": "text-input" }, "id": "field-versnr-input" },
    "field-status-label": { "tag": "input", "attrs": { "type": "text", "value": "Status" }, "config": { "label": "", "controlId": "static-text" }, "id": "field-status-label" },
    "field-status-input": { "tag": "input", "attrs": { "type": "text"}, "config": { "label": "", "controlId": "text-input" }, "id": "field-status-input" },
    
    "field-main-title": { "tag": "input", "attrs": { "type": "text", "value": "Anforderungsschein für Laboratoriumsuntersuchungen bei Laborgemeinschaften" }, "config": { "label": "", "controlId": "static-text", "isTitle": true, "align": "center" }, "id": "field-main-title" },
    
    "field-cb-kurativ": { "tag": "input", "attrs": { "type": "checkbox" }, "config": { "label": "Kurativ", "controlId": "checkbox-labelled" }, "options": [{"label":"", "value":"kurativ", "checked":false}], "id": "field-cb-kurativ" },
    "field-cb-praeventiv": { "tag": "input", "attrs": { "type": "checkbox" }, "config": { "label": "Präventiv", "controlId": "checkbox-labelled" }, "options": [{"label":"", "value":"praeventiv", "checked":false}], "id": "field-cb-praeventiv" },
    "field-cb-belegarzt": { "tag": "input", "attrs": { "type": "checkbox" }, "config": { "label": "bei belegärztl. Behandlung", "controlId": "checkbox-labelled" }, "options": [{"label":"", "value":"belegarzt", "checked":false}], "id": "field-cb-belegarzt" },
    "field-cb-unfall": { "tag": "input", "attrs": { "type": "checkbox" }, "config": { "label": "Unfall, Unfallfolgen", "controlId": "checkbox-labelled" }, "options": [{"label":"", "value":"unfall", "checked":false}], "id": "field-cb-unfall" },

    "field-zusatzangaben-label": { "tag": "input", "attrs": { "type": "text", "value": "Zusätzliche Angaben zu Untersuchungen" }, "config": { "label": "", "controlId": "static-text", "isSubheading": true }, "id": "field-zusatzangaben-label" },

    // Fields for BSNR, LANR, Datum
    "field-bsnr-label": { "tag": "input", "attrs": { "type": "text", "value": "Betriebsstätten-Nr." }, "config": { "label": "", "controlId": "static-text" }, "id": "field-bsnr-label" },
    "field-bsnr-input": { "tag": "input", "attrs": { "type": "text" }, "config": { "label": "", "controlId": "text-input" }, "id": "field-bsnr-input" },
    "field-lanr-label": { "tag": "input", "attrs": { "type": "text", "value": "Arzt-Nr." }, "config": { "label": "", "controlId": "static-text" }, "id": "field-lanr-label" },
    "field-lanr-input": { "tag": "input", "attrs": { "type": "text" }, "config": { "label": "", "controlId": "text-input" }, "id": "field-lanr-input" },
    "field-datum-label": { "tag": "input", "attrs": { "type": "text", "value": "Datum" }, "config": { "label": "", "controlId": "static-text" }, "id": "field-datum-label" },
    "field-datum-input": { "tag": "input", "attrs": { "type": "text" }, "config": { "label": "", "controlId": "text-input" }, "id": "field-datum-input" },

    "field-line-after-bsnr": { "tag": "input", "attrs": { "type": "text", "value":"" }, "config": { "label": "", "controlId": "horizontal-line" }, "id": "field-line-after-bsnr" }
  }
}
// --- END MUSTER 10 DATA ---

const submitFormData = document.getElementById('submit-formData')
const popover = document.getElementById('formData-popover')

const editorActionButtonContainer = document.getElementById('editor-action-buttons')
const renderFormWrap = document.querySelector('.render-form')

// Define which buttons to keep
const KEEPER_BUTTON_IDS = ['renderForm', 'generatePDF', 'resetEditor', 'loadMuster10'];

const editorActions = (editor, renderer) => ({
  renderForm: () => {
    renderFormWrap.style.display = 'block'
    renderer.render(editor.formData)
  },
  resetEditor: () => {
    window.sessionStorage.removeItem('formeo-formData')
    window.location.reload()
  },
  loadMuster10: () => { 
    editor.formData = JSON.parse(JSON.stringify(muster10InitialData));
    // Optionally, re-render the editor if it doesn't update automatically
    // This depends on Formeo's internal workings. If `editor.formData = data` is enough, this is not needed.
    // if (typeof editor.render === 'function') {
    //   editor.render(); 
    // }
  },
  generatePDF: async () => {
    const formeoData = editor.formData
    if (!formeoData || !formeoData.fields) {
      console.error('No form data found to generate PDF.')
      alert('No form data found. Please add some fields to the form first.')
      return
    }

    try {
      const pdfDoc = await PDFDocument.create()
      let page = pdfDoc.addPage() // Uses default page size (A4)
      const A4_WIDTH_POINTS = 595.28;
      const A4_HEIGHT_POINTS = 841.89;
      let { width: pageWidth, height: pageHeight } = page.getSize() // Initial page size, likely A4
      
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold) // Embed bold font
      const form = pdfDoc.getForm()

      // Attempt to get the bounding box of the Formeo editor area
      // This helps in making coordinates relative to the form, not the whole viewport.
      const formeoEditorElement = document.querySelector('.formeo-editor-stage') || document.querySelector('.build-form'); 
      const editorRect = formeoEditorElement ? formeoEditorElement.getBoundingClientRect() : { top: 0, left: 0, width: pageWidth, height: pageHeight }; // Fallback to page size

      // Calculate scaling factor (Iteration 3: Use minimum scale to fit and preserve aspect ratio)
      let scaleFactor = 1;
      if (formeoEditorElement && editorRect.width > 0 && editorRect.height > 0) {
        const scaleX = A4_WIDTH_POINTS / editorRect.width;
        const scaleY = A4_HEIGHT_POINTS / editorRect.height; // Consider height scaling
        scaleFactor = Math.min(scaleX, scaleY); // Use the smaller factor to ensure everything fits
      } else {
         // Fallback if editor dimensions are zero or element not found
         const scaleX = A4_WIDTH_POINTS / editorRect.width;
         scaleFactor = scaleX; // Default to width scaling if height is unknown
      }
      // Cap the scaling factor to prevent elements becoming excessively large if editor is tiny
      scaleFactor = Math.min(scaleFactor, 1.5); // Example cap: Don't scale up more than 150%
      // Prevent extreme downscaling if needed
      // scaleFactor = Math.max(scaleFactor, 0.1); // Example minimum scale

      // Adjust pageHeight conceptually for y-calculations if needed, though scaling should handle most
      // const scaledContentHeight = editorRect.height * scaleFactor;

      for (const fieldId in formeoData.fields) {
        if (Object.hasOwnProperty.call(formeoData.fields, fieldId)) {
          const field = formeoData.fields[fieldId]
          const fieldLabel = field.config.label || 'Field'
          const fieldType = field.attrs.type
          const controlId = field.config.controlId
          const fieldValue = field.attrs.value || ''
          const isTitle = field.config.isTitle || false
          const isSubheading = field.config.isSubheading || false // Check for subheading flag
          const fieldAlign = field.config.align || 'left' // Get alignment, default left

          const domElement = document.getElementById(fieldId)
          let x = 50, y = pageHeight - 50 - (Object.keys(formeoData.fields).indexOf(fieldId) * 70); // Default fallback positioning
          let elementWidth = 200, elementHeight = 20;

          if (domElement) {
            const rect = domElement.getBoundingClientRect()
            // Convert DOM coords to PDF coords & Apply UNIFORM scaling factor
            const scaledElemWidth = rect.width * scaleFactor;
            const scaledElemHeight = rect.height * scaleFactor;
            const scaledElemLeftOffset = (rect.left - editorRect.left) * scaleFactor;
            const scaledElemTopOffset = (rect.top - editorRect.top) * scaleFactor;

            // Calculate PDF coordinates with scaled values
            x = scaledElemLeftOffset;
            y = pageHeight - scaledElemTopOffset - scaledElemHeight;
            
            elementWidth = scaledElemWidth;
            elementHeight = scaledElemHeight;

            // Basic pagination (simplified, might need rework with scaling)
            if (y < 20 || y - elementHeight < 20) { 
              page = pdfDoc.addPage();
              const { height: newPageHeight } = page.getSize();
              pageHeight = newPageHeight; // Update pageHeight for new page
              // Recalculate y for new page based on scaled offset
              y = pageHeight - scaledElemTopOffset - scaledElemHeight; 
              if (y < 20 || y - elementHeight < 20) { // Failsafe if still too low (e.g. element taller than page)
                console.warn(`Element ${fieldId} might be too tall for the page after scaling.`);
                y = pageHeight - 50 - scaledElemHeight; // Place near top
              }
            }

          } else {
            console.warn(`DOM element not found for fieldId: ${fieldId}. Using default position.`)
          }

          // PDF Drawing Logic Modification
          if (controlId === 'static-text') {
            let textX = x;
            if (fieldAlign === 'center') {
              const textWidth = (isTitle ? fontBold : font).widthOfTextAtSize(fieldValue, isTitle ? 14 : (isSubheading ? 11 : 9));
              textX = x + (elementWidth / 2) - (textWidth / 2); 
            } else if (fieldAlign === 'right') {
              const textWidth = (isTitle ? fontBold : font).widthOfTextAtSize(fieldValue, isTitle ? 14 : (isSubheading ? 11 : 9));
              textX = x + elementWidth - textWidth;
            }

            page.drawText(fieldValue, { 
              x: textX,
              y: y + (elementHeight / 2) - (isTitle ? 6 * scaleFactor : (isSubheading ? 5 * scaleFactor : 4 * scaleFactor)), // Scale y-offset for text 
              font: isTitle ? fontBold : font, 
              size: (isTitle ? 14 : (isSubheading ? 11 : 9)) * scaleFactor, // Scale font size
              color: rgb(0, 0, 0),
              wordBreaks: [' '], // Break on spaces
            });
          } else if (controlId === 'horizontal-line') {
            // Iteration 1: Removed horizontal line drawing based on this placeholder
            // No drawing actions for this controlId anymore
          } else if (controlId === 'checkbox-labelled') { // Specific handling for checkboxes with labels next to them
            const option = field.options[0]; // Assuming single option for these specific checkboxes
            const checkboxId = `${fieldId}.${option.value}`;
            const checkBox = form.createCheckBox(checkboxId);
            const checkboxSize = Math.min(10 * scaleFactor, elementHeight * 0.8, elementWidth * 0.2); // Scale base size
            
            checkBox.addToPage(page, {
              x: x,
              y: y + (elementHeight / 2) - (checkboxSize / 2), 
              width: checkboxSize,
              height: checkboxSize,
              borderColor: rgb(0,0,0),
              borderWidth: 1,
            });
            page.drawText(field.config.label, { 
              x: x + checkboxSize + (5 * scaleFactor), // Scale gap
              y: y + (elementHeight / 2) - (4 * scaleFactor), // Scale y-offset for text
              font: font,
              size: 9 * scaleFactor, // Scale font size
              color: rgb(0, 0, 0),
            });
          } else if (controlId === 'text-input' || fieldType === 'text') {
            const textField = form.createTextField(fieldId)
            textField.setText(fieldValue)
            // Draw a border box resembling the original form THEN place the interactive field (possibly transparently)
            // page.drawRectangle({
            //   x: x,
            //   y: y,
            //   width: elementWidth,
            //   height: elementHeight,
            //   borderColor: rgb(0,0,0),
            //   borderWidth: 0.5,
            // });
            textField.addToPage(page, {
              x: x + 1, 
              y: y + 1,
              width: elementWidth - 2,
              height: elementHeight - 2,
              font: font,
              size: 9 * scaleFactor, // Scale font size
              textColor: rgb(0,0,0),
              backgroundColor: rgb(1, 1, 1), // Original background for inputs
              borderColor: rgb(0.7, 0.7, 0.7), // Original border for inputs
              borderWidth: 0.5, 
            })
          } else if (controlId === 'checkbox' || fieldType === 'checkbox') {
            if (field.options && field.options.length > 0) {
              let currentY = y + elementHeight - 15 ; // Start first checkbox near top of allocated field space
              for (const option of field.options) {
                const checkboxId = `${fieldId}.${option.value}`
                const checkBox = form.createCheckBox(checkboxId)
                const checkboxSize = Math.min(15 * scaleFactor, elementHeight / field.options.length * 0.8); // Scale checkbox if many options
                checkBox.addToPage(page, {
                  x: x,
                  y: currentY,
                  width: checkboxSize,
                  height: checkboxSize,
                  borderColor: rgb(0,0,0),
                  borderWidth: 1,
                })
                page.drawText(option.label, {
                  x: x + checkboxSize + 5 * scaleFactor,
                  y: currentY,
                  font: font,
                  size: Math.min(10 * scaleFactor, checkboxSize * 0.9),
                  color: rgb(0, 0, 0),
                })
                currentY -= (checkboxSize + 5 * scaleFactor) // Space for next checkbox option
              }
            } else { 
                 const checkBox = form.createCheckBox(fieldId)
                 checkBox.addToPage(page, {
                    x: x,
                    y: y,
                    width: Math.min(15 * scaleFactor, elementWidth, elementHeight), // Scale base size
                    height: Math.min(15 * scaleFactor, elementWidth, elementHeight), // Scale base size
                 })
            }
          }
        }
      }

      // --- Removed all hardcoded and dynamic line drawing from Iteration 1 & 2 ---
      // const firstColX = 30;
      // const rightMargin = pageWidth - 30;
      // L-Bracket top-left - REMOVED
      // page.drawLine({ start: { x: firstColX - 10, y: pageHeight - 25 }, end: { x: firstColX + 20, y: pageHeight - 25 }, thickness: 2, color: rgb(0,0,0) });
      // page.drawLine({ start: { x: firstColX - 10, y: pageHeight - 25 }, end: { x: firstColX - 10, y: pageHeight - 175 }, thickness: 2, color: rgb(0,0,0) });

      // --- Helper function getPdfRect is no longer needed if we don't draw lines based on it ---
      // const getPdfRect = (elementId) => { ... };

      // --- Removed dynamic lines based on Formeo Elements (Iteration 2) ---
      // Example: 
      // const krankenInputRect = getPdfRect('field-krankenkasse-input');
      // if (krankenInputRect) {
      //   page.drawLine({ start: { x: 30, y: krankenInputRect.y -1 }, end: { x: pageWidth - 180, y: krankenInputRect.y -1 }, thickness: 0.5 });
      // }
      // ... and so on for all other dynamic lines previously added

      const pdfBytes = await pdfDoc.save()

      // Trigger download
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'formeo-form.pdf'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
      console.log('PDF generated and download triggered.')
    } catch (err) {
      console.error('Error generating PDF:', err)
      alert('There was an error generating the PDF. See console for details.')
    }
  },
})

const buttonIdAttrsMap = {
  testData: { popovertarget: 'formData-popover' },
}
const getButtonAttrs = id => {
  const attrs = buttonIdAttrsMap[id] || {}
  return { id, type: 'button', ...attrs }
}

export const editorButtons = (editor, renderer) => {
  submitFormData.addEventListener('click', () => {
    editor.formData = jsonEditor.session.getValue()
    popover.hidePopover()
  })

  const buttonActions = editorActions(editor, renderer)
  const buttons = Object.entries(buttonActions).map(([id, cb]) => {
    const attrs = getButtonAttrs(id)
    const button = Object.assign(document.createElement('button'), attrs)
    for (const [key, value] of Object.entries(attrs)) {
      button.setAttribute(key, value)
    }
    const buttonText = document.createTextNode(startCase(id))
    button.appendChild(buttonText)
    button.addEventListener('click', cb, false)
    // editorActionButtonContainer.appendChild(button) // Appending will be conditional
    return button
  })
  .filter(button => KEEPER_BUTTON_IDS.includes(button.id)); // Filter to keep only specified buttons

  // Append only the filtered buttons
  buttons.forEach(button => editorActionButtonContainer.appendChild(button));

  return buttons
}

document.getElementById('format-json').addEventListener('click', formatJSON)
document.getElementById('collapse-json').addEventListener('click', collapseJSON)
document.getElementById('copy-json').addEventListener('click', copyJSON)

function formatJSON() {
  const val = jsonEditor.session.getValue()
  const o = JSON.parse(val)
  jsonEditor.setValue(JSON.stringify(o, null, 2), 1)
}

function collapseJSON() {
  const val = jsonEditor.session.getValue()
  const o = JSON.parse(val)
  jsonEditor.setValue(JSON.stringify(o, null, 0), 1)
}

async function copyJSON({ target }) {
  const textBackup = target.textContent
  target.textContent = 'Copied!'
  const timeout = setTimeout(() => {
    target.textContent = textBackup
    clearTimeout(timeout)
  }, 3000)

  try {
    await navigator.clipboard.writeText(jsonEditor.session.getValue())
    console.log('Text copied to clipboard')
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}
