// University of Bamenda Complete School Data

/**
 * @typedef {Object} Course
 * @property {string} code
 * @property {string} name
 */

/**
 * @typedef {Object} Department
 * @property {string} id
 * @property {string} name
 * @property {Course[]} courses
 */

/**
 * @typedef {Object} School
 * @property {string} id
 * @property {string} name
 * @property {string} shortName
 * @property {Department[]} departments
 */

export const SCHOOLS_DATA = [
  {
    id: "COLTECH",
    name: "College of Technology",
    shortName: "COLTECH",
    departments: [
      {
        id: "ABT",
        name: "Agribusiness Technology",
        courses: [
          { code: "ABT101", name: "Business Economics" },
          { code: "ABT102", name: "Agricultural Marketing" },
          { code: "ABT201", name: "Farm Management" },
          { code: "ABT202", name: "Agricultural Finance" },
          { code: "ABT301", name: "Agribusiness Planning" },
          { code: "ABT401", name: "Agribusiness Project" },
        ],
      },
      {
        id: "AEE",
        name: "Agricultural and Environmental Engineering",
        courses: [
          { code: "AEE101", name: "Hydraulics" },
          { code: "AEE102", name: "Soil Mechanics" },
          { code: "AEE201", name: "Water Resources Management" },
          { code: "AEE202", name: "Environmental Design" },
          { code: "AEE301", name: "Irrigation Engineering" },
          { code: "AEE401", name: "Environmental Impact Assessment" },
        ],
      },
      {
        id: "APT",
        name: "Animal Production Technology",
        courses: [
          { code: "APT101", name: "Animal Nutrition" },
          { code: "APT102", name: "General Livestock" },
          { code: "APT201", name: "Livestock Management" },
          { code: "APT202", name: "Veterinary Science" },
          { code: "APT301", name: "Animal Breeding" },
          { code: "APT401", name: "Meat and Dairy Technology" },
        ],
      },
      {
        id: "CE",
        name: "Civil Engineering",
        courses: [
          { code: "CE101", name: "Engineering Graphics" },
          { code: "CE102", name: "Mechanics of Materials" },
          { code: "CE201", name: "Structural Analysis" },
          { code: "CE202", name: "Building Construction" },
          { code: "CE301", name: "Concrete Design" },
          { code: "CE401", name: "Project Management" },
        ],
      },
      {
        id: "CEN",
        name: "Computer Engineering",
        courses: [
          { code: "CEN101", name: "Digital Systems" },
          { code: "CEN102", name: "Microprocessors" },
          { code: "CEN201", name: "Computer Architecture" },
          { code: "CEN202", name: "Embedded Systems" },
          { code: "CEN301", name: "Hardware Design" },
          { code: "CEN401", name: "VLSI Design" },
        ],
      },
      {
        id: "CPT",
        name: "Crop Production Technology",
        courses: [
          { code: "CPT101", name: "Plant Biology" },
          { code: "CPT102", name: "Agronomy" },
          { code: "CPT201", name: "Crop Diseases and Pests" },
          { code: "CPT202", name: "Soil Science" },
          { code: "CPT301", name: "Crop Improvement" },
          { code: "CPT401", name: "Sustainable Cropping Systems" },
        ],
      },
      {
        id: "EEEP",
        name: "Electrical and Electronic Engineering",
        courses: [
          { code: "EEEP101", name: "Circuit Theory" },
          { code: "EEEP102", name: "Electromagnetics" },
          { code: "EEEP201", name: "Electronics" },
          { code: "EEEP202", name: "Power Systems" },
          { code: "EEEP301", name: "Electrical Machines" },
          { code: "EEEP401", name: "Control Systems" },
        ],
      },
      {
        id: "ET",
        name: "Engineering and Technology",
        courses: [
          { code: "ET101", name: "General Engineering" },
          { code: "ET102", name: "Technical Drawing" },
          { code: "ET201", name: "Industrial Technology" },
          { code: "ET202", name: "Engineering Mathematics" },
          { code: "ET301", name: "Manufacturing Technology" },
          { code: "ET401", name: "Automation Systems" },
        ],
      },
      {
        id: "FWT",
        name: "Forestry and Wildlife Technology",
        courses: [
          { code: "FWT101", name: "Forest Biology" },
          { code: "FWT102", name: "Wildlife Management" },
          { code: "FWT201", name: "Forest Management" },
          { code: "FWT202", name: "Conservation Biology" },
          { code: "FWT301", name: "Sustainable Forestry" },
          { code: "FWT401", name: "Environmental Impact Assessment" },
        ],
      },
      {
        id: "HESW",
        name: "Home Economics and Social Work",
        courses: [
          { code: "HESW101", name: "Family Studies" },
          { code: "HESW102", name: "Social Work Practice" },
          { code: "HESW201", name: "Community Development" },
          { code: "HESW202", name: "Nutrition and Health" },
          { code: "HESW301", name: "Human Resource Management" },
          { code: "HESW401", name: "Social Policy" },
        ],
      },
      {
        id: "NFBT",
        name: "Nutrition, Food and Bioresource Technology",
        courses: [
          { code: "NFBT101", name: "Nutrition Science" },
          { code: "NFBT102", name: "Food Chemistry" },
          { code: "NFBT201", name: "Food Technology" },
          { code: "NFBT202", name: "Bioresources Management" },
          { code: "NFBT301", name: "Food Preservation" },
          { code: "NFBT401", name: "Food Safety and Quality" },
        ],
      },
      {
        id: "REEP",
        name: "Renewable Energy Technology",
        courses: [
          { code: "REEP101", name: "Solar Energy Systems" },
          { code: "REEP102", name: "Wind Energy Technology" },
          { code: "REEP201", name: "Biomass Energy" },
          { code: "REEP202", name: "Energy Efficiency" },
          { code: "REEP301", name: "Sustainable Energy Design" },
          { code: "REEP401", name: "Grid Integration Systems" },
        ],
      },
    ],
  },
  {
    id: "FA",
    name: "Faculty of Arts",
    shortName: "FA",
    departments: [
      {
        id: "CDS",
        name: "Communication and Development Studies",
        courses: [
          { code: "CDS101", name: "Communication Theory" },
          { code: "CDS102", name: "Media Studies" },
          { code: "CDS201", name: "Professional Communication" },
          { code: "CDS202", name: "Development Communication" },
          { code: "CDS301", name: "Digital Media" },
          { code: "CDS401", name: "Mass Communication" },
        ],
      },
      {
        id: "ED",
        name: "Education",
        courses: [
          { code: "ED101", name: "Educational Psychology" },
          { code: "ED102", name: "Pedagogy" },
          { code: "ED201", name: "Curriculum Design" },
          { code: "ED202", name: "Teaching Methods" },
          { code: "ED301", name: "Assessment and Evaluation" },
          { code: "ED401", name: "Educational Technology" },
        ],
      },
      {
        id: "ENG",
        name: "English",
        courses: [
          { code: "ENG101", name: "English Composition" },
          { code: "ENG102", name: "Literature Foundations" },
          { code: "ENG201", name: "Shakespearean Studies" },
          { code: "ENG202", name: "Poetry and Drama" },
          { code: "ENG301", name: "Linguistics " },
          { code: "ENG401", name: "Critical Theory" },
        ],
      },
      {
        id: "ELDIC",
        name: "English, Literature and Digital Cultures",
        courses: [
          { code: "ELDIC101", name: "Digital Literature" },
          { code: "ELDIC102", name: "Creative Writing" },
          { code: "ELDIC201", name: "Contemporary Literature" },
          { code: "ELDIC202", name: "Digital Cultures" },
          { code: "ELDIC301", name: "Multimedia Storytelling" },
          { code: "ELDIC401", name: "Interactive Media" },
        ],
      },
      {
        id: "GP",
        name: "Geography and Planning",
        courses: [
          { code: "GP101", name: "Physical Geography" },
          { code: "GP102", name: "Human Geography" },
          { code: "GP201", name: "Urban Planning" },
          { code: "GP202", name: "Regional Development" },
          { code: "GP301", name: "GIS and Cartography" },
          { code: "GP401", name: "Environmental Management" },
        ],
      },
      {
        id: "HISA",
        name: "History, Heritage and International Studies",
        courses: [
          { code: "HISA101", name: "World History" },
          { code: "HISA102", name: "African History" },
          { code: "HISA201", name: "Heritage Studies" },
          { code: "HISA202", name: "International Relations" },
          { code: "HISA301", name: "Historiography" },
          { code: "HISA401", name: "Diplomatic History" },
        ],
      },
      {
        id: "LAL",
        name: "Linguistics and African Languages",
        courses: [
          { code: "LAL101", name: "Linguistics Foundations" },
          { code: "LAL102", name: "African Language Studies" },
          { code: "LAL201", name: "Syntax and Semantics" },
          { code: "LAL202", name: "Language Variation" },
          { code: "LAL301", name: "Applied Linguistics" },
          { code: "LAL401", name: "Language Development" },
        ],
      },
      {
        id: "PVA",
        name: "Performing and Visual Arts",
        courses: [
          { code: "PVA101", name: "Art Theory" },
          { code: "PVA102", name: "Performing Arts" },
          { code: "PVA201", name: "Visual Arts Studio" },
          { code: "PVA202", name: "Performance Techniques" },
          { code: "PVA301", name: "Art History" },
          { code: "PVA401", name: "Contemporary Arts" },
        ],
      },
      {
        id: "PHI",
        name: "Philosophy",
        courses: [
          { code: "PHI101", name: "Intro to Philosophy" },
          { code: "PHI102", name: "Logic" },
          { code: "PHI201", name: "Metaphysics" },
          { code: "PHI202", name: "Epistemology" },
          { code: "PHI301", name: "Ethics" },
          { code: "PHI401", name: "Philosophy of Mind" },
        ],
      },
      {
        id: "PY",
        name: "Psychology",
        courses: [
          { code: "PY101", name: "General Psychology" },
          { code: "PY102", name: "Research Methods" },
          { code: "PY201", name: "Cognitive Psychology" },
          { code: "PY202", name: "Social Psychology" },
          { code: "PY301", name: "Clinical Psychology" },
          { code: "PY401", name: "Abnormal Psychology" },
        ],
      },
      {
        id: "UBALAC",
        name: "University of Bamenda Language Center",
        courses: [
          { code: "UBALAC101", name: "French I" },
          { code: "UBALAC102", name: "German I" },
          { code: "UBALAC201", name: "French II" },
          { code: "UBALAC202", name: "German II" },
          { code: "UBALAC301", name: "Advanced French" },
          { code: "UBALAC401", name: "Advanced German" },
        ],
      },
    ],
  },
  {
    id: "FEMS",
    name: "Faculty of Economics and Management Sciences",
    shortName: "FEMS",
    departments: [
      {
        id: "ACC",
        name: "Accounting",
        courses: [
          { code: "ACC101", name: "Financial Accounting" },
          { code: "ACC102", name: "Business Mathematics" },
          { code: "ACC201", name: "Management Accounting" },
          { code: "ACC202", name: "Auditing" },
          { code: "ACC301", name: "Advanced Accounting" },
          { code: "ACC401", name: "Accounting Information Systems" },
        ],
      },
      {
        id: "BNF",
        name: "Banking and Finance",
        courses: [
          { code: "BNF101", name: "Banking Fundamentals" },
          { code: "BNF102", name: "Financial Markets" },
          { code: "BNF201", name: "Investment Management" },
          { code: "BNF202", name: "Corporate Finance" },
          { code: "BNF301", name: "Risk Management" },
          { code: "BNF401", name: "Advanced Banking" },
        ],
      },
      {
        id: "BF",
        name: "Business and Finance",
        courses: [
          { code: "BF101", name: "Business Management" },
          { code: "BF102", name: "Finance Fundamentals" },
          { code: "BF201", name: "Business Strategy" },
          { code: "BF202", name: "Financial Planning" },
          { code: "BF301", name: "International Business" },
          { code: "BF401", name: "Business Analysis" },
        ],
      },
      {
        id: "ECN",
        name: "Economics",
        courses: [
          { code: "ECN101", name: "Microeconomics" },
          { code: "ECN102", name: "Macroeconomics" },
          { code: "ECN201", name: "Economic Theory" },
          { code: "ECN202", name: "Econometrics" },
          { code: "ECN301", name: "Development Economics" },
          { code: "ECN401", name: "International Economics" },
        ],
      },
      {
        id: "MGT",
        name: "Management and Marketing",
        courses: [
          { code: "MGT101", name: "Management Principles" },
          { code: "MGT102", name: "Marketing Fundamentals" },
          { code: "MGT201", name: "Strategic Management" },
          { code: "MGT202", name: "Marketing Management" },
          { code: "MGT301", name: "Consumer Behavior" },
          { code: "MGT401", name: "Business Analytics" },
        ],
      },
    ],
  },
  {
    id: "FED",
    name: "Faculty of Education",
    shortName: "FED",
    departments: [
      {
        id: "BRC",
        name: "Bereavement Counseling",
        courses: [
          { code: "BRC101", name: "Grief Theory" },
          { code: "BRC102", name: "Counseling Skills" },
          { code: "BRC201", name: "Bereavement Support" },
          { code: "BRC202", name: "Crisis Intervention" },
          { code: "BRC301", name: "Group Counseling" },
          { code: "BRC401", name: "Trauma and Loss" },
        ],
      },
      {
        id: "CPY",
        name: "Counseling Psychology",
        courses: [
          { code: "CPY101", name: "Psychology Foundations" },
          { code: "CPY102", name: "Counseling Theories" },
          { code: "CPY201", name: "Client Assessment" },
          { code: "CPY202", name: "Therapeutic Techniques" },
          { code: "CPY301", name: "Career Counseling" },
          { code: "CPY401", name: "Advanced Counseling" },
        ],
      },
      {
        id: "CUP",
        name: "Curriculum and Pedagogy",
        courses: [
          { code: "CUP101", name: "Curriculum Design" },
          { code: "CUP102", name: "Teaching Methods" },
          { code: "CUP201", name: "Instructional Design" },
          { code: "CUP202", name: "Classroom Management" },
          { code: "CUP301", name: "Curriculum Assessment" },
          { code: "CUP401", name: "Advanced Pedagogy" },
        ],
      },
      {
        id: "DED",
        name: "Distance Education",
        courses: [
          { code: "DED101", name: "Distance Learning Fundamentals" },
          { code: "DED102", name: "Online Instruction" },
          { code: "DED201", name: "Educational Technology" },
          { code: "DED202", name: "Virtual Classrooms" },
          { code: "DED301", name: "Learning Management Systems" },
          { code: "DED401", name: "Advanced E-Learning" },
        ],
      },
      {
        id: "EFA",
        name: "Educational Foundation",
        courses: [
          { code: "EFA101", name: "History of Education" },
          { code: "EFA102", name: "Educational Philosophy" },
          { code: "EFA201", name: "Sociology of Education" },
          { code: "EFA202", name: "Educational Policy" },
          { code: "EFA301", name: "Comparative Education" },
          { code: "EFA401", name: "Educational Research" },
        ],
      },
      {
        id: "EDL",
        name: "Educational Leadership",
        courses: [
          { code: "EDL101", name: "Leadership Theory" },
          { code: "EDL102", name: "School Administration" },
          { code: "EDL201", name: "Educational Management" },
          { code: "EDL202", name: "Organizational Behavior" },
          { code: "EDL301", name: "Educational Change" },
          { code: "EDL401", name: "Strategic Leadership" },
        ],
      },
      {
        id: "EPY",
        name: "Educational Psychology",
        courses: [
          { code: "EPY101", name: "Learning Theory" },
          { code: "EPY102", name: "Child Development" },
          { code: "EPY201", name: "Cognitive Development" },
          { code: "EPY202", name: "Motivation and Learning" },
          { code: "EPY301", name: "Special Education" },
          { code: "EPY401", name: "Instructional Psychology" },
        ],
      },
      {
        id: "IPY",
        name: "Industrial and Organizational Psychology",
        courses: [
          { code: "IPY101", name: "Organizational Theory" },
          { code: "IPY102", name: "Human Resource Psychology" },
          { code: "IPY201", name: "Industrial Applications" },
          { code: "IPY202", name: "Workplace Dynamics" },
          { code: "IPY301", name: "Performance Management" },
          { code: "IPY401", name: "Organizational Development" },
        ],
      },
      {
        id: "PEA",
        name: "Physical Education and Animation",
        courses: [
          { code: "PEA101", name: "Sports Science" },
          { code: "PEA102", name: "Physical Fitness" },
          { code: "PEA201", name: "Sports Coaching" },
          { code: "PEA202", name: "Recreation Management" },
          { code: "PEA301", name: "Athletic Training" },
          { code: "PEA401", name: "Sport and Society" },
        ],
      },
      {
        id: "SCC",
        name: "School Counseling",
        courses: [
          { code: "SCC101", name: "Counseling in Schools" },
          { code: "SCC102", name: "Student Development" },
          { code: "SCC201", name: "Peer Counseling" },
          { code: "SCC202", name: "Crisis Counseling" },
          { code: "SCC301", name: "Academic Advising" },
          { code: "SCC401", name: "School Counseling Programs" },
        ],
      },
      {
        id: "SPTS",
        name: "Sports",
        courses: [
          { code: "SPTS101", name: "Sports Management" },
          { code: "SPTS102", name: "Athletic Administration" },
          { code: "SPTS201", name: "Sports Psychology" },
          { code: "SPTS202", name: "Sports Marketing" },
          { code: "SPTS301", name: "Event Management" },
          { code: "SPTS401", name: "Professional Development in Sports" },
        ],
      },
      {
        id: "TED",
        name: "Teacher Education",
        courses: [
          { code: "TED101", name: "Teaching Principles" },
          { code: "TED102", name: "Subject Pedagogy" },
          { code: "TED201", name: "Teaching Practice" },
          { code: "TED202", name: "Classroom Observation" },
          { code: "TED301", name: "Instructional Supervision" },
          { code: "TED401", name: "Teacher Professional Development" },
        ],
      },
    ],
  },
  {
    id: "FHS",
    name: "Faculty of Health Sciences",
    shortName: "FHS",
    departments: [
      {
        id: "BMS",
        name: "Biomedical Science",
        courses: [
          { code: "BMS101", name: "Human Anatomy" },
          { code: "BMS102", name: "Human Physiology" },
          { code: "BMS201", name: "Biochemistry" },
          { code: "BMS202", name: "Pathology" },
          { code: "BMS301", name: "Microbiology" },
          { code: "BMS401", name: "Clinical Laboratory Science" },
        ],
      },
      {
        id: "CLS",
        name: "Clinical Science",
        courses: [
          { code: "CLS101", name: "Clinical Diagnosis" },
          { code: "CLS102", name: "Patient Care" },
          { code: "CLS201", name: "Clinical Examination" },
          { code: "CLS202", name: "Therapeutic Practice" },
          { code: "CLS301", name: "Clinical Research" },
          { code: "CLS401", name: "Advanced Clinical Practice" },
        ],
      },
      {
        id: "MD",
        name: "General Medicine",
        courses: [
          { code: "MD101", name: "Medical Anatomy" },
          { code: "MD102", name: "Medical Physiology" },
          { code: "MD201", name: "Internal Medicine" },
          { code: "MD202", name: "Pharmacology" },
          { code: "MD301", name: "Clinical Medicine" },
          { code: "MD401", name: "Advanced Medical Practice" },
        ],
      },
      {
        id: "MBMS",
        name: "Medical and BioMedical Sciences",
        courses: [
          { code: "MBMS101", name: "Biology Foundations" },
          { code: "MBMS102", name: "Medical Chemistry" },
          { code: "MBMS201", name: "Immunology" },
          { code: "MBMS202", name: "Genetics" },
          { code: "MBMS301", name: "Molecular Biology" },
          { code: "MBMS401", name: "Advanced Biomedical Research" },
        ],
      },
      {
        id: "MLS",
        name: "Medical Laboratory Science",
        courses: [
          { code: "MLS101", name: "Laboratory Techniques" },
          { code: "MLS102", name: "Clinical Hematology" },
          { code: "MLS201", name: "Clinical Chemistry" },
          { code: "MLS202", name: "Immunoserology" },
          { code: "MLS301", name: "Microbiology Techniques" },
          { code: "MLS401", name: "Quality Assurance in Labs" },
        ],
      },
      {
        id: "NMW",
        name: "Nursing and Midwifery",
        courses: [
          { code: "NMW101", name: "Nursing Fundamentals" },
          { code: "NMW102", name: "Patient Care Basics" },
          { code: "NMW201", name: "Medical-Surgical Nursing" },
          { code: "NMW202", name: "Midwifery Practice" },
          { code: "NMW301", name: "Community Health Nursing" },
          { code: "NMW401", name: "Advanced Nursing Practice" },
        ],
      },
      {
        id: "PHAM",
        name: "Pharmacy",
        courses: [
          { code: "PHAM101", name: "Pharmaceutical Chemistry" },
          { code: "PHAM102", name: "Introduction to Pharmacy" },
          { code: "PHAM201", name: "Pharmacology" },
          { code: "PHAM202", name: "Pharmacy Practice" },
          { code: "PHAM301", name: "Pharmaceutics" },
          { code: "PHAM401", name: "Clinical Pharmacy" },
        ],
      },
      {
        id: "PH",
        name: "Public Health",
        courses: [
          { code: "PH101", name: "Public Health Fundamentals" },
          { code: "PH102", name: "Epidemiology" },
          { code: "PH201", name: "Health Education" },
          { code: "PH202", name: "Environmental Health" },
          { code: "PH301", name: "Health Policy" },
          { code: "PH401", name: "Public Health Management" },
        ],
      },
    ],
  },
  {
    id: "FLPS",
    name: "Faculty of Law and Political Science",
    shortName: "FLPS",
    departments: [
      {
        id: "CAPA",
        name: "Capacité en Droit",
        courses: [
          { code: "CAPA101", name: "Introduction à la Loi" },
          { code: "CAPA102", name: "Droit Constitutionnel" },
          { code: "CAPA201", name: "Droit Pénal" },
          { code: "CAPA202", name: "Droit Civil" },
          { code: "CAPA301", name: "Droit Commercial" },
          { code: "CAPA401", name: "Pratique Juridique" },
        ],
      },
      {
        id: "EPL",
        name: "English Private Law",
        courses: [
          { code: "EPL101", name: "Contract Law" },
          { code: "EPL102", name: "Property Law" },
          { code: "EPL201", name: "Tort Law" },
          { code: "EPL202", name: "Family Law" },
          { code: "EPL301", name: "Commercial Law" },
          { code: "EPL401", name: "Jurisprudence" },
        ],
      },
      {
        id: "FPL",
        name: "French Private Law",
        courses: [
          { code: "FPL101", name: "Droit des Contrats" },
          { code: "FPL102", name: "Droit des Propriétés" },
          { code: "FPL201", name: "Droit de la Responsabilité" },
          { code: "FPL202", name: "Droit de la Famille" },
          { code: "FPL301", name: "Droit Commercial" },
          { code: "FPL401", name: "Jurisprudence" },
        ],
      },
      {
        id: "POS",
        name: "Political Science",
        courses: [
          { code: "POS101", name: "Government and Politics" },
          { code: "POS102", name: "Political Theory" },
          { code: "POS201", name: "International Relations" },
          { code: "POS202", name: "African Politics" },
          { code: "POS301", name: "Political Systems" },
          { code: "POS401", name: "Comparative Politics" },
        ],
      },
      {
        id: "PUL",
        name: "Public Law",
        courses: [
          { code: "PUL101", name: "Constitutional Law" },
          { code: "PUL102", name: "Administrative Law" },
          { code: "PUL201", name: "Criminal Law" },
          { code: "PUL202", name: "International Law" },
          { code: "PUL301", name: "Human Rights Law" },
          { code: "PUL401", name: "Public Law Practice" },
        ],
      },
    ],
  },
  {
    id: "FS",
    name: "Faculty of Science",
    shortName: "FS",
    departments: [
      {
        id: "ZOO",
        name: "Zoology",
        courses: [
          { code: "ZOO101", name: "Cell Biology" },
          { code: "ZOO102", name: "Animal Physiology" },
          { code: "ZOO201", name: "Invertebrate Biology" },
          { code: "ZOO202", name: "Vertebrate Biology" },
          { code: "ZOO301", name: "Ecology" },
          { code: "ZOO401", name: "Evolutionary Biology" },
        ],
      },
      {
        id: "BCH",
        name: "Biochemistry",
        courses: [
          { code: "BCH101", name: "Biological Chemistry" },
          { code: "BCH102", name: "Metabolic Pathways" },
          { code: "BCH201", name: "Protein Science" },
          { code: "BCH202", name: "Lipid Biochemistry" },
          { code: "BCH301", name: "Molecular Biochemistry" },
          { code: "BCH401", name: "Advanced Biochemistry" },
        ],
      },
      {
        id: "BS",
        name: "Biological Science",
        courses: [
          { code: "BS101", name: "General Biology" },
          { code: "BS102", name: "Biology Fundamentals" },
          { code: "BS201", name: "Molecular Biology" },
          { code: "BS202", name: "Genetics" },
          { code: "BS301", name: "Microbiology" },
          { code: "BS401", name: "Advanced Biology" },
        ],
      },
      {
        id: "CHM",
        name: "Chemistry",
        courses: [
          { code: "CHM101", name: "General Chemistry" },
          { code: "CHM102", name: "Organic Chemistry" },
          { code: "CHM201", name: "Physical Chemistry" },
          { code: "CHM202", name: "Analytical Chemistry" },
          { code: "CHM301", name: "Inorganic Chemistry" },
          { code: "CHM401", name: "Advanced Chemistry" },
        ],
      },
      {
        id: "GMES",
        name: "Geology, Mining and Environmental Science",
        courses: [
          { code: "GMES101", name: "Geology Fundamentals" },
          { code: "GMES102", name: "Mineralogy" },
          { code: "GMES201", name: "Environmental Science" },
          { code: "GMES202", name: "Mining Engineering" },
          { code: "GMES301", name: "Environmental Geology" },
          { code: "GMES401", name: "Advanced Geoscience" },
        ],
      },
      {
        id: "MCS",
        name: "Mathematics and Computer Science",
        courses: [
          { code: "MCS101", name: "Calculus I" },
          { code: "MCS102", name: "Linear Algebra" },
          { code: "MCS201", name: "Programming" },
          { code: "MCS202", name: "Data Structures" },
          { code: "MCS301", name: "Algorithm Analysis" },
          { code: "MCS401", name: "Advanced Computer Science" },
        ],
      },
      {
        id: "MICP",
        name: "Microbiology and Parasitology",
        courses: [
          { code: "MICP101", name: "General Microbiology" },
          { code: "MICP102", name: "Parasitology" },
          { code: "MICP201", name: "Applied Microbiology" },
          { code: "MICP202", name: "Medical Microbiology" },
          { code: "MICP301", name: "Food Microbiology" },
          { code: "MICP401", name: "Advanced Microbiology" },
        ],
      },
      {
        id: "PHY",
        name: "Physics",
        courses: [
          { code: "PHY101", name: "Classical Mechanics" },
          { code: "PHY102", name: "Electricity and Magnetism" },
          { code: "PHY201", name: "Thermodynamics" },
          { code: "PHY202", name: "Optics" },
          { code: "PHY301", name: "Modern Physics" },
          { code: "PHY401", name: "Quantum Mechanics" },
        ],
      },
      {
        id: "BOT",
        name: "Plant Sciences (Botany)",
        courses: [
          { code: "BOT101", name: "Plant Biology" },
          { code: "BOT102", name: "Plant Physiology" },
          { code: "BOT201", name: "Mycology" },
          { code: "BOT202", name: "Plant Taxonomy" },
          { code: "BOT301", name: "Plant Ecology" },
          { code: "BOT401", name: "Advanced Botany" },
        ],
      },
      {
        id: "TEE",
        name: "Thermal and Energy Engineering",
        courses: [
          { code: "TEE101", name: "Thermodynamics" },
          { code: "TEE102", name: "Energy Systems" },
          { code: "TEE201", name: "Heat Transfer" },
          { code: "TEE202", name: "HVAC Systems" },
          { code: "TEE301", name: "Energy Efficiency" },
          { code: "TEE401", name: "Advanced Energy Engineering" },
        ],
      },
    ],
  },
  {
    id: "HICM",
    name: "Higher Institute of Commerce and Management",
    shortName: "HICM",
    departments: [
      {
        id: "IMC",
        name: "Information and Communication Management Systems",
        courses: [
          { code: "IMC101", name: "Information Systems" },
          { code: "IMC102", name: "Communication Systems" },
          { code: "IMC201", name: "Database Management" },
          { code: "IMC202", name: "Network Systems" },
          { code: "IMC301", name: "Enterprise Systems" },
          { code: "IMC401", name: "Advanced ICT Systems" },
        ],
      },
      {
        id: "AFN",
        name: "Accounting and Finance",
        courses: [
          { code: "AFN101", name: "Financial Accounting" },
          { code: "AFN102", name: "Business Finance" },
          { code: "AFN201", name: "Management Accounting" },
          { code: "AFN202", name: "Corporate Finance" },
          { code: "AFN301", name: "Advanced Accounting" },
          { code: "AFN401", name: "Accounting Analysis" },
        ],
      },
      {
        id: "INS",
        name: "Insurance",
        courses: [
          { code: "INS101", name: "Insurance Principles" },
          { code: "INS102", name: "Risk Management" },
          { code: "INS201", name: "Property Insurance" },
          { code: "INS202", name: "Life Insurance" },
          { code: "INS301", name: "Insurance Operations" },
          { code: "INS401", name: "Insurance Management" },
        ],
      },
      {
        id: "MGTC",
        name: "Management and Entrepreneurship",
        courses: [
          { code: "MGTC101", name: "Business Management" },
          { code: "MGTC102", name: "Entrepreneurship" },
          { code: "MGTC201", name: "Strategic Management" },
          { code: "MGTC202", name: "Business Planning" },
          { code: "MGTC301", name: "Innovation Management" },
          { code: "MGTC401", name: "Advanced Entrepreneurship" },
        ],
      },
      {
        id: "MKT",
        name: "Marketing",
        courses: [
          { code: "MKT101", name: "Marketing Principles" },
          { code: "MKT102", name: "Consumer Behavior" },
          { code: "MKT201", name: "Digital Marketing" },
          { code: "MKT202", name: "Brand Management" },
          { code: "MKT301", name: "Market Research" },
          { code: "MKT401", name: "Advanced Marketing" },
        ],
      },
      {
        id: "MAB",
        name: "Money and Banking",
        courses: [
          { code: "MAB101", name: "Banking Fundamentals" },
          { code: "MAB102", name: "Monetary Economics" },
          { code: "MAB201", name: "Commercial Banking" },
          { code: "MAB202", name: "Central Banking" },
          { code: "MAB301", name: "Financial Markets" },
          { code: "MAB401", name: "Advanced Banking" },
        ],
      },
      {
        id: "OGS",
        name: "Organizational Sciences",
        courses: [
          { code: "OGS101", name: "Organizational Theory" },
          { code: "OGS102", name: "Organizational Behavior" },
          { code: "OGS201", name: "Human Resources" },
          { code: "OGS202", name: "Organizational Culture" },
          { code: "OGS301", name: "Change Management" },
          { code: "OGS401", name: "Advanced Organization Studies" },
        ],
      },
    ],
  },
  {
    id: "HITL",
    name: "Higher Institute of Transport and Logistics",
    shortName: "HITL",
    departments: [
      {
        id: "ATR",
        name: "Air Transport",
        courses: [
          { code: "ATR101", name: "Aviation Fundamentals" },
          { code: "ATR102", name: "Air Transportation" },
          { code: "ATR201", name: "Airport Operations" },
          { code: "ATR202", name: "Flight Operations" },
          { code: "ATR301", name: "Airline Management" },
          { code: "ATR401", name: "Advanced Air Transport" },
        ],
      },
      {
        id: "CUS",
        name: "Customs",
        courses: [
          { code: "CUS101", name: "Customs Regulations" },
          { code: "CUS102", name: "Import-Export Procedures" },
          { code: "CUS201", name: "Trade Policy" },
          { code: "CUS202", name: "Tariff Systems" },
          { code: "CUS301", name: "Customs Administration" },
          { code: "CUS401", name: "Advanced Customs Management" },
        ],
      },
      {
        id: "GNS",
        name: "General Studies",
        courses: [
          { code: "GNS101", name: "Communication Skills" },
          { code: "GNS102", name: "Business Ethics" },
          { code: "GNS201", name: "Professional Development" },
          { code: "GNS202", name: "Leadership" },
          { code: "GNS301", name: "Critical Thinking" },
          { code: "GNS401", name: "Organizational Development" },
        ],
      },
      {
        id: "LTP",
        name: "Land Transport",
        courses: [
          { code: "LTP101", name: "Transportation Systems" },
          { code: "LTP102", name: "Road Transport" },
          { code: "LTP201", name: "Fleet Management" },
          { code: "LTP202", name: "Logistics Operations" },
          { code: "LTP301", name: "Supply Chain Management" },
          { code: "LTP401", name: "Advanced Transport Management" },
        ],
      },
      {
        id: "MTT",
        name: "Maritime Transport",
        courses: [
          { code: "MTT101", name: "Shipping Fundamentals" },
          { code: "MTT102", name: "Maritime Law" },
          { code: "MTT201", name: "Port Operations" },
          { code: "MTT202", name: "Vessel Management" },
          { code: "MTT301", name: "Marine Logistics" },
          { code: "MTT401", name: "Advanced Maritime Management" },
        ],
      },
      {
        id: "TM",
        name: "Tourism and Hospitality Management",
        courses: [
          { code: "TM101", name: "Tourism Fundamentals" },
          { code: "TM102", name: "Hospitality Management" },
          { code: "TM201", name: "Hotel Operations" },
          { code: "TM202", name: "Tourism Planning" },
          { code: "TM301", name: "Event Management" },
          { code: "TM401", name: "Advanced Tourism Management" },
        ],
      },
      {
        id: "TLG",
        name: "Transit and Logistics",
        courses: [
          { code: "TLG101", name: "Logistics Fundamentals" },
          { code: "TLG102", name: "Supply Chain" },
          { code: "TLG201", name: "Warehouse Management" },
          { code: "TLG202", name: "Transportation Logistics" },
          { code: "TLG301", name: "Inventory Management" },
          { code: "TLG401", name: "Advanced Logistics Systems" },
        ],
      },
    ],
  },
  {
    id: "HTTC",
    name: "Higher Teacher Training College",
    shortName: "HTTC",
    departments: [
      {
        id: "BIL",
        name: "Bilingual Letters",
        courses: [
          { code: "BIL101", name: "French Language I" },
          { code: "BIL102", name: "English Language I" },
          { code: "BIL201", name: "French Literature" },
          { code: "BIL202", name: "English Literature" },
          { code: "BIL301", name: "Bilingual Education" },
          { code: "BIL401", name: "Advanced Language Studies" },
        ],
      },
      {
        id: "BIO",
        name: "Biology",
        courses: [
          { code: "BIO101", name: "General Biology" },
          { code: "BIO102", name: "Cell Biology" },
          { code: "BIO201", name: "Genetics" },
          { code: "BIO202", name: "Ecology and Evolution" },
          { code: "BIO301", name: "Physiology" },
          { code: "BIO401", name: "Advanced Biology" },
        ],
      },
      {
        id: "CHM",
        name: "Chemistry",
        courses: [
          { code: "CHM101", name: "General Chemistry" },
          { code: "CHM102", name: "Organic Chemistry" },
          { code: "CHM201", name: "Physical Chemistry" },
          { code: "CHM202", name: "Analytical Chemistry" },
          { code: "CHM301", name: "Inorganic Chemistry" },
          { code: "CHM401", name: "Advanced Chemistry" },
        ],
      },
      {
        id: "CSC",
        name: "Computer Science",
        courses: [
          { code: "CSC101", name: "Programming Fundamentals" },
          { code: "CSC102", name: "Introduction to Computing" },
          { code: "CSC201", name: "Data Structures" },
          { code: "CSC202", name: "Algorithms" },
          { code: "CSC301", name: "Database Systems" },
          { code: "CSC401", name: "Advanced CS" },
        ],
      },
      {
        id: "ECONS",
        name: "Economics",
        courses: [
          { code: "ECONS101", name: "Microeconomics" },
          { code: "ECONS102", name: "Macroeconomics" },
          { code: "ECONS201", name: "Economic Theory" },
          { code: "ECONS202", name: "Development Economics" },
          { code: "ECONS301", name: "Business Economics" },
          { code: "ECONS401", name: "Advanced Economics" },
        ],
      },
      {
        id: "EML",
        name: "English Modern Letters",
        courses: [
          { code: "EML101", name: "English Composition" },
          { code: "EML102", name: "Literature Study I" },
          { code: "EML201", name: "Poetry" },
          { code: "EML202", name: "Drama" },
          { code: "EML301", name: "Novel Studies" },
          { code: "EML401", name: "Literary Criticism" },
        ],
      },
      {
        id: "FML",
        name: "French Modern Letters",
        courses: [
          { code: "FML101", name: "Grammaire Française" },
          { code: "FML102", name: "Littérature Française I" },
          { code: "FML201", name: "Poésie Française" },
          { code: "FML202", name: "Théâtre Français" },
          { code: "FML301", name: "Roman Français" },
          { code: "FML401", name: "Critique Littéraire" },
        ],
      },
      {
        id: "GEO",
        name: "Geography",
        courses: [
          { code: "GEO101", name: "Physical Geography" },
          { code: "GEO102", name: "Human Geography" },
          { code: "GEO201", name: "Regional Geography" },
          { code: "GEO202", name: "Economic Geography" },
          { code: "GEO301", name: "GIS Applications" },
          { code: "GEO401", name: "Advanced Geography" },
        ],
      },
      {
        id: "GELG",
        name: "Geology",
        courses: [
          { code: "GELG101", name: "General Geology" },
          { code: "GELG102", name: "Mineralogy" },
          { code: "GELG201", name: "Petrology" },
          { code: "GELG202", name: "Structural Geology" },
          { code: "GELG301", name: "Environmental Geology" },
          { code: "GELG401", name: "Advanced Geology" },
        ],
      },
      {
        id: "GNC",
        name: "Guidance and Counseling",
        courses: [
          { code: "GNC101", name: "Counseling Fundamentals" },
          { code: "GNC102", name: "Guidance Principles" },
          { code: "GNC201", name: "Career Guidance" },
          { code: "GNC202", name: "Peer Counseling" },
          { code: "GNC301", name: "Crisis Intervention" },
          { code: "GNC401", name: "Advanced Counseling" },
        ],
      },
      {
        id: "HIS",
        name: "History",
        courses: [
          { code: "HIS101", name: "World History I" },
          { code: "HIS102", name: "African History" },
          { code: "HIS201", name: "World History II" },
          { code: "HIS202", name: "Modern History" },
          { code: "HIS301", name: "Historiography" },
          { code: "HIS401", name: "Historical Research" },
        ],
      },
      {
        id: "MAT",
        name: "Mathematics",
        courses: [
          { code: "MAT101", name: "Calculus I" },
          { code: "MAT102", name: "Linear Algebra" },
          { code: "MAT201", name: "Calculus II" },
          { code: "MAT202", name: "Differential Equations" },
          { code: "MAT301", name: "Real Analysis" },
          { code: "MAT401", name: "Advanced Mathematics" },
        ],
      },
      {
        id: "PHI",
        name: "Philosophy",
        courses: [
          { code: "PHI101", name: "Introduction to Philosophy" },
          { code: "PHI102", name: "Logic" },
          { code: "PHI201", name: "Metaphysics" },
          { code: "PHI202", name: "Epistemology" },
          { code: "PHI301", name: "Ethics" },
          { code: "PHI401", name: "Philosophy of Mind" },
        ],
      },
      {
        id: "PHY",
        name: "Physics",
        courses: [
          { code: "PHY101", name: "Classical Mechanics" },
          { code: "PHY102", name: "Electricity and Magnetism" },
          { code: "PHY201", name: "Thermodynamics" },
          { code: "PHY202", name: "Optics" },
          { code: "PHY301", name: "Modern Physics" },
          { code: "PHY401", name: "Quantum Mechanics" },
        ],
      },
      {
        id: "SED",
        name: "Science of Education",
        courses: [
          { code: "SED101", name: "Education Fundamentals" },
          { code: "SED102", name: "Teaching Methods" },
          { code: "SED201", name: "Curriculum Design" },
          { code: "SED202", name: "Educational Psychology" },
          { code: "SED301", name: "Educational Research" },
          { code: "SED401", name: "Educational Innovation" },
        ],
      },
    ],
  },
  {
    id: "HTTTC",
    name: "Higher Technical Teacher Training College",
    shortName: "HTTTC",
    departments: [
      {
        id: "ADT",
        name: "Administrative Techniques",
        courses: [
          { code: "ADT101", name: "Office Management" },
          { code: "ADT102", name: "Administrative Procedures" },
          { code: "ADT201", name: "Records Management" },
          { code: "ADT202", name: "Business Communication" },
          { code: "ADT301", name: "Advanced Administration" },
          { code: "ADT401", name: "Administrative Systems" },
        ],
      },
      {
        id: "CEFT",
        name: "Civil Engineering and Forestry Techniques",
        courses: [
          { code: "CEFT101", name: "Building Techniques" },
          { code: "CEFT102", name: "Forestry Techniques" },
          { code: "CEFT201", name: "Construction Methods" },
          { code: "CEFT202", name: "Woodworking" },
          { code: "CEFT301", name: "Structural Techniques" },
          { code: "CEFT401", name: "Advanced Techniques" },
        ],
      },
      {
        id: "CSC",
        name: "Computer Science",
        courses: [
          { code: "CSC101", name: "Programming Basics" },
          { code: "CSC102", name: "Computer Fundamentals" },
          { code: "CSC201", name: "Data Structures" },
          { code: "CSC202", name: "Algorithms" },
          { code: "CSC301", name: "Web Development" },
          { code: "CSC401", name: "Advanced Programming" },
        ],
      },
      {
        id: "ECS",
        name: "Economic Science",
        courses: [
          { code: "ECS101", name: "Economics Basics" },
          { code: "ECS102", name: "Business Economics" },
          { code: "ECS201", name: "Economic Systems" },
          { code: "ECS202", name: "Accounting Basics" },
          { code: "ECS301", name: "Finance Fundamentals" },
          { code: "ECS401", name: "Economic Management" },
        ],
      },
      {
        id: "EPE",
        name: "Electrical and Power Engineering",
        courses: [
          { code: "EPE101", name: "Electrical Fundamentals" },
          { code: "EPE102", name: "Circuit Basics" },
          { code: "EPE201", name: "Power Systems" },
          { code: "EPE202", name: "Electrical Installation" },
          { code: "EPE301", name: "Motor Control" },
          { code: "EPE401", name: "Advanced Power Engineering" },
        ],
      },
      {
        id: "EELEC",
        name: "Electronics and Electricity",
        courses: [
          { code: "EELEC101", name: "Electronic Components" },
          { code: "EELEC102", name: "Basic Electronics" },
          { code: "EELEC201", name: "Digital Electronics" },
          { code: "EELEC202", name: "Analog Electronics" },
          { code: "EELEC301", name: "Telecommunications" },
          { code: "EELEC401", name: "Advanced Electronics" },
        ],
      },
      {
        id: "FS",
        name: "Fundamental Science",
        courses: [
          { code: "FS101", name: "Science Basics" },
          { code: "FS102", name: "Physics Fundamentals" },
          { code: "FS201", name: "Chemistry Fundamentals" },
          { code: "FS202", name: "Biology Fundamentals" },
          { code: "FS301", name: "Mathematics for Science" },
          { code: "FS401", name: "Advanced Science" },
        ],
      },
      {
        id: "LAW",
        name: "Law",
        courses: [
          { code: "LAW101", name: "Legal Fundamentals" },
          { code: "LAW102", name: "Business Law" },
          { code: "LAW201", name: "Commercial Law" },
          { code: "LAW202", name: "Labor Law" },
          { code: "LAW301", name: "Contract Law" },
          { code: "LAW401", name: "Advanced Law" },
        ],
      },
      {
        id: "MEN",
        name: "Mechanical Engineering",
        courses: [
          { code: "MEN101", name: "Engineering Basics" },
          { code: "MEN102", name: "Engineering Drawing" },
          { code: "MEN201", name: "Machinery" },
          { code: "MEN202", name: "Thermodynamics" },
          { code: "MEN301", name: "Mechanical Design" },
          { code: "MEN401", name: "Advanced Mechanical Engineering" },
        ],
      },
      {
        id: "REEN",
        name: "Renewable Energy",
        courses: [
          { code: "REEN101", name: "Energy Fundamentals" },
          { code: "REEN102", name: "Solar Technology" },
          { code: "REEN201", name: "Wind Technology" },
          { code: "REEN202", name: "Biomass Systems" },
          { code: "REEN301", name: "Energy Storage" },
          { code: "REEN401", name: "Advanced Renewable Energy" },
        ],
      },
      {
        id: "SED",
        name: "Science of Education",
        courses: [
          { code: "SED101", name: "Teaching Fundamentals" },
          { code: "SED102", name: "Instructional Design" },
          { code: "SED201", name: "Curriculum Development" },
          { code: "SED202", name: "Learning Theories" },
          { code: "SED301", name: "Educational Assessment" },
          { code: "SED401", name: "Advanced Education" },
        ],
      },
      {
        id: "SFM",
        name: "Social Economy and Family Management",
        courses: [
          { code: "SFM101", name: "Family Basics" },
          { code: "SFM102", name: "Social Economics" },
          { code: "SFM201", name: "Family Management" },
          { code: "SFM202", name: "Social Development" },
          { code: "SFM301", name: "Community Economics" },
          { code: "SFM401", name: "Advanced Family Studies" },
        ],
      },
    ],
  },
  {
    id: "HND",
    name: "HND/HPD/B.TECH ACADEMIC ORGAN",
    shortName: "HND",
    departments: [
      {
        id: "AFSH",
        name: "Agriculture and Food Sciences",
        courses: [
          { code: "AFSH101", name: "Agricultural Science" },
          { code: "AFSH102", name: "Food Processing" },
          { code: "AFSH201", name: "Crop Production" },
          { code: "AFSH202", name: "Livestock Production" },
          { code: "AFSH301", name: "Food Technology" },
          { code: "AFSH401", name: "Advanced Agriculture" },
        ],
      },
      {
        id: "BFM",
        name: "Business, Finance and Management",
        courses: [
          { code: "BFM101", name: "Business Fundamentals" },
          { code: "BFM102", name: "Finance Basics" },
          { code: "BFM201", name: "Financial Management" },
          { code: "BFM202", name: "Business Management" },
          { code: "BFM301", name: "Advanced Finance" },
          { code: "BFM401", name: "Strategic Management" },
        ],
      },
      {
        id: "CVEN",
        name: "Civil Engineering",
        courses: [
          { code: "CVEN101", name: "Engineering Basics" },
          { code: "CVEN102", name: "Building Design" },
          { code: "CVEN201", name: "Construction" },
          { code: "CVEN202", name: "Structural Design" },
          { code: "CVEN301", name: "Project Management" },
          { code: "CVEN401", name: "Advanced Civil Engineering" },
        ],
      },
      {
        id: "CME",
        name: "Computer Engineering",
        courses: [
          { code: "CME101", name: "Computer Basics" },
          { code: "CME102", name: "Programming" },
          { code: "CME201", name: "Hardware" },
          { code: "CME202", name: "Networking" },
          { code: "CME301", name: "Systems Design" },
          { code: "CME401", name: "Advanced Computer Engineering" },
        ],
      },
      {
        id: "ED",
        name: "Education",
        courses: [
          { code: "ED101", name: "Education Basics" },
          { code: "ED102", name: "Teaching Methods" },
          { code: "ED201", name: "Curriculum" },
          { code: "ED202", name: "Educational Psychology" },
          { code: "ED301", name: "Assessment" },
          { code: "ED401", name: "Advanced Education" },
        ],
      },
      {
        id: "EEEH",
        name: "Electrical and Electronic Engineering",
        courses: [
          { code: "EEEH101", name: "Electrical Basics" },
          { code: "EEEH102", name: "Electronics Basics" },
          { code: "EEEH201", name: "Power Systems" },
          { code: "EEEH202", name: "Digital Electronics" },
          { code: "EEEH301", name: "Electrical Machines" },
          { code: "EEEH401", name: "Advanced EEE" },
        ],
      },
      {
        id: "FWT",
        name: "Forestry and Wildlife Technology",
        courses: [
          { code: "FWT101", name: "Forestry Basics" },
          { code: "FWT102", name: "Wildlife Basics" },
          { code: "FWT201", name: "Forest Management" },
          { code: "FWT202", name: "Wildlife Management" },
          { code: "FWT301", name: "Conservation" },
          { code: "FWT401", name: "Advanced Forestry" },
        ],
      },
      {
        id: "HESW",
        name: "Home Economics and Social Work",
        courses: [
          { code: "HESW101", name: "Home Basics" },
          { code: "HESW102", name: "Social Work Basics" },
          { code: "HESW201", name: "Family Management" },
          { code: "HESW202", name: "Community Work" },
          { code: "HESW301", name: "Social Development" },
          { code: "HESW401", name: "Advanced Social Work" },
        ],
      },
      {
        id: "JMH",
        name: "Journalism and Media",
        courses: [
          { code: "JMH101", name: "Journalism Basics" },
          { code: "JMH102", name: "Media Basics" },
          { code: "JMH201", name: "News Writing" },
          { code: "JMH202", name: "Media Production" },
          { code: "JMH301", name: "Digital Media" },
          { code: "JMH401", name: "Advanced Journalism" },
        ],
      },
      {
        id: "LL",
        name: "Law",
        courses: [
          { code: "LL101", name: "Law Basics" },
          { code: "LL102", name: "Legal Systems" },
          { code: "LL201", name: "Business Law" },
          { code: "LL202", name: "Criminal Law" },
          { code: "LL301", name: "Commercial Law" },
          { code: "LL401", name: "Advanced Law" },
        ],
      },
      {
        id: "MANH",
        name: "Management",
        courses: [
          { code: "MANH101", name: "Management Basics" },
          { code: "MANH102", name: "Organization" },
          { code: "MANH201", name: "Leadership" },
          { code: "MANH202", name: "Human Resources" },
          { code: "MANH301", name: "Strategic Management" },
          { code: "MANH401", name: "Advanced Management" },
        ],
      },
      {
        id: "ME",
        name: "Mechanical Engineering",
        courses: [
          { code: "ME101", name: "Engineering Basics" },
          { code: "ME102", name: "Machine Design" },
          { code: "ME201", name: "Thermodynamics" },
          { code: "ME202", name: "Manufacturing" },
          { code: "ME301", name: "Mechanical Systems" },
          { code: "ME401", name: "Advanced Mechanical" },
        ],
      },
      {
        id: "MBSH",
        name: "Medical and Biomedical Sciences",
        courses: [
          { code: "MBSH101", name: "Medical Basics" },
          { code: "MBSH102", name: "Anatomy" },
          { code: "MBSH201", name: "Physiology" },
          { code: "MBSH202", name: "Biochemistry" },
          { code: "MBSH301", name: "Pathology" },
          { code: "MBSH401", name: "Advanced Medical Science" },
        ],
      },
      {
        id: "TEE",
        name: "Thermal and Energy Engineering",
        courses: [
          { code: "TEE101", name: "Thermal Basics" },
          { code: "TEE102", name: "Energy Basics" },
          { code: "TEE201", name: "Heat Transfer" },
          { code: "TEE202", name: "Energy Efficiency" },
          { code: "TEE301", name: "HVAC Systems" },
          { code: "TEE401", name: "Advanced Thermal Engineering" },
        ],
      },
      {
        id: "TM",
        name: "Tourism Management",
        courses: [
          { code: "TM101", name: "Tourism Basics" },
          { code: "TM102", name: "Hospitality" },
          { code: "TM201", name: "Hotel Management" },
          { code: "TM202", name: "Event Management" },
          { code: "TM301", name: "Tourism Planning" },
          { code: "TM401", name: "Advanced Tourism" },
        ],
      },
      {
        id: "TMS",
        name: "Transport and Maritime Studies",
        courses: [
          { code: "TMS101", name: "Transport Basics" },
          { code: "TMS102", name: "Maritime Basics" },
          { code: "TMS201", name: "Shipping" },
          { code: "TMS202", name: "Port Operations" },
          { code: "TMS301", name: "Maritime Law" },
          { code: "TMS401", name: "Advanced Maritime" },
        ],
      },
      {
        id: "WWH",
        name: "Woodworks",
        courses: [
          { code: "WWH101", name: "Woodworking Basics" },
          { code: "WWH102", name: "Carpentry" },
          { code: "WWH201", name: "Wood Finishing" },
          { code: "WWH202", name: "Advanced Carpentry" },
          { code: "WWH301", name: "Furniture Design" },
          { code: "WWH401", name: "Advanced Woodworking" },
        ],
      },
    ],
  },
  {
    id: "NAHPI",
    name: "National Higher Polytechnic Institute",
    shortName: "NAHPI",
    departments: [
      {
        id: "CMC",
        name: "Centre for Cybersecurity and Mathematical Cryptology",
        courses: [
          { code: "CMC101", name: "Cybersecurity Basics" },
          { code: "CMC102", name: "Network Security" },
          { code: "CMC201", name: "Cryptography" },
          { code: "CMC202", name: "Data Security" },
          { code: "CMC301", name: "Ethical Hacking" },
          { code: "CMC401", name: "Advanced Cybersecurity" },
        ],
      },
      {
        id: "CBE",
        name: "Chemical and Biological Engineering",
        courses: [
          { code: "CBE101", name: "Engineering Basics" },
          { code: "CBE102", name: "Chemical Processes" },
          { code: "CBE201", name: "Biological Engineering" },
          { code: "CBE202", name: "Process Design" },
          { code: "CBE301", name: "Biotechnology" },
          { code: "CBE401", name: "Advanced CBE" },
        ],
      },
      {
        id: "CVL",
        name: "Civil Engineering and Architecture",
        courses: [
          { code: "CVL101", name: "Basics of Civil Engineering" },
          { code: "CVL102", name: "Architectural Design" },
          { code: "CVL201", name: "Building Design" },
          { code: "CVL202", name: "Construction Methods" },
          { code: "CVL301", name: "Project Management" },
          { code: "CVL401", name: "Advanced Civil Engineering" },
        ],
      },
      {
        id: "COM",
        name: "Computer Engineering",
        courses: [
          { code: "COM101", name: "Computer Basics" },
          { code: "COM102", name: "Programming" },
          { code: "COM201", name: "Computer Architecture" },
          { code: "COM202", name: "Networking" },
          { code: "COM301", name: "Systems Design" },
          { code: "COM401", name: "Advanced Computer Engineering" },
        ],
      },
      {
        id: "EEEE",
        name: "Electrical and Electronic Engineering",
        courses: [
          { code: "EEEE101", name: "Electrical Basics" },
          { code: "EEEE102", name: "Circuit Analysis" },
          { code: "EEEE201", name: "Power Systems" },
          { code: "EEEE202", name: "Electronics" },
          { code: "EEEE301", name: "Control Systems" },
          { code: "EEEE401", name: "Advanced EEE" },
        ],
      },
      {
        id: "MEC",
        name: "Mechanical and Industrial Engineering",
        courses: [
          { code: "MEC101", name: "Engineering Fundamentals" },
          { code: "MEC102", name: "Mechanical Design" },
          { code: "MEC201", name: "Manufacturing" },
          { code: "MEC202", name: "Industrial Systems" },
          { code: "MEC301", name: "Quality Management" },
          { code: "MEC401", name: "Advanced MEC" },
        ],
      },
      {
        id: "MIN",
        name: "Mining and Mineral Engineering",
        courses: [
          { code: "MIN101", name: "Mining Basics" },
          { code: "MIN102", name: "Mineral Processing" },
          { code: "MIN201", name: "Ore Extraction" },
          { code: "MIN202", name: "Mining Operations" },
          { code: "MIN301", name: "Environmental Aspects" },
          { code: "MIN401", name: "Advanced Mining" },
        ],
      },
      {
        id: "PET",
        name: "Petroleum Engineering",
        courses: [
          { code: "PET101", name: "Petroleum Basics" },
          { code: "PET102", name: "Oil and Gas" },
          { code: "PET201", name: "Drilling Engineering" },
          { code: "PET202", name: "Production Engineering" },
          { code: "PET301", name: "Reservoir Management" },
          { code: "PET401", name: "Advanced Petroleum Engineering" },
        ],
      },
    ],
  },
];

// Utility functions
/**
 * @param {string} schoolId
 * @returns {School | undefined}
 */
export const getSchoolById = (schoolId) => {
  return SCHOOLS_DATA.find((school) => school.id === schoolId);
};

/**
 * @param {string} schoolId
 * @returns {Department[]}
 */
export const getDepartmentsBySchool = (schoolId) => {
  const school = getSchoolById(schoolId);
  return school ? school.departments : [];
};

/**
 * @param {string} schoolId
 * @param {string} departmentId
 * @returns {Course[]}
 */
export const getCoursesByDepartment = (schoolId, departmentId) => {
  const school = getSchoolById(schoolId);
  if (!school) return [];
  const department = school.departments.find((d) => d.id === departmentId);
  return department ? department.courses : [];
};