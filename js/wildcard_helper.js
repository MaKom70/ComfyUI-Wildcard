import { app } from "../../scripts/app.js";

// Add styling rules for our custom category and group UI
const styleId = "wc-combinator-styles";
if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = `
        .wc-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding: 8px;
            background: #18181b;
            border-radius: 6px;
            border: 1px solid #27272a;
            color: #f4f4f5;
            font-family: sans-serif;
            width: 100%;
            box-sizing: border-box;
        }
        .wc-group {
            background: #242427;
            border: 1px solid #3f3f46;
            border-radius: 6px;
            padding: 8px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            position: relative;
            transition: opacity 0.15s ease;
        }
        .wc-group.disabled {
            opacity: 0.4;
        }
        .wc-group-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #3f3f46;
            padding-bottom: 4px;
            margin-bottom: 2px;
            gap: 6px;
        }
        .wc-group-title-input {
            flex: 1;
            background: transparent;
            border: none;
            color: #f59e0b;
            font-weight: bold;
            font-size: 14px;
            padding: 2px;
            border-bottom: 1px dashed #4b5563;
        }
        .wc-group-title-input:focus {
            outline: none;
            border-bottom: 1px solid #f59e0b;
        }
        .wc-categories-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-left: 8px;
            border-left: 1px dashed #3f3f46;
            padding-left: 8px;
        }
        .wc-category {
            background: #18181b;
            border: 1px solid #27272a;
            border-radius: 6px;
            padding: 8px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            position: relative;
            transition: opacity 0.15s ease;
        }
        .wc-category.disabled {
            opacity: 0.4;
        }
        .wc-cat-header {
            display: flex;
            justify-between: space-between;
            align-items: center;
            border-bottom: 1px solid #27272a;
            padding-bottom: 4px;
            margin-bottom: 4px;
            gap: 6px;
        }
        .wc-checkbox {
            cursor: pointer;
            width: 15px;
            height: 15px;
            margin: 0;
            accent-color: #3b82f6;
        }
        .wc-cat-title-input {
            flex: 1;
            background: transparent;
            border: none;
            color: #60a5fa;
            font-weight: bold;
            font-size: 13px;
            padding: 2px;
            border-bottom: 1px dashed #4b5563;
        }
        .wc-cat-title-input:focus {
            outline: none;
            border-bottom: 1px solid #60a5fa;
        }
        .wc-options-list {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
        .wc-option-row-wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
        }
        .wc-option-row {
            display: flex;
            gap: 6px;
            align-items: center;
            transition: opacity 0.15s ease;
            width: 100%;
        }
        .wc-option-row.disabled {
            opacity: 0.3;
        }
        .wc-opt-input {
            flex: 1;
            background: #09090b;
            border: 1px solid #27272a;
            border-radius: 4px;
            color: #f4f4f5;
            padding: 4px 6px;
            font-size: 12px;
        }
        .wc-opt-input:focus {
            outline: none;
            border-color: #60a5fa;
        }
        .wc-inputs-column {
            display: flex;
            flex-direction: column;
            gap: 4px;
            flex: 1;
        }
        .wc-opt-desc-input {
            background: transparent;
            border: none;
            border-bottom: 1px dashed #3f3f46;
            color: #a1a1aa;
            padding: 2px 4px;
            font-size: 11px;
        }
        .wc-opt-desc-input:focus {
            outline: none;
            border-bottom: 1px solid #60a5fa;
        }
        .wc-opt-thumb-btn {
            width: 36px;
            height: 36px;
            border: 1px dashed #4b5563;
            border-radius: 4px;
            background: #09090b;
            color: #71717a;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            font-size: 14px;
            flex-shrink: 0;
            position: relative;
        }
        .wc-opt-thumb-btn:hover {
            border-color: #60a5fa;
            color: #60a5fa;
        }
        .wc-opt-thumb-remove {
            position: absolute;
            top: -4px;
            right: -4px;
            background: #dc2626;
            color: #ffffff;
            border-radius: 50%;
            width: 12px;
            height: 12px;
            font-size: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        .wc-links-panel {
            background: #09090b;
            border: 1px solid #27272a;
            border-radius: 4px;
            padding: 6px 8px;
            margin: 4px 0 8px 24px;
            font-size: 11px;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }
        .wc-links-header {
            font-weight: bold;
            color: #a1a1aa;
            margin-bottom: 2px;
            border-bottom: 1px dashed #27272a;
            padding-bottom: 4px;
        }
        .wc-links-cat-title {
            color: #60a5fa;
            font-weight: bold;
            margin: 4px 0 2px 0;
        }
        .wc-links-opt-row {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            margin-right: 12px;
            color: #d4d4d8;
            cursor: pointer;
        }
        .wc-btn {
            background: #3f3f46;
            border: none;
            color: #f4f4f5;
            border-radius: 4px;
            padding: 4px 8px;
            cursor: pointer;
            font-size: 11px;
            font-weight: bold;
            transition: all 0.15s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 2px;
        }
        .wc-btn:hover {
            background: #52525b;
        }
        .wc-btn-add-opt {
            background: #16a34a;
        }
        .wc-btn-add-opt:hover {
            background: #15803d;
        }
        .wc-btn-link-toggle {
            background: #27272a;
            padding: 3px 5px;
        }
        .wc-btn-link-toggle:hover {
            background: #3f3f46;
        }
        .wc-btn-link-toggle.active {
            background: #2563eb;
            color: #ffffff;
        }
        .wc-btn-del {
            background: #dc2626;
            padding: 3px 6px;
        }
        .wc-btn-del:hover {
            background: #b91c1c;
        }
        .wc-btn-add-cat {
            background: #2563eb;
            align-self: flex-start;
        }
        .wc-btn-add-cat:hover {
            background: #1d4ed8;
        }
        .wc-btn-add-group {
            background: #d97706;
            padding: 6px 12px;
            font-size: 12px;
            align-self: center;
        }
        .wc-btn-add-group:hover {
            background: #b45309;
        }
        .wc-btn-arrow {
            background: #27272a;
            border: 1px solid #3f3f46;
            padding: 3px 5px;
            color: #a1a1aa;
        }
        .wc-btn-arrow:hover {
            background: #3f3f46;
            color: #ffffff;
        }
        .wc-preview {
            font-size: 11px;
            color: #a1a1aa;
            background: #09090b;
            padding: 6px;
            border-radius: 4px;
            border: 1px solid #27272a;
            white-space: normal;
            word-break: break-all;
            max-height: 85px;
            overflow-y: auto;
        }
        .wc-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(4px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
            font-family: sans-serif;
        }
        .wc-modal-box {
            background: #18181b;
            border: 1px solid #3f3f46;
            border-radius: 8px;
            width: 720px;
            max-width: 95vw;
            max-height: 90vh;
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
            box-sizing: border-box;
            color: #f4f4f5;
        }
        .wc-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 1px solid #27272a;
            padding-bottom: 8px;
        }
        .wc-modal-title {
            font-size: 14px;
            font-weight: bold;
            color: #60a5fa;
        }
        .wc-modal-subtitle {
            font-size: 12px;
            color: #a1a1aa;
            margin-top: 2px;
        }
        .wc-modal-textarea {
            width: 100%;
            height: 320px;
            min-height: 180px;
            max-height: 60vh;
            background: #09090b;
            border: 1px solid #3f3f46;
            border-radius: 6px;
            color: #f4f4f5;
            padding: 12px;
            font-family: inherit;
            font-size: 13px;
            line-height: 1.6;
            resize: vertical;
            box-sizing: border-box;
        }
        .wc-modal-textarea:focus {
            outline: none;
            border-color: #60a5fa;
        }
        .wc-modal-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid #27272a;
            padding-top: 8px;
        }
        .wc-modal-stats {
            font-size: 11px;
            color: #71717a;
        }
        .wc-modal-actions {
            display: flex;
            gap: 8px;
        }
        .wc-btn-edit-modal {
            background: #27272a;
            padding: 3px 5px;
            font-size: 11px;
        }
        .wc-btn-edit-modal:hover {
            background: #3f3f46;
        }
    `;
    document.head.appendChild(style);
}

app.registerExtension({
    name: "ComfyUI.WildcardHelper",
    async nodeCreated(node) {
        if (node.comfyClass === "SimpleWildcardCombinator") {
            node.isInitialized = false;
            node.isConfiguring = false;
            
            const jsonWidget = node.widgets.find(w => w.name === "options_json");
            const presetWidget = node.widgets.find(w => w.name === "preset");
            
            // Helper function to robustly hide the json storage widget
            const hideJsonWidget = () => {
                const target = node.widgets.find(w => w.name === "options_json");
                if (target) {
                    target.type = "hidden";
                    if (target.inputEl) {
                        target.inputEl.style.display = "none";
                    }
                    target.draw = () => {};
                    target.computeSize = () => [0, 0];
                }
            };
            
            hideJsonWidget();
            
            // Create DOM Container
            const container = document.createElement("div");
            container.className = "wc-container";
            
            const groupsContainer = document.createElement("div");
            groupsContainer.style.display = "flex";
            groupsContainer.style.flexDirection = "column";
            groupsContainer.style.gap = "10px";
            container.appendChild(groupsContainer);
            
            const controlsRow = document.createElement("div");
            controlsRow.style.display = "flex";
            controlsRow.style.gap = "8px";
            controlsRow.style.justifyContent = "center";
            controlsRow.style.marginTop = "4px";
            
            const addGroupBtn = document.createElement("button");
            addGroupBtn.className = "wc-btn wc-btn-add-group";
            addGroupBtn.textContent = "+ Group";
            controlsRow.appendChild(addGroupBtn);
            
            const importBtn = document.createElement("button");
            importBtn.className = "wc-btn";
            importBtn.style.background = "#4b5563";
            importBtn.textContent = "Import JSON";
            importBtn.title = "Import categories and options from a saved JSON file";
            controlsRow.appendChild(importBtn);
            
            const exportBtn = document.createElement("button");
            exportBtn.className = "wc-btn";
            exportBtn.style.background = "#4b5563";
            exportBtn.textContent = "Export JSON";
            exportBtn.title = "Export current categories and options to a JSON file";
            controlsRow.appendChild(exportBtn);
            
            // Export JSON handler
            exportBtn.onclick = (e) => {
                e.preventDefault();
                const filename = prompt("Enter filename to export:", "wildcards.json");
                if (!filename) return;
                
                const data = jsonWidget.value;
                const blob = new Blob([data], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement("a");
                a.href = url;
                a.download = filename.endsWith(".json") ? filename : (filename + ".json");
                a.click();
                URL.revokeObjectURL(url);
            };
            
            // Import JSON handler
            importBtn.onclick = (e) => {
                e.preventDefault();
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".json";
                input.onchange = (evt) => {
                    const file = evt.target.files[0];
                    if (!file) return;
                    
                    const reader = new FileReader();
                    reader.onload = (re) => {
                        try {
                            const parsed = JSON.parse(re.target.result);
                            if (Array.isArray(parsed)) {
                                loadState(parsed);
                            } else {
                                alert("Invalid JSON format! Must be an array of groups.");
                            }
                        } catch (err) {
                            alert("Failed to parse JSON file!");
                        }
                    };
                    reader.readAsText(file);
                };
                input.click();
            };
            
            container.appendChild(controlsRow);
            
            const previewHeader = document.createElement("div");
            previewHeader.style.fontSize = "11px";
            previewHeader.style.fontWeight = "bold";
            previewHeader.style.color = "#71717a";
            previewHeader.style.marginTop = "4px";
            previewHeader.textContent = "Live Braces Output Preview:";
            container.appendChild(previewHeader);
            
            const previewDiv = document.createElement("div");
            previewDiv.className = "wc-preview";
            previewDiv.textContent = "";
            container.appendChild(previewDiv);
            
            // Helper to dynamically calculate height based on visible DOM elements
            // If the elements are not attached in the document tree yet (like during restoration),
            // it estimates the height mathematically based on the DOM children count to prevent flat layouts.
            const measureContentHeight = (root) => {
                if (!root) return 120;
                let h = 0;
                let count = 0;
                let hasRealHeights = false;
                
                for (const child of root.children) {
                    if (child.style.display === "none") continue;
                    const ch = child.offsetHeight || child.getBoundingClientRect().height || 0;
                    if (ch > 0) {
                        hasRealHeights = true;
                    }
                    h += ch;
                    count += 1;
                }
                
                // Fallback mathematical estimator if elements are not attached/rendered yet
                if (!hasRealHeights) {
                    const groups = root.querySelectorAll(".wc-group");
                    let estimatedH = 0;
                    groups.forEach(group => {
                        const categories = group.querySelectorAll(".wc-category");
                        let groupH = 46; // group header
                        categories.forEach(cat => {
                            const opts = cat.querySelectorAll(".wc-option-row-wrapper");
                            groupH += 36 + (opts.length * 30) + 30 + 12;
                        });
                        groupH += 30 + 12;
                        estimatedH += groupH;
                    });
                    estimatedH += 34 + 85 + 25;
                    return Math.max(120, estimatedH);
                }
                
                const cs = window.getComputedStyle(root);
                const gap = parseFloat(cs.rowGap || cs.gap) || 0;
                if (count > 1) h += gap * (count - 1);
                h += parseFloat(cs.paddingTop) || 0;
                h += parseFloat(cs.paddingBottom) || 0;
                h += parseFloat(cs.borderTopWidth) || 0;
                h += parseFloat(cs.borderBottomWidth) || 0;
                return Math.max(120, Math.ceil(h) + 15);
            };
            
            // Helper to create Arrow Up/Down buttons for DOM element swapping
            const createArrowButtons = (el) => {
                const upBtn = document.createElement("button");
                upBtn.className = "wc-btn wc-btn-arrow";
                upBtn.textContent = "▲";
                upBtn.title = "Move Up";
                upBtn.onclick = (e) => {
                    e.preventDefault();
                    const prev = el.previousElementSibling;
                    if (prev) {
                        el.parentNode.insertBefore(el, prev);
                        serializeState();
                        updateSize();
                    }
                };
                
                const downBtn = document.createElement("button");
                downBtn.className = "wc-btn wc-btn-arrow";
                downBtn.textContent = "▼";
                downBtn.title = "Move Down";
                downBtn.onclick = (e) => {
                    e.preventDefault();
                    const next = el.nextElementSibling;
                    if (next) {
                        el.parentNode.insertBefore(next, el);
                        serializeState();
                        updateSize();
                    }
                };
                
                return { upBtn, downBtn };
            };
            
            // Modal Text Editor Popup
            const openPromptModal = (initialText, contextTitle, noteText, onSave) => {
                const overlay = document.createElement("div");
                overlay.className = "wc-modal-overlay";
                
                const box = document.createElement("div");
                box.className = "wc-modal-box";
                
                // Header
                const header = document.createElement("div");
                header.className = "wc-modal-header";
                
                const titleContainer = document.createElement("div");
                const title = document.createElement("div");
                title.className = "wc-modal-title";
                title.textContent = contextTitle ? `Edit Prompt: ${contextTitle}` : "Edit Prompt";
                titleContainer.appendChild(title);
                
                if (noteText) {
                    const subtitle = document.createElement("div");
                    subtitle.className = "wc-modal-subtitle";
                    subtitle.textContent = `Note: ${noteText}`;
                    titleContainer.appendChild(subtitle);
                }
                header.appendChild(titleContainer);
                
                const closeBtn = document.createElement("button");
                closeBtn.className = "wc-btn wc-btn-del";
                closeBtn.textContent = "✕";
                closeBtn.title = "Close (Esc)";
                header.appendChild(closeBtn);
                
                box.appendChild(header);
                
                // Textarea
                const textarea = document.createElement("textarea");
                textarea.className = "wc-modal-textarea";
                textarea.value = initialText || "";
                textarea.placeholder = "Enter full prompt text here...";
                box.appendChild(textarea);
                
                // Footer
                const footer = document.createElement("div");
                footer.className = "wc-modal-footer";
                
                const stats = document.createElement("div");
                stats.className = "wc-modal-stats";
                
                const updateStats = () => {
                    const chars = textarea.value.length;
                    const words = textarea.value.trim() ? textarea.value.trim().split(/\s+/).length : 0;
                    stats.textContent = `${words} words | ${chars} characters | Ctrl+Enter to save`;
                };
                updateStats();
                textarea.addEventListener("input", updateStats);
                
                footer.appendChild(stats);
                
                const actions = document.createElement("div");
                actions.className = "wc-modal-actions";
                
                const cancelBtn = document.createElement("button");
                cancelBtn.className = "wc-btn";
                cancelBtn.textContent = "Cancel";
                
                const saveBtn = document.createElement("button");
                saveBtn.className = "wc-btn";
                saveBtn.style.background = "#2563eb";
                saveBtn.textContent = "Save";
                
                actions.appendChild(cancelBtn);
                actions.appendChild(saveBtn);
                footer.appendChild(actions);
                box.appendChild(footer);
                overlay.appendChild(box);
                
                const closeModal = () => {
                    overlay.remove();
                    document.removeEventListener("keydown", handleKeydown, true);
                };
                
                const saveAndClose = () => {
                    onSave(textarea.value);
                    closeModal();
                };
                
                closeBtn.onclick = closeModal;
                cancelBtn.onclick = closeModal;
                saveBtn.onclick = saveAndClose;
                
                // Click outside modal box closes modal
                overlay.onclick = (e) => {
                    if (e.target === overlay) {
                        closeModal();
                    }
                };
                
                const handleKeydown = (e) => {
                    if (e.key === "Escape") {
                        e.preventDefault();
                        e.stopPropagation();
                        closeModal();
                    } else if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                        e.preventDefault();
                        e.stopPropagation();
                        saveAndClose();
                    }
                };
                document.addEventListener("keydown", handleKeydown, true);
                
                document.body.appendChild(overlay);
                setTimeout(() => textarea.focus(), 50);
            };
            
            // Override computeSize on the LiteGraph node instance so that ComfyUI's main layout loop
            // queries this dynamically to determine the node size instead of clamping it to standard defaults.
            node.computeSize = function() {
                const domHeight = measureContentHeight(container);
                
                // Sum the heights of standard visible widgets (each ~24px)
                let widgetsHeight = 0;
                if (this.widgets) {
                    this.widgets.forEach(w => {
                        if (w.type !== "hidden" && w.name !== "wc_dom_widget" && w.name !== "options_json") {
                            widgetsHeight += 24;
                        }
                    });
                }
                
                // Total height = Header (~40px) + widgets + DOM content + safe padding (~35px)
                const totalHeight = 40 + widgetsHeight + domHeight + 35;
                return [Math.max(this.size[0], 360), totalHeight];
            };
            
            // Add DOM widget with dynamic getMinHeight resolver
            const domWidget = node.addDOMWidget("wc_dom_widget", "div", container, {
                serialize: false,
                getMinHeight: () => measureContentHeight(container)
            });
            
            // Auto size node to fit the dynamic UI height and standard widgets
            const updateSize = () => {
                setTimeout(() => {
                    hideJsonWidget();
                    
                    // Force the widget height property to update
                    const widget = node.widgets?.find(w => w.name === "wc_dom_widget");
                    if (widget) {
                        widget.height = measureContentHeight(container);
                    }
                    
                    // Recalculate layout using overridden computeSize and redraw canvas
                    const newSize = node.computeSize();
                    if (node.setSize) {
                        node.setSize(newSize);
                    } else {
                        node.size = newSize;
                    }
                    node.setDirtyCanvas(true, true);
                }, 100);
            };
            
            // Dynamically render the links config panel below a linked option
            const renderLinksPanel = (panelDiv, optText, currentLinks = {}) => {
                panelDiv.innerHTML = "";
                
                const header = document.createElement("div");
                header.className = "wc-links-header";
                header.textContent = `Compatibility filter: only choose these options if "${optText || 'this option'}" is selected:`;
                panelDiv.appendChild(header);
                
                // Get all groups and categories in the node
                const groupDivs = groupsContainer.querySelectorAll(".wc-group");
                let otherCatsCount = 0;
                
                // Find our own category div and group div to exclude them
                const ownCatDiv = panelDiv.closest(".wc-category");
                const ownCatName = ownCatDiv.querySelector(".wc-cat-title-input").value;
                const ownGroupDiv = panelDiv.closest(".wc-group");
                const ownGroupName = ownGroupDiv.querySelector(".wc-group-title-input").value;
                
                const ownFullId = `${ownGroupName}-${ownCatName}`;
                
                groupDivs.forEach(groupDiv => {
                    const groupName = groupDiv.querySelector(".wc-group-title-input").value;
                    const catDivs = groupDiv.querySelectorAll(".wc-category");
                    
                    catDivs.forEach(catDiv => {
                        const catName = catDiv.querySelector(".wc-cat-title-input").value;
                        const fullId = `${groupName}-${catName}`;
                        if (fullId === ownFullId) return; // skip own category
                        
                        otherCatsCount++;
                        
                        const catTitle = document.createElement("div");
                        catTitle.className = "wc-links-cat-title";
                        catTitle.textContent = `${groupName} > ${catName}`;
                        panelDiv.appendChild(catTitle);
                        
                        const optsContainer = document.createElement("div");
                        optsContainer.style.display = "flex";
                        optsContainer.style.flexWrap = "wrap";
                        optsContainer.style.gap = "4px 8px";
                        
                        const optInputs = catDiv.querySelectorAll(".wc-opt-input");
                        optInputs.forEach(input => {
                            const optVal = input.value.trim();
                            if (!optVal) return;
                            
                            const optRow = document.createElement("label");
                            optRow.className = "wc-links-opt-row";
                            
                            const checkbox = document.createElement("input");
                            checkbox.type = "checkbox";
                            checkbox.className = "wc-checkbox";
                            
                            // Check if this option is currently linked
                            const isLinked = currentLinks[fullId] && currentLinks[fullId].includes(optVal);
                            checkbox.checked = !!isLinked;
                            
                            checkbox.onchange = () => {
                                if (!currentLinks[fullId]) {
                                    currentLinks[fullId] = [];
                                }
                                if (checkbox.checked) {
                                    if (!currentLinks[fullId].includes(optVal)) {
                                        currentLinks[fullId].push(optVal);
                                    }
                                } else {
                                    currentLinks[fullId] = currentLinks[fullId].filter(x => x !== optVal);
                                    if (currentLinks[fullId].length === 0) {
                                        delete currentLinks[fullId];
                                    }
                                }
                                serializeState();
                            };
                            
                            optRow.appendChild(checkbox);
                            optRow.appendChild(document.createTextNode(" " + optVal));
                            optsContainer.appendChild(optRow);
                        });
                        
                        panelDiv.appendChild(optsContainer);
                    });
                });
                
                if (otherCatsCount === 0) {
                    const noCats = document.createElement("div");
                    noCats.style.color = "#71717a";
                    noCats.style.fontStyle = "italic";
                    noCats.textContent = "No other categories available. Add another category first!";
                    panelDiv.appendChild(noCats);
                }
            };
            
            // Gather values and save to hidden options_json widget
            const serializeState = () => {
                const groups = [];
                const groupDivs = groupsContainer.querySelectorAll(".wc-group");
                
                groupDivs.forEach(groupDiv => {
                    const groupTitleInput = groupDiv.querySelector(".wc-group-title-input");
                    const groupActive = groupDiv.querySelector(".wc-group-active").checked;
                    const catDivs = groupDiv.querySelectorAll(".wc-category");
                    
                    const categories = [];
                    catDivs.forEach(catDiv => {
                        const titleInput = catDiv.querySelector(".wc-cat-title-input");
                        const catActive = catDiv.querySelector(".wc-cat-active").checked;
                        const optInputs = catDiv.querySelectorAll(".wc-opt-input");
                        
                        const options = [];
                        optInputs.forEach(input => {
                            const wrapper = input.closest(".wc-option-row-wrapper");
                            const row = input.closest(".wc-option-row");
                            const optActive = row.querySelector(".wc-opt-active").checked;
                            const descInput = row.querySelector(".wc-opt-desc-input");
                            const thumbBtn = row.querySelector(".wc-opt-thumb-btn");
                            
                            options.push({
                                text: input.value,
                                active: optActive,
                                desc: descInput ? descInput.value : "",
                                image: thumbBtn ? (thumbBtn._wc_image || "") : "",
                                links: wrapper._wc_links || {}
                            });
                        });
                        
                        categories.push({
                            name: titleInput.value,
                            active: catActive,
                            options: options
                        });
                    });
                    
                    groups.push({
                        name: groupTitleInput.value,
                        active: groupActive,
                        categories: categories
                    });
                });
                
                const jsonStr = JSON.stringify(groups);
                if (jsonWidget) {
                    jsonWidget.value = jsonStr;
                }
                
                // Refresh live preview string
                const previewBlocks = [];
                groups.forEach(group => {
                    if (!group.active) return;
                    group.categories.forEach(cat => {
                        if (!cat.active) return;
                        const validOpts = cat.options
                            .filter(o => o.active)
                            .map(o => o.text.trim())
                            .filter(o => o);
                            
                        if (validOpts.length > 1) {
                            previewBlocks.push("{" + validOpts.join("|") + "}");
                        } else if (validOpts.length === 1) {
                            previewBlocks.push(validOpts[0]);
                        }
                    });
                });
                previewDiv.textContent = previewBlocks.join(", ");
                
                node.setDirtyCanvas(true, true);
            };
            
            // Build visual DOM list from a state object
            const loadState = (groups) => {
                groupsContainer.innerHTML = "";
                if (!Array.isArray(groups)) return;
                
                // Migration: if it is the old category list structure, wrap it in a default group
                if (groups.length > 0 && !groups[0].categories && groups[0].options) {
                    groups = [
                        {
                            name: "Default",
                            active: true,
                            categories: groups
                        }
                    ];
                }
                
                groups.forEach(group => {
                    createGroupDOM(group.name, group.categories, group.active !== false);
                });
                
                serializeState();
                updateSize();
            };
            
            // Build single Group block
            const createGroupDOM = (name = "Group", categories = [], groupActive = true) => {
                const groupDiv = document.createElement("div");
                groupDiv.className = "wc-group" + (groupActive ? "" : " disabled");
                
                const header = document.createElement("div");
                header.className = "wc-group-header";
                
                // Group active checkbox
                const groupActiveCheckbox = document.createElement("input");
                groupActiveCheckbox.type = "checkbox";
                groupActiveCheckbox.className = "wc-checkbox wc-group-active";
                groupActiveCheckbox.checked = groupActive;
                groupActiveCheckbox.onchange = () => {
                    if (groupActiveCheckbox.checked) {
                        groupDiv.classList.remove("disabled");
                    } else {
                        groupDiv.classList.add("disabled");
                    }
                    serializeState();
                };
                header.appendChild(groupActiveCheckbox);
                
                const titleInput = document.createElement("input");
                titleInput.className = "wc-group-title-input";
                titleInput.value = name;
                titleInput.addEventListener("input", serializeState);
                header.appendChild(titleInput);
                
                // Group Up/Down arrows
                const groupArrows = createArrowButtons(groupDiv);
                header.appendChild(groupArrows.upBtn);
                header.appendChild(groupArrows.downBtn);
                
                const deleteGroupBtn = document.createElement("button");
                deleteGroupBtn.className = "wc-btn wc-btn-del";
                deleteGroupBtn.textContent = "Remove";
                deleteGroupBtn.onclick = () => {
                    groupDiv.remove();
                    serializeState();
                    updateSize();
                };
                header.appendChild(deleteGroupBtn);
                
                groupDiv.appendChild(header);
                
                const categoriesList = document.createElement("div");
                categoriesList.className = "wc-categories-list";
                groupDiv.appendChild(categoriesList);
                
                const addCatBtn = document.createElement("button");
                addCatBtn.className = "wc-btn wc-btn-add-cat";
                addCatBtn.style.marginTop = "6px";
                addCatBtn.textContent = "+ Category";
                
                const addCategoryDOM = (catName = "Category", options = [], catActive = true) => {
                    const catDiv = document.createElement("div");
                    catDiv.className = "wc-category" + (catActive ? "" : " disabled");
                    
                    const catHeader = document.createElement("div");
                    catHeader.className = "wc-cat-header";
                    
                    // Category active checkbox
                    const catActiveCheckbox = document.createElement("input");
                    catActiveCheckbox.type = "checkbox";
                    catActiveCheckbox.className = "wc-checkbox wc-cat-active";
                    catActiveCheckbox.checked = catActive;
                    catActiveCheckbox.onchange = () => {
                        if (catActiveCheckbox.checked) {
                            catDiv.classList.remove("disabled");
                        } else {
                            catDiv.classList.add("disabled");
                        }
                        serializeState();
                    };
                    catHeader.appendChild(catActiveCheckbox);
                    
                    const catTitleInput = document.createElement("input");
                    catTitleInput.className = "wc-cat-title-input";
                    catTitleInput.value = catName;
                    catTitleInput.addEventListener("input", serializeState);
                    catHeader.appendChild(catTitleInput);
                    
                    // Category Up/Down arrows
                    const catArrows = createArrowButtons(catDiv);
                    catHeader.appendChild(catArrows.upBtn);
                    catHeader.appendChild(catArrows.downBtn);
                    
                    const deleteCatBtn = document.createElement("button");
                    deleteCatBtn.className = "wc-btn wc-btn-del";
                    deleteCatBtn.textContent = "Remove";
                    deleteCatBtn.onclick = () => {
                        catDiv.remove();
                        serializeState();
                        updateSize();
                    };
                    catHeader.appendChild(deleteCatBtn);
                    
                    catDiv.appendChild(catHeader);
                    
                    const optionsList = document.createElement("div");
                    optionsList.className = "wc-options-list";
                    catDiv.appendChild(optionsList);
                    
                    const addOptBtn = document.createElement("button");
                    addOptBtn.className = "wc-btn wc-btn-add-opt";
                    addOptBtn.style.marginTop = "6px";
                    addOptBtn.textContent = "+ Option";
                    
                    const addOptionRow = (val = "", optActive = true, links = {}, desc = "", image = "") => {
                        const rowWrapper = document.createElement("div");
                        rowWrapper.className = "wc-option-row-wrapper";
                        rowWrapper._wc_links = links;
                        
                        const row = document.createElement("div");
                        row.className = "wc-option-row" + (optActive ? "" : " disabled");
                        
                        // Option active checkbox
                        const optActiveCheckbox = document.createElement("input");
                        optActiveCheckbox.type = "checkbox";
                        optActiveCheckbox.className = "wc-checkbox wc-opt-active";
                        optActiveCheckbox.checked = optActive;
                        optActiveCheckbox.onchange = () => {
                            if (optActiveCheckbox.checked) {
                                row.classList.remove("disabled");
                            } else {
                                row.classList.add("disabled");
                            }
                            serializeState();
                        };
                        row.appendChild(optActiveCheckbox);
                        
                        // Thumbnail image button
                        const thumbBtn = document.createElement("div");
                        thumbBtn.className = "wc-opt-thumb-btn";
                        thumbBtn._wc_image = image;
                        
                        const updateThumbUI = () => {
                            if (thumbBtn._wc_image) {
                                thumbBtn.style.backgroundImage = `url(${thumbBtn._wc_image})`;
                                thumbBtn.textContent = "";
                                
                                // Add remove button
                                if (!thumbBtn.querySelector(".wc-opt-thumb-remove")) {
                                    const removeX = document.createElement("div");
                                    removeX.className = "wc-opt-thumb-remove";
                                    removeX.textContent = "✕";
                                    removeX.title = "Remove image";
                                    removeX.onclick = (e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        thumbBtn._wc_image = "";
                                        updateThumbUI();
                                        serializeState();
                                    };
                                    thumbBtn.appendChild(removeX);
                                }
                            } else {
                                thumbBtn.style.backgroundImage = "none";
                                thumbBtn.textContent = "📷";
                                const removeX = thumbBtn.querySelector(".wc-opt-thumb-remove");
                                if (removeX) removeX.remove();
                            }
                        };
                        updateThumbUI();
                        
                        thumbBtn.onclick = (e) => {
                            e.preventDefault();
                            const imgInput = document.createElement("input");
                            imgInput.type = "file";
                            imgInput.accept = "image/*";
                            imgInput.onchange = (evt) => {
                                const file = evt.target.files[0];
                                if (!file) return;
                                
                                const reader = new FileReader();
                                reader.onload = (readEvt) => {
                                    const tempImg = new Image();
                                    tempImg.onload = () => {
                                        const canvas = document.createElement("canvas");
                                        let w = tempImg.width;
                                        let h = tempImg.height;
                                        const maxDim = 120;
                                        if (w > maxDim || h > maxDim) {
                                            if (w > h) {
                                                h = Math.round((h * maxDim) / w);
                                                w = maxDim;
                                            } else {
                                                w = Math.round((w * maxDim) / h);
                                                h = maxDim;
                                            }
                                        }
                                        canvas.width = w;
                                        canvas.height = h;
                                        const ctx = canvas.getContext("2d");
                                        ctx.drawImage(tempImg, 0, 0, w, h);
                                        const base64 = canvas.toDataURL("image/jpeg", 0.7);
                                        
                                        thumbBtn._wc_image = base64;
                                        updateThumbUI();
                                        serializeState();
                                    };
                                    tempImg.src = readEvt.target.result;
                                };
                                reader.readAsDataURL(file);
                            };
                            imgInput.click();
                        };
                        row.appendChild(thumbBtn);
                        
                        // Inputs Column (Prompt input + Description input)
                        const inputsCol = document.createElement("div");
                        inputsCol.className = "wc-inputs-column";
                        
                        const optInput = document.createElement("input");
                        optInput.className = "wc-opt-input";
                        optInput.type = "text";
                        optInput.value = val;
                        optInput.placeholder = "Option prompt text";
                        optInput.title = "Double-click to open full text editor";
                        optInput.addEventListener("input", serializeState);
                        optInput.addEventListener("dblclick", (e) => {
                            e.preventDefault();
                            editModalBtn.click();
                        });
                        inputsCol.appendChild(optInput);
                        
                        const descInput = document.createElement("input");
                        descInput.className = "wc-opt-desc-input";
                        descInput.type = "text";
                        descInput.value = desc;
                        descInput.placeholder = "Description / Note (internal only)";
                        descInput.addEventListener("input", serializeState);
                        inputsCol.appendChild(descInput);
                        
                        row.appendChild(inputsCol);
                        
                        // Option Up/Down arrows
                        const optArrows = createArrowButtons(rowWrapper);
                        row.appendChild(optArrows.upBtn);
                        row.appendChild(optArrows.downBtn);
                        
                        // Modal Text Editor button
                        const editModalBtn = document.createElement("button");
                        editModalBtn.className = "wc-btn wc-btn-edit-modal";
                        editModalBtn.textContent = "📝";
                        editModalBtn.title = "Open full-screen text editor";
                        editModalBtn.onclick = (e) => {
                            e.preventDefault();
                            const ownCatDiv = rowWrapper.closest(".wc-category");
                            const ownCatName = ownCatDiv ? ownCatDiv.querySelector(".wc-cat-title-input").value : "";
                            const ownGroupDiv = rowWrapper.closest(".wc-group");
                            const ownGroupName = ownGroupDiv ? ownGroupDiv.querySelector(".wc-group-title-input").value : "";
                            const contextTitle = `${ownGroupName} > ${ownCatName}`;
                            const noteText = descInput.value;
                            
                            openPromptModal(optInput.value, contextTitle, noteText, (newText) => {
                                optInput.value = newText;
                                serializeState();
                            });
                        };
                        row.appendChild(editModalBtn);
                        
                        // Links panel element
                        const linksPanel = document.createElement("div");
                        linksPanel.className = "wc-links-panel";
                        linksPanel.style.display = "none";
                        
                        // Link button
                        const linkBtn = document.createElement("button");
                        linkBtn.className = "wc-btn wc-btn-link-toggle";
                        linkBtn.textContent = "🔗";
                        linkBtn.title = "Configure links/constraints to other categories";
                        linkBtn.onclick = () => {
                            if (linksPanel.style.display === "none") {
                                linksPanel.style.display = "flex";
                                linkBtn.classList.add("active");
                                renderLinksPanel(linksPanel, optInput.value, rowWrapper._wc_links);
                            } else {
                                linksPanel.style.display = "none";
                                linkBtn.classList.remove("active");
                            }
                            updateSize();
                        };
                        row.appendChild(linkBtn);
                        
                        const delOptBtn = document.createElement("button");
                        delOptBtn.className = "wc-btn wc-btn-del";
                        delOptBtn.textContent = "✕";
                        delOptBtn.onclick = () => {
                            rowWrapper.remove();
                            serializeState();
                            updateSize();
                        };
                        row.appendChild(delOptBtn);
                        
                        rowWrapper.appendChild(row);
                        rowWrapper.appendChild(linksPanel);
                        
                        optionsList.appendChild(rowWrapper);
                        updateSize();
                    };
                    
                    addOptBtn.onclick = () => {
                        addOptionRow("", true, {}, "", "");
                        serializeState();
                    };
                    catDiv.appendChild(addOptBtn);
                    
                    categoriesList.appendChild(catDiv);
                    
                    options.forEach(opt => {
                        if (opt && typeof opt === "object") {
                            addOptionRow(opt.text || "", opt.active !== false, opt.links || {}, opt.desc || "", opt.image || "");
                        } else {
                            addOptionRow(String(opt || ""), true, {}, "", "");
                        }
                    });
                    updateSize();
                };
                
                addCatBtn.onclick = () => {
                    addCategoryDOM("Category " + (categoriesList.children.length + 1), [""], true);
                    serializeState();
                };
                groupDiv.appendChild(addCatBtn);
                
                groupsContainer.appendChild(groupDiv);
                
                categories.forEach(cat => {
                    addCategoryDOM(cat.name, cat.options, cat.active !== false);
                });
                updateSize();
            };
            
            // Add Group trigger
            addGroupBtn.onclick = () => {
                createGroupDOM("Group " + (groupsContainer.children.length + 1), [], true);
                serializeState();
            };
            
            // Trigger load options from Preset Dropdown
            if (presetWidget) {
                const origCallback = presetWidget.callback;
                presetWidget.callback = function(value, ...args) {
                    if (origCallback) {
                        origCallback.apply(this, [value, ...args]);
                    }
                    
                    if (!node.isInitialized || node.isConfiguring) {
                        return;
                    }
                    
                    if (value && value !== "[select preset]") {
                        fetch("/wildcard_helper/get_content", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ name: value })
                        })
                        .then(r => r.json())
                        .then(data => {
                            if (data.content) {
                                const optionsList = data.content.split(",").map(o => o.trim()).filter(o => o);
                                const presetName = value.split("/").pop().replace(".txt", "");
                                loadState([{
                                    name: "Presets",
                                    active: true,
                                    categories: [{ name: presetName, active: true, options: optionsList.map(o => ({ text: o, active: true, links: {} })) }]
                                }]);
                            }
                        })
                        .catch(err => console.error("Error loading preset:", err));
                    }
                };
            }
            
            // Handle loading saved workflow JSON
            const origConfigure = node.onConfigure;
            node.onConfigure = function() {
                node.isConfiguring = true;
                if (origConfigure) {
                    origConfigure.apply(this, arguments);
                }
                
                hideJsonWidget();
                
                try {
                    const savedData = JSON.parse(jsonWidget.value);
                    if (Array.isArray(savedData)) {
                        loadState(savedData);
                    }
                } catch (e) {
                    loadState([{
                        name: "Group 1",
                        active: true,
                        categories: [{ name: "Category 1", active: true, options: [{ text: "option 1", active: true, links: {} }] }]
                    }]);
                }
                
                node.isConfiguring = false;
            };
            
            // Init default state on fresh node addition
            setTimeout(() => {
                hideJsonWidget();
                if (!jsonWidget.value || jsonWidget.value === "[]" || jsonWidget.value === '""') {
                    // Create a clean, empty state without hardcoded data, just a default empty Group
                    loadState([
                        {
                            name: "Group 1",
                            active: true,
                            categories: [
                                {
                                    name: "Category 1",
                                    active: true,
                                    options: [{ text: "", active: true, links: {} }]
                                }
                            ]
                        }
                    ]);
                } else {
                    try {
                        const savedData = JSON.parse(jsonWidget.value);
                        if (Array.isArray(savedData)) {
                            loadState(savedData);
                        }
                    } catch (e) {
                        loadState([{
                            name: "Group 1",
                            active: true,
                            categories: [{ name: "Category 1", active: true, options: [{ text: "", active: true, links: {} }] }]
                        }]);
                    }
                }
                node.isInitialized = true;
                updateSize();
            }, 150);
            
            // Deferred safety check to snap node height back if a large size was restored from a saved workflow
            setTimeout(() => {
                updateSize();
            }, 600);
        }
    }
});
