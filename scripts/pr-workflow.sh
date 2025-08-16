#!/bin/bash

# Script principal d'orchestration des PRs
# Usage: ./scripts/pr-workflow.sh <action> <pr-number> [args...]

set -e

ACTION=$1
PR_NUMBER=$2

# Configuration des PRs - Compatible avec tous les shells
get_pr_title() {
    case $1 in
        1) echo "Architecture Modulaire + Setup Tests" ;;
        2) echo "Performance Monitoring + Lazy Loading" ;;
        3) echo "Améliorations Accessibilité de Base" ;;
        4) echo "Gestion d'État Avancée avec Persistance" ;;
        5) echo "Nouveau Défi Cookie Hell" ;;
        6) echo "Nouveau Défi Loading Trap" ;;
        7) echo "Nouveau Défi Form Nightmare" ;;
        8) echo "Nouveaux Thèmes (Brutalist, Y2K, Terminal)" ;;
        9) echo "Système de Gamification (Badges, Stats)" ;;
        10) echo "Analytics et Monitoring" ;;
        11) echo "Partage Social et Génération d'Images" ;;
        12) echo "Optimisations Finales et Polish" ;;
        *) echo "" ;;
    esac
}

get_pr_description() {
    case $1 in
        1) echo "Implémentation de l'architecture modulaire avec ChallengeWrapper, setup complet des tests (Jest, Testing Library, Playwright), migration du composant IntroScreen et amélioration de l'accessibilité." ;;
        2) echo "Ajout du lazy loading pour tous les écrans, implémentation du monitoring de performance avec Performance API, mémorisation des calculs de thème et optimisation du bundle initial." ;;
        3) echo "Implémentation de la gestion du focus, navigation clavier complète, détection des préférences d'accessibilité, ajout des aria-labels et respect de prefers-reduced-motion." ;;
        4) echo "Migration vers useReducer, implémentation de la persistance localStorage avec validation, système de restauration automatique et gestion d'erreurs gracieuse." ;;
        5) echo "Création du défi Cookie Hell avec bannières infinies, différents types de cookies (RGPD, marketing), animations aléatoires et logique de completion cachée." ;;
        6) echo "Développement du défi Loading Trap avec faux chargements, barres de progression trompeuses, messages humoristiques et timeouts créatifs." ;;
        7) echo "Implémentation du défi Form Nightmare avec validation excessive, règles contradictoires, champs dynamiques et messages d'erreur confus." ;;
        8) echo "Extension du système de thèmes avec Brutalist (minimaliste extrême), Y2K (années 2000) et Terminal (ligne de commande), incluant tous les variants de composants." ;;
        9) echo "Création du système de badges et achievements, tracking des statistiques utilisateur, animations de célébration et interface de gamification." ;;
        10) echo "Implémentation de l'analytics anonyme, monitoring des erreurs, collecte des métriques de performance et identification des points de friction." ;;
        11) echo "Développement de la génération d'images de résultats avec Canvas API, système de partage social, liens personnalisés et templates visuels." ;;
        12) echo "Optimisations finales de performance, améliorations mobile avancées, feedback haptique, animations de transition et audit complet." ;;
        *) echo "" ;;
    esac
}

show_usage() {
    echo "Usage: ./scripts/pr-workflow.sh <action> <pr-number> [args...]"
    echo ""
    echo "Actions:"
    echo "  create <pr-number>     - Create and push PR"
    echo "  status <pr-number>     - Show PR status"
    echo "  test <pr-number>       - Run tests for PR"
    echo "  merge <pr-number>      - Merge PR and cleanup"
    echo "  list                   - List all available PRs"
    echo "  next                   - Show next PR to implement"
    echo ""
    echo "Examples:"
    echo "  ./scripts/pr-workflow.sh create 1"
    echo "  ./scripts/pr-workflow.sh test 1"
    echo "  ./scripts/pr-workflow.sh merge 1"
    echo "  ./scripts/pr-workflow.sh list"
}

list_prs() {
    echo "📋 Available PRs:"
    echo ""
    for i in $(seq 1 12); do
        title=$(get_pr_title $i)
        echo "  PR #$i: $title"
    done
    echo ""
    echo "Use: ./scripts/pr-workflow.sh create <number> to start implementation"
}

get_next_pr() {
    # Trouver la prochaine PR à implémenter basée sur les branches existantes
    for i in $(seq 1 12); do
        BRANCH_EXISTS=$(git branch -a | grep "feature/pr-${i}-" || echo "")
        if [ -z "$BRANCH_EXISTS" ]; then
            title=$(get_pr_title $i)
            description=$(get_pr_description $i)
            echo "🎯 Next PR to implement: #$i - $title"
            echo "📝 Description: $description"
            echo ""
            echo "Run: ./scripts/pr-workflow.sh create $i"
            return
        fi
    done
    echo "✅ All PRs have been created!"
}

create_pr() {
    local pr_num=$1
    
    title=$(get_pr_title $pr_num)
    description=$(get_pr_description $pr_num)
    
    if [ -z "$title" ]; then
        echo "❌ Invalid PR number: $pr_num"
        echo "Available PRs: 1-12"
        exit 1
    fi
    
    echo "🚀 Creating PR #$pr_num: $title"
    echo "📝 Description: $description"
    echo ""
    
    ./scripts/create-pr.sh "$pr_num" "$title" "$description"
}

test_pr() {
    local pr_num=$1
    echo "🧪 Running tests for PR #$pr_num..."
    
    # Vérifier si on est sur la bonne branche
    CURRENT_BRANCH=$(git branch --show-current)
    if [[ ! "$CURRENT_BRANCH" =~ feature/pr-${pr_num}- ]]; then
        echo "⚠️  Not on PR #$pr_num branch. Current: $CURRENT_BRANCH"
        echo "Switch to the PR branch first."
        exit 1
    fi
    
    echo "📦 Installing dependencies..."
    pnpm install
    
    echo "🔍 Running unit tests..."
    pnpm test
    
    echo "🌐 Running E2E tests..."
    pnpm test:e2e
    
    echo "✅ All tests passed for PR #$pr_num!"
}

merge_pr() {
    local pr_num=$1
    echo "🔀 Merging PR #$pr_num..."
    
    if command -v gh &> /dev/null; then
        # Merger via GitHub CLI
        gh pr merge --merge --delete-branch
        echo "✅ PR #$pr_num merged successfully!"
    else
        echo "⚠️  GitHub CLI not found. Please merge manually on GitHub."
    fi
    
    # Cleanup local
    ./scripts/cleanup-pr.sh "$pr_num"
}

show_status() {
    local pr_num=$1
    title=$(get_pr_title $pr_num)
    echo "📊 Status for PR #$pr_num: $title"
    
    if command -v gh &> /dev/null; then
        gh pr status
    else
        echo "⚠️  GitHub CLI not found. Check status manually on GitHub."
    fi
}

# Main logic
case $ACTION in
    "create")
        if [ -z "$PR_NUMBER" ]; then
            echo "❌ PR number required"
            show_usage
            exit 1
        fi
        create_pr $PR_NUMBER
        ;;
    "test")
        if [ -z "$PR_NUMBER" ]; then
            echo "❌ PR number required"
            show_usage
            exit 1
        fi
        test_pr $PR_NUMBER
        ;;
    "merge")
        if [ -z "$PR_NUMBER" ]; then
            echo "❌ PR number required"
            show_usage
            exit 1
        fi
        merge_pr $PR_NUMBER
        ;;
    "status")
        if [ -z "$PR_NUMBER" ]; then
            echo "❌ PR number required"
            show_usage
            exit 1
        fi
        show_status $PR_NUMBER
        ;;
    "list")
        list_prs
        ;;
    "next")
        get_next_pr
        ;;
    *)
        show_usage
        exit 1
        ;;
esac