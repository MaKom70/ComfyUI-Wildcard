import os
import random
import json
from pathlib import Path
from server import PromptServer
from aiohttp import web

# Global cache of preset files
# Maps display_name -> absolute_path
PRESET_CACHE = {}

def update_preset_cache():
    global PRESET_CACHE
    PRESET_CACHE = {}
    
    import folder_paths
    comfy_root = Path(folder_paths.base_path)
    
    search_dirs = [
        ("Root", comfy_root / "wildcards"),
        ("CustomNode", Path(os.path.dirname(__file__)) / "wildcards"),
        ("DynamicPrompts", comfy_root / "custom_nodes" / "comfyui-dynamicprompts" / "wildcards"),
        ("EasyUse", comfy_root / "custom_nodes" / "comfyui-easy-use" / "wildcards"),
        ("ImpactPack", comfy_root / "custom_nodes" / "comfyui-impact-pack" / "wildcards"),
        ("ImpactPackCustom", comfy_root / "custom_nodes" / "comfyui-impact-pack" / "custom_wildcards"),
    ]
    
    options = ["[select preset]"]
    for prefix, search_dir in search_dirs:
        if search_dir.exists() and search_dir.is_dir():
            for root, _, files in os.walk(search_dir):
                for file in files:
                    if file.endswith(".txt"):
                        full_path = Path(root) / file
                        try:
                            rel_path = full_path.relative_to(search_dir)
                            display_name = f"{prefix}/{rel_path.as_posix()}"
                            PRESET_CACHE[display_name] = str(full_path)
                            options.append(display_name)
                        except Exception:
                            continue
                            
    return ["[select preset]"] + sorted([opt for opt in options if opt != "[select preset]"])

# Register aiohttp endpoint to get preset content
@PromptServer.instance.routes.post("/wildcard_helper/get_content")
async def get_preset_content(request):
    try:
        json_data = await request.json()
        name = json_data.get("name")
        if not name or name == "[select preset]":
            return web.json_response({"content": ""})
            
        if not PRESET_CACHE:
            update_preset_cache()
            
        file_path = PRESET_CACHE.get(name)
        if not file_path or not os.path.exists(file_path):
            update_preset_cache()
            file_path = PRESET_CACHE.get(name)
            if not file_path or not os.path.exists(file_path):
                return web.json_response({"error": "File not found"}, status=404)
                
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()
            
        # Join newline options with commas for the user
        lines = [line.strip() for line in content.replace("\r\n", "\n").split("\n")]
        valid_options = [line for line in lines if line and not line.startswith("#")]
        comma_separated = ", ".join(valid_options)
        
        return web.json_response({"content": comma_separated})
    except Exception as e:
        return web.json_response({"error": str(e)}, status=500)

class SimpleWildcardCombinator:
    @classmethod
    def INPUT_TYPES(s):
        presets = update_preset_cache()
        return {
            "required": {
                "active": ("BOOLEAN", {"default": True}),
                "options_json": ("STRING", {"default": "[]"}),
                "preset": (presets,),
                "selection_mode": (["Dynamic Syntax (Curly Braces)", "Random Selection", "Sequential Selection"], {"default": "Dynamic Syntax (Curly Braces)"}),
                "seed": ("INT", {"default": 0, "min": 0, "max": 0xffffffffffffffff}),
                "placeholder": ("STRING", {"default": "[wildcard]"}),
                "use_categories_as_placeholders": ("BOOLEAN", {"default": True}),
            },
            "optional": {
                "input_prompt": ("STRING", {"multiline": True, "default": ""}),
            }
        }
        
    RETURN_TYPES = ("STRING",)
    RETURN_NAMES = ("prompt",)
    FUNCTION = "process"
    CATEGORY = "Wildcards"
    
    def process(self, active, options_json, preset, selection_mode, seed, placeholder, use_categories_as_placeholders, input_prompt=None):
        base_prompt = input_prompt if input_prompt is not None else ""
        if not active:
            return (base_prompt,)
            
        try:
            data = json.loads(options_json) if options_json else []
        except Exception:
            data = []
            
        final_prompt = base_prompt
        
        # 1. Parse groups and compile categories/options with migration support
        parsed_groups = []
        cat_global_idx = 0
        
        if isinstance(data, list):
            # Check for legacy 2-tier format (list of categories instead of groups)
            # If the first element is a dict but does NOT have a 'categories' list key,
            # wrap the flat list in a Default group.
            is_legacy = False
            if len(data) > 0 and isinstance(data[0], dict) and "categories" not in data[0] and "options" in data[0]:
                is_legacy = True
            
            if is_legacy:
                # Wrap flat categories in a default group
                legacy_cats = []
                for idx, cat in enumerate(data):
                    if not isinstance(cat, dict):
                        continue
                    name = cat.get("name", "").strip()
                    active = cat.get("active", True)
                    opts = cat.get("options", [])
                    
                    parsed_opts = []
                    for opt in opts:
                        if isinstance(opt, dict):
                            o_active = opt.get("active", True)
                            o_text = opt.get("text", "").strip()
                            o_links = opt.get("links", {})
                        else:
                            o_active = True
                            o_text = str(opt).strip()
                            o_links = {}
                        
                        if o_text and not o_text.startswith("#"):
                            parsed_opts.append({
                                "text": o_text,
                                "active": o_active,
                                "links": o_links
                            })
                    
                    legacy_cats.append({
                        "name": name,
                        "active": active,
                        "options": parsed_opts,
                        "idx": cat_global_idx
                    })
                    cat_global_idx += 1
                
                parsed_groups.append({
                    "name": "Default",
                    "active": True,
                    "categories": legacy_cats
                })
            else:
                # Standard 3-tier group parsing
                for idx, group in enumerate(data):
                    if not isinstance(group, dict):
                        continue
                    g_name = group.get("name", "").strip()
                    g_active = group.get("active", True)
                    g_cats = group.get("categories", [])
                    
                    parsed_cats = []
                    for cat in g_cats:
                        if not isinstance(cat, dict):
                            continue
                        c_name = cat.get("name", "").strip()
                        c_active = cat.get("active", True)
                        opts = cat.get("options", [])
                        
                        parsed_opts = []
                        for opt in opts:
                            if isinstance(opt, dict):
                                o_active = opt.get("active", True)
                                o_text = opt.get("text", "").strip()
                                o_links = opt.get("links", {})
                            else:
                                o_active = True
                                o_text = str(opt).strip()
                                o_links = {}
                            
                            if o_text and not o_text.startswith("#"):
                                parsed_opts.append({
                                    "text": o_text,
                                    "active": o_active,
                                    "links": o_links
                                })
                        
                        parsed_cats.append({
                            "name": c_name,
                            "active": c_active,
                            "options": parsed_opts,
                            "idx": cat_global_idx
                        })
                        cat_global_idx += 1
                    
                    parsed_groups.append({
                        "name": g_name,
                        "active": g_active,
                        "categories": parsed_cats
                    })
                
        # 2. Resolve options for each group and category with constraint propagation
        categories_data = []
        active_constraints = {}  # target_group_category_name -> list of allowed texts
        
        for group in parsed_groups:
            group_name = group["name"]
            group_active = group["active"]
            
            for cat in group["categories"]:
                cat_name = cat["name"]
                cat_active = cat["active"] and group_active
                
                # The full identifier used in the prompt: e.g. [Person2-Sprache]
                full_identifier = f"{group_name}-{cat_name}" if group_name != "Default" else cat_name
                
                if not cat_active:
                    # Category is disabled! Add it with empty text so its placeholder can be cleaned up
                    categories_data.append({
                        "name": full_identifier,
                        "formatted": "",
                        "placed": False,
                        "disabled": True
                    })
                    continue
                    
                # Filter active options
                active_opts = [o for o in cat["options"] if o["active"]]
                if not active_opts:
                    # Empty or all options disabled
                    categories_data.append({
                        "name": full_identifier,
                        "formatted": "",
                        "placed": False,
                        "disabled": True
                    })
                    continue
                    
                # Format based on mode
                if selection_mode == "Dynamic Syntax (Curly Braces)":
                    # In curly braces mode, we just output the brace syntax containing all active options
                    texts = [o["text"] for o in active_opts]
                    if len(texts) > 1:
                        formatted_opt = "{" + "|".join(texts) + "}"
                    else:
                        formatted_opt = texts[0]
                    
                    categories_data.append({
                        "name": full_identifier,
                        "formatted": formatted_opt,
                        "placed": False,
                        "disabled": False
                    })
                else:
                    # Random or Sequential Selection: apply active constraints
                    pool = active_opts
                    if full_identifier in active_constraints:
                        allowed = active_constraints[full_identifier]
                        if allowed:
                            # Intersect case-insensitively
                            allowed_lower = {a.lower() for a in allowed}
                            filtered_pool = [o for o in pool if o["text"].lower() in allowed_lower]
                            if filtered_pool:
                                pool = filtered_pool
                    
                    # Make the selection
                    cat_seed = seed + cat["idx"]
                    if selection_mode == "Random Selection":
                        r = random.Random(cat_seed)
                        chosen_opt = r.choice(pool)
                    else:  # Sequential Selection
                        index = cat_seed % len(pool)
                        chosen_opt = pool[index]
                        
                    # Propagate this chosen option's links/constraints to subsequent categories
                    links = chosen_opt.get("links", {})
                    if isinstance(links, dict):
                        for target_key, target_opts in links.items():
                            if isinstance(target_opts, list) and target_opts:
                                if target_key in active_constraints:
                                    # Intersect constraints
                                    active_constraints[target_key] = list(set(active_constraints[target_key]) & set(target_opts))
                                else:
                                    active_constraints[target_key] = list(target_opts)
                                    
                    categories_data.append({
                        "name": full_identifier,
                        "formatted": chosen_opt["text"],
                        "placed": False,
                        "disabled": False
                    })
                
        # 2. If category placeholders are enabled, try to replace them case-insensitively in the prompt
        if use_categories_as_placeholders:
            import re
            for cat in categories_data:
                name = cat["name"]
                if not name:
                    continue
                
                escaped_name = re.escape(name)
                
                # Check for category placeholder directly preceded by a word character (no space, e.g. wearing[Kleidung])
                pattern_with_space_str = f"(?<=\\w)(\\[{escaped_name}\\]|\\{{{escaped_name}\\}}|__{escaped_name}__)"
                pattern_with_space = re.compile(pattern_with_space_str, re.IGNORECASE)
                if pattern_with_space.search(final_prompt):
                    final_prompt = pattern_with_space.sub(" " + cat["formatted"], final_prompt)
                    cat["placed"] = True
                
                # Standard replacement
                pattern_str = f"\\[{escaped_name}\\]|\\{{{escaped_name}\\}}|__{escaped_name}__"
                pattern = re.compile(pattern_str, re.IGNORECASE)
                if pattern.search(final_prompt):
                    final_prompt = pattern.sub(cat["formatted"], final_prompt)
                    cat["placed"] = True
                    
        # 3. Collect remaining unplaced categories (exclude disabled categories so they are not appended)
        unplaced_blocks = [cat["formatted"] for cat in categories_data if not cat["placed"] and not cat.get("disabled", False)]
        unplaced_str = ", ".join(unplaced_blocks)
        
        # 4. Handle general placeholder replacement (always run even if unplaced_str is empty to clean up the tag)
        p_str = placeholder.strip() if placeholder else ""
        replace_target = None
        if p_str and p_str in final_prompt:
            replace_target = p_str
        elif "[wildcard]" in final_prompt:
            replace_target = "[wildcard]"
        elif "[wildcards]" in final_prompt:
            replace_target = "[wildcards]"
            
        if replace_target:
            # Replaces the tag with unplaced_str (which will be "" if all categories were placed)
            final_prompt = final_prompt.replace(replace_target, unplaced_str)
        else:
            # If no general placeholder tag was found, only append if we actually have unplaced content
            if unplaced_str:
                if final_prompt.strip():
                    if final_prompt.endswith(" ") or final_prompt.endswith("\n"):
                        final_prompt = f"{final_prompt}{unplaced_str}"
                    elif final_prompt.endswith(","):
                        final_prompt = f"{final_prompt} {unplaced_str}"
                    else:
                        final_prompt = f"{final_prompt}, {unplaced_str}"
                else:
                    final_prompt = unplaced_str
                    
        return (final_prompt,)
