# 🎲 ComfyUI-Wildcard (Simple Wildcard Combinator)

An interactive, visual Wildcard and Prompt Combinatorics Suite for **ComfyUI**. Featuring an ultra-responsive in-node DOM interface, multi-level category grouping, preset management, and real-time placeholder substitution.

---

## 🌟 Key Features

- 🎛️ **Interactive In-Node Visual UI:**
  Manage categories, options, weights, and active toggles directly inside the node canvas using clean, styled tabs.
- 📁 **Group & Category Hierarchy:**
  Organize prompts with main groups (e.g. `Woman`, `Man`, `Environment`) and nested sub-categories (e.g. `Alter & Typ`, `Kleidung`, `Beleuchtung`).
- 🔄 **Smart Placeholder Syntax:**
  - Group syntax: `[Group-Category]` (e.g. `[Woman-Alter & Typ]`)
  - Standalone syntax: `[Category]` (e.g. `[Pose]`, `[Kleidung]`)
  - Generic wildcard: `[wildcard]`
- 💾 **Preset Management:**
  Save, load, and export entire prompt configurations as reusable JSON presets.
- 🎲 **Flexible Selection Modes:**
  - `Random Selection`: Picks random active options per seed.
  - `Sequential`: Cycles through options deterministically.
  - `Combinatorial`: Tests all possible prompt combinations.
- 🔍 **Live Prompt Assembly & Preview:**
  Connects directly into any text encoder (`CLIPTextEncode`, `Krea2EditGroundedEncode`, etc.) while updating downstream previews instantly.

---

## 📦 Installation

### Method 1: ComfyUI Manager (Recommended)
1. Open ComfyUI Manager.
2. Click **Install via Git URL**.
3. Paste this repository URL and click Install.
4. Restart ComfyUI.

### Method 2: Manual Clone
```bash
cd ComfyUI/custom_nodes
git clone https://github.com/your-username/ComfyUI-Wildcard.git
# Restart ComfyUI
```

---

## 🚀 How to Use

1. Add node: **`Add Node ➔ utils ➔ Simple Wildcard Combinator`**.
2. Click **`+ Add Group`** or **`+ Add Category`** in the visual editor.
3. Add your prompt fragments (e.g. different outfits, camera angles, lighting conditions).
4. In the `input_prompt` box, reference your categories with brackets:
   ```text
   A photo of [Woman-Alter & Typ] with [Woman-Haare & Augen], [Woman-Kleidung], [Umgebung].
   ```
5. Click **Queue Prompt** — the node will automatically resolve all brackets and send the final prompt to the model!

---

## 📜 License
MIT License. Free for commercial and non-commercial use.
