from .wildcard_node import SimpleWildcardCombinator

NODE_CLASS_MAPPINGS = {
    "SimpleWildcardCombinator": SimpleWildcardCombinator
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "SimpleWildcardCombinator": "Simple Wildcard Combinator"
}

WEB_DIRECTORY = "./js"

__all__ = ["NODE_CLASS_MAPPINGS", "NODE_DISPLAY_NAME_MAPPINGS", "WEB_DIRECTORY"]
