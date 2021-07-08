package com.zs;


public enum Rappel {
    PROJET_VOIRIE("En référence à la norme NF P 94-500 de Novembre 2013 et pour la bonne réalisation de la mission géotechnique confiée dans le cadre de cette étude (phase G2-AVP), le client est tenu de fournir les documents suivants :\n" +
            
            "* Dossier de définition de l’ouvrage projeté (stade avant-projet) avec au minimum :\n" +
            
            "•plans,\n" +
            "•coupes,\n" +
            "•niveaux de référence,\n" +
            "•trafic envisagé.\n" +
            
            "* Degrés de protection requis vis-à-vis des infiltrations d’eau,\n" +
            
            "* Degrés de protection requis vis-à-vis des séismes (classe d’ouvrage),\n" +
            
            "* Les autres contraintes générales liées à l’exploitation,\n" +
            
            "* Tous les rapports géotechniques établis dans le cadre de la mission précédente.\n"),
    AUTRE_PROJET("En référence à la norme NF P 94-500 de Novembre 2013 et pour la bonne réalisation de la mission géotechnique confiée dans le cadre de cette étude (phase G2-AVP), le client est tenu de fournir les documents suivants :\n" +
            
            "* Dossier de définition de l’ouvrage projeté (stade avant-projet) avec au minimum :\n" +
            
            "•plans,\n" +
            "•coupes,\n" +
            "•niveaux de référence,\n" +
            "•enveloppe des descentes de charges.\n" +
            
            "* Degrés de protection requis vis-à-vis des infiltrations d’eau,\n" +
            
            "* Degrés de protection requis vis-à-vis des séismes (classe d’ouvrage),\n" +
            
            "* Les autres contraintes générales liées à l’exploitation,\n" +
            
            "* Tous les rapports géotechniques établis dans le cadre de la mission précédente.\n"),
    AUTRE_PROJET_VOIRIE("En référence à la norme NF P 94-500 de Novembre 2013 et pour la bonne réalisation de la mission géotechnique confiée dans le cadre de cette étude (phase G2-AVP), le client est tenu de fournir les documents suivants :\n" +
            
            "* Dossier de définition de l’ouvrage projeté (stade avant-projet) avec au minimum :\n" +
            
            "•plans,\n" +
            "•coupes,\n" +
            "•niveaux de référence,\n" +
            "•enveloppe des descentes de charges,\n" +
            "•trafic envisagé.\n" +
            
            "* Degrés de protection requis vis-à-vis des infiltrations d’eau,\n" +
            
            "* Degrés de protection requis vis-à-vis des séismes (classe d’ouvrage),\n" +
            
            "* Les autres contraintes générales liées à l’exploitation,\n" +
            
            "* Tous les rapports géotechniques établis dans le cadre de la mission précédente.\n");

    Rappel(String description) {
        this.name = description;
    }

    private String name;

    public String getName() {
        return name;
    }

}