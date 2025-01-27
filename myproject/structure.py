import os

def print_directory_structure(start_path, indent=0):
    for item in os.listdir(start_path):
        item_path = os.path.join(start_path, item)
        if os.path.isdir(item_path):
            print('  ' * indent + f"[{item}]")
            print_directory_structure(item_path, indent + 1)
        else:
            print('  ' * indent + item)

# Замініть "." на шлях до вашої кореневої директорії проєкту
print_directory_structure(".")