# Moynote

## Description

Moynote est un site qui vous permet de récupérer vos moyennes et votre moyenne générale depuis le logiciel Pronote. Utilisant la librairie Puppeteer, Moynote vous donne accès à l'ensemble de vos moyennes en un seul clic.

## Installation

Pour utiliser Moynote, vous devez avoir installé Node.js sur votre ordinateur. Vous pouvez ensuite télécharger les fichiers du site depuis ce repo GitHub.

```bash
git clone https://github.com/elouan35/moynote.git
cd moynote
npm install
```

## Démarrer le site

Utiliser la commande :

```bash
npm start
```

Vous pouvez ensuite accéder à Moynote en ouvrant votre navigateur et en allant à l'adresse http://localhost:8080.

ou

Lancer le fichier `main.bat` (vérifier les paramètres du fichier au préalable)

## Utilisation

Pour accéder à vos moyennes, il vous suffit de renseigner votre identifiant et mot de passe Pronote dans le formulaire présent sur la page d'accueil. Une fois vos données renseignées, Moynote vous affichera votre moyenne générale ainsi que les moyennes de chaque matière.

## Personnalisation

Le style et les couleurs de Moynote ont été inspirés par le logiciel Pronote, pour vous offrir une expérience familière. Si vous souhaitez personnaliser le site à votre goût, vous pouvez modifier le fichier `public/css/style.css`.

## Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer selon vos besoins. Voir le fichier LICENSE pour plus d'informations.
