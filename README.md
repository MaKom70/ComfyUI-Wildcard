# ComfyUI-Wildcard (Simple Wildcard Combinator)

A visual, high-performance, and feature-rich Wildcard Combinator node for [ComfyUI](https://github.com/comfyanonymous/ComfyUI). 

Easily create, organize, and randomize complex prompts using an intuitive 3-tier hierarchy, image thumbnails, built-in modal text editor, and conditional link dependencies.

---

## ✨ Features

- 📂 **3-Tier Hierarchy (`Group -> Category -> Option`)**:
  - Structure complex scenes easily (e.g., `Person1`, `Person2`, `Background`, `Lighting`).
  - Reference anywhere in your prompts using clean placeholders: `[GroupName-CategoryName]` (e.g., `[Person1-Outfit]`, `[Person2-Pose]`).
  - Add, remove, and reorder groups, categories, and options with **▲ / ▼** buttons.

- 📝 **Pop-up / Modal Text Editor**:
  - Full-screen text editor popup with live word & character count.
  - Open by clicking the **📝** button or **double-clicking** any option field.
  - Keyboard shortcuts: `Ctrl + Enter` to save, `Escape` to close.

- 🖼️ **Option Thumbnails & Visual Notes**:
  - Attach preview thumbnails (📷) to each option. Images are automatically downscaled client-side to max 120px JPEG (1–3 KB) to keep workflow files ultra-lightweight.
  - Add internal notes / descriptions for each option (for your own reference, excluded from final prompt generation).

- 🔗 **Smart Compatibility Links (Conditional Rules)**:
  - Define inter-category constraints (e.g., *If "Evening Gown" is selected for Person 1, only choose "Ballroom" or "Gala" for Location*).

- 💾 **Import & Export JSON**:
  - Save your wildcard libraries and presets to standalone `.json` files and import them into any workflow with a single click.

- 🔀 **3 Generation Modes**:
  - **Dynamic Syntax (Curly Braces)**: Outputs `{option1|option2|...}` for dynamic prompt expansion.
  - **Random Selection**: Seed-based reproducible random choice per execution.
  - **Sequential Selection**: Cycles through options sequentially.

- ⚡ **Bypass & Pass-Through Support**:
  - Toggle `active: False` to pass the original prompt through unmodified without disconnecting cables.

---

## 📦 Installation

### Method 1: Git Clone (Recommended)
Navigate to your ComfyUI `custom_nodes` folder and clone this repository:

```bash
cd custom_nodes
git clone https://github.com/MaKom70/ComfyUI-Wildcard.git
```

### Method 2: Manual Download
1. Download the repository as a `.zip` file from GitHub.
2. Extract the folder into `ComfyUI/custom_nodes/ComfyUI-Wildcard`.
3. Restart ComfyUI.

---

## 🚀 How to Use

1. **Add the Node**:
   - Right-click on the ComfyUI canvas -> `Add Node` -> `utils` -> **`Simple Wildcard Combinator`**.

2. **Connect to Your Workflow**:
   - Connect the output `prompt` of `Simple Wildcard Combinator` to your `CLIPTextEncode` or sampler/model prompt input.
   - (Optional) Connect a text string to `input_prompt` to use it as a pass-through filter.

3. **Configure Placeholders**:
   - Create a Group (e.g. `Person1`) -> Category (e.g. `Clothing`) -> Add options (`Red dress`, `Casual jeans`, etc.).
   - In your prompt text box, write:
     ```text
     A cinematic portrait of a woman wearing [Person1-Clothing], smiling at the camera, highly detailed.
     ```
   - When generating, `[Person1-Clothing]` is automatically replaced with your chosen option!

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
