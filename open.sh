#!/bin/bash

# Check if an argument is provided
if [ $# -eq 0 ]; then
    echo "Error: No workspace path provided."
    echo "Usage: $0 <workspace_path>"
    exit 1
fi

# Store the provided workspace path
workspace_path="$1"

# Check if the provided path exists
if [ ! -d "$workspace_path" ]; then
    echo "Error: The provided path does not exist or is not a directory."
    exit 1
fi

# Open VS Code with the provided workspace
code "$workspace_path"

# Check if VS Code opened successfully
if [ $? -eq 0 ]; then
    echo "VS Code opened successfully with workspace: $workspace_path"
else
    echo "Error: Failed to open VS Code. Make sure it's installed and accessible from the command line."
    exit 1
fi