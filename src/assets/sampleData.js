export const initialNotesData = {
  title: "Database Normalization & Integrity Constraints",
  moduleInfo: "MODULE 4 — AI Notes Generator",
  summary: "This lecture breaks down database normalization techniques to eliminate data redundancy and anomalies. It covers structural rules from 1NF up to BCNF using stack parameters.",
  importantPoints: [
    "Normalization separates complex flat datasets into smaller, atomic relation tables.",
    "Redundancy control reduces insertion, update, and deletion anomalies during transactional operations.",
    "Functional dependencies dictate how attributes relate to primary key structures."
  ],
  keywords: ["Normalization", "Data Redundancy", "Functional Dependency", "1NF", "BCNF", "Anomalies"] // Module 6 Extraction
};

export const initialQuizData = [
  {
    id: 1,
    question: "What is the primary objective of Database Normalization?",
    options: [
      "To increase database execution latency",
      "To eliminate structural redundancy and avoid anomalies",
      "To encrypt data packets during network transfer",
      "To map non-relational document sets into columns"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: "Which normal form requires all attributes to be atomic values with no repeating groups?",
    options: ["Second Normal Form (2NF)", "Third Normal Form (3NF)", "First Normal Form (1NF)", "Boyce-Codd Normal Form (BCNF)"],
    correctAnswer: 2
  }
];