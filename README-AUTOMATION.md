# 🤖 Workflow d'Automatisation des PRs

Ce système automatise complètement la création, gestion et merge des Pull Requests pour le projet Not-A-Robot CAPTCHA.

## 🚀 Setup Initial

### 1. Configuration GitHub CLI (Recommandé)
```bash
# Installation et configuration automatique
./scripts/setup-github-cli.sh
```

### 2. Vérification du Setup
```bash
# Lister toutes les PRs disponibles
./scripts/pr-workflow.sh list

# Voir la prochaine PR à implémenter
./scripts/pr-workflow.sh next
```

## 📋 Workflow Complet

### 1. **Créer une PR**
```bash
# Crée automatiquement la branche, commit et PR sur GitHub
./scripts/pr-workflow.sh create 1
```

**Ce que fait cette commande :**
- ✅ Crée une branche `feature/pr-1-architecture-modulaire`
- ✅ Commit tous les changements avec un message formaté
- ✅ Push la branche sur GitHub
- ✅ Crée la PR avec description complète
- ✅ Met la PR en mode draft

### 2. **Tester une PR**
```bash
# Lance tous les tests pour valider la PR
./scripts/pr-workflow.sh test 1
```

**Ce que fait cette commande :**
- ✅ Vérifie qu'on est sur la bonne branche
- ✅ Installe les dépendances
- ✅ Lance les tests unitaires (`pnpm test`)
- ✅ Lance les tests E2E (`pnpm test:e2e`)

### 3. **Vérifier le statut**
```bash
# Affiche le statut de la PR sur GitHub
./scripts/pr-workflow.sh status 1
```

### 4. **Merger une PR**
```bash
# Merge automatiquement et nettoie
./scripts/pr-workflow.sh merge 1
```

**Ce que fait cette commande :**
- ✅ Merge la PR sur GitHub
- ✅ Supprime la branche remote
- ✅ Bascule sur main et pull
- ✅ Supprime la branche locale
- ✅ Nettoie les références

## 🔄 Cycle Complet d'une PR

```bash
# 1. Voir quelle PR implémenter
./scripts/pr-workflow.sh next

# 2. Implémenter le code (fait par Kiro)
# ... développement ...

# 3. Créer la PR automatiquement
./scripts/pr-workflow.sh create 1

# 4. Tester la PR
./scripts/pr-workflow.sh test 1

# 5. Review sur GitHub (manuel)
# - Aller sur GitHub
# - Reviewer le code
# - Approuver si OK

# 6. Merger et nettoyer
./scripts/pr-workflow.sh merge 1

# 7. Passer à la PR suivante
./scripts/pr-workflow.sh next
```

## 📊 Liste des PRs Automatisées

| PR # | Titre | Description |
|------|-------|-------------|
| 1 | Architecture Modulaire + Setup Tests | Fondations et tests |
| 2 | Performance Monitoring + Lazy Loading | Optimisations performance |
| 3 | Améliorations Accessibilité de Base | A11y et navigation clavier |
| 4 | Gestion d'État Avancée | useReducer + persistance |
| 5 | Nouveau Défi Cookie Hell | Bannières cookies infinies |
| 6 | Nouveau Défi Loading Trap | Faux chargements |
| 7 | Nouveau Défi Form Nightmare | Validation excessive |
| 8 | Nouveaux Thèmes | Brutalist, Y2K, Terminal |
| 9 | Système de Gamification | Badges et statistiques |
| 10 | Analytics et Monitoring | Tracking anonyme |
| 11 | Partage Social | Génération d'images |
| 12 | Optimisations Finales | Polish et mobile |

## 🛠️ Scripts Disponibles

### `pr-workflow.sh` - Script Principal
```bash
./scripts/pr-workflow.sh <action> <pr-number>

# Actions disponibles:
create <pr-number>     # Créer et pousser PR
status <pr-number>     # Statut de la PR
test <pr-number>       # Lancer les tests
merge <pr-number>      # Merger et nettoyer
list                   # Lister toutes les PRs
next                   # Prochaine PR à faire
```

### `create-pr.sh` - Création de PR
```bash
./scripts/create-pr.sh <pr-number> <title> <description>
```

### `cleanup-pr.sh` - Nettoyage Post-Merge
```bash
./scripts/cleanup-pr.sh <pr-number>
```

## 🔧 Configuration

### Variables d'Environnement
```bash
# Optionnel: personnaliser la branche principale
export MAIN_BRANCH="main"  # par défaut

# Optionnel: personnaliser le préfixe des branches
export BRANCH_PREFIX="feature/pr-"  # par défaut
```

### GitHub CLI
Le système utilise GitHub CLI (`gh`) pour :
- Créer les PRs automatiquement
- Merger les PRs
- Vérifier les statuts
- Supprimer les branches

## 🚨 Dépannage

### GitHub CLI non installé
```bash
# Installer manuellement
brew install gh  # macOS
# ou suivre: https://cli.github.com/

# Puis s'authentifier
gh auth login
```

### Permissions GitHub
Assurez-vous d'avoir :
- ✅ Accès en écriture au repository
- ✅ Permissions pour créer des branches
- ✅ Permissions pour créer des PRs

### Tests qui échouent
```bash
# Debug des tests
pnpm test --verbose
pnpm test:e2e --debug
```

## 🎯 Avantages de l'Automatisation

- ⚡ **Rapidité** : Création de PR en 1 commande
- 🔄 **Consistance** : Format standardisé pour toutes les PRs
- 🧪 **Qualité** : Tests automatiques avant merge
- 🧹 **Propreté** : Nettoyage automatique des branches
- 📝 **Documentation** : Descriptions complètes générées
- 🔗 **Traçabilité** : Liens entre PRs et spécifications

## 🎉 Workflow Recommandé

1. **Setup initial** : `./scripts/setup-github-cli.sh`
2. **Boucle de développement** :
   - Kiro implémente le code
   - `./scripts/pr-workflow.sh create X`
   - Review sur GitHub
   - `./scripts/pr-workflow.sh merge X`
   - Répéter pour la PR suivante

C'est tout ! Le système gère automatiquement Git, GitHub, les branches, les commits, les PRs et le nettoyage. 🚀