#!/bin/bash

# Script de configuration GitHub CLI
# Usage: ./scripts/setup-github-cli.sh

echo "🔧 Setting up GitHub CLI for automated PRs..."

# Vérifier si GitHub CLI est installé
if ! command -v gh &> /dev/null; then
    echo "📦 GitHub CLI not found. Installing..."
    
    # Détection de l'OS et installation
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        if command -v brew &> /dev/null; then
            brew install gh
        else
            echo "❌ Homebrew not found. Please install GitHub CLI manually:"
            echo "   https://cli.github.com/"
            exit 1
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
        sudo apt update
        sudo apt install gh
    else
        echo "❌ Unsupported OS. Please install GitHub CLI manually:"
        echo "   https://cli.github.com/"
        exit 1
    fi
fi

# Authentification
echo "🔐 Authenticating with GitHub..."
gh auth login

# Vérifier l'authentification
if gh auth status &> /dev/null; then
    echo "✅ GitHub CLI configured successfully!"
    echo "🎉 You can now use fully automated PR workflow!"
else
    echo "❌ Authentication failed. Please run 'gh auth login' manually."
    exit 1
fi

echo ""
echo "📋 Next steps:"
echo "  1. Run: ./scripts/pr-workflow.sh list"
echo "  2. Start with: ./scripts/pr-workflow.sh create 1"