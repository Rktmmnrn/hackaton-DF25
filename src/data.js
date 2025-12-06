// Pas utilisable pour le moments
export const domaines = [
  {
    id: 1,
    nom: "Agriculture",
    icon: "🌱",
    description: "Secteur traditionnel en pleine transformation digitale",
    risqueIA: 35,
    metiers: [
      {
        id: 101,
        nom: "Agriculteur Traditionnel",
        description: "Culture et élevage avec méthodes conventionnelles",
        risqueIA: 40,
        competencesHumaines: ["Intuition terrain", "Adaptation climat", "Soin animaux"]
      },
      {
        id: 102,
        nom: "Ingénieur Agro-écologique",
        description: "Développement de pratiques agricoles durables",
        risqueIA: 20,
        competencesHumaines: ["Créativité solutions", "Sens écologique", "Négociation terrain"]
      }
    ],
    opportunites: [
      "Agriculture de précision avec drones",
      "Marchés locaux et circuits courts",
      "Conseil en transition écologique"
    ]
  },
  {
    id: 2,
    nom: "Commerce & Vente",
    icon: "🛍️",
    description: "Relations client au cœur de la valeur",
    risqueIA: 60,
    metiers: [
      {
        id: 201,
        nom: "Vendeur en magasin",
        description: "Conseil client et vente en présentiel",
        risqueIA: 70,
        competencesHumaines: ["Empathie", "Écoute active", "Personnalisation"]
      },
      {
        id: 202,
        nom: "Commercial B2B",
        description: "Développement de partenariats entreprises",
        risqueIA: 30,
        competencesHumaines: ["Négociation complexe", "Réseautage", "Intuition marché"]
      }
    ],
    opportunites: [
      "Expérience client premium",
      "Conseil personnalisé haut de gamme",
      "Formation aux équipes de vente"
    ]
  },
  {
    id: 3,
    nom: "Santé & Bien-être",
    icon: "🏥",
    description: "Le soin humain irremplaçable",
    risqueIA: 20,
    metiers: [
      {
        id: 301,
        nom: "Infirmier·ère",
        description: "Soins médicaux et accompagnement patients",
        risqueIA: 15,
        competencesHumaines: ["Empathie médicale", "Contact humain", "Adaptation émotionnelle"]
      },
      {
        id: 302,
        nom: "Thérapeute",
        description: "Accompagnement psychologique et développement personnel",
        risqueIA: 5,
        competencesHumaines: ["Écoute profonde", "Intuition thérapeutique", "Création de lien"]
      }
    ],
    opportunites: [
      "Télémédecine humaine",
      "Wellness personnalisé",
      "Reconversion des soignants"
    ]
  },
  {
    id: 4,
    nom: "Artisanat",
    icon: "🛠️",
    description: "Savoir-faire unique et création manuelle",
    risqueIA: 10,
    metiers: [
      {
        id: 401,
        nom: "Ébéniste",
        description: "Création et restauration de meubles en bois",
        risqueIA: 5,
        competencesHumaines: ["Dextérité manuelle", "Sens esthétique", "Patience artisanale"]
      },
      {
        id: 402,
        nom: "Couturier·ère",
        description: "Conception et réalisation de vêtements sur mesure",
        risqueIA: 10,
        competencesHumaines: ["Précision technique", "Créativité textile", "Adaptation client"]
      }
    ],
    opportunites: [
      "Luxe et pièces uniques",
      "Formation aux métiers manuels",
      "Restauration patrimoine"
    ]
  },
  {
    id: 5,
    nom: "Éducation",
    icon: "📚",
    description: "Transmission humaine du savoir",
    risqueIA: 40,
    metiers: [
      {
        id: 501,
        nom: "Professeur",
        description: "Enseignement et accompagnement pédagogique",
        risqueIA: 30,
        competencesHumaines: ["Pédagogie adaptative", "Motivation élèves", "Création contenu"]
      },
      {
        id: 502,
        nom: "Formateur adulte",
        description: "Formation professionnelle et développement compétences",
        risqueIA: 20,
        competencesHumaines: ["Adaptation public", "Transmission pratique", "Coaching individuel"]
      }
    ],
    opportunites: [
      "Tutorat personnalisé",
      "Formation soft skills",
      "Création méthodes pédagogiques"
    ]
  }
];

export const nouvellesOpportunites = [
  {
    id: 1,
    titre: "Coach Robot-Humain",
    domaine: "Tous secteurs",
    description: "Faciliter la collaboration entre équipes humaines et robots",
    competencesRequises: ["Empathie", "Technophilie", "Communication"],
    croissance: "+400%"
  },
  {
    id: 2,
    titre: "Éthicien IA",
    domaine: "Tech & Santé",
    description: "Garantir l'éthique et l'équité des systèmes d'IA",
    competencesRequises: ["Jugement moral", "Analyse critique", "Vigilance"],
    croissance: "+350%"
  },
  {
    id: 3,
    titre: "Designer d'Expérience Émotionnelle",
    domaine: "UX & Marketing",
    description: "Créer des interactions numériques qui respectent les émotions",
    competencesRequises: ["Empathie", "Créativité", "Psychologie"],
    croissance: "+300%"
  }
];