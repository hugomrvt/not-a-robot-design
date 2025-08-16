#!/bin/bash

# Script d'automatisation des PRs
# Usage: ./scripts/create-pr.sh <pr-number> <pr-title> <pr-description>

set -e

PR_NUMBER=$1
PR_TITLE=$2
PR_DESCRIPTION=$3

if [ -z "$PR_NUMBER" ] || [ -z "$PR_TITLE" ]; then
    echo "Usage: ./scripts/create-pr.sh <pr-number> <pr-title> <pr-description>"
    echo "Example: ./scripts/create-pr.sh 1 'Architecture Modulaire + Tests' 'Implementation of modular architecture'"
    exit 1
fi

# Configuration
BRANCH_NAME="feature/pr-${PR_NUMBER}-$(echo $PR_TITLE | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g' | sed 's/[^a-z0-9-]//g')"
MAIN_BRANCH="main"

echo "🚀 Starting PR automation for: $PR_TITLE"
echo "📝 Branch: $BRANCH_NAME"

# Vérifier si on est sur la branche main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "$MAIN_BRANCH" ]; then
    echo "⚠️  Switching to $MAIN_BRANCH branch..."
    git checkout $MAIN_BRANCH
    git pull origin $MAIN_BRANCH
fi

# Créer et basculer sur la nouvelle branche
echo "🌿 Creating and switching to branch: $BRANCH_NAME"
git checkout -b $BRANCH_NAME

# Ajouter tous les fichiers modifiés
echo "📦 Adding all changes..."
git add .

# Vérifier s'il y a des changements à commiter
if git diff --staged --quiet; then
    echo "⚠️  No changes to commit. Exiting..."
    git checkout $MAIN_BRANCH
    git branch -D $BRANCH_NAME
    exit 1
fi

# Créer le commit avec un message formaté
COMMIT_MESSAGE="feat(pr-${PR_NUMBER}): ${PR_TITLE}

${PR_DESCRIPTION}

- Automated commit for PR #${PR_NUMBER}
- Branch: ${BRANCH_NAME}
- Timestamp: $(date)"

echo "💾 Committing changes..."
git commit -m "$COMMIT_MESSAGE"

# Pousser la branche
echo "⬆️  Pushing branch to origin..."
git push -u origin $BRANCH_NAME

# Créer la PR via GitHub CLI si disponible
if command -v gh &> /dev/null; then
    echo "🔗 Creating GitHub PR..."
    
    # Template de description PR
    PR_BODY="## 🎯 Objectif
$PR_DESCRIPTION

## 🔧 Changements
- Implementation automatisée via script
- Tous les fichiers modifiés inclus
- Tests et validation effectués

## 🧪 Tests
- [ ] Tests unitaires (\`pnpm test\`)
- [ ] Tests E2E (\`pnpm test:e2e\`)
- [ ] Validation manuelle

## ✅ Checklist
- [x] Code implémenté
- [ ] Code reviewé
- [ ] Tests passent
- [ ] Pas de régression
- [ ] Documentation mise à jour

---
*PR créée automatiquement le $(date)*"

    gh pr create \
        --title "PR #${PR_NUMBER}: ${PR_TITLE}" \
        --body "$PR_BODY" \
        --base $MAIN_BRANCH \
        --head $BRANCH_NAME \
        --draft

    echo "✅ PR created successfully!"
    echo "🔗 View PR: $(gh pr view --web)"
else
    echo "⚠️  GitHub CLI not found. Please create PR manually:"
    echo "   Branch: $BRANCH_NAME"
    echo "   Title: PR #${PR_NUMBER}: ${PR_TITLE}"
    echo "   Description: $PR_DESCRIPTION"
fi

echo "🎉 PR automation completed!"
echo "📋 Next steps:"
echo "   1. Review the PR on GitHub"
echo "   2. Run tests: pnpm test && pnpm test:e2e"
echo "   3. Merge when ready"
echo "   4. Run: ./scripts/cleanup-pr.sh $PR_NUMBER"