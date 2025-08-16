#!/bin/bash

# Script de nettoyage après merge de PR
# Usage: ./scripts/cleanup-pr.sh <pr-number>

set -e

PR_NUMBER=$1

if [ -z "$PR_NUMBER" ]; then
    echo "Usage: ./scripts/cleanup-pr.sh <pr-number>"
    echo "Example: ./scripts/cleanup-pr.sh 1"
    exit 1
fi

MAIN_BRANCH="main"
BRANCH_PATTERN="feature/pr-${PR_NUMBER}-*"

echo "🧹 Starting cleanup for PR #${PR_NUMBER}"

# Basculer sur main et pull les derniers changements
echo "🔄 Switching to $MAIN_BRANCH and pulling latest changes..."
git checkout $MAIN_BRANCH
git pull origin $MAIN_BRANCH

# Trouver et supprimer la branche locale
BRANCH_NAME=$(git branch | grep "feature/pr-${PR_NUMBER}-" | sed 's/^[ *]*//' || echo "")

if [ -n "$BRANCH_NAME" ]; then
    echo "🗑️  Deleting local branch: $BRANCH_NAME"
    git branch -D $BRANCH_NAME
else
    echo "⚠️  No local branch found for PR #${PR_NUMBER}"
fi

# Supprimer la branche remote si GitHub CLI est disponible
if command -v gh &> /dev/null; then
    echo "🗑️  Deleting remote branch..."
    REMOTE_BRANCH=$(git branch -r | grep "origin/feature/pr-${PR_NUMBER}-" | sed 's/^[ ]*origin\///' || echo "")
    
    if [ -n "$REMOTE_BRANCH" ]; then
        git push origin --delete $REMOTE_BRANCH
        echo "✅ Remote branch deleted: $REMOTE_BRANCH"
    else
        echo "⚠️  No remote branch found for PR #${PR_NUMBER}"
    fi
fi

# Nettoyer les branches trackées qui n'existent plus
echo "🧹 Cleaning up stale branch references..."
git remote prune origin

echo "✅ Cleanup completed for PR #${PR_NUMBER}!"
echo "📋 Ready for next PR implementation."