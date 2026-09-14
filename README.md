# VCBD Offline Android Prototype V0.1

Deux APK Android séparées :
- VCBD Client Offline
- VCBD Admin Offline

## Objectif
Prototype 100 % hors ligne pour validation UX avant connexion backend/Stripe réelle.

### Client
- Écran obligatoire +18 ans + notice de confidentialité avant accès.
- Catalogue, panier, retrait boutique et livraison locale.
- Coordonnées client : prénom, nom, téléphone, e-mail.
- Adresse de livraison : rue, code postal, ville, instructions.
- Paiement Stripe simulé hors ligne (aucune transaction réelle) ou paiement sur place.
- Stockage local du panier et des commandes de démonstration.

### Admin
- Dashboard, commandes et changement de statuts.
- Catalogue, disponibilité produits, modification des prix.
- Livraisons et adresses de démonstration.
- Réglages boutique, +18, click & collect, livraison.
- Réglages > Paiements > Stripe : connexion simulée locale.

## Sécurité du prototype
Aucune permission INTERNET n'est déclarée dans les manifests Android. Aucune donnée réelle n'est transmise.
